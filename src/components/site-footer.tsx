import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/logo";
import { SocialLinks } from "@/components/social-links";
import { GoogleMap } from "@/components/google-map";
import { navigation, siteConfig, footerLinks } from "@/lib/site";
import { CookieSettingsButton } from "@/components/cookie-settings-button";

type SiteFooterProps = {
  siteName?: string;
  logoUrl?: string;
  footerText?: string;
  socialLinks?: readonly { title: string; href: string }[];
  contact?: {
    address?: string;
    reservationsPhone?: string;
    receptionPhone?: string;
    reservationsEmail?: string;
    toursEmail?: string;
    frontDeskHours?: string;
    checkIn?: string;
    checkOut?: string;
  };
};

export function SiteFooter({
  siteName = siteConfig.name,
  logoUrl = "",
  footerText = siteConfig.description,
  socialLinks = siteConfig.socialLinks,
  contact = {},
}: SiteFooterProps) {
  const year = new Date().getFullYear();
  const address = contact.address || siteConfig.address.full;
  const reservationsPhone =
    contact.reservationsPhone || siteConfig.phoneDisplay.reservations;
  const receptionPhone = contact.receptionPhone || siteConfig.phoneDisplay.reception;
  const reservationsEmail =
    contact.reservationsEmail || siteConfig.email.reservations;
  const toursEmail = contact.toursEmail || siteConfig.email.tours;
  const phoneHref = (phone: string) => phone.replace(/[^\d+]/g, "");

  return (
    <footer className="bg-forest-950 text-sand-100">
      <div className="border-b border-forest-900/80 pb-12 pt-8">
        <Container>
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              Our Location in Victoria Falls
            </span>
            <span className="text-xs text-sand-100/70">
              {address}
            </span>
          </div>
          <GoogleMap height={380} />
        </Container>
      </div>

      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-5">
          <Logo siteName={siteName} logoUrl={logoUrl} />
          <p className="max-w-xs text-sm leading-relaxed text-sand-100/70">
            {footerText}
          </p>
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-lg text-sand-50">Follow us</h3>
            <SocialLinks tone="onDark" size={20} items={socialLinks} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-display text-lg text-sand-50">Explore</h3>
          <ul className="flex flex-col gap-2 text-sm text-sand-100/75">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-gold-300"
                >
                  {item.title}
                </Link>
              </li>
            ))}
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-gold-300"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-display text-lg text-sand-50">Contact</h3>
          <ul className="flex flex-col gap-3 text-sm text-sand-100/75">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span>{address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span className="flex flex-col">
                <a href={`tel:${phoneHref(reservationsPhone)}`}>
                  For reservations: {reservationsPhone}
                </a>
                <a href={`tel:${phoneHref(receptionPhone)}`}>
                  For reception: {receptionPhone}
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span className="flex flex-col">
                <a href={`mailto:${reservationsEmail}`}>
                  {reservationsEmail}
                </a>
                <a href={`mailto:${toursEmail}`}>
                  {toursEmail}
                </a>
              </span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-display text-lg text-sand-50">Opening Hours</h3>
          <ul className="flex flex-col gap-3 text-sm text-sand-100/75">
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span>
                Front Desk: {contact.frontDeskHours || siteConfig.hours.frontDesk}
              </span>
            </li>
            <li>Check-in: {contact.checkIn || siteConfig.hours.checkIn}</li>
            <li>Check-out: {contact.checkOut || siteConfig.hours.checkOut}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-forest-800">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-sand-100/60 sm:flex-row">
          <p>
            &copy; {year} by {siteName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-end">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-gold-300"
              >
                {item.title}
              </Link>
            ))}
            <CookieSettingsButton className="transition-colors hover:text-gold-300" />
          </div>
        </Container>
      </div>
    </footer>
  );
}
