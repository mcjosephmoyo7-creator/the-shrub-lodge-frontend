"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function Testimonial({
  quote,
  author,
}: {
  quote: string;
  author: string;
}) {
  return (
    <figure className="flex flex-col items-center gap-6 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
        <Quote className="h-6 w-6" />
      </span>
      <div className="flex items-center gap-1 text-gold-400" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <blockquote className="max-w-3xl font-display text-2xl leading-relaxed text-sand-50 sm:text-3xl">
        {quote}
      </blockquote>
      <figcaption className="text-sm font-semibold uppercase tracking-[0.24em] text-gold-300">
        {author}
      </figcaption>
    </figure>
  );
}

export function TestimonialSection({
  items,
}: {
  items: { quote: string; author: string }[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, [items.length]);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % items.length);
  };

  const activeItem = items[activeIndex];

  if (!activeItem) return null;

  return (
    <section className="bg-forest-950 py-20 sm:py-24">
      <Container className="flex flex-col items-center gap-10">
        <SectionHeading
          eyebrow="Guest reviews"
          title="Kind words from our guests"
          tone="light"
        />
        <div
          aria-label="Guest testimonials"
          aria-roledescription="carousel"
          className="w-full"
        >
          <div aria-live="polite" aria-atomic="true" className="min-h-72">
            <Testimonial
              key={activeItem.author}
              quote={activeItem.quote}
              author={activeItem.author}
            />
          </div>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous review"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-100/30 text-sand-50 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex items-center gap-2" aria-label={`Review ${activeIndex + 1} of ${items.length}`}>
              {items.map((item, index) => (
                <button
                  key={item.author}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show review ${index + 1} by ${item.author}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={`h-2.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 ${
                    index === activeIndex
                      ? "w-7 bg-gold-300"
                      : "w-2.5 bg-sand-100/40 hover:bg-sand-100/70"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={showNext}
              aria-label="Next review"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-100/30 text-sand-50 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <p className="sr-only">Reviews change automatically every seven seconds.</p>
        </div>
      </Container>
    </section>
  );
}
