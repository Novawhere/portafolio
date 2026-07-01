// ========================================
// NAVIGATION MODULE
// ========================================

export const Navigation = {
  init() {
    this.nav = document.getElementById('nav');
    this.toggle = document.getElementById('nav-toggle');
    this.mobileMenu = document.getElementById('mobile-menu');
    this.links = document.querySelectorAll('.nav__link, .mobile-menu__link');
    this.sections = document.querySelectorAll('section[id]');

    this.initScrollEffect();
    this.initMobileMenu();
    this.initActiveLink();
    this.initSmoothScroll();
  },

  initScrollEffect() {
    if (!this.nav) return;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 50) {
        this.nav.classList.add('nav--scrolled');
      } else {
        this.nav.classList.remove('nav--scrolled');
      }
    });
  },

  initMobileMenu() {
    if (!this.toggle || !this.mobileMenu) return;

    this.toggle.addEventListener('click', () => {
      this.mobileMenu.classList.toggle('mobile-menu--active');
      document.body.style.overflow = this.mobileMenu.classList.contains('mobile-menu--active') ? 'hidden' : '';
    });

    this.mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
      link.addEventListener('click', () => {
        this.mobileMenu.classList.remove('mobile-menu--active');
        document.body.style.overflow = '';
      });
    });
  },

  initActiveLink() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          this.links.forEach(link => {
            link.classList.remove('nav__link--active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('nav__link--active');
            }
          });
        }
      });
    }, { threshold: 0.3 });

    this.sections.forEach(section => observer.observe(section));
  },

  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
};
