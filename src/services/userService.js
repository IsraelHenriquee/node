// Service para gerenciar lógica de usuários
// Aqui ficaria a conexão com banco de dados, cache, etc.

// Dados mockados (em produção viria do banco)
let users = [
  { id: 1, nome: 'João Silva', email: 'joao@email.com', idade: 30, criadoEm: '2024-01-01' },
  { id: 2, nome: 'Maria Santos', email: 'maria@email.com', idade: 25, criadoEm: '2024-01-02' },
  { id: 3, nome: 'Pedro Costa', email: 'pedro@email.com', idade: 35, criadoEm: '2024-01-03' }
];

const userService = {
  // Buscar todos os usuários
  async getAllUsers() {
    // Simular operação assíncrona (consulta ao banco)
    return new Promise((resolve) => {
      setTimeout(() => resolve(users), 100);
    });
  },

  // Buscar usuário por ID
  async getUserById(id) {
    return new Promise((resolve) => {
      const user = users.find(u => u.id === id);
      setTimeout(() => resolve(user), 50);
    });
  },

  // Criar novo usuário
  async createUser(userData) {
    return new Promise((resolve) => {
      const newUser = {
        id: Date.now(), // Em produção seria gerado pelo banco
        ...userData,
        criadoEm: new Date().toISOString()
      };
      
      users.push(newUser);
      setTimeout(() => resolve(newUser), 100);
    });
  },

  // Atualizar usuário
  async updateUser(id, userData) {
    return new Promise((resolve) => {
      const userIndex = users.findIndex(u => u.id === id);
      
      if (userIndex === -1) {
        return setTimeout(() => resolve(null), 50);
      }
      
      users[userIndex] = {
        ...users[userIndex],
        ...userData,
        atualizadoEm: new Date().toISOString()
      };
      
      setTimeout(() => resolve(users[userIndex]), 100);
    });
  },

  // Deletar usuário
  async deleteUser(id) {
    return new Promise((resolve) => {
      const userIndex = users.findIndex(u => u.id === id);
      
      if (userIndex === -1) {
        return setTimeout(() => resolve(false), 50);
      }
      
      users.splice(userIndex, 1);
      setTimeout(() => resolve(true), 100);
    });
  },

  // Buscar usuário por email
  async getUserByEmail(email) {
    return new Promise((resolve) => {
      const user = users.find(u => u.email === email);
      setTimeout(() => resolve(user), 50);
    });
  }
};

module.exports = userService;
