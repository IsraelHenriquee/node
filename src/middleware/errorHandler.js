// Middleware centralizado de tratamento de erros
const { NODE_ENV } = require('../config/config');

const errorHandler = (err, req, res, next) => {
  console.error('❌ Erro capturado:', err);
  
  // Erro padrão
  let error = {
    success: false,
    message: 'Erro interno do servidor'
  };
  
  // Diferentes tipos de erro
  if (err.name === 'ValidationError') {
    error.message = 'Dados inválidos';
    error.details = err.message;
    return res.status(400).json(error);
  }
  
  if (err.name === 'UnauthorizedError') {
    error.message = 'Token inválido ou ausente';
    return res.status(401).json(error);
  }
  
  if (err.code === 'ENOENT') {
    error.message = 'Recurso não encontrado';
    return res.status(404).json(error);
  }
  
  // Em desenvolvimento, incluir stack trace
  if (NODE_ENV === 'development') {
    error.stack = err.stack;
    error.details = err.message;
  }
  
  res.status(500).json(error);
};

module.exports = errorHandler;
