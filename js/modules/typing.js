// ========================================
// TYPING EFFECT MODULE
// ========================================

export const TypingEffect = {
  init(config = {}) {
    this.element = document.getElementById('typed-text');
    if (!this.element) return;

    this.texts = config.texts || [
      'Sistemas Computacionales',
      'Desarrollo Backend',
      'Desarrollo Frontend',
      'Java & Spring Boot',
      'Bases de Datos'
    ];
    this.typeSpeed = config.typeSpeed || 100;
    this.deleteSpeed = config.deleteSpeed || 50;
    this.pauseDelay = config.pauseDelay || 2000;
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.type();
  },

  type() {
    const currentText = this.texts[this.textIndex];

    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    if (!this.isDeleting && this.charIndex === currentText.length) {
      typeSpeed = this.pauseDelay;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
};
