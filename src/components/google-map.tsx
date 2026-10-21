import { MapPin, Navigation } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

interface GoogleMapProps {
  className?: string;
  height?: string | number;
  showOverlayCard?: boolean;
}

export function GoogleMap({
  className,
  height = "450px",
  showOverlayCard = true,
}: GoogleMapProps) {
  // Coordinates from the original theshrublodge.com website: -17.9268248, 25.8271366
  const lat = siteConfig.address.coordinates.lat;
  const lng = siteConfig.address.coordinates.lng;
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&hl=en&z=15&output=embed`;
  const directLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-sand-200/80 bg-sand-100 shadow-md",
        className,
      )}
    >
      <iframe
        title="The Shrub Lodge Victoria Falls location map"
        src={mapSrc}
        width="100%"
        height={typeof height === "number" ? `${height}px` : height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full grayscale-[15%] transition-all duration-300 hover:grayscale-0"
      />

      {showOverlayCard && (
        <div className="pointer-events-none absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm">
          <div className="pointer-events-auto rounded-2xl border border-forest-900/10 bg-white/95 p-4 shadow-xl backdrop-blur-md">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest-900 text-gold-400">
                <MapPin className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <div className="flex flex-col">
                <span className="font-display text-sm font-semibold text-forest-950">
                  {siteConfig.name}
                </span>
                <span className="mt-0.5 text-xs text-forest-800/80">
                  {siteConfig.address.full}
                </span>
                <a
                  href={directLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-600 transition-colors hover:text-gold-700 hover:underline"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  Get Directions in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

