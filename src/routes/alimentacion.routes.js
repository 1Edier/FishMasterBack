const express = require('express');
const { createNewalimentacion, getDatosAlimentecion, getAlimentacionEspecie } = require('../controllers/alimentacion.controller');
const router = express.Router();

router.post('/', createNewalimentacion);
router.get('/', getDatosAlimentecion);
router.get('/:id', getAlimentacionEspecie);


module.exports = router;