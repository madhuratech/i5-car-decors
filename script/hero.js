  document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
      1. MEGA MENU IMAGE MAP
    ====================================================== */
    const IMG = {
      alloy_wheels:        { label: "Alloy wheels",       url: "/asset/navbar/alloywheel.png" },
      aftermarket_lights: { label: "Aftermarket lights", url: "/asset/navbar/beam.png" },
      stickerings:        { label: "Stickerings",        url: "/asset/navbar/stickering.png" },

      premium_seat_covers:{ label: "Seat covers",        url: "/asset/navbar/seatcover.png" },
      interior_lighting:  { label: "Interior lighting",  url: "/asset/navbar/interior-light.png" },
      audio_upgrades:     { label: "Audio upgrades",     url: "/asset/navbar/speakers.png" },

      led_headlamps:      { label: "LED lamps",          url: "/asset/navbar/headlight.png" },
      ambient_lighting:   { label: "Ambient light",      url: "/asset/navbar/seatlight.png" },
      sun_films:          { label: "Sun films",          url: "/asset/navbar/film.png" }
    };

    const preview = document.getElementById("megaPreview");
    const label   = document.getElementById("megaLabel");

    function updatePreview(key) {
      const data = IMG[key];
      if (!data || !preview || !label) return;
      preview.style.backgroundImage = `url('${data.url}')`;
      label.textContent = data.label;
    }

    /* =====================================================
      2. INITIAL ACTIVE ITEM
    ====================================================== */
    const activeItem = document.querySelector(".mega-item.active");
    if (activeItem) updatePreview(activeItem.dataset.key);

    /* =====================================================
      3. DESKTOP HOVER IMAGE PREVIEW
    ====================================================== */
    document.querySelectorAll(".mega-item").forEach(item => {
      item.addEventListener("mouseenter", () => {
        document.querySelectorAll(".mega-item.active")
          .forEach(i => i.classList.remove("active"));

        item.classList.add("active");
        updatePreview(item.dataset.key);
      });
    });

    /* =====================================================
      4. DISABLE DROPDOWN ON MOBILE (CRITICAL FIX)
    ====================================================== */
  /* =====================================================
   4. MOBILE NAVIGATION FIX (CRITICAL)
====================================================== */
const mq = window.matchMedia("(max-width: 991.98px)");
const dropdownLi = document.querySelector(".nav-item.dropdown.position-relative");
const desktopToggle = dropdownLi?.querySelector(".d-none.d-lg-block");
const mobileLink = dropdownLi?.querySelector(".d-lg-none");

function syncDropdownMode() {
  if (!dropdownLi || !desktopToggle || !mobileLink) return;

  if (mq.matches) {
    // 📱 MOBILE — disable desktop dropdown, enable mobile link
    dropdownLi.classList.remove("dropdown", "show");
    desktopToggle.removeAttribute("data-bs-toggle");
    desktopToggle.style.pointerEvents = "none"; // Prevent accidental clicks
    
    // Ensure mobile link can navigate
    mobileLink.style.pointerEvents = "auto";
    mobileLink.removeAttribute("data-bs-toggle"); // Remove any collapse behavior
  } else {
    // 🖥️ DESKTOP — restore dropdown
    dropdownLi.classList.add("dropdown");
    desktopToggle.setAttribute("data-bs-toggle", "dropdown");
    desktopToggle.style.pointerEvents = "auto";
  }
}

// Handle mobile link clicks explicitly
if (mobileLink) {
  mobileLink.addEventListener("click", (e) => {
    if (mq.matches) {
      // Smooth scroll to section
      e.preventDefault();
      e.stopPropagation();
      document.getElementById("exterior")?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }
  });
}

syncDropdownMode();
mq.addEventListener("change", syncDropdownMode);


    /* =====================================================
      5. MEGA MENU CLAMP (DESKTOP ONLY)
    ====================================================== */
    document.querySelectorAll(".nav-item.dropdown.position-relative")
      .forEach(drop => {

        drop.addEventListener("shown.bs.dropdown", () => {
          if (mq.matches) return;

          const menu   = drop.querySelector(".mega-menu");
          const toggle = drop.querySelector(".dropdown-toggle");
          if (!menu || !toggle) return;

          menu.style.left = "0px";
          menu.style.right = "auto";

          const vw = document.documentElement.clientWidth;
          const margin = 16;
          const menuW = menu.getBoundingClientRect().width;

          let left = toggle.getBoundingClientRect().left;
          left = Math.min(left, vw - menuW - margin);
          left = Math.max(left, margin);

          const liLeft = drop.getBoundingClientRect().left;
          menu.style.left = (left - liLeft) + "px";
        });
      });

    /* =====================================================
      6. RE-CLAMP ON RESIZE (DESKTOP)
    ====================================================== */
    window.addEventListener("resize", () => {
      if (mq.matches) return;

      const openDrop = document.querySelector(
        ".nav-item.dropdown.position-relative.show"
      );
      if (!openDrop) return;

      const menu   = openDrop.querySelector(".mega-menu");
      const toggle = openDrop.querySelector(".dropdown-toggle");
      if (!menu || !toggle) return;

      menu.style.left = "0px";
      menu.style.right = "auto";

      const vw = document.documentElement.clientWidth;
      const margin = 16;
      const menuW = menu.getBoundingClientRect().width;

      let left = toggle.getBoundingClientRect().left;
      left = Math.min(left, vw - menuW - margin);
      left = Math.max(left, margin);

      const liLeft = openDrop.getBoundingClientRect().left;
      menu.style.left = (left - liLeft) + "px";
    });
 const navbar = document.getElementById("mainNavbar");
    if (!navbar) return;

    const SCROLL_TRIGGER = 10; // px

    function setNavbarState() {
      if (window.scrollY > SCROLL_TRIGGER) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    // Run on load (refresh mid-page)
    window.addEventListener("DOMContentLoaded", setNavbarState, { passive: true });

    // Run on scroll
    window.addEventListener("scroll", setNavbarState, { passive: true });

    // Run after full load (covers some mobile/slow image layout shifts)
    window.addEventListener("load", setNavbarState, { passive: true });
  
  });
