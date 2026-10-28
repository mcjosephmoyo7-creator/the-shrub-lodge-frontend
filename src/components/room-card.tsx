import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { wix } from "@/lib/images";
import { siteConfig } from "@/lib/site";
import type { Room } from "@/lib/content/rooms";

export function RoomCard({ room }: { room: Room }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sand-200 bg-white shadow-sm transition-all duration-500 hover:shadow-[0_40px_80px_-50px_rgba(30,47,36,0.9)] hover:-translate-y-2">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={wix(room.image, 4 / 3)}
          alt={room.name}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl text-forest-900 transition-colors duration-300 group-hover:text-gold-700">{room.name}</h3>
          <span className="whitespace-nowrap rounded-full bg-sand-100 px-3 py-1 text-sm font-semibold text-forest-800 transition-colors duration-300 group-hover:bg-gold-100 group-hover:text-gold-800">
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
