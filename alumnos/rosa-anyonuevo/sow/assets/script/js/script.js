if ("scrollRestoration" in history) history.scrollRestoration = "manual";
if (location.hash) {
  history.replaceState(null, "", location.pathname + location.search);
}
window.scrollTo(0, 0);


const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("reveal");
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".site-section, .screenshots img").forEach(el => observer.observe(el));

(function () {
  const grids = document.querySelectorAll(".screenshots");
  const items = [];

  grids.forEach(grid => {
    grid.querySelectorAll("img").forEach(img => {
      items.push({
        img,
        src: img.getAttribute("src"),
        alt: img.getAttribute("alt") || ""
      });
    });
  });

  if (!items.length) return;

  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lb-img");
  const lbCaption = document.getElementById("lb-caption");
  const btnPrev = lb.querySelector(".lb__prev");
  const btnNext = lb.querySelector(".lb__next");
  const closers = lb.querySelectorAll("[data-lb-close]");
  let idx = 0;
  let lastFocus = null;

  function openAt(i) {
    idx = i;
    update();
    lb.hidden = false;
    document.body.classList.add("lb-open");
    lastFocus = document.activeElement;
    btnNext.focus();
    trap(true);
  }

  function closeLb() {
    lb.hidden = true;
    document.body.classList.remove("lb-open");
    trap(false);
    if (lastFocus) lastFocus.focus();
  }

  function update() {
    const it = items[idx];
    lbImg.src = it.src;
    lbImg.alt = it.alt;
    lbCaption.textContent = it.alt;
  }

  function prev(e) {
    if (e) e.stopPropagation();
    idx = (idx - 1 + items.length) % items.length;
    update();
  }

  function next(e) {
    if (e) e.stopPropagation();
    idx = (idx + 1) % items.length;
    update();
  }

  items.forEach((it, i) => {
    it.img.style.cursor = "zoom-in";
    it.img.setAttribute("tabindex", it.img.getAttribute("tabindex") ?? "0");
    it.img.addEventListener("click", () => openAt(i));
    it.img.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openAt(i);
      }
    });
  });

  btnPrev.addEventListener("click", prev);
  btnNext.addEventListener("click", next);

  closers.forEach(el => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      closeLb();
    });
  });

  window.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    else if (e.key === "ArrowLeft") prev(e);
    else if (e.key === "ArrowRight") next(e);
  });

  function trap(enable) {
    const focusables = lb.querySelectorAll(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    function onKey(e) {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    if (enable) lb.addEventListener("keydown", onKey);
    else lb.removeEventListener("keydown", onKey);
  }
})();

(function () {
  document.documentElement.classList.add("has-js");

  const targets = document.querySelectorAll(".site-section, .intro-section, .screenshots img");

  function reveal(el) {
    el.classList.add("reveal");
  }

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((ent) => {
        if (ent.isIntersecting) {
          reveal(ent.target);
          io.unobserve(ent.target);
        }
      });
    }, {
      root: null,
      rootMargin: "0px 0px -10% 0px",
      threshold: 0
    });

    targets.forEach((el) => io.observe(el));

    window.addEventListener("load", () => {
      targets.forEach((el) => {
        const r = el.getBoundingClientRect();
        const inView = r.top < window.innerHeight * 0.9 && r.bottom > 0;
        if (inView) reveal(el);
      });
    });
  } else {
    targets.forEach(reveal);
  }
})();
