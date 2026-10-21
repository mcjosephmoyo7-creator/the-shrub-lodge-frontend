export type Amenity = {
  label: string;
  icon:
    | "wifi"
    | "tv"
    | "roomService"
    | "garden"
    | "pool"
    | "bath"
    | "air"
    | "laundry";
};

export const amenities: Amenity[] = [
  { label: "Wifi", icon: "wifi" },
  { label: "DSTA / Satallite TV", icon: "tv" },
  { label: "Room Service", icon: "roomService" },
  { label: "Garden View", icon: "garden" },
  { label: "Outdoor Pool", icon: "pool" },
  { label: "Shower & Bath", icon: "bath" },
  { label: "Air Conditioning", icon: "air" },
  { label: "Laundry Service", icon: "laundry" },
];

export const amenitiesIntro =
  "Enjoy modern amenities that bring comfort and ease to your stay, so you can settle in, relax, and feel right at home.";
