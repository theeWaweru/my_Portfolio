// app/page.js : theeWaweru homepage (redesign)
import "./components/home/home.css";
import StatementHero from "./components/home/StatementHero";
import Hero from "./components/home/Hero";
import SkillsMarquee from "./components/home/SkillsMarquee";
import FeaturedWork from "./components/home/FeaturedWork";
import Services from "./components/home/Services";
import Boast from "./components/home/Boast";
import Process from "./components/home/Process";
import About from "./components/home/About";
import ContactCTA from "./components/home/ContactCTA";
import ScrollReveal from "./components/home/ScrollReveal";

export default function Home() {
  return (
    <>
      <StatementHero />
      <Hero />
      <SkillsMarquee />
      <FeaturedWork />
      <Services />
      <Boast />
      <Process />
      <About />
      <ContactCTA />
      <ScrollReveal />
    </>
  );
}
