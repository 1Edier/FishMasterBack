const express = require('express');
const { createNewDatos, getDatos, getDatosByTanque } = require('../controllers/datos.controller');
const router = express.Router();

router.post('/', createNewDatos);
router.get('/', getDatos);
router.get('/:id', getDatosByTanque);


module.exports = router;