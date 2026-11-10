// Download Alibaba product images into public/products/ (one-time asset sync).
// Usage: npm run download-images
import { createWriteStream } from "node:fs";
import { mkdir, readFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const products = JSON.parse(
  await readFile(join(root, "scripts", "products.json"), "utf8")
);

const exists = (p) => access(p).then(() => true, () => false);

await mkdir(join(root, "public", "products"), { recursive: true });

let ok = 0;
let skipped = 0;
let failed = 0;

for (const product of products) {
  const dest = join(root, "public", product.file.replace(/^\//, ""));

  if (await exists(dest)) {
    skipped++;
    continue;
  }

  try {
    const res = await fetch(product.sourceUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
        Referer: "https://shandongwuxian.en.alibaba.com/",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const file = createWriteStream(dest);
    const buffer = Buffer.from(await res.arrayBuffer());
    file.write(buffer);
    file.end();
    ok++;
    console.log(`ok   ${product.file}`);
  } catch (err) {
    failed++;
    console.error(`FAIL ${product.file} — ${err.message}`);
  }
}

console.log(`\nDownloaded: ${ok} | Skipped: ${skipped} | Failed: ${failed}`);
if (failed > 0) process.exitCode = 1;
