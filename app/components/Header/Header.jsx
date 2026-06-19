"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import WaweruWordmark from "../WaweruWordmark";

// Full menu lives in the overlay now. The bar is just logo + Menu button.
const MENU = [
  { label: "From the Lab", href: "/work" },
  { label: "What I Do", href: "/#services" },
  { label: "Meet Waweru", href: "/about" },
  { label: "Wanna Chat?", href: "/contact" },
];

// Menu-size wordmark width in px (viewBox 1361x153, ratio ~8.9, at 20px tall).
const SMALL_W = 178;
const RANGE_VH = 0.55;   // scroll distance (fraction of viewport) for the full morph
const BTN_START = 0.18;  // p at which the Menu button fades in on the homepage

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const onWork = pathname === "/work" || pathname.startsWith("/work/");
  const isHome = pathname === "/";

  const markRef = useRef(null);
  const btnRef = useRef(null);

  // Homepage wordmark morph: render the mark at full hero width (crisp vector)
  // and shrink its WIDTH into the menu size on scroll. Animating width keeps the
  // SVG sharp (no bitmap upscaling, which is what caused the dithering). The Menu
  // button fades in as the wordmark shrinks so the hero stays edge to edge.
  useEffect(() => {
    const statement = document.querySelector("[data-statement-hero]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const applyMorph = (p) => {
      const mark = markRef.current;
      if (mark) {
        const gutter = Math.max(24, Math.min(80, window.innerWidth * 0.05));
        const bigW = Math.max(SMALL_W, window.innerWidth - gutter * 2);
        const w = bigW + (SMALL_W - bigW) * p;
        mark.style.width = w + "px";
      }
      const btn = btnRef.current;
      if (btn) {
        const o = Math.min(1, Math.max(0, (p - BTN_START) / (1 - BTN_START)));
        btn.style.opacity = String(o);
        btn.style.pointerEvents = o > 0.05 ? "auto" : "none";
      }
    };

    const resetMorph = () => {
      if (markRef.current) markRef.current.style.width = "";
      if (btnRef.current) { btnRef.current.style.opacity = ""; btnRef.current.style.pointerEvents = ""; }
    };

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const threshold = statement ? statement.offsetHeight - 90 : 0;
      setOverDark(statement ? y < threshold : false);
      if (isHome) {
        if (reduce) { applyMorph(1); return; }
        const range = Math.max(1, window.innerHeight * RANGE_VH);
        applyMorph(Math.min(1, Math.max(0, y / range)));
      } else {
        resetMorph();
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      resetMorph();
    };
  }, [pathname, isHome]);

  // lock scroll + escape to close while the menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  // close the menu whenever the route actually changes
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const cls = [
    "site-header",
    scrolled ? "scrolled" : "",
    overDark ? "over-dark" : "",
    onWork ? "work-dark" : "",
    isHome ? "home-morph" : "",
  ].filter(Boolean).join(" ");

  return (
    <>
      <header className={cls}>
        <div className="header-inner">
          <Link className="brand" href="/" aria-label="theeWaweru home">
            <span className="brand-mark-wrap" ref={markRef}>
              <WaweruWordmark className="brand-mark" />
            </span>
          </Link>
          <button
            type="button"
            className="btn btn-accent menu-toggle"
            ref={btnRef}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </header>

      <div
        className={"menu-overlay" + (menuOpen ? " open" : "")}
        role="dialog"
        aria-modal="true"
        aria-hidden={menuOpen ? "false" : "true"}
      >
        <div className="menu-bar">
          <Link className="menu-brand" href="/" onClick={() => setMenuOpen(false)} aria-label="theeWaweru home">
            <WaweruWordmark className="brand-mark" />
          </Link>
          <button type="button" className="btn btn-accent menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            Close
          </button>
        </div>

        <div className="menu-body">
          <nav className="menu-links">
            {MENU.map((m, i) => (
              <Link
                key={m.label}
                href={m.href}
                onClick={() => setMenuOpen(false)}
                style={{ transitionDelay: (0.06 * i + 0.05) + "s" }}
              >
                <span className="ml-index">0{i + 1}</span>
                <span className="ml-text">{m.label}</span>
              </Link>
            ))}
          </nav>

          <aside className="menu-feature">
            <div className="menu-portrait">
              <img src="/images/profile/waweru.jpg" alt="David Waweru" onError={(e) => { e.currentTarget.src = "/images/placeholder.jpg"; }} />
            </div>
            <div className="menu-feature-text">
              <h3>One Pixel At A Time</h3>
              <p>Design and development, crafted by David Waweru in Nairobi.</p>
            </div>
          </aside>
        </div>

        <div className="menu-foot">
          <div className="menu-socials">
            <a href="https://x.com/theeWaweru" target="_blank" rel="noreferrer">X</a>
            <a href="https://www.linkedin.com/in/waweru-ngari/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/theewaweru" target="_blank" rel="noreferrer">Instagram</a>
          </div>
          <div className="menu-legal">
            <Link href="/privacy" onClick={() => setMenuOpen(false)}>Privacy Policy</Link>
            <span>&copy; 2026 David Waweru Ngari.</span>
          </div>
        </div>
      </div>
    </>
  );
}
