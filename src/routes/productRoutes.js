// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/roleMiddleware');

// Rotas abertas
router.get('/all', productController.getAllProducts); // Qualquer usuário pode visualizar produtos

// Rotas restritas a administradores
router.post('/create', authMiddleware, isAdmin, productController.createProduct);
router.put('/update/:id', authMiddleware, isAdmin, productController.updateProduct);
router.delete('/delete/:id', authMiddleware, isAdmin, productController.deleteProduct);

module.exports = router;
