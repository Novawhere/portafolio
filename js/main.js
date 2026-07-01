// ========================================
// MAIN.JS - Entry Point
// ========================================

import { CONFIG } from './config.js';
import { Loader } from './modules/loader.js';
import { ThemeManager } from './modules/theme.js';
import { Navigation } from './modules/navigation.js';
import { TypingEffect } from './modules/typing.js';
import { Particles } from './modules/particles.js';
import { ScrollReveal, CounterAnimation, BackToTop } from './modules/scroll.js';
import { Carousel } from './modules/carousel.js';
import { ContactForm } from './modules/contact.js';

document.addEventListener('DOMContentLoaded', () => {
  Loader.init();
  ThemeManager.init(CONFIG.theme);
  Navigation.init();
  TypingEffect.init(CONFIG.typing);
  Particles.init();
  ScrollReveal.init();
  CounterAnimation.init();
  BackToTop.init();
  Carousel.init(CONFIG.carousel);
  ContactForm.init(CONFIG.emailjs);
});

window.PortfolioApp = {
  ThemeManager,
  Navigation,
  ContactForm
};
