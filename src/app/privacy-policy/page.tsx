import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { privacyPolicy } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description:
    "How The Shrub Lodge collects, uses, discloses and safeguards your personal information.",
};

export default function PrivacyPolicyPage() {
  return <LegalPage doc={privacyPolicy} />;
}
