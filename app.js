/* ==========================================================================
   VYAPARTOOLS GLOBAL SCRIPT & INTERACTION ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLiveSearch();
  initMobileMenu();
});

// INSTANT LIVE SEARCH FUNCTION
function initLiveSearch() {
  const searchInput = document.getElementById('globalSearch');
  if (!searchInput) return;

  const toolCards = document.querySelectorAll('.tool-card');

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    toolCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const desc = card.querySelector('p').textContent.toLowerCase();
      const badge = card.querySelector('.card-badge')?.textContent.toLowerCase() || '';

      if (title.includes(query) || desc.includes(query) || badge.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// MOBILE MENU TOGGLE
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('navLinks');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const isOpen = nav.style.display === 'flex';
    nav.style.display = isOpen ? 'none' : 'flex';
    if (!isOpen) {
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '4.25rem';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.background = '#ffffff';
      nav.style.padding = '1.5rem';
      nav.style.borderBottom = '1px solid #e2e8f0';
    }
  });
}

// UTILITY: FORMAT CURRENCY (INR / DEFAULT GLOBAL)
function formatCurrency(val) {
  if (isNaN(val) || val === null) return '₹0.00';
  return '₹' + Number(val).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });
}

// UTILITY: COPY TO CLIPBOARD
function copyToClipboard(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    const origText = btnElement.textContent;
    btnElement.textContent = 'Copied!';
    btnElement.style.background = '#166534';
    btnElement.style.color = '#ffffff';
    setTimeout(() => {
      btnElement.textContent = origText;
      btnElement.style.background = '';
      btnElement.style.color = '';
    }, 2000);
  });
}
