/* ==========================================================================
   CAPTURE COMPLETE — main.js
   Nav, scroll-reveal, before/after-slider, projectkaarten, contactformulier
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Mobiel menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Header: solide na scrollen ---------- */
  var header = document.querySelector(".site-header");
  if (header && !header.classList.contains("no-hero")) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Scroll-reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Bouwprojecten: uitklappen ---------- */
  document.querySelectorAll(".project-trigger").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".project-item");
      var wasOpen = item.classList.contains("is-open");
      document.querySelectorAll(".project-item.is-open").forEach(function (open) {
        if (open !== item) open.classList.remove("is-open");
      });
      item.classList.toggle("is-open", !wasOpen);
      btn.setAttribute("aria-expanded", !wasOpen ? "true" : "false");
    });
  });

  /* ---------- Before/after slider ---------- */
  document.querySelectorAll(".ba-slider").forEach(function (slider) {
    var range = slider.querySelector(".ba-range");
    var before = slider.querySelector(".ba-before");
    var handle = slider.querySelector(".ba-handle");
    if (!range || !before || !handle) return;

    function update(value) {
      before.style.clipPath = "inset(0 " + (100 - value) + "% 0 0)";
      handle.style.left = value + "%";
    }
    range.addEventListener("input", function () { update(range.value); });
    update(range.value || 50);
  });

  /* ---------- Contactformulier (Formspree, AJAX zodat bezoeker op de pagina blijft) ---------- */
  var form = document.getElementById("offerte-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("form-status");
      var submitBtn = form.querySelector("button[type='submit']");
      var data = new FormData(form);

      submitBtn.disabled = true;
      submitBtn.textContent = "Versturen…";

      fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            status.textContent = "Bedankt! Je aanvraag is verstuurd, ik neem snel contact op.";
            status.className = "form-status is-success";
          } else {
            return response.json().then(function (json) {
              throw new Error(
                json && json.errors ? json.errors.map(function (er) { return er.message; }).join(", ") : "Versturen mislukt."
              );
            });
          }
        })
        .catch(function () {
          status.textContent = "Er ging iets mis bij het versturen. Probeer het opnieuw of app me direct.";
          status.className = "form-status is-error";
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = "Verstuur aanvraag";
        });
    });
  }

  /* ---------- Click-to-play one-take video's (werk.html) ---------- */
  document.querySelectorAll(".work-item .play-btn").forEach(function (btn) {
    var item = btn.closest(".work-item");
    var video = item.querySelector("video");
    if (!video) return;
    btn.addEventListener("click", function () {
      // pauzeer eventuele andere lopende video's in de grid
      document.querySelectorAll(".work-item.is-playing video").forEach(function (v) {
        if (v !== video) v.pause();
      });
      video.muted = false;
      video.controls = true; // geeft de kijker volledige controle: pauzeren, hervatten, spoelen, volume
      video.play();
      item.classList.add("is-playing"); // verbergt de grote play-knop; komt niet meer terug

      // Open de video volledig (fullscreen) zodat 'm niet meer bijgesneden wordt getoond
      if (video.requestFullscreen) {
        video.requestFullscreen().catch(function () {});
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.webkitEnterFullscreen) {
        // iOS Safari: alleen <video> zelf kan fullscreen, niet een willekeurig element
        video.webkitEnterFullscreen();
      }
    });
  });

  /* ---------- Lightbox: kunstfoto's volledig openen (kunst.html) ---------- */
  var artItems = document.querySelectorAll(".art-item");
  if (artItems.length) {
    var lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML =
      '<div class="lightbox-inner">' +
        '<button class="lightbox-close" type="button" aria-label="Sluiten"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
        '<button class="lightbox-nav lightbox-prev" type="button" aria-label="Vorige foto"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>' +
        '<img src="" alt="">' +
        '<button class="lightbox-nav lightbox-next" type="button" aria-label="Volgende foto"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>' +
        '<div class="lightbox-caption"><div class="t"></div><div class="p"></div></div>' +
      '</div>';
    document.body.appendChild(lightbox);

    var lbImg = lightbox.querySelector("img");
    var lbTitle = lightbox.querySelector(".t");
    var lbPrice = lightbox.querySelector(".p");
    var lbClose = lightbox.querySelector(".lightbox-close");
    var lbPrev = lightbox.querySelector(".lightbox-prev");
    var lbNext = lightbox.querySelector(".lightbox-next");

    var artData = Array.prototype.map.call(artItems, function (el) {
      var img = el.querySelector("img");
      var t = el.querySelector(".art-info .t");
      var p = el.querySelector(".art-info .p");
      return {
        src: img ? img.getAttribute("src") : "",
        alt: img ? img.getAttribute("alt") : "",
        title: t ? t.textContent : "",
        price: p ? p.textContent : "",
      };
    });

    var currentArt = 0;

    function showArt(index) {
      currentArt = (index + artData.length) % artData.length;
      var it = artData[currentArt];
      lbImg.src = it.src;
      lbImg.alt = it.alt;
      lbTitle.textContent = it.title;
      lbPrice.textContent = it.price;
    }

    function openLightbox(index) {
      showArt(index);
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    artItems.forEach(function (el, i) {
      el.addEventListener("click", function () { openLightbox(i); });
    });

    lbClose.addEventListener("click", closeLightbox);
    lbPrev.addEventListener("click", function () { showArt(currentArt - 1); });
    lbNext.addEventListener("click", function () { showArt(currentArt + 1); });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showArt(currentArt - 1);
      if (e.key === "ArrowRight") showArt(currentArt + 1);
    });
  }
})();
