const express = require('express');
const { createNewDatos, getDatos } = require('../controllers/datos.controller');
const router = express.Router();

router.post('/', createNewDatos);
router.get('/', getDatos);


module.exports = router;