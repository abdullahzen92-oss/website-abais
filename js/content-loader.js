/* =============================================
   ABAIS Content Loader
   Applies CMS-managed content to page elements
   ============================================= */

import { getSiteContent } from './data-manager.js';

export function loadPageContent(page) {
  switch (page) {
    case 'home': loadHome(); break;
    case 'about': loadAbout(); break;
    case 'contact': loadContact(); break;
  }
}

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

function loadContact() {
  const contact = getSiteContent('contact');
  if (!contact) return;
  setContent('[data-cms="contact.address"]', contact.address);
  const waLinks = document.querySelectorAll('[data-cms-wa]');
  waLinks.forEach(el => {
    const waNum = el.dataset.cmsWa === 'sdit' ? contact.waNumberSdit : contact.waNumber;
    if (waNum) el.href = `https://wa.me/${waNum}`;
  });
}

// Utilities
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
