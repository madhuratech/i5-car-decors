 const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('show');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Modal loader
  const modal = document.getElementById('galleryModal');
  modal.addEventListener('show.bs.modal', (event) => {
    const card = event.relatedTarget;
    document.getElementById('galleryModalTitle').textContent = card.getAttribute('data-title');
    document.getElementById('galleryModalDesc').textContent  = card.getAttribute('data-desc');
    document.getElementById('galleryModalImg').src           = card.getAttribute('data-img');
  });