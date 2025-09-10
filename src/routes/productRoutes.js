// Rotas para produtos (exemplo de outro módulo)
const express = require('express');
const router = express.Router();

// Dados mockados de produtos
const products = [
  { id: 1, nome: 'Laptop', preco: 2500, categoria: 'Eletrônicos' },
  { id: 2, nome: 'Mouse', preco: 50, categoria: 'Eletrônicos' },
  { id: 3, nome: 'Cadeira', preco: 300, categoria: 'Móveis' }
];

// GET /api/products - Listar todos os produtos
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: products,
    total: products.length
  });
});

// GET /api/products/:id - Buscar produto por ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  
  if (product) {
    res.json({
      success: true,
      data: product
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Produto não encontrado'
    });
  }
});

// POST /api/products - Criar novo produto
router.post('/', (req, res) => {
  const { nome, preco, categoria } = req.body;
  
  if (!nome || !preco) {
    return res.status(400).json({
      success: false,
      message: 'Nome e preço são obrigatórios'
    });
  }
  
  const newProduct = {
    id: Date.now(),
    nome,
    preco: parseFloat(preco),
    categoria: categoria || 'Geral',
    criadoEm: new Date().toISOString()
  };
  
  products.push(newProduct);
  
  res.status(201).json({
    success: true,
    message: 'Produto criado com sucesso',
    data: newProduct
  });
});

module.exports = router;
