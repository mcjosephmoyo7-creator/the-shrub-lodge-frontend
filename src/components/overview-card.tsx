import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { wix } from "@/lib/images";
import type { OverviewCard as OverviewCardData } from "@/lib/content/activities";

export function OverviewCard({ card }: { card: OverviewCardData }) {
  return (
    <Link
      href={card.href}
      className="group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-3xl p-7 text-sand-50 shadow-sm"
    >
      <Image
        src={wix(card.image, 4 / 3)}
        alt=""
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/55 to-forest-950/10" />
      <div className="relative z-10 flex flex-col gap-3">
        <h3 className="font-display text-2xl leading-snug">{card.title}</h3>
        <p className="text-sm leading-relaxed text-sand-100/80">{card.blurb}</p>
        <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-gold-300">
          See More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
