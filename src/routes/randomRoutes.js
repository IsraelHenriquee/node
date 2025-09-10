const express = require('express');
const router = express.Router();
const Redis = require('ioredis');

// Conexão com Redis usando variável de ambiente do Railway
const redis = new Redis(process.env.REDIS_URL);
const REDIS_KEY = 'numeros_aleatorios';

// POST /api/random - Insere um número aleatório no Redis
router.post('/', async (req, res, next) => {
  try {
    const numero = Math.floor(Math.random() * 10000);
    await redis.rpush(REDIS_KEY, numero);
    res.json({
      success: true,
      message: 'Número inserido com sucesso',
      numero
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/random - Busca todos os números salvos no Redis
router.get('/', async (req, res, next) => {
  try {
    const lista = await redis.lrange(REDIS_KEY, 0, -1);
    res.json({
      success: true,
      numeros: lista.map(Number),
      total: lista.length
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
