// ========================================
// SCROLL MODULES
// ScrollReveal + CounterAnimation + BackToTop
// ========================================

export const ScrollReveal = {
  init() {
    this.elements = document.querySelectorAll('.reveal');
    if (this.elements.length === 0) return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--active');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    this.elements.forEach(el => this.observer.observe(el));
  }
};

export const CounterAnimation = {
  init() {
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  },

  animate(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      current += step;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        element.textContent = target;
      }
    };

    requestAnimationFrame(update);
  }
};

export const BackToTop = {
  init() {
    this.button = document.getElementById('back-to-top');
    if (!this.button) return;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        this.button.classList.add('back-to-top--visible');
      } else {
        this.button.classList.remove('back-to-top--visible');
      }
    });
  }
};
