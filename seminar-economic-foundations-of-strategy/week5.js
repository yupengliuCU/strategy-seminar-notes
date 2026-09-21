'use strict';
(() => {
  const form = document.querySelector('[data-filter-form]');
  if (!form) return;
  const items = [...document.querySelectorAll('[data-record]')];
  const search = form.querySelector('input[type="search"]');
  const selects = [...form.querySelectorAll('select[data-field]')];
  const count = document.querySelector('[data-result-count]');
  const empty = document.querySelector('[data-empty]');
  const normalized = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const texts = new Map(items.map(item => [item, normalized(item.textContent)]));
  function filter() {
    const terms = normalized(search.value).trim().split(/\s+/).filter(Boolean);
    let visible = 0;
    for (const item of items) {
      const matched = terms.every(term => texts.get(item).includes(term)) && selects.every(select =>
        !select.value || (item.dataset[select.dataset.field] || '').split('|').includes(select.value));
      item.hidden = !matched;
      if (matched) visible += 1;
    }
    count.textContent = `${visible} of ${items.length} ${form.dataset.unit || 'publications'}`;
    empty.hidden = visible !== 0;
  }
  function revealHash() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    if (!id) return;
    const target = document.getElementById(id);
    const item = target?.closest('[data-record]');
    if (!item) return;
    form.reset();
    filter();
    const details = item.querySelector('details');
    if (details) details.open = true;
    requestAnimationFrame(() => item.scrollIntoView({block:'start'}));
  }
  const params = new URLSearchParams(location.search);
  search.value = params.get('q') || '';
  for (const select of selects) {
    const value = params.get(select.dataset.field);
    if (value && [...select.options].some(option => option.value === value)) select.value = value;
  }
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('input', filter);
  form.addEventListener('change', filter);
  form.addEventListener('reset', () => requestAnimationFrame(filter));
  window.addEventListener('hashchange', revealHash);
  filter();
  revealHash();
})();
