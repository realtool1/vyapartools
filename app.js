/* ============================================================
   VyaparTools — Shared Utilities
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  const saved = localStorage.getItem('vt-theme');
  if (saved) root.setAttribute('data-theme', saved);
  else if (window.matchMedia('(prefers-color-scheme: dark)').matches) root.setAttribute('data-theme', 'dark');

  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('vt-theme', next);
    });
  });

  /* ---------- Mobile Nav ---------- */
  const nav = document.getElementById('primaryNav');
  const navToggle = document.querySelector('[data-nav-toggle]');
  if (nav && navToggle) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  /* ---------- Global Search (Home) ---------- */
  const searchInput = document.getElementById('toolSearch');
  const toolGrid = document.getElementById('toolGrid');
  const toolEmpty = document.getElementById('toolEmpty');
  const chips = document.querySelectorAll('[data-filter-cat]');

  function filterTools() {
    if (!toolGrid) return;
    const q = (searchInput?.value || '').toLowerCase().trim();
    const activeCat = document.querySelector('[data-filter-cat].is-active')?.dataset.filterCat || 'all';
    let visible = 0;

    toolGrid.querySelectorAll('.tool-card').forEach(card => {
      const title = (card.dataset.title || '').toLowerCase();
      const keywords = (card.dataset.keywords || '').toLowerCase();
      const cat = card.dataset.cat || '';
      const matchQ = !q || title.includes(q) || keywords.includes(q);
      const matchCat = activeCat === 'all' || cat === activeCat;
      const show = matchQ && matchCat;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    if (toolEmpty) toolEmpty.hidden = visible > 0;
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterTools);
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      filterTools();
    });
  });

  // Ctrl/Cmd + K shortcut
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchInput) { searchInput.focus(); searchInput.select(); }
      else {
        const headerSearch = document.querySelector('[data-search-open]');
        if (headerSearch) headerSearch.click();
      }
    }
    if (e.key === 'Escape' && nav?.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- Header search button (scroll to home search) ---------- */
  document.querySelectorAll('[data-search-open]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => searchInput.focus(), 300);
      } else {
        window.location.href = 'index.html#tools';
      }
    });
  });

  /* ---------- FAQ Accordion (only one open) ---------- */
  document.querySelectorAll('[data-accordion]').forEach(acc => {
    const items = acc.querySelectorAll('details.faq-item');
    items.forEach(item => {
      item.addEventListener('toggle', () => {
        if (item.open) {
          items.forEach(other => { if (other !== item) other.open = false; });
        }
      });
    });
  });

  /* ---------- Year in footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
