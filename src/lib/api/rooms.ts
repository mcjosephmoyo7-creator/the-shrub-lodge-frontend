import { rooms as fallbackRooms, type Room } from "@/lib/content/rooms";

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

type ApiRoom = {
  name: string;
  price_per_night?: number;
  price?: number;
  description: string;
  image_url?: string;
  image?: string;
};

export async function getRooms(): Promise<Room[]> {
  if (!API_BASE) {
    return fallbackRooms;
  }

  try {
    const res = await fetch(`${API_BASE}/api/rooms`, {
      // Cache for 5 minutes; Render's free tier sleeps, so don't hang the page
      // if the API is cold — fall back to the bundled room list instead.
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch rooms: ${res.status}`);
    }

    const data = await res.json();

    if (Array.isArray(data?.rooms)) {
      return (data.rooms as ApiRoom[]).map((room) => ({
        name: room.name,
        price: room.price_per_night ?? room.price ?? 0,
        description: room.description,
        image: room.image_url ?? room.image ?? "",
      }));
    }
  } catch (error) {
    console.error("Failed to fetch rooms from API, using fallback", error);
  }

  return fallbackRooms;
}
