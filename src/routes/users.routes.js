const express = require('express');
const { createNewUser, getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/users.controller');
const router = express.Router();

// Crear un nuevo usuario
router.post('/', createNewUser);

// Obtener todos los usuarios
router.get('/', getAllUsers);

// Obtener un usuario por ID
router.get('/:id', getUser);

// Actualizar un usuario por ID
router.put('/:id', updateUser);

// Eliminar un usuario por ID
router.delete('/:id', deleteUser);

module.exports = router;
