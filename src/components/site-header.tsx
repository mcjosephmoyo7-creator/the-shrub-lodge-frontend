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

export function SiteHeader() {
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
        "sticky top-0 z-50 border-b transition-[transform,background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out motion-reduce:transition-none",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
        // Pull the hero photo up underneath the header so the header floats
        // over the image, the way Insika Lodge's header does. `bg-clip-padding`
        // stops the gradient from extending into the 1px border strip, where
        // it would otherwise tile and paint its first stop (black/30) as a
        // dark hairline seam right above the hero.
        overHero && (scrolled ? "-mb-[5.0625rem]" : "-mb-[5rem]"),
        scrolled
          ? "border-sand-300/70 bg-white/85 shadow-md shadow-forest-950/5 backdrop-blur-md"
          : overHero
            ? "border-b-0 bg-clip-padding bg-gradient-to-b from-black/30 via-black/10 to-transparent"
            : "border-transparent bg-forest-950/80 backdrop-blur-md",
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-4">
        <Logo tone={scrolled ? "dark" : "light"} variant="mark" />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navigation.map((item) =>
            item.children ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    scrolled
                      ? "text-forest-900 hover:bg-forest-900/5 hover:text-forest-950"
                      : "text-sand-100/90 hover:bg-white/5 hover:text-white",
                    isActive(pathname, item.href) &&
                      (scrolled
                        ? "bg-sand-200/70 font-semibold text-forest-950"
                        : "bg-white/10 text-white font-semibold"),
                  )}
                >
                  {item.title}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform group-hover:rotate-180",
                      scrolled ? "text-forest-700" : "text-sand-200",
                    )}
                  />
                </Link>
                <div className="invisible absolute left-0 top-full z-50 w-80 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
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
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  scrolled
                    ? "text-forest-900 hover:bg-forest-900/5 hover:text-forest-950"
                    : "text-sand-100/90 hover:bg-white/5 hover:text-white",
                  isActive(pathname, item.href) &&
                    (scrolled
                      ? "bg-sand-200/70 font-semibold text-forest-950"
                      : "bg-white/10 text-white font-semibold"),
                )}
              >
                {item.title}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <SocialLinks
            tone={scrolled ? "onLight" : "onDark"}
            className="mr-1 hidden xl:flex"
          />
          <ButtonLink
            href={siteConfig.bookingHref}
            className="hidden px-5 py-2.5 sm:inline-flex"
          >
            Book Now
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden",
              scrolled
                ? "border-forest-900/20 text-forest-900 hover:bg-forest-900/5"
                : "border-white/15 text-sand-50 hover:bg-white/10",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      <div
        className={cn(
          "overflow-hidden transition-[max-height,opacity] duration-300 lg:hidden",
          scrolled
            ? "border-t border-sand-200 bg-white/95 text-forest-900 backdrop-blur-md shadow-lg"
            : "border-t border-forest-800 bg-forest-950 text-sand-100",
          open ? "max-h-[85vh] overflow-y-auto opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          <div
            className={cn(
              "mb-2 px-2 pb-3",
              scrolled ? "border-b border-sand-200" : "border-b border-forest-800",
            )}
          >
            <Logo tone={scrolled ? "dark" : "light"} variant="mark" />
          </div>
          {navigation.map((item) =>
            item.children ? (
              <div key={item.href} className="flex flex-col">
                <button
                  type="button"
                  onClick={() => setMobileActivitiesOpen((value) => !value)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors",
                    scrolled
                      ? "text-forest-900 hover:bg-forest-900/5"
                      : "text-sand-100 hover:bg-white/5",
                  )}
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
                    className={cn(
                      "ml-2 flex flex-col gap-0.5 border-l pb-1 pl-3",
                      scrolled ? "border-sand-300" : "border-forest-800",
                    )}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "rounded-lg px-3 py-2 text-sm transition-colors",
                        scrolled
                          ? "text-forest-800 hover:bg-sand-100 hover:text-forest-950"
                          : "text-sand-100/80 hover:bg-white/5 hover:text-white",
                      )}
                    >
                      All Activities
                    </Link>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "rounded-lg px-3 py-2 text-sm transition-colors",
                          scrolled
                            ? "text-forest-800 hover:bg-sand-100 hover:text-forest-950"
                            : "text-sand-100/80 hover:bg-white/5 hover:text-white",
                        )}
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
                className={cn(
                  "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                  scrolled
                    ? "text-forest-900 hover:bg-forest-900/5"
                    : "text-sand-100 hover:bg-white/5",
                )}
              >
                {item.title}
              </Link>
            ),
          )}
          <ButtonLink href={siteConfig.bookingHref} className="mt-2 w-full">
            Book Now
          </ButtonLink>
          <SocialLinks
            tone={scrolled ? "onLight" : "onDark"}
            className="mt-4 justify-center"
          />
        </Container>
      </div>
    </header>
  );
}
