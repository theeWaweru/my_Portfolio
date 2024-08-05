import "./globals.css";
import {
  Bricolage_Grotesque,
  Diphylleia,
  Sedgwick_Ave_Display,
  Tektur,
} from "next/font/google";
import { Analytica } from "./components/analytics";
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from "./GoogleAnalytics";
import { meta } from "./components/meta";

export const Sedwig = Sedgwick_Ave_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-sedwig",
});
export const Brick = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400"],
});
export const Tek = Tektur({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-tek",
  display: "swap",
});
export const Diphy = Diphylleia({
  subsets: ["latin"],
  variable: "--font-diphy",
  weight: ["400"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {meta.map((meta) => {
        return (
          <head key={meta}>
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
            <meta name="keywords" content={meta.keywords} />
            <meta property="og:title" content={meta.og_title} />
            <meta property="og:description" content={meta.og_description} />
            <meta property="og:url" content={meta.url} />
            <meta property="og:site_name" content={meta.site_name} />
            <meta property="og:locale" content="en-US" />
            <meta property="og:image" content={meta.og_image} />
            <meta property="og:image:width" content="1920" />
            <meta property="og:image:height" content="1080" />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={meta.title} />
            <meta name="twitter:description" content={meta.og_description} />
            <meta name="twitter:image" content={meta.og_image} />
            <meta name="twitter:image:width" content="1920" />
            <meta name="twitter:image:height" content="1080" />
            <link rel="shortcut icon" href="/favicon.svg" />
            <meta name="next-size-adjust" />
            <Analytics />
            <GoogleAnalytics />
          </head>
        );
      })}
      <body
        className={`${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
