// ========================================
// CONTACT FORM MODULE
// ========================================

export const ContactForm = {
  init(config = {}) {
    this.form = document.getElementById('contact-form');
    if (!this.form) return;

    this.config = config;
    emailjs.init(config.publicKey);

    this.fields = {
      name: this.form.querySelector('#name'),
      email: this.form.querySelector('#email'),
      subject: this.form.querySelector('#subject'),
      message: this.form.querySelector('#message')
    };

    this.submitBtn = this.form.querySelector('#submit-btn');

    this.bindEvents();
  },

  bindEvents() {
    Object.keys(this.fields).forEach(fieldName => {
      const field = this.fields[fieldName];
      if (field) {
        field.addEventListener('blur', () => this.validateField(fieldName));
        field.addEventListener('input', () => this.clearError(fieldName));
      }
    });

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  },

  validateField(fieldName) {
    const field = this.fields[fieldName];
    if (!field) return true;

    const value = field.value.trim();
    let error = '';

    switch (fieldName) {
      case 'name':
        if (!value) error = 'El nombre es requerido';
        else if (value.length < 2) error = 'Mínimo 2 caracteres';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) error = 'El email es requerido';
        else if (!emailRegex.test(value)) error = 'Email inválido';
        break;
      case 'subject':
        if (!value) error = 'El asunto es requerido';
        else if (value.length < 5) error = 'Mínimo 5 caracteres';
        break;
      case 'message':
        if (!value) error = 'El mensaje es requerido';
        else if (value.length < 20) error = 'Mínimo 20 caracteres';
        else if (value.length > 2000) error = 'Máximo 2000 caracteres';
        break;
    }

    if (error) {
      this.showError(fieldName, error);
      return false;
    } else {
      this.clearError(fieldName);
      return true;
    }
  },

  showError(fieldName, message) {
    const field = this.fields[fieldName];
    if (!field) return;

    field.style.borderColor = 'var(--color-accent)';
    let errorEl = field.parentElement.querySelector('.form-error');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'form-error';
      field.parentElement.appendChild(errorEl);
    }
    errorEl.textContent = message;
  },

  clearError(fieldName) {
    const field = this.fields[fieldName];
    if (!field) return;

    field.style.borderColor = '';
    const errorEl = field.parentElement.querySelector('.form-error');
    if (errorEl) errorEl.remove();
  },

  validateAll() {
    let isValid = true;
    Object.keys(this.fields).forEach(fieldName => {
      if (!this.validateField(fieldName)) isValid = false;
    });
    return isValid;
  },

  async handleSubmit(e) {
    e.preventDefault();

    if (!this.validateAll()) {
      this.form.classList.add('animate-shake');
      setTimeout(() => this.form.classList.remove('animate-shake'), 500);
      return;
    }

    this.submitBtn.disabled = true;
    this.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

    try {
      await emailjs.sendForm(this.config.serviceId, this.config.templateId, this.form);
      this.showToast('¡Mensaje enviado con éxito!', 'success');
      this.form.reset();
    } catch (error) {
      console.error('Error al enviar:', error);
      this.showToast('Error al enviar. Intenta de nuevo.', 'error');
    } finally {
      this.submitBtn.disabled = false;
      this.submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
    }
  },

  showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 20px;
      padding: 16px 24px;
      background: ${type === 'success' ? '#10b981' : '#ef4444'};
      color: white;
      border-radius: 8px;
      font-weight: 500;
      z-index: 9999;
      animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
    `;
    document.head.appendChild(style);
  }
};
