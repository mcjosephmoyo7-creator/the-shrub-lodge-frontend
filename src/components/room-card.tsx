import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { wix } from "@/lib/images";
import { siteConfig } from "@/lib/site";
import type { Room } from "@/lib/content/rooms";

export function RoomCard({ room }: { room: Room }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-sand-200 bg-white shadow-sm transition-shadow hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={wix(room.image, 4 / 3)}
          alt={room.name}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl text-forest-900">{room.name}</h3>
          <span className="whitespace-nowrap rounded-full bg-sand-100 px-3 py-1 text-sm font-semibold text-forest-800">
            ${room.price}/Night
          </span>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-forest-800/70">
          {room.description}
        </p>
        <ButtonLink
          href={siteConfig.bookingHref}
          variant="outline"
          className="self-start px-5 py-2.5"
        >
          Book Now
        </ButtonLink>
      </div>
    </article>
  );
}
