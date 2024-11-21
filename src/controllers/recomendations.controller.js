const { createRecomendation, getRecomendaciones, getRecomendacionById, deleteRecomendacionById } = require('../models/recomendations.model');

// Crear nueva recomendación
const createNewRecomendation = async (req, res) => {
    try {
        const recomendation = req.body;
        const result = await createRecomendation(recomendation);
        res.status(201).json({ message: 'Recomendación creada correctamente', id: result.insertId });
    } catch (error) {
        console.error('Error al crear la recomendación:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// Obtener todas las recomendaciones
const getAllRecomendaciones = async (req, res) => {
    try {
        const recomendaciones = await getRecomendaciones();
        res.status(200).json(recomendaciones);
    } catch (error) {
        console.error('Error al obtener las recomendaciones:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// Obtener recomendación por ID de especie
const getRecomendacion = async (req, res) => {
    try {
        const { id } = req.params;
        const recomendacion = await getRecomendacionById(id);

        if (!recomendacion) {
            return res.status(404).json({ message: 'Recomendación no encontrada' });
        }

        res.status(200).json(recomendacion);
    } catch (error) {
        console.error('Error al obtener la recomendación:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// Eliminar recomendación por ID
const deleteRecomendacion = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteRecomendacionById(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Recomendación no encontrada' });
        }

        res.status(200).json({ message: 'Recomendación eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la recomendación:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

module.exports = { createNewRecomendation, getAllRecomendaciones, getRecomendacion, deleteRecomendacion };
