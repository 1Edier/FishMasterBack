// Simulación de base de datos con un usuario estático
const users = [
    { id: 1, email: 'admin', password: 'password123' }
];

const findUserByEmail = (username) => {
    return users.find(user => user.email === username);
};

module.exports = { findUserByEmail };
