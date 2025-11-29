const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    buyer: { // Datos del comprador
        name: { type: String, required: true },
        email: { type: String, required: true },
        id: { type: String } // ID del usuario si está registrado
    },
    items: [ // Lista de productos comprados
        {
            name: String,
            price: Number,
            quantity: Number,
            productId: String,
            image: String
        }
    ],
    total: { type: Number, required: true },
    shippingAddress: { // Coordenadas del mapa
        lat: Number,
        lng: Number
    },
    paymentMethod: { type: String, required: true }, // "yape" o "card"
    paymentResult: { // Datos del pago (ej. número de operación)
        status: { type: String, default: 'Pendiente' }, // Pendiente, Pagado, Enviado
        operationCode: { type: String } // Para Yape
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);