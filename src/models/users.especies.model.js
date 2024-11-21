const pool = require('../configs/db.config');

// Asignar una nueva especie
const asignEspecie = async (idUsuario, idEspecie) => {
    const [result] = await pool.query(
        'INSERT INTO usuarios_especies (id_usuario, id_especie) VALUES (?, ?)',
        [idUsuario, idEspecie]
    );
    return result;
};

// Obtener todas las especies asignadas
const getAllEspecies = async (idUsuario) => {
    const [rows] = await pool.query(
        `SELECT e.* 
        FROM especies e 
        JOIN usuarios_especies ue ON e.id_especie = ue.id_especie 
        WHERE ue.id_usuario = ?`,
        [idUsuario]
    );
    return rows;
};

// Eliminar una especie asignada
const deleteEspecieById = async (id) => {
    const [result] = await pool.query(
        'DELETE FROM usuarios_especies WHERE id_especie = ?',
        [id]
    );
    if (result.affectedRows > 0) {
        return true;  // Especie eliminada correctamente
    }
    return null;  // No se encontró la especie para eliminar
};

const updateEspecieById = async (idAsignacion, newIdEspecie) => {
    if (typeof idAsignacion !== 'number' || typeof newIdEspecie !== 'number') {
        throw new Error('Los parámetros idAsignacion y newIdEspecie deben ser números');
    }

    const [result] = await pool.query(
        'UPDATE usuarios_especies SET id_especie = ? WHERE id_usuario_especie = ?',
        [newIdEspecie, idAsignacion]
    );

    if (result.affectedRows > 0) {
        return result; // Registro actualizado exitosamente
    }
    return null; // No se encontró el registro
};


const getUserByIdModel = async (idUsuario) => {
    const [rows] = await pool.query(
        'SELECT id_usuario_especie, id_especie FROM usuarios_especies WHERE id_usuario = ?',
        [idUsuario]
    );
    return rows.length > 0 ? rows[0] : null;
};



module.exports = { asignEspecie, getAllEspecies, deleteEspecieById, updateEspecieById,getUserByIdModel };
