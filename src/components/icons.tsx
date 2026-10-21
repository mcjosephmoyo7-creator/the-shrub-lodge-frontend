import {
  AirVent,
  Bath,
  Compass,
  ConciergeBell,
  MapPin,
  Sparkles,
  Trees,
  Tv,
  WashingMachine,
  Waves,
  Wifi,
  type LucideIcon,
} from "lucide-react";

export const amenityIcons: Record<string, LucideIcon> = {
  wifi: Wifi,
  tv: Tv,
  roomService: ConciergeBell,
  garden: Trees,
  pool: Waves,
  bath: Bath,
  air: AirVent,
  laundry: WashingMachine,
};

export const featureIcons: Record<string, LucideIcon> = {
  location: MapPin,
  sparkles: Sparkles,
  compass: Compass,
};
