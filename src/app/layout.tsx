import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AssistantWidget } from "@/components/assistant/chat-widget";
import { SiteChrome } from "@/components/site-chrome";
import { siteConfig } from "@/lib/site";
import { CookieConsent } from "@/components/cookie-consent";
import { CursorGlow } from "@/components/ui/cursor-glow";
import {
  getContentItems,
  getContentSection,
  getContentText,
  getPublicSiteData,
  getSocialLinks,
} from "@/lib/api/public-content";

export const dynamic = "force-dynamic";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getPublicSiteData();
  const siteName = site.settings.site_title;
  const title = site.settings.seo_title || `${siteName} | ${siteConfig.tagline}`;
  const description =
    site.settings.seo_description || siteConfig.description;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: [
      "The Shrub Lodge",
      "Victoria Falls accommodation",
      "Zimbabwe lodge",
      "Victoria Falls activities",
      "Zambezi cruises",
      "Hwange safari",
    ],
    openGraph: {
      type: "website",
      title,
      description,
      url: siteConfig.url,
      siteName,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const site = await getPublicSiteData();
  const contact = getContentSection(site, "contact");
  const footer = getContentSection(site, "footer");
  const socialLinks = getSocialLinks(site);

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen flex-col bg-sand-50 font-sans text-forest-900 antialiased">
        <CursorGlow />
        <SiteChrome
          header={
            <SiteHeader
              siteName={site.settings.site_title}
              logoUrl={site.settings.logo_url}
              socialLinks={socialLinks}
            />
          }
          footer={
            <SiteFooter
              siteName={site.settings.site_title}
              logoUrl={site.settings.logo_url}
              footerText={getContentText(
                footer,
                "text",
                siteConfig.description,
              )}
              socialLinks={socialLinks}
              contact={{
                address: getContentText(contact, "address", siteConfig.address.full),
                reservationsPhone: getContentText(
                  contact,
                  "reservationsPhone",
                  siteConfig.phoneDisplay.reservations,
                ),
                receptionPhone: getContentText(
                  contact,
                  "receptionPhone",
                  siteConfig.phoneDisplay.reception,
                ),
                reservationsEmail: getContentText(
                  contact,
                  "reservationsEmail",
                  siteConfig.email.reservations,
                ),
                toursEmail: getContentText(
                  contact,
                  "toursEmail",
                  siteConfig.email.tours,
                ),
                frontDeskHours: getContentText(
                  contact,
                  "frontDeskHours",
                  siteConfig.hours.frontDesk,
                ),
                checkIn: getContentText(contact, "checkIn", siteConfig.hours.checkIn),
                checkOut: getContentText(contact, "checkOut", siteConfig.hours.checkOut),
              }}
            />
          }
          assistant={<AssistantWidget />}
          cookieConsent={<CookieConsent />}
        >
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
