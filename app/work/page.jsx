"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getProjects } from "../lib/supabase/projects";
import "./work.css";

// Immersive Work picker: vertical stack (default) + horizontal filmstrip, one
// component, infinite loop, snap stepper, typewriter. Clicking the active card
// grows a colour/cover veil out of it and routes to /work/[id] so the URL
// changes (analytics) while the motion stays continuous into the project page.

export default function WorkPage() {
  const rootRef = useRef(null);
  const router = useRouter();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let on = true;
    getProjects().then(({ data }) => { if (on) setProjects(data || []); });
    return () => { on = false; };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !projects.length) return;
    const PROJECTS = projects;
    const $ = (s) => root.querySelector(s);

    const stage = $(".stage");
    const wheel = $(".wheel");
    const numEl = $(".num");
    const titleEl = $(".title");
    const clientEl = $(".clientName");
    const hTitle = $(".h-title");
    const hNum = $(".h-num");
    const hClient = $(".h-client");
    const modeV = $(".modeV");
    const modeH = $(".modeH");
    const hint = $(".hint");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let active = 0;
    let mode = "vertical";
    let cards = [];
    let navigating = false;

    let baseW = 600, baseH = 338, STEP = 200;
    let GUTTER = 72, GAP = 40, rightCount = 4;
    let ACTIVE_W = 600, ACTIVE_H = 338, hActiveScale = 1;
    let centers = [];
    let sliverCenter = -200;
    const LADDER = [1, 0.8, 0.6, 0.4, 0.2];

    const letterOf = (p) => (p.title || "?").trim().charAt(0).toUpperCase();

    // build cards (logo layer + cover layer + scrim)
    wheel.innerHTML = "";
    cards = [];
    PROJECTS.forEach(function (p, i) {
      const letter = letterOf(p);
      const c1 = p.color1 || "#15183a";
      const ink = p.logo_ink || p.color2 || "#ffffff";
      const cover = p.cover_image_url;
      const logoStyle = p.logo_url
        ? "background-color:" + c1 + "; background-image:url(" + p.logo_url + "); background-repeat:no-repeat; background-position:center; background-size:60% auto;"
        : "background-color:" + c1 + "; color:" + ink + ";";
      const logoInner = p.logo_url ? "" : '<span class="logo-mark">' + letter + ".</span>";
      const coverStyle = cover
        ? "background-image:url(" + cover + ");"
        : "background-color:" + c1 + "; color:" + (p.color2 || "#ffffff") + ";";
      const coverInner = cover ? "" : '<span class="ph-letter">' + letter + "</span>";

      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML =
        '<div class="card-logo" style="' + logoStyle + '">' + logoInner + "</div>" +
        '<div class="card-cover" style="' + coverStyle + '">' + coverInner + "</div>" +
        '<div class="card-scrim"></div>';
      card.addEventListener("click", function () {
        if (i !== active) setActive(i);
        else openProject(i);
      });
      wheel.appendChild(card);
      cards.push(card);
    });

    function layout() {
      const W = stage.clientWidth, H = stage.clientHeight;
      baseW = cards[0].clientWidth;
      baseH = baseW * 9 / 16;
      STEP = baseH * 0.62 + Math.min(40, baseH * 0.12);
      GUTTER = Math.max(20, Math.min(72, W * 0.04));
      GAP = Math.max(16, W * 0.025);
      const avail = W - GUTTER * 2;

      if (W > 1100) rightCount = 4;
      else if (W > 800) rightCount = 2;
      else rightCount = 1;

      if (W <= 800) {
        ACTIVE_W = avail * 0.78;
      } else {
        let sum = 0;
        for (let k = 0; k <= rightCount; k++) sum += LADDER[k];
        ACTIVE_W = (avail - GAP * rightCount) / sum;
      }
      ACTIVE_W = Math.min(ACTIVE_W, baseW * 1.1);
      hActiveScale = ACTIVE_W / baseW;
      ACTIVE_H = ACTIVE_W * 9 / 16;

      centers = [];
      centers[0] = GUTTER + ACTIVE_W / 2;
      for (let j = 1; j <= rightCount + 2; j++) {
        const sw = ACTIVE_W * (LADDER[j] !== undefined ? LADDER[j] : 0.2);
        const pw = ACTIVE_W * (LADDER[j - 1] !== undefined ? LADDER[j - 1] : 0.2);
        centers[j] = centers[j - 1] + pw / 2 + GAP + sw / 2;
      }

      const sliverFrac = (W <= 800) ? 0.05 : 0.10;
      sliverCenter = sliverFrac * ACTIVE_W - ACTIVE_W / 2;

      stage.style.setProperty("--ax-left", GUTTER + "px");
      stage.style.setProperty("--ax-right", (GUTTER + ACTIVE_W) + "px");
      stage.style.setProperty("--ax-top", (H / 2 - ACTIVE_H / 2) + "px");
      stage.style.setProperty("--ax-bottom", (H / 2 + ACTIVE_H / 2) + "px");

      render();
    }

    function render() {
      const n = PROJECTS.length;
      const W = stage.clientWidth;
      cards.forEach(function (c, i) {
        let t, op, z;
        const isActive = (i === active);

        if (mode === "horizontal") {
          let hoff = ((i - active) % n + n) % n;
          if (hoff > n - 2) hoff -= n;
          let scale, cx;
          if (hoff === -1) {
            scale = hActiveScale; cx = sliverCenter; op = 0.55; z = 40;
          } else {
            const lad = LADDER[hoff] !== undefined ? LADDER[hoff] : 0.2;
            scale = hActiveScale * lad;
            cx = centers[hoff];
            op = hoff === 0 ? 1 : (hoff <= rightCount ? 1 - 0.16 * hoff : 0);
            z = 100 - hoff;
          }
          const tx = cx - W / 2;
          t = "translate(-50%, -50%) translateX(" + tx + "px) scale(" + scale + ")";
        } else {
          let voff = ((i - active) % n + n) % n;
          if (voff > n / 2) voff -= n;
          const a = Math.abs(voff);
          const vscale = Math.max(0.2, 1 - a * 0.2);
          op = a === 0 ? 1 : a === 1 ? 0.85 : a === 2 ? 0.5 : a === 3 ? 0.26 : a === 4 ? 0.1 : 0;
          z = 100 - a;
          t = "translate(-50%, -50%) translateY(" + (voff * STEP) + "px) scale(" + vscale + ")";
        }

        c.style.transform = t;
        c.style.opacity = op;
        c.style.zIndex = String(z);
        c.style.pointerEvents = op > 0 ? "auto" : "none";
        c.classList.toggle("is-active", isActive);

        const cover = c.querySelector(".card-cover");
        const logo = c.querySelector(".card-logo");
        if (mode === "horizontal") {
          cover.style.opacity = isActive ? 1 : 0;
          logo.style.opacity = 1;
        } else {
          cover.style.opacity = 1;
          logo.style.opacity = 0;
        }
      });
    }

    let twToken = 0;
    function typeTitle(el, text) {
      const my = ++twToken;
      const current = el.textContent;
      let i = current.length;
      el.classList.add("caret");
      (function back() {
        if (my !== twToken) return;
        if (i > 0) { el.textContent = current.slice(0, --i); setTimeout(back, 12); }
        else fwd();
      })();
      let j = 0;
      function fwd() {
        if (my !== twToken) return;
        if (j <= text.length) { el.textContent = text.slice(0, j++); setTimeout(fwd, 28); }
        else el.classList.remove("caret");
      }
    }
    function setTitleInstant(el, text) { ++twToken; el.textContent = text; el.classList.remove("caret"); }
    function crossfade(el, value) {
      el.style.opacity = 0;
      setTimeout(function () { el.textContent = value; el.style.opacity = 1; }, 150);
    }
    function updateMeta(animate) {
      const p = PROJECTS[active];
      const nStr = String(active + 1).padStart(3, "0") + "/" + String(PROJECTS.length).padStart(3, "0");
      const T = mode === "horizontal" ? hTitle : titleEl;
      const N = mode === "horizontal" ? hNum : numEl;
      const C = mode === "horizontal" ? hClient : clientEl;
      if (animate && !reduce) { typeTitle(T, p.title); crossfade(N, nStr); crossfade(C, p.client || ""); }
      else { setTitleInstant(T, p.title); N.textContent = nStr; C.textContent = p.client || ""; }
    }

    function setActive(i) {
      const n = PROJECTS.length;
      const next = ((i % n) + n) % n;
      if (next === active) return;
      active = next;
      render();
      updateMeta(true);
      if (hint) hint.style.opacity = 0;
    }

    function setMode(m) {
      if (m === mode) return;
      mode = m;
      root.classList.toggle("mode-horizontal", m === "horizontal");
      root.classList.toggle("mode-vertical", m === "vertical");
      modeV.classList.toggle("is-on", m === "vertical");
      modeH.classList.toggle("is-on", m === "horizontal");
      layout();
      updateMeta(false);
      if (!reduce) setTimeout(function () { updateMeta(true); }, 60);
    }
    const onModeV = () => setMode("vertical");
    const onModeH = () => setMode("horizontal");
    modeV.addEventListener("click", onModeV);
    modeH.addEventListener("click", onModeH);

    let cool = false;
    function onWheel(e) {
      e.preventDefault();
      if (cool) return;
      const d = mode === "horizontal"
        ? (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY)
        : e.deltaY;
      if (!d) return;
      const dir = d > 0 ? 1 : -1;
      // Always advance one project per wheel tick. A single mouse-wheel notch
      // often reports deltaY > 140, which used to double-step (the "skip").
      // The 360ms cooldown below already prevents runaway fast scrolling.
      setActive(active + dir);
      cool = true;
      setTimeout(function () { cool = false; }, 360);
    }
    stage.addEventListener("wheel", onWheel, { passive: false });

    let touchX = null, touchY = null;
    function onTouchStart(e) { touchX = e.touches[0].clientX; touchY = e.touches[0].clientY; }
    function onTouchMove(e) { e.preventDefault(); }
    function onTouchEnd(e) {
      if (touchX === null) return;
      const t = e.changedTouches[0];
      const d = mode === "horizontal" ? (touchX - t.clientX) : (touchY - t.clientY);
      const span = mode === "horizontal" ? (ACTIVE_W * 0.4) : (STEP * 0.5);
      const steps = Math.max(-3, Math.min(3, Math.round(d / span)));
      if (steps) setActive(active + steps);
      touchX = touchY = null;
    }
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchmove", onTouchMove, { passive: false });
    stage.addEventListener("touchend", onTouchEnd);

    let dragX = null;
    function onPointerDown(e) { if (e.pointerType === "touch") return; dragX = e.clientX; }
    function onPointerUp(e) {
      if (dragX === null) return;
      const d = (mode === "horizontal") ? (dragX - e.clientX) : 0;
      if (Math.abs(d) > 40) {
        const steps = Math.max(-3, Math.min(3, Math.round(d / (ACTIVE_W * 0.4))));
        if (steps) setActive(active + steps);
      }
      dragX = null;
    }
    stage.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    function onKey(e) {
      if (e.key === "ArrowDown" || e.key === "PageDown" || (mode === "horizontal" && e.key === "ArrowRight")) { e.preventDefault(); setActive(active + 1); }
      if (e.key === "ArrowUp" || e.key === "PageUp" || (mode === "horizontal" && e.key === "ArrowLeft")) { e.preventDefault(); setActive(active - 1); }
      if (e.key === "Enter") { openProject(active); }
    }
    window.addEventListener("keydown", onKey);

    // Grow a colour/cover veil out of the active card, then route to the project.
    function openProject(i) {
      if (navigating) return;
      navigating = true;
      const p = PROJECTS[i];
      const cover = cards[i].querySelector(".card-cover");
      const rect = cover.getBoundingClientRect();
      const c1 = p.color1 || "#0d0f1d";

      const veil = document.createElement("div");
      veil.className = "tw-veil";
      veil.style.backgroundColor = c1;
      if (p.cover_image_url) veil.style.backgroundImage = "url(" + p.cover_image_url + ")";
      root.appendChild(veil);

      if (reduce) { router.push("/work/" + p.id); return; }

      const W = window.innerWidth, H = window.innerHeight;
      const sx = rect.width / W, sy = rect.height / H;
      veil.style.transformOrigin = "top left";
      veil.style.transform = "translate(" + rect.left + "px," + rect.top + "px) scale(" + sx + "," + sy + ")";
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          veil.classList.add("grow");
          veil.style.transform = "none";
        });
      });
      setTimeout(function () { router.push("/work/" + p.id); }, 380);
    }

    // init
    layout();
    updateMeta(false);
    requestAnimationFrame(function () { cards.forEach(function (c) { c.classList.add("animate"); }); });
    if (!reduce) setTimeout(function () { typeTitle(titleEl, PROJECTS[active].title); }, 250);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("resize", layout);

    return () => {
      window.removeEventListener("resize", layout);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("keydown", onKey);
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchmove", onTouchMove);
      stage.removeEventListener("touchend", onTouchEnd);
      stage.removeEventListener("pointerdown", onPointerDown);
      modeV.removeEventListener("click", onModeV);
      modeH.removeEventListener("click", onModeH);
      document.body.style.overflow = prevOverflow;
      wheel.innerHTML = "";
    };
  }, [projects]);

  return (
    <div className="tw-work mode-vertical" ref={rootRef}>
      <div className="stage">
        <div className="wheel" />

        <div className="meta-left">
          <span className="num">001</span>
          <h1 className="title" />
        </div>
        <div className="meta-right">
          <div className="client"><small>Client</small><span className="clientName" /></div>
        </div>

        <div className="h-meta h-block">
          <div className="h-num">001</div>
          <h1 className="h-title" />
        </div>
        <div className="h-meta h-client" />

        <div className="modes">
          <button type="button" className="mode is-on modeV">Vertical</button>
          <button type="button" className="mode modeH">Horizontal</button>
        </div>

        <div className="hint">Scroll / swipe &middot; click to open</div>
      </div>
    </div>
  );
}
