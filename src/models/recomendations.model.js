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
    const [rows] = await pool.query('SELECT * FROM recomendaciones');
    return rows;
};

const getRecomendacionById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM recomendaciones WHERE id_especie = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};

const deleteRecomendacionById = async (id) => {
    const [result] = await pool.query('DELETE FROM recomendaciones WHERE id_recomendacion = ?', [id] );
    return result;  
};


module.exports = { createRecomendation, getRecomendaciones, getRecomendacionById, deleteRecomendacionById };