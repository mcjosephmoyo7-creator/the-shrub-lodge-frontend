"use client";

import type { ReactNode } from "react";

export function SiteChrome({
  header,
  footer,
  assistant,
  cookieConsent,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  assistant: ReactNode;
  cookieConsent: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      {header}
      <main className="flex-1">{children}</main>
      {footer}
      {assistant}
      {cookieConsent}
    </>
  );
}
