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

const batchNoElement = document.getElementById("batch-no");
const monthElement = document.getElementById("month");
const yearElement = document.getElementById("year");
const seatsLeftElement = document.getElementById("seats-left");

const batchNo1Element = document.getElementById("batch-no1");
const month1Element = document.getElementById("month1");
const year1Element = document.getElementById("year1");
const seatsLeft1Element = document.getElementById("seats-left1");

function getMonthName(monthNumber) {
  if (monthNumber === 1) return "January";
  else if (monthNumber === 2) return "February";
  else if (monthNumber === 3) return "March";
  else if (monthNumber === 4) return "April";
  else if (monthNumber === 5) return "May";
  else if (monthNumber === 6) return "June";
  else if (monthNumber === 7) return "July";
  else if (monthNumber === 8) return "August";
  else if (monthNumber === 9) return "September";
  else if (monthNumber === 10) return "October";
  else if (monthNumber === 11) return "November";
  else if (monthNumber === 12) return "December";
}

function getSeatsLeft(date) {
  if (date <= 13) {
    return 3;
  } else if (date <= 18) {
    return 2;
  } else if (date <= 23) {
    return 1;
  }
}

function getBatch(month, year) {
  console.log("===> getBatch:", month, year, year % 2026);
  const yearBatchCount = (year % 2026) * 6;
  console.log("===> batch: ", Math.ceil((month + 1) / 2) + yearBatchCount);
  return Math.ceil((month + 1) / 2) + yearBatchCount;
}

function init() {
  const currentDate = new Date();
  const monthNo = currentDate.getMonth();
  const monthName = getMonthName(monthNo + 1);
  const year = currentDate.getFullYear();
  const date = currentDate.getDate();
  const seatsLeft = getSeatsLeft(date);
  const batchNo = getBatch(monthNo, year);
  batchNoElement.innerHTML = batchNo;
  monthElement.innerHTML = monthName;
  yearElement.innerHTML = year;
  seatsLeftElement.innerHTML = seatsLeft;

  batchNo1Element.innerHTML = batchNo;
  month1Element.innerHTML = monthName;
  year1Element.innerHTML = year;
  seatsLeft1Element.innerHTML = seatsLeft;
}

init();
