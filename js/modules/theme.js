// ========================================
// THEME MODULE
// ========================================

export const ThemeManager = {
  init(config = {}) {
    this.toggle = document.getElementById('theme-toggle');
    this.html = document.documentElement;
    this.icon = this.toggle?.querySelector('i');
    this.storageKey = config.storageKey || 'portfolio-theme';

    // Detect system preference
    this.systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Get saved theme or use system preference
    const savedTheme = localStorage.getItem(this.storageKey);
    const defaultTheme = savedTheme || (this.systemPrefersDark.matches ? 'dark' : 'light');
    this.setTheme(defaultTheme);

    // Listen for toggle click
    if (this.toggle) {
      this.toggle.addEventListener('click', () => this.toggleTheme());
    }

    // Listen for system preference changes
    this.systemPrefersDark.addEventListener('change', (e) => {
      if (!localStorage.getItem(this.storageKey)) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
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
