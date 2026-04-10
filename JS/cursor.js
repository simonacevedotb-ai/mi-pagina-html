// ══════════════════════════════════════
// CURSOR PERSONALIZADO — estilo codewonders
// Punto pequeño exacto + círculo grande con lag
// ══════════════════════════════════════

(function () {
  // Crear los dos elementos del cursor
  const dot = document.createElement('div');
  dot.id = 'cursor-dot';

  const ring = document.createElement('div');
  ring.id = 'cursor-ring';

  document.body.appendChild(dot);
  document.body.appendChild(ring);

  // Posición real del mouse
  let mouseX = -100, mouseY = -100;
  // Posición suavizada del anillo
  let ringX = -100, ringY = -100;

  // Actualizar posición del punto instantáneamente
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  // Animar el anillo con lerp (interpolación suave)
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Efecto hover: el anillo crece y se rellena levemente
  const hoverTargets = 'a, button, [role="button"], input, textarea';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      dot.classList.add('cursor-hover');
      ring.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      dot.classList.remove('cursor-hover');
      ring.classList.remove('cursor-hover');
    }
  });

  // Ocultar cursor nativo
  document.documentElement.style.cursor = 'none';

  // Asegurarse de que los elementos interactivos tampoco muestren cursor nativo
  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after { cursor: none !important; }

    #cursor-dot {
      position: fixed;
      top: -4px;
      left: -4px;
      width: 8px;
      height: 8px;
      background: #ffffff;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      will-change: transform;
      transition: width 0.2s ease, height 0.2s ease, top 0.2s ease, left 0.2s ease, background 0.2s ease;
    }

    #cursor-ring {
      position: fixed;
      top: -27px;
      left: -27px;
      width: 55px;
      height: 55px;
      border: 1.5px solid rgba(255, 255, 255, 0.6);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99998;
      will-change: transform;
      transition: width 0.3s ease, height 0.3s ease, top 0.3s ease, left 0.3s ease, border-color 0.3s ease, background 0.3s ease;
    }

    #cursor-dot.cursor-hover {
      width: 12px;
      height: 12px;
      top: -6px;
      left: -6px;
      background: rgb(148, 231, 233);
    }

    #cursor-ring.cursor-hover {
      width: 72px;
      height: 72px;
      top: -36px;
      left: -36px;
      border-color: rgba(148, 231, 233, 0.5);
      background: rgba(148, 231, 233, 0.06);
    }
  `;
  document.head.appendChild(style);
})();