(() => {
  const key = 'piducan-theme';
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = 'system';
  try {
    const saved = localStorage.getItem(key);
    if (['light', 'dark'].includes(saved)) preference = saved;
  } catch { /* Private browsing can disable storage. */ }
  const apply = () => {
    const theme = preference === 'system' ? (media.matches ? 'dark' : 'light') : preference;
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#191b20' : '#f5f5f0';
  };
  apply();
  media.addEventListener('change', apply);
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    preference = ['light', 'dark'].includes(event.newValue) ? event.newValue : 'system';
    apply();
    const select = document.querySelector('.theme-control select');
    if (select) select.value = preference;
  });
  document.addEventListener('DOMContentLoaded', () => {
    const control = document.querySelector('.theme-control');
    if (!control) return;
    const select = control.querySelector('select');
    select.value = preference;
    control.hidden = false;
    select.addEventListener('change', () => {
      preference = select.value;
      try {
        if (preference === 'system') localStorage.removeItem(key);
        else localStorage.setItem(key, preference);
      } catch { /* The current page still updates without persistence. */ }
      apply();
    });
  });
})();
