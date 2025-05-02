// app/layout.js

import { Inter } from "next/font/google";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import "./globals.css";

// Load Inter font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: {
    default: "David Waweru | AI Creative Developer",
    template: "%s | David Waweru",
  },
  description:
    "Portfolio of David Waweru, an AI Creative Developer based in Nairobi, Kenya, specializing in UI/UX design and web development.",
  keywords:
    "AI Creative Developer, UI/UX Design, Web Development, Three.js, React, Next.js, Nairobi, Kenya",
  openGraph: {
    title: "David Waweru | AI Creative Developer",
    description:
      "Portfolio of David Waweru, an AI Creative Developer based in Nairobi, Kenya, specializing in UI/UX design and web development.",
    url: "https://theewaweru.dev",
    siteName: "theeWaweru.dev",
    images: [
      {
        url: "https://theewaweru.dev/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "David Waweru - AI Creative Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "https://theewaweru.dev/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-black text-white font-sans min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
