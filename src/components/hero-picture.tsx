import { wixFill, wixSrcSet } from "@/lib/images";

type Rendition = {
  media?: string;
  ratio: number;
  widths: number[];
};

// Wide, cinematic crop for desktop.
const DESKTOP: Rendition = { ratio: 16 / 9, widths: [960, 1440, 1920] };

// Art direction: tall heroes get portrait crops on phones/tablets so the photo
// fills the frame instead of being zoomed into a narrow strip; short "page"
// heroes get wider crops that suit their shallower shape.
const RENDITIONS: Record<"full" | "page", Rendition[]> = {
  full: [
    { media: "(max-width: 639px)", ratio: 9 / 16, widths: [420, 540, 720] },
    { media: "(max-width: 1023px)", ratio: 4 / 5, widths: [640, 900, 1200] },
    DESKTOP,
  ],
  page: [
    { media: "(max-width: 639px)", ratio: 1, widths: [480, 640, 800] },
    { media: "(max-width: 1023px)", ratio: 3 / 2, widths: [768, 1024, 1280] },
    DESKTOP,
  ],
};

/**
 * Responsive hero image. Renders a native `<picture>` with breakpoint-specific
 * Wix renditions so the artwork always matches the shape of the hero on the
 * current device — no over-zooming or awkward cropping on small screens.
 */
export function HeroPicture({
  image,
  variant = "full",
  priority = false,
  alt = "",
  className = "block h-full w-full object-cover",
}: {
  image: string;
  variant?: "full" | "page";
  priority?: boolean;
  alt?: string;
  className?: string;
}) {
  const renditions = RENDITIONS[variant];
  const fallback = renditions[renditions.length - 1];
  const fallbackWidth = fallback.widths[fallback.widths.length - 1];

  return (
    <picture>
      {renditions.slice(0, -1).map((rendition) => (
        <source
          key={rendition.media}
          media={rendition.media}
          srcSet={wixSrcSet(image, rendition.ratio, rendition.widths)}
          sizes="100vw"
        />
      ))}
      <img
        src={wixFill(image, fallbackWidth, fallback.ratio)}
        srcSet={wixSrcSet(image, fallback.ratio, fallback.widths)}
        sizes="100vw"
        alt={alt}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}
