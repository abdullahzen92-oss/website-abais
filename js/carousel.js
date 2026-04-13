/* =============================================
   ABAIS Testimonial Carousel
   Auto-slide, swipe, dot indicators
   ============================================= */

export function initCarousel() {
  const carousel = document.getElementById('testimonialCarousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel__track');
  const slides = carousel.querySelectorAll('.carousel__slide');
  const dotsContainer = carousel.querySelector('.carousel__dots');
  if (!track || !slides.length) return;

  let currentIndex = 0;
  let slidesPerView = getSlidesPerView();
  let totalPages = Math.ceil(slides.length / slidesPerView);
  let autoSlideInterval;
  let touchStartX = 0;
  let touchEndX = 0;

  // Create dots
  function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('button');
      dot.classList.add('carousel__dot');
      if (i === 0) dot.classList.add('carousel__dot--active');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  // Get slides per view based on viewport
  function getSlidesPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }

  // Go to specific slide
  function goToSlide(index) {
    currentIndex = index;
    const offset = -(currentIndex * (100 / slidesPerView));
    track.style.transform = `translateX(${offset}%)`;
    updateDots();
  }

  // Update dot indicators
  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.carousel__dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('carousel__dot--active', i === currentIndex);
    });
  }

  // Next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalPages;
    goToSlide(currentIndex);
  }

  // Start auto-slide
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  // Stop auto-slide
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Touch/swipe support
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoSlide();
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoSlide();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) < 50) return;

    if (diff > 0) {
      // Swipe left → next
      nextSlide();
    } else {
      // Swipe right → prev
      currentIndex = currentIndex === 0 ? totalPages - 1 : currentIndex - 1;
      goToSlide(currentIndex);
    }
  }

  // Pause on hover
  carousel.addEventListener('mouseenter', stopAutoSlide);
  carousel.addEventListener('mouseleave', startAutoSlide);

  // Handle resize
  window.addEventListener('resize', () => {
    slidesPerView = getSlidesPerView();
    totalPages = Math.ceil(slides.length / slidesPerView);
    createDots();
    goToSlide(Math.min(currentIndex, totalPages - 1));
  });

  // Initialize
  createDots();
  startAutoSlide();
}
