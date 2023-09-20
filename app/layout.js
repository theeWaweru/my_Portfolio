import "./globals.css";
import {
  Bricolage_Grotesque,
  Diphylleia,
  Inter,
  Sedgwick_Ave_Display,
  Tektur,
} from "@next/font/google";
import { Analytics } from "./components/analytics";
import { Navigation } from "./components/nav";
import notFound from "./not-found";
import { openGraphImage } from "./shared-metadata";

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

export const metadata = {
  title: "theeWawerus Portfolio",
  description:
    "Unlock boundless creativity and technical wizardry with our dynamic digital powerhouse! Specializing in creative development, digital strategy, and captivating video design, we're your go-to solution for all things web and visual. Our expertise spans the Adobe Suite gamut, transforming pixels into masterpieces. With a flair for coding magic using React and Next.js, we craft interactive digital realms that astonish. Leverage our prowess in crafting compelling websites across Shopify, WordPress, and Webflow, tailored to your unique vision. Dive into niche-specific content curation that speaks your audience's language, creating an irresistible online narrative. Traverse captivating user interfaces sculpted meticulously on Figma, guiding users through intuitive journeys. Embark on a brand evolution journey with our strategic touch, breathing life into ideas and translating them into impactful reality. Our finely honed skills culminate in well-structured brand books that empower businesses to champion their identity. Elevate your digital game with us – where creativity, strategy, and innovation converge seamlessly. Partner with us to navigate the ever-evolving digital landscape!",
  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "Creative Developer",
    "Digital Business Strategist",
    "Video Editor/Designer",
    "Adobe Suite Apps",
    "React and Next.js Coding",
    "Shopify, WordPress, Webflow Websites",
    "Content Curation",
    "User Interfaces",
    "Brand Strategy",
    "VR/XR Enthusiast",
    "Trending Technologies",
    "Captivating User Experiences",
    "Innovative Solutions",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Analytics />
      </head>
      <body
        className={`${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        {children}
      </body>
    </html>
  );
}
