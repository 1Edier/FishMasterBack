const pool = require('../configs/db.config');

const createAlimentacion = async (datos) => {
    const { id_usuario_especie, fecha, cantidad } = datos;
    const [result] = await pool.query(
        'INSERT INTO alimentacion (fecha, cantidad_alimento) VALUES (?,  ?)',
        [ fecha, cantidad]
    );
    return result;
};



const getAllAlimentacion = async () => {
    const [rows] = await pool.query('SELECT * FROM alimentacion');
    return rows;
};

const getAlimentacionById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM alimentacion WHERE id_usuario_especie = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};

module.exports = { createAlimentacion, getAllAlimentacion, getAlimentacionById };