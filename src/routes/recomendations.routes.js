const express = require('express');
const { createNewRecomendation, getAllRecomendaciones, getRecomendacion, deleteRecomendacion } = require('../controllers/recomendations.controller');
const router = express.Router();

router.post('/createrecomedation', createNewRecomendation);
router.get('/getRecomendation', getAllRecomendaciones);
//usar el id de la especie para optener las recomendaciones
router.get('/getrecomendationid/:id', getRecomendacion);
//usar el id de la recomendacion
router.delete('/:id', deleteRecomendacion);

module.exports = router;