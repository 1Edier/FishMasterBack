const express = require('express');
const { createNewRecomendation, getAllRecomendaciones, getRecomendacion, deleteRecomendacion } = require('../controllers/recomendations.controller');
const router = express.Router();

router.post('/', createNewRecomendation);
router.get('/', getAllRecomendaciones);
//usar el id de la especie para optener las recomendaciones
router.get('/:id', getRecomendacion);
//usar el id de la recomendacion
router.delete('/:id', deleteRecomendacion);

module.exports = router;