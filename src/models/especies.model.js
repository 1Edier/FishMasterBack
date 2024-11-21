const pool = require('../configs/db.config');

const createEspecie = async (especie) => {
    const { nombre_comun, nombre_cientifico, edad, tamaño, peso, habitat } = especie;
    const [result] = await pool.query(
        'INSERT INTO especies (nombre_comun, nombre_cientifico, edad_promedio, tamano, peso_promedio, habitat) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre_comun, nombre_cientifico, edad, tamaño, peso, habitat]
    );
    return { id: result.insertId, nombre_comun };  
};

const getEspecies = async () => {
    const [rows] = await pool.query('SELECT * FROM especies');
    return rows;
};

const getEspecieById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM especies WHERE id_especie = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};

const updateEspecieById = async (id, updatedData) => {
    const fields = [];
    const values = [];

    // Agregar solo las claves y valores presentes en updatedData
    if (updatedData.nombre_comun) {
        fields.push('nombre_comun = ?');
        values.push(updatedData.nombre_comun);
    }
    if (updatedData.nombre_cientifico) {
        fields.push('nombre_cientifico = ?');
        values.push(updatedData.nombre_cientifico);
    }
    if (updatedData.edad) {
        fields.push('edad_promedio = ?');
        values.push(updatedData.edad);
    }
    if (updatedData.tamaño) {
        fields.push('tamano = ?');
        values.push(updatedData.tamaño);
    }
    if (updatedData.peso) {
        fields.push('peso_promedio = ?');
        values.push(updatedData.peso);
    }
    if (updatedData.habitat) {
        fields.push('habitat = ?');
        values.push(updatedData.habitat);
    }

    // Si no hay campos que actualizar, retornar sin hacer nada
    if (fields.length === 0) {
        return getEspecieById(id);
    }

    // Crear la consulta dinámica
    const sql = `UPDATE especies SET ${fields.join(', ')} WHERE id_especie = ?`;
    values.push(id);

    await pool.query(sql, values);
    return getEspecieById(id);
};

const deleteEspecieById = async (id) => {
    const especieToDelete = await getEspecieById(id);

    if (!especieToDelete) {
        return null;  
    }
    await pool.query('DELETE FROM especies WHERE id_especie = ?', [id]);
    return especieToDelete;  
};

module.exports = { createEspecie, getEspecies, getEspecieById, updateEspecieById, deleteEspecieById};