"use client";
import { useEffect } from "react";

// Adds the "in" class to every .reveal element as it scrolls into view, with a
// small stagger between siblings. The CSS base state is already visible-safe;
// this only layers motion on top. A failsafe reveals anything still hidden so
// content is never trapped if IntersectionObserver does not fire.
export default function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    if (!els.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const sibs = Array.from(
            el.parentElement.querySelectorAll(":scope > .reveal")
          );
          const idx = Math.max(0, sibs.indexOf(el));
          el.style.transitionDelay = idx * 90 + "ms";
          el.classList.add("in");
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => io.observe(el));

    const failsafe = setTimeout(() => {
      document
        .querySelectorAll(".reveal:not(.in)")
        .forEach((el) => el.classList.add("in"));
    }, 2000);

    return () => {
      io.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  return null;
}
