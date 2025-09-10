const express = require('express');
const cors = require('cors');

// Criar a aplicação Express
const app = express();

// Configurar a porta (usar variável de ambiente ou porta padrão)
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permitir CORS para todas as rotas
app.use(express.json()); // Parse JSON no body das requisições
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Middleware de log simples
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rota principal - Health check
app.get('/', (req, res) => {
  res.json({
    message: 'Servidor Node.js está funcionando! 🚀',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Rota de exemplo - Listar usuários (dados fictícios)
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, nome: 'João Silva', email: 'joao@email.com', idade: 30 },
    { id: 2, nome: 'Maria Santos', email: 'maria@email.com', idade: 25 },
    { id: 3, nome: 'Pedro Costa', email: 'pedro@email.com', idade: 35 }
  ];
  
  res.json({
    success: true,
    data: users,
    total: users.length
  });
});

// Rota de exemplo - Buscar usuário por ID
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const users = [
    { id: 1, nome: 'João Silva', email: 'joao@email.com', idade: 30 },
    { id: 2, nome: 'Maria Santos', email: 'maria@email.com', idade: 25 },
    { id: 3, nome: 'Pedro Costa', email: 'pedro@email.com', idade: 35 }
  ];
  
  const user = users.find(u => u.id === id);
  
  if (user) {
    res.json({
      success: true,
      data: user
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Usuário não encontrado'
    });
  }
});

// Rota de exemplo - Criar novo usuário (POST)
app.post('/api/users', (req, res) => {
  const { nome, email, idade } = req.body;
  
  // Validação simples
  if (!nome || !email) {
    return res.status(400).json({
      success: false,
      message: 'Nome e email são obrigatórios'
    });
  }
  
  // Simular criação de usuário
  const newUser = {
    id: Date.now(), // ID simples baseado em timestamp
    nome,
    email,
    idade: idade || null,
    criadoEm: new Date().toISOString()
  };
  
  res.status(201).json({
    success: true,
    message: 'Usuário criado com sucesso',
    data: newUser
  });
});

// Rota de exemplo - Status do servidor
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada',
    path: req.originalUrl
  });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor'
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Acesse: http://localhost:${PORT}`);
  console.log(`📊 Status: http://localhost:${PORT}/api/status`);
  console.log(`👥 Usuários: http://localhost:${PORT}/api/users`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Recebido SIGTERM, encerrando servidor graciosamente...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Recebido SIGINT, encerrando servidor graciosamente...');
  process.exit(0);
});
