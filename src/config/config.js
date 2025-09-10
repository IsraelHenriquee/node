// Configurações centralizadas da aplicação
module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Configurações do banco de dados (exemplo)
  DATABASE: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'myapp',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password'
  },
  
  // Configurações JWT (exemplo)
  JWT: {
    secret: process.env.JWT_SECRET || 'seu-jwt-secret-aqui',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },
  
  // Outras configurações
  API: {
    version: '1.0.0',
    prefix: '/api'
  }
};
