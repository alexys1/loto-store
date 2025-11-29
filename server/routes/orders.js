const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// CREAR ORDEN
router.post('/', async (req, res) => {
    try {
        const { buyer, items, total, shippingAddress, paymentMethod, paymentResult } = req.body;
        const newOrder = new Order({ buyer, items, total, shippingAddress, paymentMethod, paymentResult });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// OBTENER HISTORIAL (Esta es la parte que te está fallando)
router.get('/user/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ 'buyer.id': req.params.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;