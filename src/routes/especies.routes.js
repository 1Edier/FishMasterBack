const express = require('express');
const { createNewEspecie, getAllEspecies, getEspecie, updateEspecie, deleteEspecie } = require('../controllers/especies.controller');
const router = express.Router();

router.post('/', createNewEspecie);
router.get('/', getAllEspecies);
router.get('/:id', getEspecie);
router.put('/:id', updateEspecie);
router.delete('/:id', deleteEspecie);

module.exports = router;