/**
 * Custom next/image loader for the Wix media CDN.
 *
 * Given a Wix media base URL, this builds an on-the-fly resize URL so Wix does
 * the cropping/compression and returns an optimised WebP. An optional `?ar=`
 * query on the src controls the aspect ratio (width / height) of the rendition.
 */
const WIX_MEDIA = "static.wixstatic.com/media/";
const DEFAULT_RATIO = 0.75; // 4:3

export default function wixImageLoader({ src, width, quality }) {
  if (!src || !src.includes(WIX_MEDIA)) {
    // Local/static assets are not resized; echo the requested width so Next.js
    // does not warn about a non-width-aware loader.
    return src.includes("?") ? `${src}&w=${width}` : `${src}?w=${width}`;
  }

  const [base, query] = src.split("?");
  const ratio = Number(new URLSearchParams(query || "").get("ar")) || DEFAULT_RATIO;
  const cleanBase = base.split("/v1/")[0];
  const height = Math.max(1, Math.round(width / ratio));
  const q = quality || 82;

  return `${cleanBase}/v1/fill/w_${width},h_${height},al_c,q_${q},usm_0.66_1.00_0.01,enc_webp,quality_auto/photo.webp`;
}
