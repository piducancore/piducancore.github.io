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
})();
