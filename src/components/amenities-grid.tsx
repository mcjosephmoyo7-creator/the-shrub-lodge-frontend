import { amenityIcons } from "@/components/icons";
import type { Amenity } from "@/lib/content/amenities";

export function AmenitiesGrid({ items }: { items: Amenity[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {items.map((amenity) => {
        const Icon = amenityIcons[amenity.icon];
        return (
          <li
            key={amenity.label}
            className="flex flex-col items-center gap-3 rounded-2xl border border-sand-200 bg-white/70 p-6 text-center"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sand-100 text-forest-800">
              <Icon className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <span className="text-sm font-medium text-forest-900">
              {amenity.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
