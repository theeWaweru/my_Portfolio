"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Loader.module.css";

const MIN_VISIBLE_MS = 1000; // show for at least 1s, even on cached navigations
const SWIPE_MS = 800;        // must match the CSS leaving transition

const inWork = (p) => p === "/work" || p.startsWith("/work/");

export default function Loader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [entering, setEntering] = useState(true);
  const [leaving, setLeaving] = useState(false);

  const prev = useRef(pathname);
  const first = useRef(true);
  const armed = useRef(false);
  const scheduled = useRef(false);
  const startRef = useRef(0);
  const timers = useRef([]);
  const reduceRef = useRef(false);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const push = (t) => timers.current.push(t);

  const settle = () => {
    requestAnimationFrame(() => requestAnimationFrame(() => setEntering(false)));
  };

  const showNow = () => {
    clearTimers();
    scheduled.current = false;
    setLeaving(false);
    setVisible(true);
    setEntering(true);
    startRef.current = performance.now();
    settle();
    // safety: if the navigation never lands, still leave eventually
    push(setTimeout(() => scheduleLeave(), 3000));
  };

  const finish = () => { armed.current = false; scheduled.current = false; };

  const scheduleLeave = () => {
    if (scheduled.current) return;
    scheduled.current = true;
    const reduce = reduceRef.current;
    const elapsed = performance.now() - startRef.current;
    const wait = reduce ? 0 : Math.max(0, MIN_VISIBLE_MS - elapsed);
    push(setTimeout(() => {
      if (reduce) { setVisible(false); finish(); return; }
      setLeaving(true);
      push(setTimeout(() => { setVisible(false); setLeaving(false); finish(); }, SWIPE_MS));
    }, wait));
  };

  // click interceptor: cover instantly on a qualifying navigation click
  useEffect(() => {
    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest ? e.target.closest("a[href]") : null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("#")) return;
      let url;
      try { url = new URL(a.href, location.href); } catch (err) { return; }
      if (url.origin !== location.origin) return;
      const to = url.pathname, from = location.pathname;
      if (to === from) return;
      if (inWork(from) && inWork(to)) return;
      armed.current = true;
      showNow();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // first load: cover, wait for real readiness, then leave (min 1s)
  useEffect(() => {
    startRef.current = performance.now();
    setVisible(true);
    setEntering(true);
    settle();
    const ready = Promise.all([
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((r) => window.addEventListener("load", r, { once: true })),
      document.fonts ? document.fonts.ready : Promise.resolve(),
    ]);
    ready.then(scheduleLeave);
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // route changes: leave when the new page lands (or cover-then-reveal for non-click navs)
  useEffect(() => {
    if (first.current) { first.current = false; prev.current = pathname; return; }
    const from = prev.current, to = pathname;
    prev.current = to;
    if (from === to) return;
    if (inWork(from) && inWork(to)) { clearTimers(); setVisible(false); setLeaving(false); finish(); return; }
    if (!armed.current) showNow();
    scheduleLeave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!visible) return null;

  const cls = [styles.loader, entering ? styles.enter : "", leaving ? styles.leaving : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls} aria-hidden="true">
      <div className={styles.band}>
        <div className={styles.wordmark}>
          thee<span className={styles.accent}>Waweru</span>
        </div>
        <div className={styles.badge}>
          <div className={styles.pulse}>
            <img src="/theewaweru-badge.svg" alt="" width={96} height={96} />
          </div>
        </div>
        <div className={styles.label}>Digital Creative</div>
      </div>
    </div>
  );
}
