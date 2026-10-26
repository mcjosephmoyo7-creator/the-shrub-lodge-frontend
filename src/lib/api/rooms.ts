import { rooms as fallbackRooms, type Room } from "@/lib/content/rooms";

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

// Render's free tier sleeps after a period of inactivity and can take
// 30-60 seconds to wake up. Wait long enough for the cold start, otherwise
// builds and revalidations silently fall back to the bundled room list.
const REQUEST_TIMEOUT_MS = 60_000;
const MAX_ATTEMPTS = 2;

type ApiRoom = {
  name: string;
  price_per_night?: number;
  price?: number;
  description: string;
  image_url?: string;
  image?: string;
};

async function fetchRooms(url: string): Promise<ApiRoom[]> {
  const res = await fetch(url, {
    // Cache for 5 minutes; Render's free tier sleeps, so don't hang the page
    // if the API is cold - fall back to the bundled room list instead.
    next: { revalidate: 300 },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Rooms API responded ${res.status}`);
  }

  const data = (await res.json()) as { rooms?: ApiRoom[] };

  if (!Array.isArray(data?.rooms) || data.rooms.length === 0) {
    throw new Error("Rooms API returned no rooms");
  }

  return data.rooms;
}

export async function getRooms(): Promise<Room[]> {
  if (!API_BASE) {
    console.warn(
      "[rooms] NEXT_PUBLIC_API_URL is not set - serving bundled rooms.",
    );
    return fallbackRooms;
  }

  const url = `${API_BASE}/api/rooms`;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const apiRooms = await fetchRooms(url);

      console.info(`[rooms] Loaded ${apiRooms.length} rooms from ${url}`);

      return apiRooms.map((room) => ({
        name: room.name,
        price: room.price_per_night ?? room.price ?? 0,
        description: room.description,
        image: room.image_url ?? room.image ?? "",
      }));
    } catch (error) {
      console.error(
        `[rooms] Attempt ${attempt}/${MAX_ATTEMPTS} failed for ${url}`,
        error,
      );
    }
  }

  console.warn("[rooms] API unavailable - serving bundled rooms.");
  return fallbackRooms;
}
