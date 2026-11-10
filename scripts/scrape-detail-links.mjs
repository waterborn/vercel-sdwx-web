// Scrape the Alibaba storefront product list (paginated) and attach each SKU's
// product-detail URL to scripts/products.json, matched by alicdn image hash.
// Usage: node scripts/scrape-detail-links.mjs [--pages=30] [--dry]
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import puppeteer from "puppeteer-core";

const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const STORE = "https://shandongwuxian.en.alibaba.com/productlist.html";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0";

const argv = process.argv.slice(2);
const MAX_PAGES = Number(
  (argv.find((a) => a.startsWith("--pages=")) || "--pages=30").split("=")[1]
);
const DRY = argv.includes("--dry");

const JSON_PATH = "scripts/products.json";
const productsRaw = JSON.parse(readFileSync(JSON_PATH, "utf8"));

/** alicdn image hash — the stable key shared by our catalog and the storefront */
const hashOf = (url) => url?.match(/\/kf\/([A-Za-z0-9]+)\//)?.[1] ?? null;
const norm = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);
const similarity = (a, b) => {
  const A = new Set(norm(a));
  const B = new Set(norm(b));
  if (!A.size || !B.size) return 0;
  let hit = 0;
  for (const t of A) if (B.has(t)) hit++;
  return hit / Math.min(A.size, B.size);
};

const wantedHashes = productsRaw.map((p) => hashOf(p.sourceUrl)).filter(Boolean);

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();
await page.setUserAgent(UA);
await page.setViewport({ width: 1280, height: 2000 });

const byHash = new Map(); // hash -> { url, title }
const noHash = []; // storefront entries whose image we could not key on
let pagesSeen = 0;
let prevSignature = "";

for (let pageNo = 1; pageNo <= MAX_PAGES; pageNo++) {
  try {
    await page.goto(`${STORE}?page=${pageNo}`, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    await page.waitForSelector(".icbu-product-card", { timeout: 20000 }).catch(() => {});
    for (let i = 0; i < 6; i++) {
      await page.evaluate(() => window.scrollBy(0, window.innerHeight * 1.5));
      await new Promise((r) => setTimeout(r, 600));
    }

    const cards = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".icbu-product-card")).map((card) => {
        const a = card.querySelector('a[href*="product-detail"]');
        const img = card.querySelector("img");
        return {
          url: a ? a.href : null,
          title: a ? (a.textContent || "").trim() : "",
          img: img ? img.getAttribute("src") || img.getAttribute("data-src") : null,
        };
      })
    );
    pagesSeen++;

    // stop if the pager hands back the same page twice in a row
    const signature = cards.map((c) => c.url).join("|");
    if (signature && signature === prevSignature) {
      process.stdout.write(`page ${pageNo} identical to previous — pagination stopped\n`);
      break;
    }
    prevSignature = signature;

    for (const c of cards) {
      if (!c.url) continue;
      const h = hashOf(c.img || "");
      if (h) byHash.set(h, { url: c.url, title: c.title });
      else noHash.push(c);
    }

    const matched = wantedHashes.filter((h) => byHash.has(h)).length;
    process.stdout.write(
      `page ${pageNo}: cards=${cards.length} catalogMatched=${matched}/${wantedHashes.length}\n`
    );
    if (matched === wantedHashes.length) {
      process.stdout.write("all catalog entries matched, stopping early\n");
      break;
    }
  } catch (e) {
    process.stdout.write(`page ${pageNo} failed: ${String(e).slice(0, 100)}\n`);
  }
  await new Promise((r) => setTimeout(r, 800));
}
await browser.close();

// ── match: image hash first, title similarity as fallback ──
const catalog = [];
const resolved = [];
const unmatched = [];

for (const p of productsRaw) {
  const h = hashOf(p.sourceUrl);
  const direct = h ? byHash.get(h) : null;
  let entry = direct ? { ...direct, via: "imageHash" } : null;
  if (!entry) {
    for (const cand of byHash.values()) {
      if (similarity(cand.title, p.name) >= 0.8) {
        entry = { ...cand, via: "title" };
        break;
      }
    }
  }
  if (entry) resolved.push({ id: p.id, via: entry.via, url: entry.url });
  else unmatched.push(p.id);
  catalog.push({
    id: p.id,
    name: p.name,
    hash: h,
    detailUrl: entry?.url ?? null,
    storeTitle: entry?.title ?? null,
    via: entry?.via ?? null,
  });
}

mkdirSync(".verify", { recursive: true });
writeFileSync(
  ".verify/alibaba-catalog.json",
  JSON.stringify({ pagesSeen, storefrontHashes: byHash.size, catalog, extras: noHash }, null, 2)
);

if (!DRY) {
  // minimal-diff rewrite: insert "detailUrl" right after "sourceUrl" on each record line
  const urlById = new Map(resolved.map((r) => [r.id, r.url]));
  const next = readFileSync(JSON_PATH, "utf8")
    .split("\n")
    .map((line) => {
      if (!line.includes('"sourceUrl"')) return line;
      const id = line.match(/"id":\s*"([^"]+)"/)?.[1];
      if (!id) return line;
      const url = urlById.get(id) ?? null;
      return line.replace(
        /("sourceUrl":\s*"[^"]*")/,
        `$1, "detailUrl": ${JSON.stringify(url)}`
      );
    })
    .join("\n");
  writeFileSync(JSON_PATH, next);
}

console.log(
  JSON.stringify(
    {
      pagesSeen,
      storefrontEntries: byHash.size + noHash.length,
      catalogSize: productsRaw.length,
      matchedByImageHash: resolved.filter((r) => r.via === "imageHash").length,
      matchedByTitle: resolved.filter((r) => r.via === "title").length,
      unmatched: unmatched.length,
      unmatchedIds: unmatched,
      mode: DRY ? "dry-run" : "written",
    },
    null,
    1
  )
);
