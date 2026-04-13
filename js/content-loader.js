/* =============================================
   ABAIS Content Loader
   Applies CMS-managed content to ALL pages
   ============================================= */

import { getSiteContent } from './data-manager.js';

/**
 * Master loader — call on EVERY page after DOM is ready.
 * It auto-applies global content (navbar, footer, WA)
 * and page-specific content if applicable.
 */
export function loadPageContent(page) {
  // Always load globals (navbar branding, footer, WA, socials)
  loadGlobals();

  // Page-specific content
  switch (page) {
    case 'home': loadHome(); break;
    case 'about': loadAbout(); break;
    case 'contact': loadContact(); break;
    // gallery & calendar are data-driven from their own scripts already
  }
}

/* =========================
   GLOBAL ELEMENTS
   Navbar, Footer, WA button
   ========================= */
function loadGlobals() {
  // --- Settings (school name, logo) ---
  const settings = getSiteContent('settings');
  if (settings) {
    // Navbar logo text
    const navLogoText = document.querySelector('.navbar__logo-text');
    if (navLogoText && settings.schoolName) {
      navLogoText.innerHTML = `${escHtml(settings.schoolName)}<span>Bogor</span>`;
    }
    // Navbar logo image
    if (settings.logo) {
      const navLogoImg = document.querySelector('.navbar__logo-img');
      if (navLogoImg) navLogoImg.src = settings.logo;
    }
    // Footer logo
    const footerLogoName = document.querySelector('.footer__logo-name');
    if (footerLogoName && settings.schoolFullName) {
      footerLogoName.innerHTML = escHtml(settings.schoolFullName);
    }
    if (settings.logo) {
      const footerLogoImg = document.querySelector('.footer__logo img');
      if (footerLogoImg) footerLogoImg.src = settings.logo;
    }
    // Footer copyright
    const footerBottom = document.querySelector('.footer__bottom p');
    if (footerBottom && settings.schoolFullName) {
      footerBottom.textContent = `© ${new Date().getFullYear()} ${settings.schoolFullName}. All rights reserved.`;
    }
  }

  // --- Contact info in footer + WA button ---
  const contact = getSiteContent('contact');
  if (contact) {
    // Footer address
    const footerAddress = document.querySelector('.footer__address');
    if (footerAddress && contact.address) footerAddress.textContent = contact.address;

    // Footer email
    const footerEmail = document.querySelector('.footer__email');
    if (footerEmail && contact.email) {
      footerEmail.textContent = contact.email;
      footerEmail.href = `mailto:${contact.email}`;
    }

    // Footer phone
    const footerPhone = document.querySelector('.footer__phone');
    if (footerPhone && contact.waNumber) {
      const formatted = contact.waNumber.replace(/^62/, '+62 ');
      footerPhone.textContent = formatted;
    }

    // Social links in footer
    if (contact.instagram) {
      const igLink = document.querySelector('.footer__social a[href*="instagram"]');
      if (igLink) igLink.href = contact.instagram;
    }
    if (contact.facebook) {
      const fbLink = document.querySelector('.footer__social a[href*="facebook"]');
      if (fbLink) fbLink.href = contact.facebook;
    }

    // WhatsApp floating button
    const waFloat = document.querySelector('.wa-float');
    if (waFloat && contact.waNumber) {
      const msg = encodeURIComponent(contact.waMessage || '');
      waFloat.href = `https://wa.me/${contact.waNumber}?text=${msg}`;
    }

    // All WA links with data-cms-wa attribute
    document.querySelectorAll('[data-cms-wa]').forEach(el => {
      const waNum = el.dataset.cmsWa === 'sdit' ? contact.waNumberSdit : contact.waNumber;
      const msg = encodeURIComponent(contact.waMessage || '');
      if (waNum) el.href = `https://wa.me/${waNum}?text=${msg}`;
    });

    // Maps URL
    if (contact.mapsUrl) {
      document.querySelectorAll('[data-cms-maps]').forEach(el => {
        el.href = contact.mapsUrl;
      });
    }
  }
}

/* =========================
   HOME PAGE
   ========================= */
function loadHome() {
  // Hero
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

  // Features
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

  // Counters
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

  // Testimonials
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
  setContent('[data-cms="about.vision"]', about.vision);
  setContent('[data-cms="about.principalName"]', about.principalName);
  setContent('[data-cms="about.principalMessage"]', about.principalMessage);
  if (about.principalImage) {
    const img = document.querySelector('[data-cms-img="about.principalImage"]');
    if (img) img.src = about.principalImage;
  }
  if (about.mission) {
    const list = document.querySelector('[data-cms="about.missionList"]');
    if (list) {
      list.innerHTML = about.mission.map(m => `<li>${escHtml(m)}</li>`).join('');
    }
  }
}

/* =========================
   CONTACT PAGE
   ========================= */
function loadContact() {
  const contact = getSiteContent('contact');
  if (!contact) return;
  setContent('[data-cms="contact.address"]', contact.address);
  setContent('[data-cms="contact.email"]', contact.email);
  if (contact.mapsUrl) {
    const iframe = document.querySelector('.contact-map iframe');
    if (iframe) {
      // Embed maps from URL - keep as is since Google Maps embed needs different URL
    }
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
