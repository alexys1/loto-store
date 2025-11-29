const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 1. OBTENER todos los productos (Para mostrar en el Home)
router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); // Busca todo en la BD
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. CREAR un nuevo producto (Para tu panel de admin)
router.post('/', async (req, res) => {
    try {
        // Crea el producto con los datos que le lleguen (req.body)
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save(); // Guarda en MongoDB
        res.json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;