const e = require('express');
const { createEspecie, getEspecies, getEspecieById, updateEspecieById, deleteEspecieById } = require('../models/especies.model');

const createNewEspecie = async (req, res) => {
    const { nombre_comun, nombre_cientifico, edad, tamaño, peso, habitat} = req.body;

    if (!nombre_comun || !nombre_cientifico || !edad || !tamaño || !peso || !habitat) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const newEspecie = {
        nombre_comun,
        nombre_cientifico,
        edad,
        tamaño,
        peso, 
        habitat
    };

    try {
        const especie = await createEspecie(newEspecie);
        return res.status(201).json({ message: 'Especie agregada con éxito', especie });
    } catch (error) {
        return res.status(500).json({ message: 'Error al agregar la especie', error });
    }
};


const getAllEspecies = async (req, res) => {
    try {
        const especies = await getEspecies();
        return res.status(200).json(especies);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener las especies', error });
    }
};

const getEspecie = async (req, res) => {
    const { id } = req.params;
    try {
        const especie = await getEspecieById(id);
        if (!especie) {
            return res.status(404).json({ message: 'Especie no encontrada' });
        }
        return res.status(200).json(especie);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener la especie', error });
    }
};

const updateEspecie = async (req, res) => {
    const { id } = req.params;
    const { nombre_comun, nombre_cientifico, edad, tamaño, peso, habitat } = req.body;

    // Construir objeto solo con los valores presentes
    const updatedEspecie = {};
    if (nombre_comun) updatedEspecie.nombre_comun = nombre_comun;
    if (nombre_cientifico) updatedEspecie.nombre_cientifico = nombre_cientifico;
    if (edad) updatedEspecie.edad = edad;
    if (tamaño) updatedEspecie.tamaño = tamaño;
    if (peso) updatedEspecie.peso = peso;
    if (habitat) updatedEspecie.habitat = habitat;

    try {
        const especie = await updateEspecieById(id, updatedEspecie);
        if (!especie) {
            return res.status(404).json({ message: 'Especie no encontrada' });
        }
        return res.status(200).json({ message: 'Especie actualizada', especie });
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar la especie', error });
    }
};


const deleteEspecie = async (req, res) => {
    const { id } = req.params;

    try {
        const especie = await deleteEspecieById(id);
        if (!especie) {
            return res.status(404).json({ message: 'Especie no encontrada' });
        }
        return res.status(200).json({ message: 'Especie eliminada', especie });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la especie', error });
    }
};


module.exports = { createNewEspecie, getAllEspecies, getEspecie, updateEspecie, deleteEspecie };