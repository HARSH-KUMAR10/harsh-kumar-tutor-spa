// =============================================
//   HARSH KUMAR — TUTOR SPA  |  script.js
// =============================================

// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", isOpen);
    menuBtn.textContent = isOpen ? "✕" : "☰";
  });

  // Close mobile menu on nav link click
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuBtn.textContent = "☰";
      menuBtn.setAttribute("aria-expanded", false);
    });
  });
}

// Close mobile menu on outside click
document.addEventListener("click", (e) => {
  if (
    mobileMenu &&
    !mobileMenu.contains(e.target) &&
    !menuBtn.contains(e.target)
  ) {
    mobileMenu.classList.remove("open");
    menuBtn.textContent = "☰";
  }
});

// Active nav link highlight on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".desktop-nav a");

const observerOptions = {
  root: null,
  rootMargin: "-40% 0px -50% 0px",
  threshold: 0,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${entry.target.id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}, observerOptions);

sections.forEach((section) => observer.observe(section));

// Scroll-triggered fade-in for cards
const fadeEls = document.querySelectorAll(
  ".outcome-card, .program-card, .success-card, .review-card, .review-screenshot-card, .journey-step",
);

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

fadeEls.forEach((el, i) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = `opacity .45s ease ${i * 0.06}s, transform .45s ease ${i * 0.06}s`;
  fadeObserver.observe(el);
});

// Respect reduced motion preference
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  fadeEls.forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "none";
    el.style.transition = "none";
  });
}
