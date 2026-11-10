// One-off downloader: localizes lifestyle imagery so the site has no third-party image dependency.
// Usage: node scripts/download-stock.mjs
import { mkdir, writeFile } from "node:fs/promises";

const IMAGES = {
  "hero.jpg":
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920&q=80",
  "contact-cta.jpg":
    "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=1920&q=80",
  "banner.jpg":
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920&q=80",
  "about-studio.jpg":
    "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=1000&q=80",
  "oem-logos.jpg":
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
  "oem-packaging.jpg":
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
  "oem-private-label.jpg":
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
  "oem-moq.jpg":
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
  "process-sample.jpg":
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  "process-quality.jpg":
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
  "process-materials.jpg":
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
};

const OUT = "public/images";
await mkdir(OUT, { recursive: true });

let ok = 0;
for (const [file, url] of Object.entries(IMAGES)) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
  });
  if (!res.ok) {
    console.error(`FAILED ${file} → HTTP ${res.status}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(`${OUT}/${file}`, buf);
  console.log(`ok ${file} (${(buf.length / 1024).toFixed(0)} KB)`);
  ok += 1;
}

console.log(`\n${ok}/${Object.keys(IMAGES).length} downloaded`);
