"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { wix } from "@/lib/images";

const photoLayouts = [
  { gridColumn: "1", gridRow: "1" },
  { gridColumn: "2", gridRow: "1" },
  { gridColumn: "3 / 5", gridRow: "1" },
  { gridColumn: "5", gridRow: "1" },
  { gridColumn: "1 / 3", gridRow: "2" },
  { gridColumn: "3", gridRow: "2" },
  { gridColumn: "4", gridRow: "2" },
  { gridColumn: "5", gridRow: "2" },
];

export function PhotoGallery({ photos }: { photos: string[] }) {
  const [activePage, setActivePage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(photos.length / 8));

  useEffect(() => {
    if (pageCount < 2) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const interval = window.setInterval(() => {
      setActivePage((current) => (current + 1) % pageCount);
    }, 12000);

    return () => window.clearInterval(interval);
  }, [pageCount]);

  return (
    <div
      className="photo-gallery"
      role="region"
      aria-label="The Shrub Lodge photo gallery"
      aria-roledescription="carousel"
    >
      <div className="photo-gallery-viewport">
        <div
          className="photo-gallery-track"
          style={{ transform: `translateX(-${activePage * 100}%)` }}
        >
          {Array.from({ length: pageCount }, (_, pageIndex) => {
            const pagePhotos = photos.slice(pageIndex * 8, pageIndex * 8 + 8);

            return (
              <div
                key={pageIndex}
                className="photo-gallery-page"
                aria-label={`Photo collection ${pageIndex + 1} of ${pageCount}`}
                aria-hidden={activePage !== pageIndex}
              >
                {pagePhotos.map((photo, index) => (
                  <div
                    key={`${photo}-${index}`}
                    className="photo-gallery-tile"
                    style={photoLayouts[index]}
                  >
                    <Image
                      src={wix(photo, 4 / 3)}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        {pageCount > 1 ? (
          <div className="photo-gallery-controls">
            <button
              type="button"
              aria-label="Previous photo collection"
              onClick={() =>
                setActivePage((current) => (current - 1 + pageCount) % pageCount)
              }
              className="photo-gallery-arrow"
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next photo collection"
              onClick={() => setActivePage((current) => (current + 1) % pageCount)}
              className="photo-gallery-arrow"
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>
      <p className="sr-only" aria-live="polite">
        Photo collection {activePage + 1} of {pageCount}
      </p>
    </div>
  );
}
