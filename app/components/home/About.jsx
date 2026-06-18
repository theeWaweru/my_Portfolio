import Link from "next/link";

const TOOLS = ["Figma", "React", "Next.js", "Webflow", "WordPress", "HTML / CSS / JS", "Product Strategy"];

export default function About() {
  return (
    <section className="sec about" id="about">
      <div className="wrap">
        <div className="about-grid">
          <div className="about-visual reveal">
            <div className="frame">
              <div className="ph">
                <span className="ph-tag">portrait · David Waweru · 4:5</span>
              </div>
            </div>
            <img className="about-stamp" src="/theewaweru-badge.svg" alt="" />
          </div>
          <div className="about-copy reveal">
            <p className="eyebrow">Meet Waweru</p>
            <h2>
              Self-taught. <br />
              Outcome-obsessed.
            </h2>
            <p>
              I'm <span className="ink">David Waweru Ngari</span>, a creative
              developer and UI/UX designer based in{" "}
              <span className="ink">Nairobi, Kenya</span>. I began my journey at
              MB96, sharpening my craft across diverse client projects.
            </p>
            <p>
              My work lives at the intersection of design and development:
              experiences that look sharp, feel intuitive, and move the numbers
              that matter.
            </p>
            <div className="toolset">
              <div className="tl-label">Toolset</div>
              <div className="tags">
                {TOOLS.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <Link href="/about" className="btn btn-primary">
              Know Me Better
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
