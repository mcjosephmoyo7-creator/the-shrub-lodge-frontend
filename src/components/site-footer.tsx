import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/logo";
import { SocialLinks } from "@/components/social-links";
import { GoogleMap } from "@/components/google-map";
import { navigation, siteConfig, footerLinks } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-950 text-sand-100">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-5">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-sand-100/70">
            {siteConfig.description}
          </p>
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-lg text-sand-50">Follow us</h3>
            <SocialLinks tone="onDark" size={20} />
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
              <span>{siteConfig.address.full}</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span className="flex flex-col">
                <a href={`tel:${siteConfig.phone.reservations}`}>
                  For reservations: {siteConfig.phone.reservations}
                </a>
                <a href={`tel:${siteConfig.phone.reception}`}>
                  For reception: {siteConfig.phone.reception}
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span className="flex flex-col">
                <a href={`mailto:${siteConfig.email.reservations}`}>
                  {siteConfig.email.reservations}
                </a>
                <a href={`mailto:${siteConfig.email.tours}`}>
                  {siteConfig.email.tours}
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
              <span>Front Desk: {siteConfig.hours.frontDesk}</span>
            </li>
            <li>Check-in: {siteConfig.hours.checkIn}</li>
            <li>Check-out: {siteConfig.hours.checkOut}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-forest-900/80 pb-12 pt-8">
        <Container>
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              Our Location in Victoria Falls
            </span>
            <span className="text-xs text-sand-100/70">
              {siteConfig.address.full}
            </span>
          </div>
          <GoogleMap height={380} />
        </Container>
      </div>

      <div className="border-t border-forest-800">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-sand-100/60 sm:flex-row">
          <p>
            &copy; {year} by The Shrub Lodge. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-gold-300"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
