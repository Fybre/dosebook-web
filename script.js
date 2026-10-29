// Device tabs for the screens section, and a gentle reveal as sections scroll in.
(() => {
  const tabs = document.querySelectorAll('.tabs button');
  const panels = document.querySelectorAll('.rail');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => t.setAttribute('aria-selected', String(t === tab)));
    panels.forEach(p => { p.hidden = p.dataset.panel !== tab.dataset.tab; p.scrollLeft = 0; });
  }));

  // Scroll controls: arrows, click-and-drag, and arrow keys; a hidden scrollbar and a mouse wheel
  // that only turns vertically gave a mouse no way to move the row.
  const prev = document.querySelector('.arrow.prev'), next = document.querySelector('.arrow.next');
  const current = () => [...panels].find(p => !p.hidden);
  const refresh = () => {
    const p = current(); if (!p) return;
    const max = p.scrollWidth - p.clientWidth;
    prev.hidden = p.scrollLeft < 8; next.hidden = p.scrollLeft > max - 8;
  };
  const step = dir => { const p = current(); p.scrollBy({ left: dir * p.clientWidth * 0.7, behavior: 'smooth' }); };
  prev.addEventListener('click', () => step(-1)); next.addEventListener('click', () => step(1));
  panels.forEach(p => {
    p.addEventListener('scroll', refresh, { passive: true });
    p.addEventListener('keydown', e => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); });
    let down = false, x0 = 0, s0 = 0;
    p.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; x0 = e.clientX; s0 = p.scrollLeft; });
    addEventListener('pointerup', () => { down = false; p.classList.remove('dragging'); });
    addEventListener('pointermove', e => {
      if (!down) return;
      if (Math.abs(e.clientX - x0) > 4) p.classList.add('dragging');
      p.scrollLeft = s0 - (e.clientX - x0);
    });
  });
  tabs.forEach(t => t.addEventListener('click', () => setTimeout(refresh, 0)));
  addEventListener('resize', refresh); refresh();

  const quiet = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll('.reveal');
  if (quiet || !('IntersectionObserver' in window)) { items.forEach(i => i.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.2 });
  items.forEach((el, i) => { el.style.transitionDelay = `${(i % 3) * 70}ms`; io.observe(el); });
})();
