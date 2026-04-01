
(function () {
  const counters = document.querySelectorAll(".stat");
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count || "0");
    const suffix = el.dataset.suffix || "";
    const decimals = parseInt(el.dataset.decimals || "0", 10);

    const duration = 1400; // ms
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = target * progress;

      const formatted = decimals > 0
        ? value.toFixed(decimals)
        : Math.floor(value).toString();

      el.textContent = formatted + suffix;

      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  // Run once when section becomes visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(el => {
          if (!el.dataset.done) {
            el.dataset.done = "1";
            animateCounter(el);
          }
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.35 });

  // Observe the whole metrics section
  const section = document.querySelector("#key-metrics");
  if (section) observer.observe(section);
})();
