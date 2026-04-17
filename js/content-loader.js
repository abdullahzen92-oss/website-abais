/* =============================================
   ABAIS Content Loader — Reads Supabase data,
   applies it to HTML pages via selectors
   ============================================= */

import { getSiteContent, preloadContent } from '/js/data-manager.js';

/* =========================
   ICON RENDERER (Emoji to SVG Map)
   ========================= */
const iconMap = {
  '📖': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
  '💼': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
  '🥋': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
  '🕌': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
  '🏛️': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 22 7 12 2"></polygon><polyline points="2 17 22 17"></polyline><polyline points="2 22 22 22"></polyline><line x1="6" y1="17" x2="6" y2="7"></line><line x1="10" y1="17" x2="10" y2="7"></line><line x1="14" y1="17" x2="14" y2="7"></line><line x1="18" y1="17" x2="18" y2="7"></line></svg>',
  '🌐': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
  '🤲': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg>',
  '🎯': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>',
  '🌍': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
  '📡': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
  '🕖': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
  '🕛': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 12 8"></polyline></svg>',
  '📚': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>',
  '📝': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',
  '🕞': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
  '💡': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>',
};

function renderIcon(iconStr) {
  if (!iconStr) return '';
  return iconMap[iconStr] || iconStr;
}

/* =========================
   MAIN ENTRY POINT
   ========================= */
let _realtimeInit = false;
export async function loadPageContent(pageName) {
  try {
    await preloadContent();
    loadContentForPage(pageName);
    
    if (!_realtimeInit) {
      _realtimeInit = true;
      import('/js/data-manager.js').then(({subscribeRealtime}) => {
        if(subscribeRealtime) {
          subscribeRealtime(() => {
            console.log("Real-time update received! Refreshing UI...");
            loadContentForPage(pageName);
          });
        }
      });
    }

  } finally {
    hidePreloader();
  }
}

function loadContentForPage(pageName) {
  loadGlobals();
  switch (pageName) {
    case 'home': loadHome(); break;
    case 'about': loadAbout(); break;
    case 'contact': loadContact(); break;
    case 'sdit': loadSdit(); break;
    case 'smp-sma': loadSmpSma(); break;
    case 'admissions': loadAdmissions(); break;
    case 'gallery': break;
    case 'calendar': break;
  }
}

function hidePreloader() {
  const loader = document.getElementById('globalLoader');
  if (loader) {
    loader.classList.add('abais-preloader--hidden');
    setTimeout(() => {
      if (loader.parentNode) loader.parentNode.removeChild(loader);
    }, 600);
  }
}

/* =========================
   GLOBALS (navbar + footer)
   ========================= */
function loadGlobals() {
  const settings = getSiteContent('settings');
  if (settings) {
    const navLogoText = document.querySelector('.navbar__logo-text');
    if (navLogoText && settings.schoolName) {
      navLogoText.innerHTML = `${escHtml(settings.schoolName)}<span>Bogor</span>`;
    }
    const footerLogoName = document.querySelector('.footer__logo-name');
    if (footerLogoName && settings.schoolFullName) {
      footerLogoName.innerHTML = escHtml(settings.schoolFullName);
    }
    if (settings.tagline) {
      const tagline = document.querySelector('.footer__tagline');
      if (tagline) tagline.textContent = settings.tagline;
    }
    if (settings.logo) {
      const navLogo = document.querySelector('.navbar__logo img');
      if (navLogo) navLogo.src = settings.logo;
      const footerLogo = document.querySelector('.footer__logo img');
      if (footerLogo) footerLogo.src = settings.logo;
    }
    const footerBottom = document.querySelector('.footer__bottom p');
    if (footerBottom && settings.schoolFullName) {
      footerBottom.textContent = `© ${new Date().getFullYear()} ${settings.schoolFullName}. All rights reserved.`;
    }
  }

  const contact = getSiteContent('contact');
  if (contact) {
    // Footer address
    const footerAddress = document.querySelector('.footer__address');
    if (footerAddress && contact.address) {
      footerAddress.textContent = contact.address;
      if (contact.mapsUrl) footerAddress.href = contact.mapsUrl;
    }

    // Footer email
    const footerEmail = document.querySelector('.footer__email');
    if (footerEmail && contact.email) {
      footerEmail.textContent = contact.email;
      footerEmail.href = `mailto:${contact.email}`;
    }

    // Footer phone
    const footerPhone = document.querySelector('.footer__phone');
    if (footerPhone && contact.waNumber) {
      const formatted = contact.waNumber.replace(/^62/, '0').replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3');
      footerPhone.textContent = formatted;
      footerPhone.href = `tel:+${contact.waNumber}`;
    }

    // Social links in footer
    if (contact.instagram) {
      const igLink = document.querySelector('.footer__social-ig');
      if (igLink) igLink.href = contact.instagram;
    }
    if (contact.facebook) {
      const fbLink = document.querySelector('.footer__social-fb');
      if (fbLink) fbLink.href = contact.facebook;
    }

    // WhatsApp floating button
    const waFloatBtn = document.querySelector('.wa-float__btn');
    if (waFloatBtn && contact.waNumber) {
      const msg = encodeURIComponent(contact.waMessage || '');
      waFloatBtn.href = `https://wa.me/${contact.waNumber}?text=${msg}`;
    }
  }

  const ctaBanner = getSiteContent('cta_banner');
  if (ctaBanner) {
    setContent('[data-i18n="cta.title"]', ctaBanner.title);
    setContent('[data-i18n="cta.subtitle"]', ctaBanner.subtitle);
    setContent('[data-i18n="cta.btn"]', ctaBanner.btn);
  }
}

/* =========================
   HOME PAGE
   ========================= */
function loadHome() {
  const hero = getSiteContent('hero');
  if (hero) {
    setContent('[data-i18n="hero.badge"]', hero.badge);
    setContent('[data-i18n="hero.title1"]', hero.title1);
    setContent('[data-i18n="hero.title2"]', hero.title2);
    setContent('[data-i18n="hero.subtitle"]', hero.subtitle);
    setContent('[data-i18n="hero.cta1"]', hero.cta1);
    setContent('[data-i18n="hero.cta2"]', hero.cta2);
    if (hero.image) {
      const heroImg = document.querySelector('.hero__bg img');
      if (heroImg) heroImg.src = hero.image;
    }
  }

  const features = getSiteContent('features');
  if (features && Array.isArray(features)) {
    const cards = document.querySelectorAll('#keunggulan .card');
    features.forEach((f, i) => {
      if (cards[i]) {
        const icon = cards[i].querySelector('.card__icon');
        const title = cards[i].querySelector('.card__title');
        const text = cards[i].querySelector('.card__text');
        if (icon) icon.innerHTML = renderIcon(f.icon);
        if (title) title.textContent = f.title;
        if (text) text.textContent = f.desc;
      }
    });
  }

  const counters = getSiteContent('counters');
  if (counters && Array.isArray(counters)) {
    const items = document.querySelectorAll('.counter-item');
    counters.forEach((c, i) => {
      if (items[i]) {
        const num = items[i].querySelector('.counter-item__number');
        const label = items[i].querySelector('.counter-item__label');
        if (num) { num.setAttribute('data-count', c.number); num.textContent = '0'; }
        if (label) label.textContent = c.label;
      }
    });
  }

  const testimonials = getSiteContent('testimonials');
  if (testimonials && Array.isArray(testimonials)) {
    const track = document.getElementById('carouselTrack');
    if (track) {
      track.innerHTML = testimonials.map(t => `
        <div class="carousel__slide">
          <div class="testimonial-card">
            <div class="testimonial-card__stars">★★★★★</div>
            <span class="testimonial-card__quote">"</span>
            <p class="testimonial-card__text">${escHtml(t.text)}</p>
            <div class="testimonial-card__author">
              <div class="testimonial-card__avatar">${(t.name || '??').split(' ').map(n=>n[0]).join('').substring(0,2)}</div>
              <div>
                <div class="testimonial-card__name">${escHtml(t.name)}</div>
                <div class="testimonial-card__role">${escHtml(t.role)}</div>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }
  }
}

/* =========================
   ABOUT PAGE
   ========================= */
function loadAbout() {
  const about = getSiteContent('about');
  if (!about) return;

  // Vision
  setContent('[data-i18n="about.visi.text"]', about.vision);

  // Mission list
  if (about.mission && Array.isArray(about.mission)) {
    const missionItems = document.querySelectorAll('[data-i18n^="about.misi."]');
    const ul = missionItems.length > 0 ? missionItems[0].parentElement : null;
    if (ul && ul.tagName === 'UL') {
      ul.innerHTML = about.mission.map(m => `<li>${escHtml(m)}</li>`).join('');
    }
  }

  // Principal
  setContent('[data-i18n="about.kepsek.name"]', about.principalName);
  setContent('[data-i18n="about.kepsek.quote"]', about.principalMessage);

  // Update hardcoded curriculum icons
  document.querySelectorAll('.kurikulum-card__icon').forEach(icon => {
    if (icon.textContent.trim()) {
      icon.innerHTML = renderIcon(icon.textContent.trim());
    }
  });

  if (about.principalImage) {
    const photoDiv = document.querySelector('.kepsek__photo');
    if (photoDiv) {
      photoDiv.innerHTML = `<img src="${about.principalImage}" alt="Kepala Sekolah" style="width:100%;height:100%;object-fit:cover;" />`;
    }
  }
}

/* =========================
   CONTACT PAGE
   ========================= */
function loadContact() {
  const contact = getSiteContent('contact');
  if (!contact) return;

  // Address text
  if (contact.address) {
    setContent('[data-i18n="contact.address.text"]', contact.address);
  }

  // Phone link on contact page
  if (contact.waNumber) {
    const phoneCards = document.querySelectorAll('.contact-card__text a[href^="tel"]');
    phoneCards.forEach(el => {
      el.href = `tel:+${contact.waNumber}`;
      const formatted = contact.waNumber.replace(/^62/, '0').replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3');
      el.textContent = formatted;
    });
  }

  // Email link on contact page
  if (contact.email) {
    const emailCards = document.querySelectorAll('.contact-card__text a[href^="mailto"]');
    emailCards.forEach(el => {
      el.href = `mailto:${contact.email}`;
      el.textContent = contact.email;
    });
  }

  // WhatsApp links
  if (contact.waNumber) {
    const msg = encodeURIComponent(contact.waMessage || '');
    const waLinks = document.querySelectorAll('.contact-card__text a[href*="wa.me"], a.btn[href*="wa.me"]');
    waLinks.forEach(el => {
      el.href = `https://wa.me/${contact.waNumber}?text=${msg}`;
    });
  }

  // Maps link
  if (contact.mapsUrl) {
    const mapsLinks = document.querySelectorAll('a[href*="maps.app.goo.gl"], a[href*="maps.google"]');
    mapsLinks.forEach(el => {
      el.href = contact.mapsUrl;
    });
  }

  // Social links on contact page
  if (contact.instagram) {
    document.querySelectorAll('a[href*="instagram"]').forEach(el => { el.href = contact.instagram; });
  }
  if (contact.facebook) {
    document.querySelectorAll('a[href*="facebook"]').forEach(el => { el.href = contact.facebook; });
  }
}

/* =========================
   SDIT PAGE
   ========================= */
function loadSdit() {
  // Hero section
  const hero = getSiteContent('sdit_hero');
  if (hero) {
    const badge = document.querySelector('.page-hero .badge');
    const title = document.querySelector('.page-hero h1');
    const desc = document.querySelector('.page-hero p');
    if (badge && hero.badge) badge.textContent = hero.badge;
    if (title && hero.title) title.textContent = hero.title;
    if (desc && hero.desc) desc.textContent = hero.desc;
  }

  // Programs — rebuild grid dynamically
  const programs = getSiteContent('sdit_programs');
  if (programs && Array.isArray(programs)) {
    const grid = document.querySelector('#programSdit .grid');
    if (grid) {
      grid.innerHTML = programs.map((p, i) => `
        <div class="card reveal${i % 3 !== 0 ? ` reveal-delay-${i % 3}` : ''}">
          <div class="card__icon">${renderIcon(p.icon)}</div>
          <h3 class="card__title">${escHtml(p.title)}</h3>
          <p class="card__text">${escHtml(p.desc)}</p>
        </div>
      `).join('');
    }
  }

  // Schedule
  const schedule = getSiteContent('sdit_schedule');
  if (schedule && Array.isArray(schedule)) {
    const list = document.querySelector('.checklist');
    if (list) {
      list.innerHTML = schedule.map(s =>
        `<div class="checklist__item"><span class="checklist__icon">${renderIcon(s.icon || '🕐')}</span><span><strong>${escHtml(s.time)}</strong> — ${escHtml(s.activity)}</span></div>`
      ).join('');
    }
  }

  // CTA section
  const cta = getSiteContent('sdit_cta');
  if (cta) {
    const ctaTitle = document.querySelector('.cta-banner h2');
    const ctaDesc = document.querySelector('.cta-banner p');
    const ctaBtn = document.querySelector('.cta-banner .btn span');
    if (ctaTitle && cta.title) ctaTitle.textContent = cta.title;
    if (ctaDesc && cta.subtitle) ctaDesc.textContent = cta.subtitle;
    if (ctaBtn && cta.btn) ctaBtn.textContent = cta.btn;
  }

  // PPDB Info
  const ppdb = getSiteContent('sdit_ppdb');
  if (ppdb) {
    const label = document.querySelector('.cost-card__label');
    const status = document.querySelector('.cost-card__price');
    const note = document.querySelector('.cost-card__note');
    if (label && ppdb.label) label.textContent = ppdb.label;
    if (status && ppdb.status) status.textContent = ppdb.status;
    if (note && ppdb.note) note.textContent = ppdb.note;
  }

  // Update WA link for SDIT
  const contact = getSiteContent('contact');
  if (contact && contact.waNumberSdit) {
    const sditWa = document.querySelector('a[href*="wa.me"]');
    if (sditWa) {
      const msg = encodeURIComponent(contact.waMessage || "Assalamu'alaikum, saya ingin bertanya tentang PPDB SDIT ABAIS");
      sditWa.href = `https://wa.me/${contact.waNumberSdit}?text=${msg}`;
    }
  }
}

/* =========================
   SMP-SMA PAGE
   ========================= */
function loadSmpSma() {
  // Hero section
  const hero = getSiteContent('smpsma_hero');
  if (hero) {
    const badge = document.querySelector('.page-hero .badge');
    const title = document.querySelector('.page-hero h1');
    const desc = document.querySelector('.page-hero p');
    if (badge && hero.badge) badge.textContent = hero.badge;
    if (title && hero.title) title.textContent = hero.title;
    if (desc && hero.desc) desc.textContent = hero.desc;
  }

  // Programs — rebuild grid dynamically
  const programs = getSiteContent('smpsma_programs');
  if (programs && Array.isArray(programs)) {
    const grid = document.querySelector('#programSmpSma .grid');
    if (grid) {
      grid.innerHTML = programs.map((p, i) => `
        <div class="card reveal${i % 3 !== 0 ? ` reveal-delay-${i % 3}` : ''}">
          <div class="card__icon">${renderIcon(p.icon)}</div>
          <h3 class="card__title">${escHtml(p.title)}</h3>
          <p class="card__text">${escHtml(p.desc)}</p>
        </div>
      `).join('');
    }
  }

  // Schedule
  const schedule = getSiteContent('smpsma_schedule');
  if (schedule && Array.isArray(schedule)) {
    const list = document.querySelector('.checklist');
    if (list) {
      list.innerHTML = schedule.map(s =>
        `<div class="checklist__item"><span class="checklist__icon">${renderIcon(s.icon || '🕐')}</span><span><strong>${escHtml(s.time)}</strong> — ${escHtml(s.activity)}</span></div>`
      ).join('');
    }
  }

  // CTA section
  const cta = getSiteContent('smpsma_cta');
  if (cta) {
    const ctaTitle = document.querySelector('.cta-banner h2');
    const ctaDesc = document.querySelector('.cta-banner p');
    const ctaBtn = document.querySelector('.cta-banner .btn span');
    if (ctaTitle && cta.title) ctaTitle.textContent = cta.title;
    if (ctaDesc && cta.subtitle) ctaDesc.textContent = cta.subtitle;
    if (ctaBtn && cta.btn) ctaBtn.textContent = cta.btn;
  }

  // PPDB Info
  const ppdb = getSiteContent('smpsma_ppdb');
  if (ppdb) {
    const label = document.querySelector('.cost-card__label');
    const status = document.querySelector('.cost-card__price');
    const note = document.querySelector('.cost-card__note');
    if (label && ppdb.label) label.textContent = ppdb.label;
    if (status && ppdb.status) status.textContent = ppdb.status;
    if (note && ppdb.note) note.textContent = ppdb.note;
  }
}

/* =========================
   ADMISSIONS PAGE
   ========================= */
function loadAdmissions() {
  const adm = getSiteContent('admissions');
  if (!adm) return;

  // Registration steps
  if (adm.steps && Array.isArray(adm.steps)) {
    const stepCards = document.querySelectorAll('.timeline .card, .steps .card, .step-card');
    adm.steps.forEach((s, i) => {
      if (stepCards[i]) {
        const title = stepCards[i].querySelector('.card__title, h3');
        const text = stepCards[i].querySelector('.card__text, p');
        if (title) title.textContent = s.title;
        if (text) text.textContent = s.desc;
      }
    });
  }
}

/* =========================
   UTILITIES
   ========================= */
function setContent(selector, value) {
  if (!value) return;
  const els = document.querySelectorAll(selector);
  els.forEach(el => { el.textContent = value; });
}

function escHtml(text) {
  const el = document.createElement('div');
  el.textContent = text || '';
  return el.innerHTML;
}
