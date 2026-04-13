/* =============================================
   ABAIS Main JavaScript
   Navbar, Mobile Menu, Scroll Effects, Counter
   ============================================= */

import { initI18n } from './i18n.js';
import { initCarousel } from './carousel.js';
import { initForm } from './form.js';
import { initAnimations } from './animations.js';

// ===== Initialize immediately (module is loaded dynamically after DOM is ready) =====
function init() {
  initNavbar();
  initMobileMenu();
  initDropdown();
  initCounter();
  initI18n();
  initCarousel();
  initForm();
  initAnimations();
}

// Run init: if DOM is already loaded, run immediately; otherwise wait
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOM already loaded (dynamic import case)
  init();
}

// ===== Navbar Scroll Effect =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar--scrolled');
      navbar.classList.remove('navbar--transparent');
    } else {
      navbar.classList.remove('navbar--scrolled');
      navbar.classList.add('navbar--transparent');
    }
  };

  // Check on load
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
}

// ===== Mobile Menu =====
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('navbar__hamburger--open');
    mobileMenu.classList.toggle('mobile-menu--open');
    document.body.style.overflow = mobileMenu.classList.contains('mobile-menu--open') ? 'hidden' : '';
  });

  // Close on link click
  const links = mobileMenu.querySelectorAll('.mobile-menu__link');
  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('navbar__hamburger--open');
      mobileMenu.classList.remove('mobile-menu--open');
      document.body.style.overflow = '';
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('mobile-menu--open')) {
      hamburger.classList.remove('navbar__hamburger--open');
      mobileMenu.classList.remove('mobile-menu--open');
      document.body.style.overflow = '';
    }
  });
}

// ===== Dropdown Menu (Desktop) =====
function initDropdown() {
  const dropdowns = document.querySelectorAll('.navbar__dropdown');
  dropdowns.forEach(dd => {
    const trigger = dd.querySelector('.navbar__link--dropdown');
    const menu = dd.querySelector('.navbar__dropdown-menu');
    if (!trigger || !menu) return;

    // Desktop: hover
    dd.addEventListener('mouseenter', () => menu.classList.add('navbar__dropdown-menu--open'));
    dd.addEventListener('mouseleave', () => menu.classList.remove('navbar__dropdown-menu--open'));

    // Mobile/Keyboard: click
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      menu.classList.toggle('navbar__dropdown-menu--open');
    });
  });
}

// ===== Counter Animation =====
function initCounter() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 2000;
    const start = performance.now();

    const suffix = el.textContent.includes('+') ? '+' : '';

    const update = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(target * eased);
      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + '+';
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}
