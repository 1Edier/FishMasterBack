const { createRecomendation, getRecomendaciones, getRecomendacionById, deleteRecomendacionById } = require('../models/recomendations.model');

const createNewRecomendation = async (req, res) => {
    const { id_especie, frecuencia_alimentacion, cantidad_alimento, temperatura, ph} = req.body;

    if (!id_especie|| !frecuencia_alimentacion || !cantidad_alimento || !temperatura || !ph) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const NewRecomendation = {
        id_especie,
        frecuencia_alimentacion,
        cantidad_alimento,
        temperatura,
        ph
    };

    try {
        const recomendations = await createRecomendation(NewRecomendation);
        return res.status(201).json({ message: 'Recomendacion agregada con éxito', recomendations });
    } catch (error) {
        return res.status(500).json({ message: 'Error al agregar la recomendacion', error });
    }
};

const getAllRecomendaciones = async (req, res) => {
    try {
        const recomendaciones = await getRecomendaciones();
        return res.status(200).json(recomendaciones);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener las recomendaciones', error });
    }
};

const getRecomendacion = async (req, res) => {
    const { id } = req.params;
    try {
        const recomendacion = await getRecomendacionById(id);
        if (!recomendacion) {
            return res.status(404).json({ message: 'Recomendacion para especie no encontrada' });
        }
        return res.status(200).json(recomendacion);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener la recomendacion', error });
    }
};

const deleteRecomendacion = async (req, res) => {
    const { id } = req.params;

    try {
        const recomendacion = await deleteRecomendacionById(id);
        if (!recomendacion) {
            return res.status(404).json({ message: 'Recomendacion no encontrada' });
        }
        return res.status(200).json({ message: 'Recomendacion eliminada', especie });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la recomendacion', error });
    }
};

module.exports = { createNewRecomendation, getAllRecomendaciones, getRecomendacion, deleteRecomendacion };