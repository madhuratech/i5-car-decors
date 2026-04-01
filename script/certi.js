
  const certModal = document.getElementById('certModal');

  certModal.addEventListener('show.bs.modal', (event) => {
    const card = event.relatedTarget;
    document.getElementById('certModalTitle').textContent = card.getAttribute('data-title');
    document.getElementById('certModalDesc').textContent  = card.getAttribute('data-desc');
    document.getElementById('certModalImg').src           = card.getAttribute('data-img');
  });

