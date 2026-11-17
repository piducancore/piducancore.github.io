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
    if (!animate || reduced.matches || !document.startViewTransition || !CSS.supports('clip-path', 'path("M0 0H1V1H0Z")')) { change(); return; }
    busy = true;
    const rect = toggle.getBoundingClientRect();
    const x = rect.x + rect.width / 2, y = rect.y + rect.height / 2;
    // Bound the grid on large displays; tiles stay crisp instead of blurring content.
    const width = innerWidth, height = innerHeight;
    const size = Math.max(24, Math.ceil(Math.sqrt(width * height / 700)));
    const reach = Math.hypot(Math.max(x, width - x), Math.max(y, height - y));
    const tiles = [];
    for (let top = 0, row = 0; top < height; top += size, row++) {
      for (let left = 0, column = 0; left < width; left += size, column++) {
        const distance = Math.hypot(left + size / 2 - x, top + size / 2 - y) / reach;
        const scatter = ((column * 73 + row * 151 + column * row * 19) % 101) / 101;
        tiles.push({
          at: Math.min(.96, distance * .8 + scatter * .16),
          path: `M${left} ${top}H${Math.min(left + size, width)}V${Math.min(top + size, height)}H${left}Z`,
        });
      }
    }
    const frames = Array.from({length:25}, (_, index) => {
      const progress = index / 24;
      const path = tiles.filter(tile => tile.at < progress).map(tile => tile.path).join('');
      return {clipPath: `path("${path || 'M0 0H0V0Z'}")`, offset:progress, easing:'steps(1, end)'};
    });
    let transition, animation;
    const skip = () => transition?.skipTransition();
    try {
      transition = document.startViewTransition(change);
      reduced.addEventListener('change', skip);
      window.addEventListener('resize', skip, {once:true});
      await transition.ready;
      animation = root.animate(frames, {
        duration:520,
        fill:'both',
        pseudoElement:'::view-transition-new(root)',
      });
      await animation.finished;
    } catch { /* The new theme remains usable if the browser skips the effect. */ }
    finally {
      transition?.skipTransition();
      animation?.cancel();
      reduced.removeEventListener('change', skip);
      window.removeEventListener('resize', skip);
      busy = false;
    }
  }

  toggle.addEventListener('click', () => choose(root.dataset.theme === 'dark' ? 'light' : 'dark', true));
  auto.addEventListener('click', () => choose('system', false));
  new MutationObserver(sync).observe(root, {attributes:true,attributeFilter:['data-theme']});
  window.addEventListener('storage', sync);
  document.addEventListener('DOMContentLoaded', sync);
  sync();
})();
