// ========================================
// LOADER MODULE
// ========================================

export const Loader = {
  init() {
    this.loader = document.getElementById('loader');
    window.addEventListener('load', () => this.hide());
    setTimeout(() => this.hide(), 3000);
  },

  hide() {
    if (this.loader) {
      this.loader.classList.add('loader--hidden');
    }
  }
};
