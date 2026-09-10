// nav state + scroll progress
const nav = document.getElementById("nav");
const bar = document.getElementById("progress");
addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", scrollY > 50);
  const max = document.body.scrollHeight - innerHeight;
  bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + "%";
}, { passive: true });

// reveal on scroll
const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// cursor spotlight
const spot = document.querySelector(".spotlight");
addEventListener("pointermove", (e) => {
  spot.style.setProperty("--x", e.clientX + "px");
  spot.style.setProperty("--y", e.clientY + "px");
}, { passive: true });

// typing headline
const roles = [
  "Backend & Platform Engineer",
  "Frappe / ERPNext specialist",
  "Docker, Nix & CI plumbing",
  "Fullstack when it's needed",
];
const out = document.getElementById("typed");
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let r = 0, i = 0, erasing = false;
  (function tick() {
    const word = roles[r];
    out.textContent = word.slice(0, i);
    if (!erasing && i === word.length) { erasing = true; return setTimeout(tick, 1800); }
    if (erasing && i === 0) { erasing = false; r = (r + 1) % roles.length; }
    i += erasing ? -1 : 1;
    setTimeout(tick, erasing ? 28 : 62);
  })();
} else {
  out.textContent = roles[0];
}

document.getElementById("year").textContent = new Date().getFullYear();
