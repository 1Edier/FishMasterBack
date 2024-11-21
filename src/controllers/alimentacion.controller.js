const { createAlimentacion, getAllAlimentacion, getAlimentacionById } = require('../models/alimentacion.model');

const createNewalimentacion = async (req, res) => {
    const { id_usuario_especie, cantidad } = req.body;

    const NewData = {
        id_usuario_especie,
        cantidad
    };

    try {
        const data = await createAlimentacion(NewData);
        return res.status(201).json({ message: 'Datos agregados con éxito', data });
    } catch (error) {
        return res.status(500).json({ message: 'Error al agregar los datos', error });
    }
};



const getDatosAlimentecion = async (req, res) => {
    try {
        const datos = await getAllAlimentacion();
        return res.status(200).json(datos);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los datos', error });
    }
}

const getAlimentacionEspecie = async (req, res) => {
    const { id } = req.params;
    try {
        const alimentacion = await getAlimentacionById(id);
        if (!alimentacion) {
            return res.status(404).json({ message: 'Especie no encontrada' });
        }
        return res.status(200).json(alimentacion);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los datos', error });
    }
};


module.exports = { createNewalimentacion, getDatosAlimentecion, getAlimentacionEspecie };