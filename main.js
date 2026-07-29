// Shree Pragati English Boarding School — site behavior
document.addEventListener("DOMContentLoaded", function () {
  var navbar = document.querySelector(".navbar-custom");
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  // Shadow the navbar once the page has scrolled
  function onScroll() {
    if (window.scrollY > 12) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
      });
    });
  }

  // Reveal-on-scroll for cards and sections
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // Gallery lightbox
  var polaroids = document.querySelectorAll(".polaroid");
  var lightbox = document.querySelector(".lightbox");
  if (polaroids.length && lightbox) {
    var lbPhoto = lightbox.querySelector(".lightbox-photo");
    var lbCaption = lightbox.querySelector(".lightbox-caption");
    var lbClose = lightbox.querySelector(".lightbox-close");

    function openLightbox(el) {
      var photoEl = el.querySelector(".polaroid-photo");
      var caption = el.querySelector(".polaroid-caption").textContent;
      lbPhoto.setAttribute("style", photoEl.getAttribute("style") || "");
      lbPhoto.innerHTML = photoEl.innerHTML;
      lbCaption.textContent = caption;
      lightbox.classList.add("open");
    }

    function closeLightbox() {
      lightbox.classList.remove("open");
    }

    polaroids.forEach(function (el) {
      el.setAttribute("tabindex", "0");
      el.setAttribute("role", "button");
      el.addEventListener("click", function () { openLightbox(el); });
      el.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(el);
        }
      });
    });

    lbClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  }
});
