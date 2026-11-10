// Visual verification script — captures screenshots at real viewports using local Edge.
// Usage: node scripts/verify.mjs   (requires puppeteer-core, installed with --no-save)
import { mkdir } from "node:fs/promises";
import puppeteer from "puppeteer-core";

const EDGE =
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const BASE = "http://localhost:3000";
const OUT = ".verify";
await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

try {
  const page = await browser.newPage();
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));

  // ── Home (desktop 1440x900) ──
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: `${OUT}/home-hero.png` });

  // Scroll through key sections for viewport shots
  const shotSection = async (text, file) => {
    await page.evaluate((t) => {
      const els = Array.from(document.querySelectorAll("h1, h2"));
      const target = els.find((el) => el.textContent?.includes(t));
      if (!target) return;
      // Absolute jump — smooth scrolling would fight the follow-up screenshot
      const y = target.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: y, behavior: "instant" });
    }, text);
    await new Promise((r) => setTimeout(r, 900));
    await page.screenshot({ path: `${OUT}/${file}` });
  };

  await shotSection("Explore by Category", "home-categories.png");
  await shotSection("Featured Products", "home-featured.png");
  await shotSection("Best Sellers", "home-bestsellers.png");
  await shotSection("Recovery & Wellness Gear", "home-banner.png");
  await shotSection("Built on Process", "home-process.png");
  await shotSection("Partner With Glintic", "home-partner.png");

  // Footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: `${OUT}/home-footer.png` });

  // Full page (desktop) — scroll through first so reveal animations trigger
  await page.evaluate(async () => {
    const step = 600;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: `${OUT}/home-full.png`, fullPage: true });

  // Side insets of every full-row grid (should be >= 30px on both sides)
  const insets = await page.evaluate(() => {
    const viewport = document.documentElement.clientWidth;
    return Array.from(document.querySelectorAll('[class*="px-8"]'))
      .filter(
        (el) =>
          typeof el.className === "string" &&
          el.className.includes("grid") &&
          el.children.length > 0
      )
      .map((el) => {
        // Measure the first/last tile, not the padded wrapper
        const first = el.children[0].getBoundingClientRect();
        const last = el.children[el.children.length - 1].getBoundingClientRect();
        return `${Math.round(first.left)}/${Math.round(viewport - last.right)}`;
      });
  });

  // Featured rail geometry: left inset, card width, cards per view
  const railInfo = await page.evaluate(() => {
    const rail = document.querySelector(".snap-x");
    if (!rail) return null;
    const cards = Array.from(rail.children).map((c) => c.getBoundingClientRect());
    const viewport = document.documentElement.clientWidth;
    return {
      padLeft: getComputedStyle(rail).paddingLeft,
      firstLeft: Math.round(cards[0].left),
      cardWidth: Math.round(cards[0].width),
      lastRightGap: Math.round(viewport - cards[cards.length - 1].right),
      visible: cards.filter((c) => c.left >= 0 && c.right <= viewport).length,
    };
  });

  // ── Products ──
  await page.goto(`${BASE}/products`, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: `${OUT}/products-top.png` });

  // Click filter
  const clicked = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("Recovery & Wellness Gear")
    );
    if (!btn) return false;
    btn.click();
    return true;
  });
  await new Promise((r) => setTimeout(r, 800));
  const itemCount = await page.evaluate(() => {
    const p = Array.from(document.querySelectorAll("p")).find((el) =>
      el.textContent?.includes("items")
    );
    return p?.textContent?.trim() ?? "not found";
  });
  const cardCount = await page.evaluate(
    () => document.querySelectorAll("main .grid article").length
  );
  await page.screenshot({ path: `${OUT}/products-filter.png` });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: `${OUT}/products-bottom.png` });

  // Deep link with ?cat= preselects the filter
  await page.goto(`${BASE}/products?cat=yoga-pilates-wear`, {
    waitUntil: "networkidle0",
    timeout: 60000,
  });
  await new Promise((r) => setTimeout(r, 600));
  const deepLink = await page.evaluate(() => ({
    label:
      Array.from(document.querySelectorAll("p"))
        .find((el) => el.textContent?.includes("items"))
        ?.textContent?.trim() ?? "not found",
    cards: document.querySelectorAll("main .grid article").length,
  }));

  // ── About ──
  await page.goto(`${BASE}/about`, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: `${OUT}/about-top.png` });

  await shotSection("Six Product Lines", "about-lines.png");
  await shotSection("Every Unit, Checked", "about-quality.png");

  await page.evaluate(() => {
    document.getElementById("oem")?.scrollIntoView({ block: "start" });
  });
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: `${OUT}/about-oem.png` });

  // ── Mobile 390x844 ──
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: `${OUT}/mobile-hero.png` });

  await page.click('button[aria-label="Toggle menu"]');
  await new Promise((r) => setTimeout(r, 700));
  await page.screenshot({ path: `${OUT}/mobile-nav.png` });

  // Close the drawer, then check the two full-bleed sections on mobile
  await page.click('button[aria-label="Toggle menu"]');
  await new Promise((r) => setTimeout(r, 600));
  await shotSection("Explore by Category", "mobile-categories.png");
  await shotSection("Featured Products", "mobile-featured.png");

  console.log(
    JSON.stringify(
      {
        filterClicked: clicked,
        itemCount,
        cardCount,
        deepLink,
        gridInsets: insets,
        featuredRail: railInfo,
        consoleErrors: errors,
      },
      null,
      2
    )
  );
} finally {
  await browser.close();
}
