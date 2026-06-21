// app/components/Lightbox/lightbox.js
// Framework-agnostic gallery lightbox: fullscreen viewer with prev/next,
// keyboard, counter, close on Esc/backdrop/X, and a FLIP grow-from-tile
// entrance. Shared by the work overlay (vanilla) and the /work/[id] route
// gallery (React) so both behave identically. A single instance is reused.

let lb = null;

function build() {
  if (lb) return lb;
  const root = document.createElement("div");
  root.className = "lb";
  root.setAttribute("aria-hidden", "true");
  root.innerHTML =
    '<div class="lb-backdrop"></div>' +
    '<button type="button" class="lb-close" aria-label="Close">&#215;</button>' +
    '<button type="button" class="lb-nav lb-prev" aria-label="Previous image">&#8249;</button>' +
    '<button type="button" class="lb-nav lb-next" aria-label="Next image">&#8250;</button>' +
    '<figure class="lb-stage"><img class="lb-img" alt="" /></figure>' +
    '<div class="lb-counter"></div>';
  document.body.appendChild(root);
  lb = {
    root: root,
    img: root.querySelector(".lb-img"),
    counter: root.querySelector(".lb-counter"),
    backdrop: root.querySelector(".lb-backdrop"),
    prev: root.querySelector(".lb-prev"),
    next: root.querySelector(".lb-next"),
    closeBtn: root.querySelector(".lb-close"),
    list: [],
    index: 0,
    open: false,
    prevOverflow: "",
  };
  lb.closeBtn.addEventListener("click", close);
  lb.backdrop.addEventListener("click", close);
  lb.prev.addEventListener("click", function () { step(-1); });
  lb.next.addEventListener("click", function () { step(1); });
  // capture phase so Esc/arrows beat the work overlay's own key handler
  document.addEventListener("keydown", onKey, true);
  return lb;
}

function onKey(e) {
  if (!lb || !lb.open) return;
  if (e.key === "Escape") { e.stopPropagation(); close(); }
  else if (e.key === "ArrowLeft") { e.stopPropagation(); step(-1); }
  else if (e.key === "ArrowRight") { e.stopPropagation(); step(1); }
}

function setCounter() {
  lb.counter.textContent = (lb.index + 1) + " / " + lb.list.length;
}

function paint() {
  lb.img.src = lb.list[lb.index] || "";
  setCounter();
  const multi = lb.list.length > 1;
  lb.prev.style.display = multi ? "" : "none";
  lb.next.style.display = multi ? "" : "none";
  lb.counter.style.display = multi ? "" : "none";
}

function step(d) {
  if (!lb || lb.list.length < 2) return;
  lb.index = (lb.index + d + lb.list.length) % lb.list.length;
  const url = lb.list[lb.index];
  lb.img.style.transition = "opacity .18s ease";
  lb.img.style.transform = "";
  lb.img.style.opacity = "0";
  const swap = function () {
    lb.img.src = url;
    setCounter();
    requestAnimationFrame(function () { lb.img.style.opacity = "1"; });
  };
  const pre = new Image();
  pre.onload = swap;
  pre.onerror = swap;
  pre.src = url;
}

export function openLightbox(list, index, sourceEl) {
  if (!Array.isArray(list) || !list.length) return;
  build();
  lb.list = list.slice();
  lb.index = Math.max(0, Math.min(index || 0, lb.list.length - 1));
  lb.open = true;
  lb.img.style.transition = "";
  lb.img.style.transform = "";
  lb.img.style.opacity = "1";
  paint();
  lb.root.classList.add("open");
  lb.root.setAttribute("aria-hidden", "false");
  lb.prevOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !sourceEl) return;
  const first = sourceEl.getBoundingClientRect();
  const flip = function () {
    const last = lb.img.getBoundingClientRect();
    if (!last.width || !last.height) return;
    const dx = first.left - last.left, dy = first.top - last.top;
    const sx = first.width / last.width, sy = first.height / last.height;
    lb.img.style.transformOrigin = "top left";
    lb.img.style.transition = "none";
    lb.img.style.transform = "translate(" + dx + "px," + dy + "px) scale(" + sx + "," + sy + ")";
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        lb.img.style.transition = "transform .42s cubic-bezier(.22,1,.36,1)";
        lb.img.style.transform = "none";
      });
    });
  };
  if (lb.img.complete && lb.img.naturalWidth) requestAnimationFrame(flip);
  else lb.img.addEventListener("load", function once() { lb.img.removeEventListener("load", once); requestAnimationFrame(flip); });
}

function close() {
  if (!lb || !lb.open) return;
  lb.open = false;
  lb.root.classList.remove("open");
  lb.root.setAttribute("aria-hidden", "true");
  document.body.style.overflow = lb.prevOverflow;
  lb.img.style.transition = "";
  lb.img.style.transform = "";
}

export function closeLightbox() { close(); }
