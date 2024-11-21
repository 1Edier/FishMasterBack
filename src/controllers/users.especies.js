const { asignEspecie, getAllEspecies, deleteEspecieById,getUserByIdModel , updateEspecieById } = require('../models/users.especies.model');
const express = require('express');
const router = express.Router();

// Asignar nueva especie
const asignNewEspecie = async (req, res) => {
    const { idEspecie, idUsuario } = req.body;

    if (!idEspecie || !idUsuario) {
        return res.status(400).json({ message: 'ID de la especie y usuario son requeridos' });
    }

    try {
        // Verificar si el usuario ya tiene una especie asignada
        const existingEspecie = await getUserByIdModel(idUsuario);

        if (existingEspecie) {
            // Actualizar la asignación existente
            const result = await updateEspecieById(existingEspecie.id_usuario_especie, idEspecie);
            return res.status(200).json({ message: 'Especie actualizada exitosamente', result });
        } else {
            // Asignar una nueva especie
            const result = await asignEspecie(idUsuario, idEspecie);
            return res.status(200).json({ message: 'Especie asignada exitosamente', result });
        }
    } catch (error) {
        console.error('Error al asignar o actualizar especie:', error);
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};


// Obtener todas las especies asignadas
const getEspecies = async (req, res) => {
    try {
        const especies = await getAllEspecies(req.user.id);
        return res.status(200).json(especies);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener las especies asignadas', error });
    }
};

// Eliminar una especie asignada
const deleteEspecie = async (req, res) => {
    const { id } = req.params;

    try {
        const especie = await deleteEspecieById(id);
        if (!especie) {
            return res.status(404).json({ message: 'Especie no encontrada' });
        }
        return res.status(200).json({ message: 'Especie asignada eliminada', especie });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la especie asignada', error });
    }
};
const updateEspecie = async (req, res) => {
    const { id } = req.params; // ID de la asignación
    const { idEspecie } = req.body; // Nuevo ID de la especie

    // Validación de datos
    if (!id || !idEspecie) {
        return res.status(400).json({ message: 'El ID de la asignación y el nuevo ID de la especie son requeridos' });
    }

    try {
        const result = await updateEspecieById(Number(id), Number(idEspecie));
        if (!result) {
            return res.status(404).json({ message: 'Asignación de especie no encontrada' });
        }
        return res.status(200).json({ message: 'ID de especie actualizado exitosamente', result });
    } catch (error) {
        console.error('Error al actualizar especie:', error);
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};



// Buscar usuario por ID
const getUserById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'El ID del usuario es requerido' });
    }

    try {
        const user = await getUserByIdModel(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error al buscar usuario por ID:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};



module.exports = { asignNewEspecie, getEspecies, deleteEspecie, updateEspecie,getUserById };
