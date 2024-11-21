const pool = require('../configs/db.config');

const createRecomendation = async (recomendation) => {
    const { id_especie, frecuencia_alimentacion, cantidad_alimento, temperatura, ph } = recomendation;
    const [result] = await pool.query(
        'INSERT INTO recomendaciones (id_especie, frecuencia_alimentacion, cantidad_alimento, temperatura_agua, ph_agua) VALUES (?, ?, ?, ?, ?)',
        [id_especie, frecuencia_alimentacion, cantidad_alimento, temperatura, ph]
    );
    return result;
};

const getRecomendaciones = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM recomendaciones');
        return rows;
    } catch (error) {
        throw new Error('Error al obtener las recomendaciones: ' + error.message);
    }
};

const getRecomendacionById = async (id) => {
    try {
        const [rows] = await pool.query('SELECT * FROM recomendaciones WHERE id_especie = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw new Error('Error al obtener la recomendación: ' + error.message);
    }
};

const deleteRecomendacionById = async (id) => {
    try {
        const [result] = await pool.query('DELETE FROM recomendaciones WHERE id_recomendacion = ?', [id]);
        return result;
    } catch (error) {
        throw new Error('Error al eliminar la recomendación: ' + error.message);
    }
};

module.exports = { createRecomendation, getRecomendaciones, getRecomendacionById, deleteRecomendacionById };
