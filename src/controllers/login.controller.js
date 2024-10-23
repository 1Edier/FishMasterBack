const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../models/login.model');

const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    }

    // Buscar usuario
    const user = findUserByEmail(email);
    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Crear token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login exitoso', token });
};

module.exports = { login };
