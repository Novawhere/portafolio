// ========================================
// PARTICLES MODULE
// ========================================

export const Particles = {
  init() {
    this.container = document.getElementById('particles');
    if (!this.container) return;

    this.createParticles();
  },

  createParticles() {
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 12 + 6;
      particle.style.cssText = `
        position: absolute;
        width: 0;
        height: 0;
        border-left: ${size / 2}px solid transparent;
        border-right: ${size / 2}px solid transparent;
        border-bottom: ${size}px solid var(--color-accent);
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 4 + 3}s ease-in-out infinite;
        animation-delay: ${Math.random() * 3}s;
        transform: rotate(${Math.random() * 360}deg);
      `;
      this.container.appendChild(particle);
    }

    const style = document.createElement('style');
    style.textContent = `
      .particle {
        opacity: 0.6;
        filter: drop-shadow(0 0 3px var(--color-accent));
      }
      
      [data-theme="light"] .particle {
        opacity: 0.8;
        filter: drop-shadow(0 0 4px var(--color-accent));
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.4; }
        50% { transform: translateY(-30px) translateX(15px) rotate(180deg); opacity: 0.9; }
      }
    `;
    document.head.appendChild(style);
  }
};
