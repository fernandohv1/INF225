const Persona = require('../Models/Persona');

exports.verificarExistenciaRut = async (req, res) => {
    try {
        const { rut } = req.body;

        // Verifica si el Rut existe en la base de datos
        const personaExistente = await Persona.findOne({ rut });

        // Si el Rut existe, responde con true, de lo contrario, responde con false
        res.json({ existe: !!personaExistente });
    } catch (error) {
        console.error('Error al verificar existencia del Rut:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};