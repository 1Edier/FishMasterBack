const pool = require('../configs/db.config');

const asignEspecie = async (idUsuario, idEspecie) => {
    const [result] = await pool.query(
        'INSERT INTO Usuarios_Especies (id_usuario, id_especie) VALUES (?, ?)',
        [idUsuario, idEspecie]
    );
    return result;
};

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

const deleteEspecieById = async (id) => {
    await pool.query('DELETE FROM usuarios_especie WHERE id_especie = ?', [id]);
    return userToDelete;
};

module.exports = { asignEspecie, getAllEspecies, deleteEspecieById };
