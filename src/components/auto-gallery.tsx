"use client";

import { wixFit } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Continuously scrolling photo wall. Images keep their natural aspect ratio and
 * are never cropped, so each photo shows in full while drifting slowly across
 * two staggered rows (one each direction) to read like a living grid.
 */
export function AutoGallery({
  photos,
  speed = 120,
}: {
  photos: string[];
  speed?: number;
}) {
  const midpoint = Math.ceil(photos.length / 2);
  const rows = [
    photos,
    [...photos.slice(midpoint), ...photos.slice(0, midpoint)],
  ];

  return (
    <div
      className="auto-gallery"
      role="region"
      aria-label="The Shrub Lodge photo gallery"
    >
      {rows.map((row, rowIndex) => (
        <div className="auto-gallery-row" key={rowIndex}>
          <ul
            className={cn(
              "auto-gallery-track",
              rowIndex === 1 && "auto-gallery-track--reverse",
            )}
            style={{ animationDuration: `${speed + rowIndex * 18}s` }}
          >
            {[...row, ...row].map((photo, index) => (
              <li
                className="auto-gallery-card"
                key={`${photo}-${index}`}
                aria-hidden={index >= row.length}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={wixFit(photo, 480)} alt="" loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
