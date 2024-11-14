const pool = require('../configs/db.config');

const createData = async (datos) => {
    const { id_usuario_especie, temperatura, ph, nivel, cantidad_peces, fecha } = datos;
    const [result] = await pool.query(
        'INSERT INTO datos_estaque (id_usuario_especie, temperatura_agua, ph_agua, nivel_agua, cantidad_peces, fecha) VALUES (?, ?, ?, ?, ?, ?)',
        [id_usuario_especie, temperatura, ph, nivel, cantidad_peces, fecha]
    );
    return result;
};

const getAllDatos = async () => {
    const [rows] = await pool.query('SELECT * FROM datos_estanque');
    return rows;
};

const getDatosById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM datos_estanque WHERE id_dato_estanque = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};

module.exports = { createData, getAllDatos, getDatosById };