(() => {
  const filters = document.querySelector('.filters');
  if (filters) {
    filters.hidden = false;
    filters.addEventListener('click', event => {
      const button = event.target.closest('[data-filter]');
      if (!button) return;
      const category = button.dataset.filter;
      filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      let count = 0;
      document.querySelectorAll('.project-row').forEach(row => {
        row.hidden = category !== 'All' && row.dataset.category !== category;
        if (!row.hidden) count++;
      });
      document.querySelector('[data-filter-status]').textContent = `${count} ${category === 'All' ? '' : category.toLowerCase() + ' '}projects shown.`;
    });
  }
  const wave = document.querySelector('[data-wave]');
  const remix = document.querySelector('[data-remix]');
  if (wave && remix) {
    let variation = 0;
    const render = () => {
      const ns = 'http://www.w3.org/2000/svg';
      const fragment = document.createDocumentFragment();
      for (let line = 0; line < 24; line++) {
        const path = document.createElementNS(ns, 'path');
        let d = '';
        for (let x = -30; x <= 1230; x += 6) {
          const envelope = Math.sin(x / 1200 * Math.PI);
          const y = 110 + (line - 12) * 5 + Math.sin(x / (95 + variation * 7) + line * .13 + variation) * 65 * envelope + Math.cos(x / 55 + line * .08) * 22 * envelope;
          d += `${x === -30 ? 'M' : 'L'}${x},${y.toFixed(2)} `;
        }
        path.setAttribute('d', d);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', line % 7 === 0 ? '#bd340b' : '#293ccb');
        path.setAttribute('stroke-width', '1.3');
        fragment.append(path);
      }
      wave.replaceChildren(fragment);
    };
    render();
    remix.hidden = false;
    remix.addEventListener('click', () => {
      variation = (variation + 1) % 8;
      render();
      document.querySelector('[data-signal-status]').textContent = `Signal pattern ${variation + 1} of 8.`;
    });
  }
})();
