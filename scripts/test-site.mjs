import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import ts from "typescript";

// 使用现有 TypeScript 在内存中编译测试模块，不安装测试库或改写源码。
async function moduleUrl(path, imports = {}) {
  const source = await readFile(new URL(path, import.meta.url), "utf8");
  let output = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText;
  for (const [specifier, url] of Object.entries(imports)) output = output.replaceAll(`from "${specifier}"`, `from "${url}"`);
  const url = `data:text/javascript;base64,${Buffer.from(output).toString("base64")}`;
  return url;
}
const productsUrl = await moduleUrl("../src/data/products.ts");
const rfqUrl = await moduleUrl("../src/data/rfq.ts");
const viewUrl = await moduleUrl("../src/data/catalog-view.ts", { "./products": productsUrl });
const validationUrl = await moduleUrl("../src/lib/rfq-validation.ts", { "../data/rfq": rfqUrl });
const routeUrl = await moduleUrl("../src/app/api/rfq/route.ts", { "@/data/products": productsUrl, "@/lib/rfq-validation": validationUrl });
const navigationUrl = await moduleUrl("../src/data/navigation.ts", { "./products": productsUrl });
const { megaColumns } = await import(navigationUrl);
const catalog = await import(productsUrl);
const view = await import(viewUrl);
const { emptyDraft } = await import(rfqUrl);
const { validateRfq, readBoundedJson } = await import(validationUrl);
const { POST } = await import(routeUrl);
const raw = JSON.parse(await readFile(new URL("./products.json", import.meta.url), "utf8"));
const manifest = JSON.parse(await readFile(new URL("./image-manifest.json", import.meta.url), "utf8"));
const targets = new Set(["sample-box", ...catalog.products.map((product) => product.id), ...catalog.series.map((group) => group.id)]);
const valid = () => ({ ...emptyDraft(), contactName: "Ada Buyer", email: "ada@gmail.com", companyName: "Studio Test", country: "United States", postalCode: "10001", quantityRange: "50–200", exactQuantity: "100", targets: ["eva-yoga-blocks"], submissionId: "12345678-1234-4234-9234-123456789abc" });

await test("目录保留 66 SKU、47 / 19 映射，无重复或虚构 G-18", () => {
  assert.equal(catalog.products.length, 66);
  assert.deepEqual(catalog.products.map((product) => product.id).sort(), raw.map((product) => product.id).sort());
  assert.equal(catalog.products.filter((product) => product.collection === "more").length, 19);
  assert.equal(catalog.products.filter((product) => product.seriesId).length, 47);
  assert.equal(catalog.series.length, 19);
  assert.equal(catalog.madeToOrder.length, 5);
  assert.equal(catalog.series.some((group) => group.id === "G-18"), false);
  const mapped = catalog.series.flatMap((group) => group.skuIds);
  assert.equal(new Set(mapped).size, mapped.length);
  for (const product of catalog.products) {
    assert.equal("priceMin" in product || "url" in product || "detailUrl" in product, false);
    assert.ok(manifest[product.image], `Missing image: ${product.id}`);
  }
});
await test("目录图与首屏响应式资产全部存在", async () => {
  const paths = [...catalog.products.map((product) => product.image), "/images/hero.png", "/images/contact-cta.jpg", "/images/sample-box-unboxing.png"];
  for (const path of paths) {
    const entry = manifest[path];
    assert.ok(entry?.width > 0 && entry?.height > 0);
    const variants = [entry.src, ...(entry.srcSet ?? "").split(",").filter(Boolean).map((part) => part.trim().split(" ")[0])];
    for (const image of new Set(variants)) assert.ok((await readFile(new URL(`../public${image}`, import.meta.url))).length > 0);
  }
});
await test("URL 非法参数归一、价格退出、分页与排序可重建", () => {
  assert.deepEqual(view.parseView("?cat=bad&sort=price-low&limit=-1&series=G-18"), view.initialView);
  const state = view.parseView("?cat=restorative&sort=name-desc&limit=48&series=G-11&price=under-5");
  const url = view.viewUrl(state, "https://glinticstudio.com/products?price=under-5&campaign=test");
  assert.equal(url.includes("price="), false);
  assert.ok(url.includes("campaign=test"));
  assert.deepEqual(view.parseView(new URL(url, "https://glinticstudio.com").search), state);
  assert.equal(view.catalogResults(view.initialView).slice(0,24).length,24);
  assert.equal(view.catalogResults({ ...view.initialView, cat: "more" }).length,19);
  assert.equal(view.catalogResults({ ...view.initialView, series: "G-06" }).length,0);
});
await test("Task1 五集合归属、47/19 与 19 条导航系列保持一致", () => {
  assert.deepEqual(catalog.collections.map((c) => c.slug), ["yoga-essentials", "pilates-sculpt", "restorative", "fascia-recovery", "studio-retail"]);
  assert.deepEqual(catalog.collections.map((c) => view.catalogResults({ ...view.initialView, cat: c.slug }).length), [4, 12, 4, 10, 17]);
  assert.equal(catalog.seriesById["G-10"].collection, "yoga-essentials");
  assert.equal(catalog.seriesById["G-04"].collection, "pilates-sculpt");
  assert.equal(catalog.seriesById["G-03"].collection, "fascia-recovery");
  assert.equal(catalog.seriesById["G-08"].collection, "fascia-recovery");
  const items = megaColumns.flatMap((column) => column.items);
  assert.equal(items.length, 19);
  assert.equal(new Set(items.map((item) => item.id)).size, 19);
  for (const item of items) {
    const state = view.parseView(new URL(item.href, "https://glinticstudio.com").search);
    assert.equal(state.series, item.id);
    assert.equal(state.cat, item.collection);
    assert.equal(view.catalogResults(state).length, item.skuIds.length);
  }
});
await test("五条旧集合链接归一，迁出系列仍保留筛选与附加参数", () => {
  for (const [old, next] of Object.entries(view.legacyCategories)) {
    const state = view.parseView(`?cat=${old}&sort=name-desc&limit=48`);
    assert.equal(state.cat, next);
    assert.equal(state.limit, 48);
    assert.equal(state.sort, "name-desc");
  }
  for (const [old, id] of [["yoga-pilates-essentials", "G-03"], ["yoga-pilates-essentials", "G-04"], ["pilates-props-resistance", "G-08"], ["restorative-meditation", "G-10"]]) {
    const state = view.parseView(`?cat=${old}&series=${id}&sort=name-desc&limit=48`);
    assert.equal(state.cat, catalog.seriesById[id].collection);
    assert.equal(state.series, id);
    const url = view.viewUrl(state, "https://glinticstudio.com/products?campaign=test");
    assert.ok(url.includes("campaign=test"));
    assert.deepEqual(view.parseView(new URL(url, "https://glinticstudio.com").search), state);
  }
  assert.equal(view.parseView("?cat=__proto__").cat, "all");
  assert.equal(view.parseView("?cat=restorative&series=G-10").series, "");
});
const quick = () => ({ source: "quick", inquiryType: "Bulk Quote", contactName: "Ada Buyer", email: "ada@gmail.com", notes: "G-01 100 pcs, deliver to California 90210", submissionId: valid().submissionId });
await test("快速询盘只需四字段，详细 RFQ 仍要求公司、目的地与数量", () => {
  const result = validateRfq(quick(), targets, { quick: true });
  assert.equal(result.ok, true);
  assert.equal(result.data.companyName, "");
  assert.equal(result.data.country, "");
  assert.equal(result.data.noPostalCode, true);
  assert.equal(result.data.quantityRange, "");
  assert.equal(validateRfq(quick(), targets).ok, false);
  const sample = validateRfq({ ...quick(), inquiryType: "Sample Box" }, targets, { quick: true });
  assert.equal(sample.ok, true);
  assert.deepEqual(sample.data.targets, ["sample-box"]);
});
await test("快速询盘拒绝缺项、恶意字段、未知来源及超长内容", () => {
  for (const patch of [{ contactName: " " }, { email: "bad" }, { notes: " " }, { notes: "x".repeat(2001) }, { source: "unknown" }, { source: true }, { email: "a@x.com\r\nBcc:b@x.com" }, { companyName: 1 }, { noPostalCode: "true" }, { targets: ["G-18"] }, { customization: ["invalid"] }, { submissionId: "bad" }]) {
    assert.equal(validateRfq({ ...quick(), ...patch }, targets, { quick: true }).ok, false, JSON.stringify(patch));
  }
});
await test("合法 RFQ 接受个人邮箱、去空格、保留空白款与包装组合", () => {
  const result = validateRfq({ ...valid(), contactName: " Ada Buyer ", customization: ["No Logo (Blank)", "Custom Packaging"] }, targets);
  assert.equal(result.ok, true);
  assert.equal(result.data.contactName, "Ada Buyer");
  assert.equal(result.data.customization.length, 2);
});
await test("样品申请不套用大货数量，并注入 Sample Box", () => {
  const result = validateRfq({ ...valid(), inquiryType: "Sample Box", quantityRange: "", exactQuantity: "", targets: [] }, targets);
  assert.equal(result.ok, true);
  assert.deepEqual(result.data.targets, ["sample-box"]);
});
await test("无邮编声明仍保留目的地信息", () => {
  assert.equal(validateRfq({ ...valid(), postalCode: "", noPostalCode: true }, targets).ok, true);
  assert.equal(validateRfq({ ...valid(), postalCode: "" }, targets).ok, false);
});
await test("拒绝非法字段、未知目标、枚举、长度与头注入", () => {
  for (const patch of [{ contactName: " " }, { email: "x@example.com\r\nBcc: attack@example.com" }, { contactName: 42 }, { notes: "x".repeat(2001) }, { targets: ["G-18"] }, { targets: ["__proto__"] }, { customization: ["unknown"] }, { exactQuantity: "11" }, { quantityRange: "5" }, { inquiryType: "payment" }, { submissionId: "wrong" }, { noPostalCode: "true" }]) assert.equal(validateRfq({ ...valid(), ...patch }, targets).ok, false, JSON.stringify(patch));
});
await test("请求体上限不依赖 Content-Length，支持分块限制", async () => {
  const request = new Request("https://glinticstudio.com/api/rfq", { method: "POST", body: "x".repeat(17000) });
  await assert.rejects(readBoundedJson(request), RangeError);
  await assert.rejects(readBoundedJson(new Request("https://glinticstudio.com/api/rfq", { method: "POST", body: "{}", headers: { "Content-Length": "17000" } })), RangeError);
  assert.deepEqual(await readBoundedJson(new Request("https://glinticstudio.com/api/rfq", { method: "POST", body: "{}" })), {});
});
let addressCounter = 0;
function request(data = valid(), headers = {}) { return new Request("https://glinticstudio.com/api/rfq", { method: "POST", headers: { origin: "https://glinticstudio.com", "content-type": "application/json", "x-vercel-forwarded-for": `test-${++addressCounter}`, ...headers }, body: typeof data === "string" ? data : JSON.stringify(data) }); }
const fetchBefore = globalThis.fetch;
const savedEnv = Object.fromEntries(["RESEND_API_KEY", "RFQ_FROM_EMAIL", "RFQ_TO_EMAIL"].map((key) => [key, process.env[key]]));
let calls = [];
try {
  globalThis.fetch = async (url, init) => { calls.push({ url, init }); return Response.json({ id: "mock-email-id" }); };
  delete process.env.RESEND_API_KEY;
  delete process.env.RFQ_FROM_EMAIL;
  delete process.env.RFQ_TO_EMAIL;
  await test("未配置邮件返回 503，绝不虚报成功或调用外部服务", async () => { const response = await POST(request()); assert.equal(response.status,503); assert.equal(calls.length,0); });
  process.env.RESEND_API_KEY = "test-placeholder-not-a-real-key";
  process.env.RFQ_FROM_EMAIL = "quotes@example.invalid";
  process.env.RFQ_TO_EMAIL = "team@example.invalid";
  await test("同源、类型、JSON、蜜罐与体积防护", async () => {
    assert.equal((await POST(request(valid(), { origin: "https://attacker.invalid" }))).status,403);
    assert.equal((await POST(request(valid(), { "content-type": "text/plain" }))).status,415);
    assert.equal((await POST(request("{"))).status,400);
    assert.equal((await POST(request({ ...valid(), website: "bot" }))).status,400);
    assert.equal((await POST(request("x".repeat(17000)))).status,413);
    assert.equal(calls.length,0);
  });
  await test("邮件固定收件人、可信 SKU 身份、Reply-To 与幂等键", async () => {
    const data = { ...valid(), to: "attacker@example.invalid", targets: ["eva-yoga-blocks", "G-06"], notes: "<script>alert(1)</script>" };
    assert.equal((await POST(request(data))).status,200);
    assert.equal((await POST(request(data))).status,200);
    assert.equal(calls.length,2);
    const payload = JSON.parse(calls[0].init.body);
    assert.deepEqual(payload.to,["team@example.invalid"]);
    assert.equal(payload.reply_to,"ada@gmail.com");
    assert.ok(payload.text.includes("SKU: eva-yoga-blocks | Series: G-02"));
    assert.ok(payload.text.includes("Made-to-Order"));
    assert.equal("html" in payload,false);
    assert.equal(calls[0].init.headers["Idempotency-Key"],calls[1].init.headers["Idempotency-Key"]);
  });
  await test("服务商失败、异常响应与超时不返回成功", async () => {
    globalThis.fetch = async () => Response.json({ error: "mock" }, { status: 500 });
    assert.equal((await POST(request())).status,502);
    globalThis.fetch = async () => Response.json({});
    assert.equal((await POST(request())).status,502);
    globalThis.fetch = async () => { throw new DOMException("mock timeout", "TimeoutError"); };
    assert.equal((await POST(request())).status,504);
    globalThis.fetch = async () => Response.json({}, { status: 409 });
    assert.equal((await POST(request())).status,409);
  });
  await test("快速 API 校验、成功、幂等与空字段邮件模板（模拟）", async () => {
    calls = [];
    globalThis.fetch = async (url, init) => { calls.push({ url, init }); return Response.json({ id: "mock-email-id" }); };
    assert.equal((await POST(request({ ...quick(), source: "unknown" }))).status, 400);
    assert.equal((await POST(request({ ...quick(), notes: " " }))).status, 400);
    assert.equal((await POST(request({ ...quick(), source: undefined }))).status, 400);
    assert.equal((await POST(request({ ...quick(), website: "bot" }))).status, 400);
    assert.equal(calls.length, 0);
    assert.equal((await POST(request(quick()))).status, 200);
    assert.equal((await POST(request(quick()))).status, 200);
    assert.equal(calls.length, 2);
    const mail = JSON.parse(calls[0].init.body);
    assert.match(mail.subject, /Quick Inquiry/);
    assert.equal(mail.text.includes("Quantity range:"), false);
    assert.equal(mail.text.includes("Exact quantity:"), false);
    assert.equal(mail.text.includes("Customization:"), false);
    assert.equal(mail.text.includes("Company / Studio:"), false);
    assert.equal(mail.text.includes("Country:"), false);
    assert.equal(mail.text.includes("Postal code:"), false);
    assert.match(mail.text, /G-01 100 pcs/);
    assert.equal(calls[0].init.headers["Idempotency-Key"], calls[1].init.headers["Idempotency-Key"]);
    assert.deepEqual(mail.to, ["team@example.invalid"]);
    assert.equal((await POST(request({ ...quick(), companyName: "Studio Test", country: "United States", postalCode: "10001", noPostalCode: false, quantityRange: "50–200", exactQuantity: "100", customization: ["Custom Packaging"] }))).status, 200);
    const extendedMail = JSON.parse(calls.at(-1).init.body);
    for (const line of ["Company / Studio: Studio Test", "Country: United States", "Postal code: 10001", "Quantity range: 50–200", "Exact quantity: 100", "Customization: Custom Packaging"]) assert.ok(extendedMail.text.includes(line));
    assert.equal((await POST(request({ ...quick(), inquiryType: "Sample Box" }))).status, 200);
    assert.match(JSON.parse(calls.at(-1).init.body).text, /Sample Box — not a bulk order/);
    const key = process.env.RESEND_API_KEY;
    delete process.env.RESEND_API_KEY;
    try { assert.equal((await POST(request(quick()))).status, 503); }
    finally { process.env.RESEND_API_KEY = key; }
  });
  await test("单实例连续请求达到合理限制", async () => {
    globalThis.fetch = async () => Response.json({ id: "mock-email-id" });
    for (let index = 0; index < 6; index++) assert.equal((await POST(request(valid(), { "x-vercel-forwarded-for": "rate-test" }))).status,200);
    const response = await POST(request(valid(), { "x-vercel-forwarded-for": "rate-test" }));
    assert.equal(response.status,429);
    assert.equal(response.headers.get("Retry-After"),"600");
  });
} finally {
  globalThis.fetch = fetchBefore;
  for (const [key, value] of Object.entries(savedEnv)) { if (value === undefined) delete process.env[key]; else process.env[key] = value; }
}

// 可选生产模式 HTTP 冒烟检查，不发送邮件。
const httpArgument = process.argv.find((argument) => argument.startsWith("--http="));
if (httpArgument) {
  const base = httpArgument.slice(7);
  await test("生产页面英文、HTML 首批产品、metadata 与无商城外链", async () => {
    for (const path of ["/", "/products", "/about", "/legal"]) {
      const response = await fetch(new URL(path,base));
      assert.equal(response.status,200);
      const html = await response.text();
      assert.ok(html.includes('lang="en"'));
      assert.ok(html.includes("og:image"));
      assert.equal(/href="https:\/\/(?:www\.)?alibaba\.com/.test(html),false);
      assert.equal(/priceMin|priceMax|detailUrl/.test(html),false);
      if (path === "/products") assert.equal((html.match(/class="product-card group"/g) ?? []).length,24);
      if (path === "/") {
        const ids = ["collections", "oem", "sample-box", "quality", "contact"].map((id) => html.indexOf(`id="${id}"`));
        assert.ok(ids.every((index) => index > 0));
        assert.deepEqual([...ids].sort((a,b) => a-b),ids);
      }
    }
    assert.equal((await fetch(new URL("/not-a-page",base))).status,404);
    const sitemap = await (await fetch(new URL("/sitemap.xml",base))).text();
    assert.ok(sitemap.includes("glinticstudio.com/products"));
    const html = await (await fetch(new URL("/",base))).text();
    const assetPaths = [...html.matchAll(/(?:src|href)="([^\"]+\.(?:webp|css|woff2|jpg))"/g)].map((match) => match[1].replaceAll("&amp;","&"));
    for (const path of new Set(assetPaths)) assert.equal((await fetch(new URL(path,base))).status,200,path);
  });
}
console.log(`验证脚本：${fileURLToPath(import.meta.url)}`);
