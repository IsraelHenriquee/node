// Middleware de logging customizado
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip || req.connection.remoteAddress;
  
  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
  
  // Log do body para POST/PUT (cuidado com dados sensíveis)
  if (['POST', 'PUT', 'PATCH'].includes(method) && req.body) {
    console.log(`Body:`, JSON.stringify(req.body, null, 2));
  }
  
  next();
};

module.exports = logger;
