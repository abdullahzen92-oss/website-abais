/* =============================================
   ABAIS Content Loader — Reads Supabase data,
   applies it to HTML pages via selectors
   ============================================= */

import { getSiteContent, preloadContent } from '/js/data-manager.js';

/* =========================
   MAIN ENTRY POINT
   ========================= */
export async function loadPageContent(pageName) {
  try {
    await preloadContent();
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
      default: break;
    }
  } finally {
    hidePreloader();
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
        if (icon) icon.textContent = f.icon;
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
  const programs = getSiteContent('sdit_programs');
  if (programs && Array.isArray(programs)) {
    const cards = document.querySelectorAll('#programSdit .card');
    programs.forEach((p, i) => {
      if (cards[i]) {
        const icon = cards[i].querySelector('.card__icon');
        const title = cards[i].querySelector('.card__title');
        const text = cards[i].querySelector('.card__text');
        if (icon) icon.textContent = p.icon;
        if (title) title.textContent = p.title;
        if (text) text.textContent = p.desc;
      }
    });
  }

  const schedule = getSiteContent('sdit_schedule');
  if (schedule && Array.isArray(schedule)) {
    const list = document.querySelector('.checklist');
    if (list) {
      list.innerHTML = schedule.map(s =>
        `<div class="checklist__item"><span class="checklist__icon">${s.icon || '🕐'}</span><span><strong>${escHtml(s.time)}</strong> — ${escHtml(s.activity)}</span></div>`
      ).join('');
    }
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
  const programs = getSiteContent('smpsma_programs');
  if (programs && Array.isArray(programs)) {
    const cards = document.querySelectorAll('#programSmpSma .card');
    programs.forEach((p, i) => {
      if (cards[i]) {
        const icon = cards[i].querySelector('.card__icon');
        const title = cards[i].querySelector('.card__title');
        const text = cards[i].querySelector('.card__text');
        if (icon) icon.textContent = p.icon;
        if (title) title.textContent = p.title;
        if (text) text.textContent = p.desc;
      }
    });
  }

  const schedule = getSiteContent('smpsma_schedule');
  if (schedule && Array.isArray(schedule)) {
    const list = document.querySelector('.checklist');
    if (list) {
      list.innerHTML = schedule.map(s =>
        `<div class="checklist__item"><span class="checklist__icon">${s.icon || '🕐'}</span><span><strong>${escHtml(s.time)}</strong> — ${escHtml(s.activity)}</span></div>`
      ).join('');
    }
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
