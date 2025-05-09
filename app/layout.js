import { Tektur, Bricolage_Grotesque } from "next/font/google";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import GoogleAnalytics from "./components/analytics/GoogleAnalytics";
import { Suspense } from "react";
import "./globals.css";
import clsx from "clsx";

// Initialize the fonts
const tektur = Tektur({
  subsets: ["latin"],
  variable: "--font-tektur",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "David Waweru | Creative Developer",
  description:
    "Portfolio of David Waweru, a Creative Developer based in Nairobi, Kenya.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${tektur.variable} ${bricolage.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        {/* Google Analytics - wrapped in Suspense */}
        <Suspense fallback={null}>
          <GoogleAnalytics
            measurementId={
              process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-MRN72YGDDM"
            }
          />
        </Suspense>
      </body>
    </html>
  );
}
