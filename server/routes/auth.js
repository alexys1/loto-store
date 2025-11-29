const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// CLAVE SECRETA (En producción esto iría en .env, por rapidez lo definimos aquí)
const JWT_SECRET = 'clave_super_secreta_loto_store';

// 1. REGISTRO (Sign Up)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verificar si ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "El correo ya existe" });

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Guardar usuario
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Usuario creado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. LOGIN (Sign In)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

        // Verificar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

        // Crear Token (La llave de acceso)
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;