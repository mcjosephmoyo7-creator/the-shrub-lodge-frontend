"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const COOKIE_NAME = "shrublodge-cookie-consent";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

type ConsentWindow = Window & {
  gtag?: (
    command: string,
    action?: string,
    options?: Record<string, string>,
  ) => void;
  fbq?: (command: string, action?: string) => void;
};

function readConsent(): Consent | null {
  const entry = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${COOKIE_NAME}=`));
  if (!entry) return null;

  try {
    const parsed = JSON.parse(
      decodeURIComponent(entry.slice(COOKIE_NAME.length + 1)),
    ) as Partial<Consent>;
    if (
      parsed.necessary !== true ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.marketing !== "boolean"
    ) {
      return null;
    }
    return {
      necessary: true,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
    };
  } catch (error) {
    console.error("[cookie-consent] Unable to read saved preferences:", error);
    return null;
  }
}

function saveConsent(consent: Consent) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(consent),
  )}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
}

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const saved = readConsent();
    setConsent(saved);
    setAnalytics(saved?.analytics ?? false);
    setMarketing(saved?.marketing ?? false);
    setReady(true);

    const openSettings = () => {
      setCustomizing(true);
      setReady(true);
    };
    window.addEventListener("open-cookie-settings", openSettings);
    return () => window.removeEventListener("open-cookie-settings", openSettings);
  }, []);

  useEffect(() => {
    if (!consent) return;
    const providers = window as ConsentWindow;
    providers.gtag?.("consent", "update", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.marketing ? "granted" : "denied",
      ad_user_data: consent.marketing ? "granted" : "denied",
      ad_personalization: consent.marketing ? "granted" : "denied",
    });
    providers.fbq?.("consent", consent.marketing ? "grant" : "revoke");
  }, [consent]);

  function choosePreferences(next: Consent) {
    saveConsent(next);
    if (!next.analytics) {
      document.cookie = "_ga=; Path=/; Max-Age=0; SameSite=Lax";
      document.cookie = "_gid=; Path=/; Max-Age=0; SameSite=Lax";
    }
    if (!next.marketing) {
      document.cookie = "_fbp=; Path=/; Max-Age=0; SameSite=Lax";
    }
    setConsent(next);
    setAnalytics(next.analytics);
    setMarketing(next.marketing);
    setCustomizing(false);
  }

  const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? "";
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
  const loadAnalytics =
    consent?.analytics && /^G-[A-Z0-9]+$/.test(googleAnalyticsId);
  const loadMarketing = consent?.marketing && /^\d+$/.test(metaPixelId);

  return (
    <>
      {loadAnalytics ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics-consent" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} gtag('consent', 'default', {analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'}); gtag('js', new Date()); gtag('config', '${googleAnalyticsId}');`}
          </Script>
        </>
      ) : null}
      {loadMarketing ? (
        <>
          <Script id="meta-pixel-consent" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
          </Script>
        </>
      ) : null}
      {ready && (!consent || customizing) ? (
        <aside
          aria-label="Cookie preferences"
          className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-5xl rounded-3xl border border-sand-300 bg-white p-5 text-forest-900 shadow-2xl sm:p-7"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <p className="font-display text-xl">Your privacy matters</p>
              <p className="mt-2 text-sm leading-relaxed text-forest-800/75">
                We use necessary cookies to save this choice. With your
                permission, analytics and marketing cookies help us understand
                visits and improve our communications. You can change your
                preferences at any time.
              </p>
              <a
                href="/cookie-policy"
                className="mt-2 inline-block text-sm font-semibold text-gold-700 underline-offset-2 hover:underline"
              >
                Read our Cookie Policy
              </a>
              {customizing ? (
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked disabled />
                    Necessary (always on)
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(event) => setAnalytics(event.target.checked)}
                    />
                    Analytics
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={marketing}
                      onChange={(event) => setMarketing(event.target.checked)}
                    />
                    Marketing
                  </label>
                </div>
              ) : null}
            </div>
            <div className="flex shrink-0 flex-wrap gap-2 md:max-w-[19rem] md:justify-end">
              {customizing ? (
                <button
                  type="button"
                  onClick={() =>
                    choosePreferences({
                      necessary: true,
                      analytics,
                      marketing,
                    })
                  }
                  className="rounded-full bg-forest-900 px-4 py-2.5 text-sm font-semibold text-sand-50 transition-colors hover:bg-forest-800"
                >
                  Save preferences
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCustomizing(true)}
                  className="rounded-full border border-forest-900/20 px-4 py-2.5 text-sm font-semibold text-forest-900 transition-colors hover:bg-sand-100"
                >
                  Customize
                </button>
              )}
              <button
                type="button"
                onClick={() =>
                  choosePreferences({
                    necessary: true,
                    analytics: false,
                    marketing: false,
                  })
                }
                className="rounded-full border border-forest-900/20 px-4 py-2.5 text-sm font-semibold text-forest-900 transition-colors hover:bg-sand-100"
              >
                Reject non-essential
              </button>
              <button
                type="button"
                onClick={() =>
                  choosePreferences({
                    necessary: true,
                    analytics: true,
                    marketing: true,
                  })
                }
                className="rounded-full bg-forest-900 px-4 py-2.5 text-sm font-semibold text-sand-50 transition-colors hover:bg-forest-800"
              >
                Accept all
              </button>
            </div>
          </div>
        </aside>
      ) : null}
    </>
  );
}
