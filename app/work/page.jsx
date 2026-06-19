"use client";
import { useEffect, useRef, useState } from "react";
import { getProjects } from "../lib/supabase/projects";
import "./work.css";

// Immersive Work picker: vertical stack (default) + horizontal filmstrip, one
// component, infinite loop, snap stepper, typewriter. Clicking the active card
// opens an IN-PAGE inner overlay: the cover grows (FLIP) from the card into a
// full-width hero, the details slide in, and "Back to Work" retracts the cover
// back into the slider. The URL is synced to /work/[id] via the History API
// (so analytics fire and the address reflects the project) while the slider
// stays mounted underneath; the real /work/[id] route still serves direct
// links, refresh and SEO.

const PLACEHOLDER = "/images/placeholder.jpg";

export default function WorkPage() {
  const rootRef = useRef(null);
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
      if (cool || isOpen) return;
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
      if (touchX === null || isOpen) { touchX = touchY = null; return; }
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
    function onPointerDown(e) { if (e.pointerType === "touch" || isOpen) return; dragX = e.clientX; }
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
      if (isOpen) {
        if (e.key === "Escape") { e.preventDefault(); history.back(); }
        return;
      }
      if (e.key === "ArrowDown" || e.key === "PageDown" || (mode === "horizontal" && e.key === "ArrowRight")) { e.preventDefault(); setActive(active + 1); }
      if (e.key === "ArrowUp" || e.key === "PageUp" || (mode === "horizontal" && e.key === "ArrowLeft")) { e.preventDefault(); setActive(active - 1); }
      if (e.key === "Enter") { openProject(active); }
    }
    window.addEventListener("keydown", onKey);

    // ---------- inner overlay (FLIP grow + retract, URL synced) ----------
    const inner = document.createElement("div");
    inner.className = "tw-inner";
    inner.hidden = true;
    root.appendChild(inner);
    let isOpen = false;
    let savedRect = null;

    const esc = (s) => String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

    function buildInner(p) {
      const letter = letterOf(p);
      const c1 = p.color1 || "#0d0f1d";
      const c2 = p.color2 || "#f2f2ef";
      const cover = p.cover_image_url;
      const tags = Array.isArray(p.tags) ? p.tags.filter(Boolean) : [];
      const body = (p.full_description || p.description || "").split(/\n{2,}/).filter(Boolean);
      const hasLink = Boolean(p.live_url);
      const gallery = Array.isArray(p.gallery) ? p.gallery.filter(Boolean) : [];
      const shots = gallery.length ? gallery : [PLACEHOLDER, PLACEHOLDER];
      const facts = [
        ["Client", p.client], ["Build", p.build], ["Site Type", p.site_type],
        ["Work", p.work], ["Timeline", p.timeline],
      ].filter(function (f) { return f[1]; });

      const heroStyle = cover
        ? "background-image:url(" + cover + ");"
        : "background-color:" + c1 + ";color:" + c2 + ";";
      const heroInner = cover ? "" : '<span class="ph-letter">' + esc(letter) + "</span>";

      const tagsHead = tags.length
        ? '<ul class="proj-tags">' + tags.map(function (t) { return "<li><span>" + esc(t) + "</span></li>"; }).join("") + "</ul>"
        : "";
      const bodyHtml = body.length
        ? body.map(function (para) { return "<p>" + esc(para) + "</p>"; }).join("")
        : "<p>" + esc(p.description) + "</p>";
      const chips = tags.length
        ? '<ul class="proj-chips">' + tags.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>"
        : "";
      const factsHtml = facts.length
        ? '<aside class="proj-facts">' + facts.map(function (f) {
          return '<div class="fact"><span class="fact-k">' + esc(f[0]) + '</span><span class="fact-v">' + esc(f[1]) + "</span></div>";
        }).join("") + "</aside>"
        : "";
      const galleryHtml = shots.map(function (src) {
        return '<div class="proj-shot" style="background-image:url(' + src + ')"></div>';
      }).join("");
      const note = !hasLink
        ? '<p class="proj-note proj-chrome">A live link isn&apos;t available for this one. Many client builds are private, behind a login, or have since been rebranded or taken down. If you&apos;d like a closer look, reach out and I&apos;ll gladly walk you through the work.</p>'
        : "";
      const footPrimary = hasLink
        ? '<a href="' + esc(p.live_url) + '" target="_blank" rel="noreferrer" class="btn btn-accent">View Site &#8599;</a>'
        : '<a href="/contact" class="btn btn-accent">Ask Me About This Project</a>';

      return '' +
        '<article class="proj-page">' +
        '<header class="proj-band proj-chrome">' +

        '<div class="proj-head">' +
        '<div class="proj-head-main">' +
        '<h1 class="proj-title" style="color:' + c2 + '">' + esc(p.title) + "</h1>" +
        '<p class="proj-excerpt">' + esc(p.description) + "</p>" +
        "</div>" +
        tagsHead +
        "</div>" +
        "</header>" +
        '<div class="proj-crumbs">' +
        '<button type="button" class="btn btn-primary inner-back">Back to Work</button>' +
        "</div>" +
        '<figure class="proj-hero">' +
        '<div class="proj-hero-img" style="' + heroStyle + '">' + heroInner + "</div>" +
        "</figure>" +
        '<section class="proj-overview proj-chrome">' +
        '<div class="proj-overview-main">' +
        '<h2 class="proj-h2">Overview</h2>' + bodyHtml + chips +
        "</div>" +
        factsHtml +
        "</section>" +
        '<section class="proj-gallery proj-chrome">' + galleryHtml + "</section>" +
        note +
        '<div class="proj-foot proj-chrome">' + footPrimary +
        '<a href="/contact" class="btn btn-ghost">Start a Project</a>' +
        "</div>" +
        "</article>";
    }

    function openProject(i) {
      if (isOpen) return;
      const p = PROJECTS[i];
      const coverEl = cards[i].querySelector(".card-cover");
      const first = coverEl.getBoundingClientRect();
      savedRect = first;

      inner.innerHTML = buildInner(p);
      // the fixed overlay covers the global footer, so clone it in (its
      // background is matched to the inner-page body in work.css).
      const siteFooter = document.querySelector("footer.site-footer");
      if (siteFooter) {
        const footerClone = siteFooter.cloneNode(true);
        footerClone.classList.add("proj-chrome");
        inner.appendChild(footerClone);
      }
      inner.hidden = false;
      inner.scrollTop = 0;
      inner.classList.remove("revealed");
      stage.classList.add("dimmed");
      isOpen = true;

      // sync the URL + analytics without unmounting the slider
      history.pushState({ twInner: p.id }, "", "/work/" + p.id);

      const heroImg = inner.querySelector(".proj-hero-img");
      if (reduce || !heroImg) { inner.classList.add("revealed"); return; }

      const last = heroImg.getBoundingClientRect();
      const dx = first.left - last.left, dy = first.top - last.top;
      const sx = first.width / last.width, sy = first.height / last.height;
      heroImg.style.transition = "none";
      heroImg.style.transform = "translate(" + dx + "px," + dy + "px) scale(" + sx + "," + sy + ")";
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          heroImg.style.transition = "transform 0.72s cubic-bezier(0.22,1,0.36,1)";
          heroImg.style.transform = "none";
        });
      });
      const done = function () { inner.classList.add("revealed"); heroImg.removeEventListener("transitionend", done); };
      heroImg.addEventListener("transitionend", done);
      setTimeout(done, 820);
    }

    function closeProject() {
      if (!isOpen) return;
      inner.classList.remove("revealed");
      const heroImg = inner.querySelector(".proj-hero-img");
      const coverEl = cards[active] ? cards[active].querySelector(".card-cover") : null;
      const f = coverEl ? coverEl.getBoundingClientRect() : savedRect;

      const finishHide = function () {
        inner.hidden = true;
        inner.innerHTML = "";
        stage.classList.remove("dimmed");
        isOpen = false;
        savedRect = null;
      };

      if (reduce || !f || !heroImg) { finishHide(); return; }
      const last = heroImg.getBoundingClientRect();
      const dx = f.left - last.left, dy = f.top - last.top;
      const sx = f.width / last.width, sy = f.height / last.height;
      heroImg.style.transition = "transform 0.5s cubic-bezier(0.4,0,0.2,1)";
      heroImg.style.transform = "translate(" + dx + "px," + dy + "px) scale(" + sx + "," + sy + ")";
      setTimeout(finishHide, 520);
    }

    // "Back to Work" goes through history so the URL returns to /work and the
    // retract plays via the popstate handler (single path for button + browser back).
    function onInnerClick(e) {
      const back = e.target.closest ? e.target.closest(".inner-back") : null;
      if (back) { e.preventDefault(); history.back(); }
    }
    inner.addEventListener("click", onInnerClick);

    function onPopState() { if (isOpen) closeProject(); }
    window.addEventListener("popstate", onPopState);

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
      window.removeEventListener("popstate", onPopState);
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchmove", onTouchMove);
      stage.removeEventListener("touchend", onTouchEnd);
      stage.removeEventListener("pointerdown", onPointerDown);
      modeV.removeEventListener("click", onModeV);
      modeH.removeEventListener("click", onModeH);
      inner.removeEventListener("click", onInnerClick);
      if (inner.parentNode) inner.parentNode.removeChild(inner);
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
