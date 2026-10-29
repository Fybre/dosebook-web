// Device tabs for the screens section, and a gentle reveal as sections scroll in.
(() => {
  const tabs = document.querySelectorAll('.tabs button');
  const panels = document.querySelectorAll('.rail');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => t.setAttribute('aria-selected', String(t === tab)));
    panels.forEach(p => { p.hidden = p.dataset.panel !== tab.dataset.tab; p.scrollLeft = 0; });
  }));

  const quiet = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll('.reveal');
  if (quiet || !('IntersectionObserver' in window)) { items.forEach(i => i.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.2 });
  items.forEach((el, i) => { el.style.transitionDelay = `${(i % 3) * 70}ms`; io.observe(el); });
})();
