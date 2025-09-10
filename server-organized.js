const express = require('express');
const cors = require('cors');

// Importar configurações e rotas
const { PORT } = require('./src/config/config');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const authRoutes = require('./src/routes/authRoutes');
const randomRoutes = require('./src/routes/randomRoutes');

// Importar middlewares customizados
const logger = require('./src/middleware/logger');
const errorHandler = require('./src/middleware/errorHandler');

// Criar a aplicação Express
const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger); // Nosso middleware customizado

// Rota de health check
app.get('/', (req, res) => {
  res.json({
    message: 'API funcionando! 🚀',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Registrar rotas organizadas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/random', randomRoutes);

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada',
    path: req.originalUrl
  });
});

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 API Base: http://localhost:${PORT}/api`);
  console.log(`👥 Users: http://localhost:${PORT}/api/users`);
  console.log(`📦 Products: http://localhost:${PORT}/api/products`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Encerrando servidor graciosamente...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Encerrando servidor graciosamente...');
  process.exit(0);
});
