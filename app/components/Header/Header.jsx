"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "From the Lab", href: "/work" },
  { label: "What I Do", href: "/#services" },
  { label: "Meet Waweru", href: "/about" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const statement = document.querySelector("[data-statement-hero]");

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const threshold = statement ? statement.offsetHeight - 90 : 0;
      setOverDark(statement ? y < threshold : false);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const cls = ["site-header", scrolled ? "scrolled" : "", overDark ? "over-dark" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={cls}>
      <div className="wrap header-inner">
        <Link className="brand" href="/">
          <img src="/theewaweru-badge.svg" alt="theeWaweru badge" width={38} height={38} />
          <span className="name">
            thee<b>Waweru</b>
          </span>
        </Link>
        <nav className="nav">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={pathname === item.href ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-cta">
          <Link href="/contact" className="btn btn-primary">
            Wanna Chat?
          </Link>
        </div>
      </div>
    </header>
  );
}
