import Link from "next/link";

// Centered intro over a full-bleed background (striped placeholder for now;
// swap the CSS background-image in home.css for the real abstract art later).
export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <p className="eyebrow">Creative Developer · Nairobi, Kenya</p>
        <h1>
          Growing Brands an <span className="hl">Unfair Advantage</span> on the Web.
        </h1>
        <p className="lead">
          Premium, results-driven websites and product experiences, designed and
          built end to end. Thoughtful craft, real outcomes.
        </p>
        <div className="hero-actions">
          <Link href="/work" className="btn btn-primary">
            View My Work
          </Link>
          <a href="/waweru-resume.pdf" className="btn btn-ghost" target="_blank" rel="noreferrer">
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
