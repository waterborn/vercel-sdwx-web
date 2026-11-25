import { createHash, randomBytes } from "node:crypto";
import { productById, seriesById, products, series } from "@/data/products";
import { emailPattern, readBoundedJson, validateRfq } from "@/lib/rfq-validation";
export const runtime = "nodejs";
export const maxDuration = 30;
const allowedTargets = new Set(["sample-box", ...products.map((product) => product.id), ...series.map((group) => group.id)]);
const salt = randomBytes(16).toString("hex");
const buckets = new Map<string, { count: number; expires: number; }>();
let globalWindow = { count: 0, expires: 0 };
// 仅作单实例防护；不声称无持久层可以提供精确全局限流。
function allowRequest(request: Request): boolean {
  const now = Date.now();
  for (const [key, bucket] of buckets) if (bucket.expires <= now) buckets.delete(key);
  if (globalWindow.expires <= now) globalWindow = { count: 0, expires: now + 60000 };
  if (globalWindow.count >= 60) return false;
  const address = (request.headers.get("x-vercel-forwarded-for") ?? request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim().slice(0, 100);
  const key = createHash("sha256").update(salt + address).digest("hex");
  const bucket = buckets.get(key) ?? { count: 0, expires: now + 600000 };
  if (bucket.count >= 6 || (!buckets.has(key) && buckets.size >= 2000)) return false;
  bucket.count += 1;
  buckets.set(key, bucket);
  globalWindow.count += 1;
  return true;
}
function reply(status: number, body: object, headers: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigins = new Set([new URL(request.url).origin]);
  if (process.env.NEXT_PUBLIC_SITE_URL) { try { allowedOrigins.add(new URL(process.env.NEXT_PUBLIC_SITE_URL).origin); } catch { /* 无效配置不扩大允许范围。 */ } }
  if (!origin || !allowedOrigins.has(origin)) return reply(403, { error: "This inquiry must be submitted from the GLINTIC website." });
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") return reply(415, { error: "Use application/json for inquiry submissions." });
  if (!allowRequest(request)) return reply(429, { error: "Too many requests. Please wait before trying again." }, { "Retry-After": "600" });
  let input: unknown;
  try { input = await readBoundedJson(request); }
  catch (error) { return reply(error instanceof RangeError ? 413 : 400, { error: error instanceof RangeError ? "The request exceeds the size limit." : "The request contains invalid JSON." }); }
  const quick = !!input && typeof input === "object" && !Array.isArray(input) && (input as Record<string, unknown>).source === "quick";
  const validated = validateRfq(input, allowedTargets, { quick });
  if (!validated.ok) return reply(400, { error: validated.error });
  const data = validated.data;
  // 蜜罐命中显式拒绝，不给未发信请求伪造成功响应。
  if (data.website) return reply(400, { error: "The request could not be processed. Please use the contact email." });
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RFQ_FROM_EMAIL?.trim();
  const to = process.env.RFQ_TO_EMAIL?.trim();
  if (!key || !from || !to || !emailPattern.test(from) || !emailPattern.test(to)) return reply(503, { error: "The quote email service is not configured yet. Your draft has been kept; please use the published contact email or try again later." });
  const targetLines = data.targets.map((id) => {
    if (id === "sample-box") return "GLINTIC Sample Box (US$39 reference; content, shipping and terms to confirm)";
    const product = Object.hasOwn(productById, id) ? productById[id] : undefined;
    if (product) return `${product.name} | SKU: ${product.id} | Series: ${product.seriesId ?? "More From GLINTIC"} | ${product.specs}`;
    const group = seriesById[id];
    return `${group.id}: ${group.name}${group.skuIds.length ? "" : " | Made-to-Order inquiry; feasibility to confirm"}`;
  });
  const text = [
    `GLINTIC Studio — ${quick ? "Quick Inquiry — " : ""}${data.inquiryType}`,
    `Source: ${quick ? "Quick Inquiry" : "Detailed RFQ"}`,
    `Submission ID: ${data.submissionId}`,
    `Contact: ${data.contactName}`,
    `Business email: ${data.email}`,
    ...(!quick || data.companyName ? [`Company / Studio: ${data.companyName}`] : []),
    ...(!quick || data.country ? [`Country: ${data.country}`] : []),
    ...(!quick || data.postalCode ? [`Postal code: ${data.noPostalCode ? "Not applicable (buyer declaration)" : data.postalCode}`] : []),
    "", "Target products:", ...(targetLines.length ? targetLines : ["General studio sourcing inquiry"]),
    ...(!quick || data.quantityRange || data.inquiryType === "Sample Box" ? ["", `Quantity range: ${data.quantityRange || (data.inquiryType === "Sample Box" ? "Sample Box — not a bulk order" : "Not specified — see project notes")}`] : []),
    ...(!quick || data.exactQuantity ? [`Exact quantity: ${data.exactQuantity || "Not specified"}`] : []),
    ...(!quick || data.customization.length ? [`Customization: ${data.customization.join(", ") || "Not specified"}`] : []),
    "", "Project notes:", data.notes || "None provided.",
    "", "This inquiry is not an order or stock confirmation. Verify specifications, MOQ, supply, freight and commercial terms before quoting.",
  ].join("\n");
  try {
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": `glintic-rfq/${data.submissionId}` }, body: JSON.stringify({ from, to: [to], reply_to: data.email, subject: `GLINTIC Studio | ${quick ? "Quick Inquiry — " : ""}${data.inquiryType}`, text }), signal: AbortSignal.timeout(12000), cache: "no-store" });
    if (!response.ok) return reply(response.status === 409 ? 409 : 502, { error: response.status === 409 ? "This submission ID was already used with different details. Edit the form and submit a new request." : "The email provider could not accept the request. Your draft has been kept; please retry or email us directly." });
    const result: unknown = await response.json();
    if (!result || typeof result !== "object" || !("id" in result) || typeof result.id !== "string" || !result.id) return reply(502, { error: "The email provider returned an unexpected result. Please retry with the same request details." });
    return reply(200, { accepted: true, submissionId: data.submissionId });
  } catch (error) {
    return reply(error instanceof Error && ["TimeoutError", "AbortError"].includes(error.name) ? 504 : 502, { error: "Email delivery could not be confirmed. Your draft has been kept; retrying the same request uses the same submission ID." });
  }
}
