/**
 * Re-encodes every public image to WebP at display-relevant widths, moves the
 * originals out of the deployable tree into scripts/raw-images/ (gitignored),
 * and writes scripts/image-manifest.json so components can resolve an optimized
 * src plus intrinsic width/height from the original path.
 *
 * Idempotent: sources already parked in scripts/raw-images/ are re-read from
 * there, so the ladder can be retuned and the script re-run.
 *
 *   node scripts/optimize-images.mjs
 */
import {
  existsSync,
  mkdirSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import sharp from "sharp";

const RAW_DIR = path.join("scripts", "raw-images");
const MANIFEST_PATH = path.join("scripts", "image-manifest.json");

/** width ladder per folder; quality tuned for flat-color product shots. */
const TARGETS = [
  { dir: "public/products", widths: [320, 640], quality: 72 },
  { dir: "public/images", widths: [640, 960, 1280], quality: 74 },
];

/**
 * Per-file exceptions. banner.jpg is a 1920x2232 high-detail photograph that is
 * always covered by a 45% dark scrim and centred copy, so it tolerates a lower
 * quality and a shorter ladder than the rest of the scenery: 1120w is the widest
 * variant the layout ever needs at a 1440px viewport.
 */
const OVERRIDES = {
  "banner.jpg": { quality: 60, widths: [480, 768, 1120] },
};

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2);

/** Reads from public/ when present, else from the raw archive. */
function collectSources(dir, rawSub) {
  const liveDir = dir;
  const archiveDir = path.join(RAW_DIR, rawSub);
  const names = new Set();
  for (const d of [liveDir, archiveDir]) {
    if (!existsSync(d)) continue;
    for (const f of readdirSync(d)) {
      if (/\.(png|jpe?g)$/i.test(f)) names.add(f);
    }
  }
  return [...names]
    .sort()
    .map((file) => ({
      file,
      abs: existsSync(path.join(liveDir, file))
        ? path.join(liveDir, file)
        : path.join(archiveDir, file),
      live: existsSync(path.join(liveDir, file)),
    }));
}

async function processSource({ file, abs, live }, dir, rawSub, widths, quality) {
  const relUrl = `/${rawSub}/${file}`;
  const meta = await sharp(abs).metadata();
  const srcW = meta.width;
  const srcH = meta.height;
  const bytesBefore = statSync(abs).size;
  const base = relUrl.replace(/\.[a-z]+$/i, "");
  const fileQuality = OVERRIDES[file]?.quality ?? quality;
  const fileWidths = OVERRIDES[file]?.widths ?? widths;

  // shrink to the ladder, or re-encode at native width when the source is smaller
  let ladder = [...new Set(fileWidths)].filter((w) => w < srcW);
  if (ladder.length === 0) ladder = [srcW];

  const variants = [];
  for (const width of ladder) {
    const height = Math.round((srcH * width) / srcW);
    const suffix = ladder.length > 1 ? `-${width}w` : "";
    const outUrl = `${base}${suffix}.webp`;
    const outAbs = path.join(dir, `${file.replace(/\.[a-z]+$/i, "")}${suffix}.webp`);
    await sharp(abs)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: fileQuality, effort: 5 })
      .toFile(outAbs);
    variants.push({ url: outUrl, width, height, bytes: statSync(outAbs).size });
  }

  const largest = variants[variants.length - 1];

  if (live) {
    mkdirSync(path.join(RAW_DIR, rawSub), { recursive: true });
    renameSync(abs, path.join(RAW_DIR, rawSub, file));
  }

  return {
    src: largest.url,
    width: largest.width,
    height: largest.height,
    srcSet:
      variants.length > 1
        ? variants.map((v) => `${v.url} ${v.width}w`).join(", ")
        : undefined,
    bytesBefore,
    bytesAfter: variants.reduce((s, v) => s + v.bytes, 0),
  };
}

async function main() {
  mkdirSync(RAW_DIR, { recursive: true });
  const manifest = {};
  let before = 0;
  let after = 0;
  let count = 0;

  for (const target of TARGETS) {
    if (!existsSync(target.dir)) continue;
    const rawSub = path.basename(target.dir);
    for (const source of collectSources(target.dir, rawSub)) {
      const entry = await processSource(
        source,
        target.dir,
        rawSub,
        target.widths,
        target.quality
      );
      manifest[`/${rawSub}/${source.file}`] = entry;
      before += entry.bytesBefore;
      after += entry.bytesAfter;
      count += 1;
      console.log(
        `  /${rawSub}/${source.file}  ${mb(entry.bytesBefore)}MB -> ${mb(entry.bytesAfter)}MB`
      );
    }
  }

  /* ── social card: 1200x630 crop of the brand cover ── */
  const heroRaw = path.join(RAW_DIR, "images", "hero.png");
  if (existsSync(heroRaw)) {
    await sharp(heroRaw)
      .resize({ width: 1200, height: 630, fit: "cover", position: "top" })
      .jpeg({ quality: 82, progressive: true })
      .toFile(path.join("public", "images", "og.jpg"));
    console.log("  wrote /images/og.jpg");
  }

  /* ── apple-touch-icon: wordmark tile, falls back to a hero crop ──
     textLength pins the wordmark inside the 180px tile whatever font the
     rasteriser resolves, so the caps can never clip at the edges. */
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
    <rect width="180" height="180" fill="#011F31"/>
    <text x="90" y="100" font-family="Georgia, 'Times New Roman', serif" font-size="30"
      fill="#ffffff" text-anchor="middle" letter-spacing="1"
      textLength="152" lengthAdjust="spacingAndGlyphs">GLINTIC</text>
  </svg>`;
  try {
    await sharp(Buffer.from(svg))
      .png()
      .toFile(path.join("public", "apple-touch-icon.png"));
    console.log("  wrote /apple-touch-icon.png");
  } catch (err) {
    console.warn(`  apple icon SVG failed (${err.message}); using hero crop`);
    if (existsSync(heroRaw)) {
      await sharp(heroRaw)
        .resize({ width: 180, height: 180, fit: "cover" })
        .png()
        .toFile(path.join("public", "apple-touch-icon.png"));
    }
  }

  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  /* ── prune WebP files the manifest no longer references ── */
  const kept = new Set();
  for (const entry of Object.values(manifest)) {
    kept.add(entry.src);
    for (const part of (entry.srcSet ?? "").split(",")) {
      const url = part.trim().split(" ")[0];
      if (url) kept.add(url);
    }
  }
  for (const target of TARGETS) {
    const rawSub = path.basename(target.dir);
    for (const file of readdirSync(target.dir)) {
      if (!/\.webp$/i.test(file)) continue;
      const url = `/${rawSub}/${file}`;
      if (!kept.has(url)) {
        rmSync(path.join(target.dir, file));
        console.log(`  pruned unused ${url}`);
      }
    }
  }

  console.log(
    `\noptimized ${count} images: ${mb(before)}MB -> ${mb(after)}MB ` +
      `(${((1 - after / before) * 100).toFixed(1)}% lighter)`
  );
  console.log(`manifest: ${MANIFEST_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
