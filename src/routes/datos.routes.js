const express = require('express');
const { createNewDatos, getDatos, getDatosByTanque } = require('../controllers/datos.controller');
const router = express.Router();

router.post('/createdatos', createNewDatos);
router.get('/getdatos', getDatos);
router.get('/:id', getDatosByTanque);


module.exports = router;