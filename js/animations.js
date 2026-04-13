/* =============================================
   ABAIS Scroll Animations
   IntersectionObserver reveals & parallax
   ============================================= */

export function initAnimations() {
  initScrollReveal();
  initParallaxHero();
}

// ===== Scroll Reveal =====
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  });

  revealElements.forEach(el => observer.observe(el));
}

// ===== Parallax Hero =====
function initParallaxHero() {
  const heroBg = document.querySelector('.hero__bg img');
  if (!heroBg) return;

  // Only on desktop (performance)
  if (window.innerWidth < 768) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroHeight = document.querySelector('.hero')?.offsetHeight || 800;

        if (scrollY < heroHeight) {
          const offset = scrollY * 0.35;
          heroBg.style.transform = `translateY(${offset}px) scale(1.05)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Initial state
  heroBg.style.transform = 'translateY(0) scale(1.05)';
  heroBg.style.transition = 'none';
}
