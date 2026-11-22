import { customizationOptions, inquiryTypes, quantityRanges, type RfqRequest } from "../data/rfq";
const singleLineControl = /[\u0000-\u001f\u007f]/;
export const emailPattern = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/;
export type ValidationResult = { ok: true; data: RfqRequest; } | { ok: false; error: string; };
export function validateRfq(input: unknown, allowedTargets: ReadonlySet<string>): ValidationResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { ok: false, error: "Please send a valid inquiry object." };
  const body = input as Record<string, unknown>;
  function text(key: string, max: number, required = false, multiline = false): string | null {
    const value = body[key];
    if (typeof value !== "string" || value.length > max || (multiline ? /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/ : singleLineControl).test(value)) return null;
    const normalized = value.trim();
    return required && !normalized ? null : normalized;
  }
  const contactName = text("contactName", 100, true);
  const email = text("email", 254, true);
  const companyName = text("companyName", 150, true);
  const country = text("country", 80, true);
  const postalCode = text("postalCode", 24);
  const notes = text("notes", 2000, false, true);
  const website = text("website", 200);
  const exactQuantity = text("exactQuantity", 8);
  if ([contactName, email, companyName, country, postalCode, notes, website, exactQuantity].some((value) => value === null)) return { ok: false, error: "Check the required fields, lengths and unsupported characters." };
  if (!emailPattern.test(email!)) return { ok: false, error: "Please enter a valid business email." };
  if (typeof body.noPostalCode !== "boolean" || (!body.noPostalCode && !postalCode)) return { ok: false, error: "Enter the postal code or indicate that your destination does not use one." };
  if (!inquiryTypes.includes(body.inquiryType as RfqRequest["inquiryType"])) return { ok: false, error: "Select a valid inquiry type." };
  if (typeof body.quantityRange !== "string" || (body.quantityRange !== "" && !quantityRanges.includes(body.quantityRange as (typeof quantityRanges)[number]))) return { ok: false, error: "Select a valid quantity range." };
  const sample = body.inquiryType === "Sample Box";
  if (!sample && !body.quantityRange) return { ok: false, error: "Please select an order quantity range." };
  if (!sample && exactQuantity && (!/^\d+$/.test(exactQuantity) || Number(exactQuantity) < 10 || Number(exactQuantity) > 10000000 || Number(exactQuantity) % 10 !== 0)) return { ok: false, error: "Exact quantity must be a multiple of 10, between 10 and 10,000,000." };
  if (!Array.isArray(body.targets) || body.targets.length > allowedTargets.size || body.targets.some((id) => typeof id !== "string" || !allowedTargets.has(id))) return { ok: false, error: "One or more selected products are not in this catalog." };
  if (!Array.isArray(body.customization) || body.customization.length > customizationOptions.length || body.customization.some((option) => typeof option !== "string" || !customizationOptions.includes(option as (typeof customizationOptions)[number]))) return { ok: false, error: "Select valid customization options." };
  if (typeof body.submissionId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.submissionId)) return { ok: false, error: "Invalid submission ID. Please reopen the form and try again." };
  return { ok: true, data: { inquiryType: body.inquiryType as RfqRequest["inquiryType"], contactName: contactName!, email: email!, companyName: companyName!, country: country!, postalCode: body.noPostalCode ? "" : postalCode!, noPostalCode: body.noPostalCode, targets: [...new Set([...body.targets as string[], ...(sample ? ["sample-box"] : [])])], quantityRange: sample ? "" : body.quantityRange, exactQuantity: sample ? "" : exactQuantity!, customization: [...new Set(body.customization as string[])], notes: notes!, website: website!, submissionId: body.submissionId } };
}
export async function readBoundedJson(request: Request, maxBytes = 16384): Promise<unknown> {
  const length = request.headers.get("content-length");
  if (length && (!/^\d+$/.test(length) || Number(length) > maxBytes)) throw new RangeError("Request body is too large.");
  if (!request.body) throw new SyntaxError("Missing request body.");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) { await reader.cancel(); throw new RangeError("Request body is too large."); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
}
