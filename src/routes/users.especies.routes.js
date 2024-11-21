const express = require('express');
const router = express.Router();
const { asignNewEspecie, getEspecies, deleteEspecie, updateEspecie,getUserById } = require('../controllers/users.especies');

// Definir rutas
router.post('/', asignNewEspecie);  // Asignar especie
router.get('/', getEspecies);  // Obtener todas las especies
router.delete('/:id', deleteEspecie);  // Eliminar especie
router.put('/:id', updateEspecie);  // Actualizar especie
router.get('/:id', getUserById);

module.exports = router;
