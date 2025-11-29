const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Se guardará encriptada
    address: { type: String, default: "" },     // Para el envío
    role: { type: String, default: "user" },    // "user" o "admin"
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);