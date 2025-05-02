// app/page.jsx
import Hero from "./components/Hero/Hero";
import AboutSection from "./components/AboutSection/AboutSection";
import FeaturedWork from "./components/FeaturedWork/FeaturedWork";
import ContactCTA from "./components/ContactCTA/ContactCTA";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Hero />
      <AboutSection />
      <FeaturedWork />
      <ContactCTA />
    </div>
  );
}
