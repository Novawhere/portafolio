// ========================================
// THEME MODULE
// ========================================

export const ThemeManager = {
  init(config = {}) {
    this.toggle = document.getElementById('theme-toggle');
    this.html = document.documentElement;
    this.icon = this.toggle?.querySelector('i');
    this.storageKey = config.storageKey || 'portfolio-theme';

    const savedTheme = localStorage.getItem(this.storageKey) || config.default || 'dark';
    this.setTheme(savedTheme);

    if (this.toggle) {
      this.toggle.addEventListener('click', () => this.toggleTheme());
    }
  },

  setTheme(theme) {
    this.html.setAttribute('data-theme', theme);
    localStorage.setItem(this.storageKey, theme);
    this.updateIcon(theme);
  },

  toggleTheme() {
    const current = this.html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  },

  updateIcon(theme) {
    if (!this.icon) return;
    this.icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
};
