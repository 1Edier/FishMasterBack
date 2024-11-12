const { asignEspecie, getAllEspecies, deleteEspecieById } = require('../models/users.especies.model');

const asignNewEspecie = async (req, res) => {
    const { idEspecie } = req.body;

    if (!idEspecie) {
        return res.status(400).json({ message: 'ID de la especie es requerido' });
    }

    try {
        const result = await asignEspecie(req.user.id, idEspecie);
        return res.status(200).json({ message: 'Especie asignada exitosamente', result });
    } catch (error) {
        console.error('Error al asignar especie:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getEspecies = async (req, res) => {
    try {
        const especies = await getAllEspecies(req.user.id);
        return res.status(200).json(especies);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener las especies asignadas', error });
    }
}

const deleteEspecie = async (req, res) => {
    const { id } = req.params;

    try {
        const especie = await deleteEspecieById(id);
        if (!especie) {
            return res.status(404).json({ message: 'Especie no encontrada' });
        }
        return res.status(200).json({ message: 'Especie asiganada eliminada', user });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la especie asignada', error });
    }
};

module.exports = { asignNewEspecie, getEspecies, deleteEspecie };
