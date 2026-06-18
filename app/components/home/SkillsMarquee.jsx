// Seamless skills marquee: the list is rendered twice so the CSS loop
// (translateX(-50%)) is continuous. Pure CSS, no JS.
const SKILLS = [
  "UI / UX Design",
  "Web Development",
  "Brand & Identity",
  "Figma",
  "React",
  "Next.js",
  "Webflow",
  "WordPress",
  "WooCommerce",
  "AI-Driven Builds",
  "HTML / CSS / JS",
];

export default function SkillsMarquee() {
  return (
    <div className="marquee reveal">
      <div className="marquee-track">
        {SKILLS.map((s, i) => (
          <span key={`a-${i}`}>{s}</span>
        ))}
        {SKILLS.map((s, i) => (
          <span key={`b-${i}`} aria-hidden="true">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
