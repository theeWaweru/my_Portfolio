import Link from "next/link";

const LOGOS = [
  { text: "Galentine" },
  { text: "MB", em: "96" },
  { text: "Nuru" },
  { text: "Saffron" },
  { text: "Mosaic" },
  { text: "Kazi", em: "." },
  { text: "Tunda" },
  { text: "Vantage" },
];

function LogoCard({ item, hidden }) {
  return (
    <div className="logo-card" aria-hidden={hidden ? "true" : undefined}>
      <span>
        {item.text}
        {item.em ? <em>{item.em}</em> : null}
      </span>
    </div>
  );
}

export default function Boast() {
  return (
    <>
      <section className="boast">
        <div className="wrap">
          <h2 className="boast-statement">
            Where sharp design meets solid engineering, brands take shape with{" "}
            <span className="accent">confidence and craft.</span>
          </h2>
          <div className="boast-foot">
            <p className="boast-desc">
              I take on a limited number of projects at a time, so every client
              gets my full attention, clear communication, and consistent
              ownership of the work.
            </p>
            <Link href="/contact" className="lets-talk">
              Let's Talk
            </Link>
          </div>
        </div>
      </section>
      <div className="logo-marquee" aria-label="Selected clients">
        <div className="logo-track">
          {LOGOS.map((l, i) => (
            <LogoCard key={`a-${i}`} item={l} />
          ))}
          {LOGOS.map((l, i) => (
            <LogoCard key={`b-${i}`} item={l} hidden />
          ))}
        </div>
      </div>
    </>
  );
}
