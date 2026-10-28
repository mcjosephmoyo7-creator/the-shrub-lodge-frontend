import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { cookiePolicy } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: cookiePolicy.title,
  description:
    "Learn how The Shrub Lodge uses necessary, analytics, and marketing cookies and how to manage your preferences.",
};

export default function CookiePolicyPage() {
  return <LegalPage doc={cookiePolicy} />;
}
