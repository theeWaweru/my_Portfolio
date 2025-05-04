// app/components/analytics/GoogleAnalytics.jsx

"use client";

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// Create a component that uses useSearchParams
function GoogleAnalyticsTracker({ measurementId }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (pathname && window.gtag) {
            // Send pageview with path
            window.gtag('config', measurementId, {
                page_path: pathname,
            });
        }
    }, [pathname, searchParams, measurementId]);

    return null;
}

// Wrap the tracker in Suspense
export default function GoogleAnalytics({ measurementId }) {
    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
            <GoogleAnalyticsTracker measurementId={measurementId} />
        </>
    );
}