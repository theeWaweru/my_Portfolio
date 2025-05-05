// app/page.jsx - Updated to use MinimalistHero
import { Suspense } from "react";
import Hero from "./components/Hero/Hero";
import AboutSection from "./components/AboutSection/AboutSection";
import FeaturedWork from "./components/FeaturedWork/FeaturedWork";
import ContactCTA from "./components/ContactCTA/ContactCTA";
import styles from "./page.module.css";

// Loading component
function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingSpinner}></div>
      <p>Loading...</p>
    </div>
  );
}

// Main content component
function HomeContent() {
  return (
    <div className={styles.container}>
      <Hero />
      <AboutSection />
      <FeaturedWork />
      <ContactCTA />
    </div>
  );
}

// Exported page component with Suspense
export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <HomeContent />
    </Suspense>
  );
}
