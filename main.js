/**
 * Parul Chemicals — Precision Chemistry
 * main.js — Scroll animations, sticky header, modal, form, card 3D, progress circle
 */

'use strict';

/* ── STICKY HEADER ──────────────────────────────────────── */
const header = document.getElementById('site-header');

function updateHeader() {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

/* ── REVEAL ON SCROLL ───────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ── PROGRESS CIRCLE (GMP) ──────────────────────────────── */
const gmpWrap = document.getElementById('gmp-progress');

const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (gmpWrap) progressObserver.observe(gmpWrap);

/* ── CHART REVEAL ───────────────────────────────────────── */
// Remove inline clip-path animation override and let CSS handle it via IntersectionObserver
const chartPaths = document.querySelectorAll('.quality-chart path, .quality-chart .chart-line');
const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'chartReveal 1.5s cubic-bezier(.4,0,.2,1) both';
      chartObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.quality-chart path').forEach(p => chartObserver.observe(p));

/* ── CARD 3D PARALLAX ───────────────────────────────────── */
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const cx     = rect.width  / 2;
    const cy     = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -6;
    const rotateY = ((x - cx) / cx) *  6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── FAB SCROLL TO TOP ──────────────────────────────────── */
const fabScroll = document.getElementById('fab-scroll');

function updateFAB() {
  if (window.scrollY > 300) {
    fabScroll.classList.add('visible');
  } else {
    fabScroll.classList.remove('visible');
  }
}
window.addEventListener('scroll', updateFAB, { passive: true });
updateFAB();

fabScroll.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── TDS MODAL ──────────────────────────────────────────── */
const modalOverlay  = document.getElementById('tds-modal');
const modalDrawer   = document.getElementById('tds-drawer');
const modalCloseBtn = document.getElementById('modal-close-btn');
const tdsOpenBtn    = document.getElementById('tds-open-btn');

// Product chips state
let selectedChip = document.querySelector('.modal-product-chip.selected');

function openTDS(productName) {
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  // Focus management
  setTimeout(() => {
    const firstInput = modalDrawer.querySelector('input');
    if (firstInput) firstInput.focus();
  }, 400);

  // Pre-select the correct chip if called from product card
  if (productName) {
    const chips = document.querySelectorAll('.modal-product-chip');
    chips.forEach(chip => {
      const match = chip.dataset.product === productName.replace(/\s/g,'').toUpperCase()
                 || chip.dataset.product === productName.toUpperCase();
      chip.classList.toggle('selected', match);
      chip.setAttribute('aria-checked', match ? 'true' : 'false');
      if (match) selectedChip = chip;
    });
  }
}

function closeTDS() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

if (tdsOpenBtn) tdsOpenBtn.addEventListener('click', () => openTDS('TEC'));
if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeTDS);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeTDS();
});

// ESC key closes modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeTDS();
});

// Product chip selection
document.querySelectorAll('.modal-product-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.modal-product-chip').forEach(c => {
      c.classList.remove('selected');
      c.setAttribute('aria-checked', 'false');
    });
    chip.classList.add('selected');
    chip.setAttribute('aria-checked', 'true');
    selectedChip = chip;
  });
  chip.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      chip.click();
    }
  });
});

// TDS Form submit
const tdsForm = document.getElementById('tds-form');
if (tdsForm) {
  tdsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = tdsForm.querySelector('[type=submit]');
    btn.textContent = '✓ Request Sent!';
    btn.style.background = '#007A4E';
    setTimeout(() => {
      closeTDS();
      setTimeout(() => {
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> Send TDS Request`;
        btn.style.background = '';
        tdsForm.reset();
      }, 400);
    }, 1200);
  });
}

/* ── CONTACT FORM ───────────────────────────────────────── */
const contactForm    = document.getElementById('contact-form');
const formSuccess    = document.getElementById('form-success');
const formSubmitBtn  = document.getElementById('form-submit-btn');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const name    = document.getElementById('contact-name').value.trim();
    const email   = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      // Shake invalid fields
      [document.getElementById('contact-name'),
       document.getElementById('contact-email'),
       document.getElementById('contact-message')].forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#EF4444';
          field.style.boxShadow  = '0 0 0 3px rgba(239,68,68,.15)';
          setTimeout(() => {
            field.style.borderColor = '';
            field.style.boxShadow  = '';
          }, 2500);
        }
      });
      return;
    }

    // Simulate sending
    formSubmitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite">
        <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
        <line x1="4.22" y1="4.22" x2="7.05" y2="7.05"/><line x1="16.95" y1="16.95" x2="19.78" y2="19.78"/>
        <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
        <line x1="4.22" y1="19.78" x2="7.05" y2="16.95"/><line x1="16.95" y1="7.05" x2="19.78" y2="4.22"/>
      </svg>
      Sending…`;
    formSubmitBtn.disabled = true;

    setTimeout(() => {
      contactForm.style.display = 'none';
      formSuccess.classList.add('active');
    }, 1600);
  });
}

/* ── MOBILE NAV ─────────────────────────────────────────── */
const hamburger    = document.getElementById('hamburger');
const mobileNav    = document.getElementById('mobile-nav');
const mobileOverlay = document.getElementById('mobile-overlay');
const mobileClose  = document.getElementById('mobile-close');

function openMobileNav() {
  mobileNav.classList.add('open');
  mobileOverlay.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeMobileNav() {
  mobileNav.classList.remove('open');
  mobileOverlay.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (hamburger)    hamburger.addEventListener('click', openMobileNav);
if (mobileClose)  mobileClose.addEventListener('click', closeMobileNav);
if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileNav);

// Close mobile nav when a link is clicked
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', closeMobileNav);
});

/* ── SMOOTH SCROLL FOR ANCHOR LINKS ─────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── STAT COUNTER ANIMATION ─────────────────────────────── */
function animateCounter(el, end, suffix, duration = 1800) {
  const start     = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed  = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out cubic
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = Math.floor(eased * end);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statVals = document.querySelectorAll('.stat-val');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      // Parse value and suffix
      const match = text.match(/^(\d+)(.*)/);
      if (match) {
        const endVal   = parseInt(match[1]);
        const suffix   = match[2];
        // Preserve the <span> structure
        const spanEl = el.querySelector('span');
        const spanText = spanEl ? spanEl.textContent : '';
        el.innerHTML   = '0' + (spanEl ? `<span>${spanText}</span>` : '');
        animateCounter({ textContent: '' }, endVal, '', 1600);
        // Custom animation that preserves span
        let startT = null;
        function frame(ts) {
          if (!startT) startT = ts;
          const prog = Math.min((ts - startT) / 1600, 1);
          const eased = 1 - Math.pow(1 - prog, 3);
          const cur  = Math.floor(eased * endVal);
          el.innerHTML = cur + (spanEl ? `<span>${spanText}</span>` : suffix);
          if (prog < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      }
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statVals.forEach(el => counterObserver.observe(el));

/* ── HERO STAT COUNTER ──────────────────────────────────── */
// Already visible on load so animate after short delay
setTimeout(() => {
  document.querySelectorAll('.hero-stat-val').forEach(el => {
    const span    = el.querySelector('span');
    const spanTxt = span ? span.textContent : '';
    const numTxt  = el.textContent.replace(spanTxt, '').trim();
    const num     = parseFloat(numTxt);
    if (isNaN(num)) return;

    let startT = null;
    const dur  = 1400;
    function frame(ts) {
      if (!startT) startT = ts;
      const prog  = Math.min((ts - startT) / dur, 1);
      const eased = 1 - Math.pow(1 - prog, 3);
      const cur   = num % 1 === 0
        ? Math.floor(eased * num)
        : (eased * num).toFixed(1);
      el.innerHTML = cur + (span ? `<span>${spanTxt}</span>` : '');
      if (prog < 1) requestAnimationFrame(frame);
    }
    setTimeout(() => requestAnimationFrame(frame), 800);
  });
}, 200);

/* ── ACTIVE NAV LINK ON SCROLL ──────────────────────────── */
const sections   = document.querySelectorAll('section[id], div[id]');
const navLinks   = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = '#fff';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ── BENTO CARD ENTRANCE (staggered) ───────────────────── */
const bentoCards = document.querySelectorAll('.bento-card');
const bentoObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity    = '1';
        entry.target.style.transform  = 'translateY(0)';
      }, i * 120);
      bentoObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

bentoCards.forEach(card => {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(36px)';
  card.style.transition = 'opacity .6s ease, transform .6s ease';
  bentoObserver.observe(card);
});

console.log('%cParul Chemicals — Precision Chemistry', 'color:#00A86B;font-weight:800;font-size:16px;');
console.log('%cBuilt with trust, purity, and global innovation.', 'color:#1A2B4C;font-size:12px;');
