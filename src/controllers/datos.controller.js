const { createData, getAllDatos, getDatosById } = require('../models/datos.model');

const createNewDatos = async (req, res) => {
    const { id_usuario_especie, temperatura, ph, nivel, catidad_peces, fecha} = req.body;

    const NewData = {
        id_usuario_especie,
        temperatura,
        ph,
        nivel,
        catidad_peces,
        fecha
    };

    try {
        const data = await createData(NewData);
        return res.status(201).json({ message: 'Datos agregados con exito', data });
    } catch (error) {
        return res.status(500).json({ message: 'Error al agregar los datos', error });
    }
};

const getDatos = async (req, res) => {
    try {
        const datos = await getAllDatos();
        return res.status(200).json(datos);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los datos', error });
    }
}

const getDatosByTanque = async (req, res) => {
    const { id } = req.params;
    try {
        const datos = await getDatosById();
        if (!datos) {
            return res.status(404).json({ message: 'Tanque no encontrado' });
        }
        return res.status(200).json(datos);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener la especie', error });
    }
};


module.exports = { createNewDatos, getDatos, getDatosByTanque };