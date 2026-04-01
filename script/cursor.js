(() => {
  const cursor = document.querySelector('.light-cursor');
  if (!cursor) return;

  // Only enable on devices with a real mouse/trackpad
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!finePointer.matches) return;

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  let rafId = null;

  const render = () => {
    // smoothing factor: 0.18 (increase = snappier)
    currentX += (targetX - currentX) * 0.18;
    currentY += (targetY - currentY) * 0.18;
    cursor.style.left = currentX + 'px';
    cursor.style.top  = currentY + 'px';
    rafId = requestAnimationFrame(render);
  };

  const onMove = (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    cursor.style.opacity = '1';
    if (!rafId) rafId = requestAnimationFrame(render);
  };

  window.addEventListener('mousemove', onMove, { passive: true });

  window.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
  window.addEventListener('mousedown', () => cursor.classList.add('is-down'));
  window.addEventListener('mouseup',   () => cursor.classList.remove('is-down'));
})();

