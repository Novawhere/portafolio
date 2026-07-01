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
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: rgba(233, 69, 96, ${Math.random() * 0.5 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
        animation-delay: ${Math.random() * 2}s;
      `;
      this.container.appendChild(particle);
    }

    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
        50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
      }
    `;
    document.head.appendChild(style);
  }
};
