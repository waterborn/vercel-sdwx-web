import rawManifest from "../../scripts/image-manifest.json";

/* ── Optimized image resolver ──
   scripts/optimize-images.mjs re-encodes everything under public/ to WebP and
   records the ladder plus intrinsic sizes here. Components always reference the
   ORIGINAL path, so renaming the ladder never touches JSX. */

export type Asset = {
  src: string;
  width: number;
  height: number;
  srcSet?: string;
};

const manifest = rawManifest as unknown as Record<
  string,
  Asset & { bytesBefore: number; bytesAfter: number }
>;

/** Resolve an original `/products/x.jpg` path to its optimized variant. */
export function asset(path: string, fallbackSize = 640): Asset {
  const entry = manifest[path];
  if (!entry) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[images] missing manifest entry for ${path}`);
    }
    return { src: path, width: fallbackSize, height: fallbackSize };
  }
  return { src: entry.src, width: entry.width, height: entry.height, srcSet: entry.srcSet };
}

/** CSS background url() for an original path. */
export function bgImage(path: string): string {
  return `url('${asset(path).src}')`;
}

/** Total weight saved by the ladder — surfaced in docs, not shipped. */
export const imageStats = {
  files: Object.keys(manifest).length,
  bytesBefore: Object.values(manifest).reduce((s, m) => s + m.bytesBefore, 0),
  bytesAfter: Object.values(manifest).reduce((s, m) => s + m.bytesAfter, 0),
};
