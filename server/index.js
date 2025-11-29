const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders'); // <--- 1. IMPORTAR

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes); // <--- 2. USAR

app.get('/', (req, res) => {
    res.send('¡Servidor de Loto Store funcionando! 🚀');
});

const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
    .then(() => console.log("Conectado a MongoDB Atlas ✅"))
    .catch(err => console.log("Error de conexión:", err));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});