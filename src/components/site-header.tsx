"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { SocialLinks } from "@/components/social-links";
import { navigation, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { NavRollingLink } from "@/components/nav-rolling-link";

type SiteHeaderProps = {
  siteName?: string;
  logoUrl?: string;
  socialLinks?: readonly { title: string; href: string }[];
};

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

// Only the home page floats the header transparently over its hero photo.
// Every other page shows the solid, opaque header from the very top of the
// page, so there is no transparent bar sitting over the content.
function isHomeHeader(pathname: string): boolean {
  return pathname === "/";
}

export function SiteHeader({
  siteName = siteConfig.name,
  logoUrl = "",
  socialLinks = siteConfig.socialLinks,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolledState, setScrolledState] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileActivitiesOpen, setMobileActivitiesOpen] = useState(false);
  const openRef = useRef(false);

  // Home page only: header floats transparently over the hero photo.
  const overHero = isHomeHeader(pathname);

  // Every other page uses the opaque, "scrolled" header look from the very top
  // of the page, so the bar always carries its background colour.
  const scrolled = scrolledState || !overHero;

  useEffect(() => {
    setOpen(false);
    setMobileActivitiesOpen(false);
  }, [pathname]);

  // Keep the header visible while the mobile menu is open.
  useEffect(() => {
    openRef.current = open;
    if (open) setHidden(false);
  }, [open]);

  // Hide the header when scrolling down, reveal it as soon as the user scrolls
  // back up (or returns near the top of the page).
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const apply = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;

      setScrolledState(y > 12);

      if (openRef.current) {
        setHidden(false);
      } else if (y > 96 && delta > 4) {
        setHidden(true);
      } else if (delta < -4 || y <= 96) {
        setHidden(false);
      }

      lastY = y;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b-0 bg-transparent transition-[transform,background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out motion-reduce:transition-none lg:border-b",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
        // Pull the hero photo up underneath the header so the header floats
        // over the image, the way Insika Lodge's header does. `bg-clip-padding`
        // stops the gradient from extending into the 1px border strip, where
        // it would otherwise tile and paint its first stop (black/30) as a
        // dark hairline seam right above the hero.
        overHero && (scrolled ? "-mb-[5.0625rem]" : "-mb-[5rem]"),
        scrolled
          ? "lg:border-sand-300/70 lg:bg-white/85 lg:shadow-md lg:shadow-forest-950/5 lg:backdrop-blur-md"
          : overHero
            ? "lg:border-b-0 lg:bg-clip-padding lg:bg-gradient-to-b lg:from-black/30 lg:via-black/10 lg:to-transparent"
            : "lg:border-transparent lg:bg-forest-950/80 lg:backdrop-blur-md",
      )}
    >
      <Container className="mx-4 flex h-20 w-auto max-w-none items-center justify-between gap-4 px-0 sm:px-0 lg:mx-auto lg:w-full lg:max-w-content lg:px-8">
        <div
          className={cn(
            "flex h-[4.5rem] min-w-0 flex-1 items-center justify-between rounded-full px-3 transition-[background-color,box-shadow,backdrop-filter] duration-300 lg:contents lg:bg-transparent lg:px-0 lg:shadow-none lg:backdrop-blur-none",
            scrolled
              ? "bg-white/95 shadow-sm shadow-black/10 backdrop-blur-md"
              : "bg-transparent shadow-none backdrop-blur-none",
          )}
        >
          <Logo
            tone={scrolled ? "dark" : "light"}
            variant="mark"
            siteName={siteName}
            logoUrl={logoUrl}
            className="hidden lg:flex"
          />
          <Logo
            tone={scrolled ? "dark" : "light"}
            variant="mark"
            siteName={siteName}
            logoUrl={logoUrl}
            className="lg:hidden"
          />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navigation.map((item) =>
            item.children ? (
              <div key={item.href} className="group relative">
                <div
                  className={cn(
                    "group/nav flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                    scrolled
                      ? "text-forest-900 hover:bg-forest-900/5 hover:text-forest-950"
                      : "text-sand-100/90 hover:bg-white/5 hover:text-white",
                    isActive(pathname, item.href) &&
                      (scrolled
                        ? "bg-sand-200/70 font-semibold text-forest-950"
                        : "bg-white/10 text-white font-semibold"),
                  )}
                >
                  <NavRollingLink href={item.href} label={item.title} isActive={isActive(pathname, item.href)} />
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-300 group-hover/nav:rotate-180",
                      scrolled ? "text-forest-700" : "text-sand-200",
                    )}
                  />
                </div>
                <div className="invisible absolute left-0 top-full z-50 w-80 translate-y-2 pt-2 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-forest-100 bg-white p-2 shadow-xl">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block rounded-xl px-4 py-2.5 text-sm text-forest-800 transition-colors hover:bg-sand-100 hover:text-forest-950",
                          isActive(pathname, child.href) &&
                            "bg-sand-100 font-semibold text-forest-950",
                        )}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                  scrolled
                    ? "text-forest-900 hover:bg-forest-900/5 hover:text-forest-950"
                    : "text-sand-100/90 hover:bg-white/5 hover:text-white",
                  isActive(pathname, item.href) &&
                    (scrolled
                      ? "bg-sand-200/70 font-semibold text-forest-950"
                      : "bg-white/10 text-white font-semibold"),
                )}
              >
                <NavRollingLink href={item.href} label={item.title} isActive={isActive(pathname, item.href)} />
              </div>
            ),
          )}
          </nav>

          <div className="flex items-center gap-3">
            <SocialLinks
              tone={scrolled ? "onLight" : "onDark"}
              className="mr-1 hidden xl:flex"
              items={socialLinks}
            />
            <ButtonLink
              href={siteConfig.bookingHref}
              className="hidden px-5 py-2.5 lg:inline-flex"
            >
              Book Now
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-forest-950 shadow-sm transition-colors hover:bg-sand-50 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </Container>

      <div
        className={cn(
          "mx-4 overflow-hidden rounded-3xl border border-sand-200 bg-white/95 text-forest-900 shadow-lg backdrop-blur-md transition-[max-height,opacity,margin] duration-300 lg:hidden",
          open
            ? "mt-2 max-h-[85vh] overflow-y-auto opacity-100"
            : "mt-0 max-h-0 opacity-0",
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {navigation.map((item) =>
            item.children ? (
              <div key={item.href} className="flex flex-col">
                <button
                  type="button"
                  onClick={() => setMobileActivitiesOpen((value) => !value)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium text-forest-900 transition-colors hover:bg-forest-900/5"
                >
                  {item.title}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      mobileActivitiesOpen && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-[max-height] duration-300",
                    mobileActivitiesOpen ? "max-h-96" : "max-h-0",
                  )}
                >
                  <div
                    className="ml-2 flex flex-col gap-0.5 border-l border-sand-300 pb-1 pl-3"
                  >
                    <Link
                      href={item.href}
                      className="rounded-lg px-3 py-2 text-sm text-forest-800 transition-colors hover:bg-sand-100 hover:text-forest-950"
                    >
                      All Activities
                    </Link>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="rounded-lg px-3 py-2 text-sm text-forest-800 transition-colors hover:bg-sand-100 hover:text-forest-950"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3 text-sm font-medium text-forest-900 transition-colors hover:bg-forest-900/5"
              >
                {item.title}
              </Link>
            ),
          )}
          <ButtonLink href={siteConfig.bookingHref} className="mt-2 w-full">
            Book Now
          </ButtonLink>
          <SocialLinks
            tone="onLight"
            className="mt-4 justify-center"
            items={socialLinks}
          />
        </Container>
      </div>
    </header>
  );
}
