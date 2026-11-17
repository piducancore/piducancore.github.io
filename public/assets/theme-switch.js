(() => {
  const control = document.querySelector('.theme-control');
  if (!control) return;
  const select = control.querySelector('select');
  const toggle = control.querySelector('.theme-toggle');
  const auto = control.querySelector('.theme-auto');
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let busy = false;
  function sync() {
    const dark = root.dataset.theme === 'dark';
    toggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    toggle.title = `Switch to ${dark ? 'light' : 'dark'} theme`;
    auto.setAttribute('aria-pressed', String(select.value === 'system'));
  }
  async function choose(value, animate) {
    if (busy) return;
    const change = () => {
      select.value = value;
      select.dispatchEvent(new Event('change', {bubbles:true}));
      sync();
    };
    if (!animate || reduced.matches || !document.startViewTransition) { change(); return; }
    busy = true;
    const rect = toggle.getBoundingClientRect();
    const x = rect.x + rect.width / 2, y = rect.y + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth-x), Math.max(y, innerHeight-y));
    const transition = document.startViewTransition(change);
    try {
      await transition.ready;
      await root.animate({clipPath:[`circle(0px at ${x}px ${y}px)`,`circle(${radius}px at ${x}px ${y}px)`]}, {duration:650,easing:'cubic-bezier(.22,1,.36,1)',pseudoElement:'::view-transition-new(root)'}).finished;
    } catch { /* Theme still changes when transitions are unavailable. */ }
    finally { busy = false; }
  }
  toggle.addEventListener('click', () => choose(root.dataset.theme === 'dark' ? 'light' : 'dark', true));
  auto.addEventListener('click', () => choose('system', false));
  new MutationObserver(sync).observe(root, {attributes:true,attributeFilter:['data-theme']});
  window.addEventListener('storage', sync);
  document.addEventListener('DOMContentLoaded', sync);
  sync();
})();
