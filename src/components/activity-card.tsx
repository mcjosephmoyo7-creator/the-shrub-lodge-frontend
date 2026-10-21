import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { wix } from "@/lib/images";
import type { Activity } from "@/lib/content/activities";

export function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-sand-200 bg-white shadow-sm transition-shadow hover:shadow-xl">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={wix(activity.image, 16 / 10)}
          alt={activity.name}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute right-4 top-4 rounded-full bg-forest-950/85 px-3 py-1 text-sm font-semibold text-sand-50 backdrop-blur">
          ${activity.price}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-xl leading-snug text-forest-900">
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
  );
}
