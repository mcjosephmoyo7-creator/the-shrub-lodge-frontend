import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { termsAndConditions } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: termsAndConditions.title,
  description:
    "The terms and conditions governing the use of The Shrub Lodge website, bookings and services.",
};

export default function TermsAndConditionsPage() {
  return <LegalPage doc={termsAndConditions} />;
}
