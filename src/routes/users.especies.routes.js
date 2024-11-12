const express = require('express');
const { asignNewEspecie, getEspecies, deleteEspecie  } = require('../controllers/users.especies');
const router = express.Router();

router.post('/', asignNewEspecie);
router.get('/', getEspecies);
router.delete('/', deleteEspecie)

module.exports = router;
