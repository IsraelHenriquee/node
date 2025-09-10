// Validadores de dados
const validators = {
  // Validar dados de usuário
  validateUser(userData) {
    const errors = [];
    
    if (!userData.nome || userData.nome.trim().length < 2) {
      errors.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    if (!userData.email || !this.isValidEmail(userData.email)) {
      errors.push('Email inválido');
    }
    
    if (userData.idade && (userData.idade < 0 || userData.idade > 120)) {
      errors.push('Idade deve estar entre 0 e 120 anos');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Validar email
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validar senha
  validatePassword(password) {
    const errors = [];
    
    if (!password || password.length < 6) {
      errors.push('Senha deve ter pelo menos 6 caracteres');
    }
    
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Senha deve conter pelo menos uma letra minúscula');
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Senha deve conter pelo menos uma letra maiúscula');
    }
    
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Senha deve conter pelo menos um número');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
};

module.exports = validators;
