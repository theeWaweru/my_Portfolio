import Link from "next/link";
import WaweruWordmark from "../WaweruWordmark";

const MENU = [
  { label: "[ From the Lab ]", href: "/work" },
  { label: "[ What I Do ]", href: "/#services" },
  { label: "[ Meet Waweru ]", href: "/about" },
  { label: "[ Wanna Chat? ]", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-cols-row">
          <div className="foot-menu-col">
            <div className="foot-label">
              Menu<span className="sl">/</span>
            </div>
            <nav className="foot-menu">
              {MENU.map((m) => (
                <Link key={m.label} href={m.href}>
                  {m.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="foot-hq">
            <div className="foot-label">
              Based In<span className="sl">/</span>
            </div>
            <p>
              Nairobi, Kenya.
              <br />
              Available worldwide.
            </p>
            <a className="email-link" href="mailto:davidngari47@gmail.com">
              davidngari47@gmail.com
            </a>
          </div>

          <div className="foot-socials">
            <div className="foot-label">
              Socials<span className="sl">/</span>
            </div>
            <div className="sq-row">
              <a className="sq" href="https://x.com/theeWaweru" target="_blank" rel="noreferrer" aria-label="X">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a className="sq" href="https://www.linkedin.com/in/waweru-ngari/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a className="sq" href="https://www.instagram.com/theewaweru" target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" /></svg>
              </a>
              <a className="sq" href="https://github.com/theeWaweru" target="_blank" rel="noreferrer" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="foot-wordmark">
          <WaweruWordmark />
        </div>

        <div className="foot-legal">
          <div className="foot-legal-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/contact">Contact Me</Link>
          </div>
          <span>&copy; 2026 David Waweru Ngari. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}
