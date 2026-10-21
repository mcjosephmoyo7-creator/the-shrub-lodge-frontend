import { IMAGES } from "@/lib/images";

export type Room = {
  name: string;
  price: number;
  description: string;
  image: string;
};

export const rooms: Room[] = [
  {
    name: "Single Room",
    price: 150,
    description:
      "Our Single Room offers a cosy and comfortable retreat, ideal for solo travellers. Equipped with a plush bed, an ensuite bathroom, air conditioning, and modern amenities, the room ensures a restful stay.",
    image: IMAGES.roomSingle,
  },
  {
    name: "Double Room",
    price: 200,
    description:
      "Experience the epitome of luxury at our lodge's double rooms. Immaculately clean and modernly styled, each room features a comfortable double bed for up to two guests. Book now for an unforgettable stay.",
    image: IMAGES.roomDouble,
  },
  {
    name: "Twin Room",
    price: 200,
    description:
      "The twin rooms offer two comfortable beds, accommodating a maximum of two individuals. Ideal for pairs seeking a harmonious stay, it boasts modern amenities and a meticulously maintained environment.",
    image: IMAGES.roomTwin,
  },
];
