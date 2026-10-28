import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { CardHoverReveal } from "@/components/ui/card-hover-reveal";
import { wix } from "@/lib/images";
import type { Activity } from "@/lib/content/activities";

export function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <CardHoverReveal className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sand-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_-50px_rgba(30,47,36,0.9)]">
        <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={wix(activity.image, 4 / 3)}
          alt={activity.name}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <span className="absolute right-4 top-4 rounded-full bg-forest-950/85 px-3 py-1 text-sm font-semibold text-sand-50 backdrop-blur">
          ${activity.price}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="font-display text-2xl leading-snug text-forest-900 transition-colors duration-300 group-hover:text-gold-700">
          {activity.name}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-forest-800/70">
          {activity.description}
        </p>
        <ButtonLink
          href={activity.bookingUrl}
          target="_blank"
          rel="noreferrer noopener"
          variant="outline"
          className="self-start px-5 py-2.5"
        >
          Book Now
        </ButtonLink>
        </div>
      </article>
    </CardHoverReveal>
  );
}
