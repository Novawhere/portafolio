// ========================================
// CAROUSEL MODULE
// ========================================

export const Carousel = {
  init(config = {}) {
    this.carousels = document.querySelectorAll('.project-card__carousel');
    if (this.carousels.length === 0) return;

    this.autoPlayInterval = config.autoPlayInterval || 4500;

    this.carousels.forEach(carousel => {
      this.setupCarousel(carousel);
    });
  },

  setupCarousel(carousel) {
    const slides = carousel.querySelectorAll('.carousel__slide');
    const dots = carousel.querySelectorAll('.carousel__dots .dot');
    if (slides.length <= 1) return;

    let currentIndex = 0;
    let autoPlayTimer = null;
    let isPaused = false;

    const goToSlide = (index) => {
      slides[currentIndex].classList.remove('active');
      dots[currentIndex].classList.remove('active');
      currentIndex = index;
      slides[currentIndex].classList.add('active');
      dots[currentIndex].classList.add('active');
    };

    const nextSlide = () => {
      const next = (currentIndex + 1) % slides.length;
      goToSlide(next);
    };

    const startAutoPlay = () => {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
      autoPlayTimer = setInterval(() => {
        if (!isPaused) nextSlide();
      }, this.autoPlayInterval);
    };

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
        startAutoPlay();
      });
    });

    carousel.addEventListener('mouseenter', () => {
      isPaused = true;
    });

    carousel.addEventListener('mouseleave', () => {
      isPaused = false;
    });

    startAutoPlay();
  }
};
