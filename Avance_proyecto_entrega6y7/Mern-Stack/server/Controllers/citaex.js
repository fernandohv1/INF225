const Cita = require('../Models/Cita');
const moment = require('moment');

exports.citaExiste = async (req, res) => {
    try {
        const { idex, fecha, hora, equipo } = req.body;
        // Combinar fecha y hora en un solo string
        const fechaHoraString = `${fecha}T${hora}Z`;

        // Crear una nueva instancia de moment con la fecha y hora sin ajustes de zona horaria
        const fechaHoraMoment = moment.utc(fechaHoraString, 'YYYY-MM-DDTHH:mm:ss');

        // Obtener la fecha y hora como objeto Date
        const fechaHoraLocal = fechaHoraMoment.toDate();

        /*
        // Formatear la fecha y hora en el formato deseado
        const fechaHoraFormateada = fechaHoraMoment.format('YYYY-MM-DDTHH:mm:ss.SSSZ');*/

        // Formatear la fecha y hora en el formato deseado
        const fechaHoraFormateada = fechaHoraMoment.utc().toISOString();
        console.log(req.body);
        console.log(fechaHoraFormateada);

        // Verifica si la combinación ya existe en la base de datos
        const citaExistente = await Cita.findOne({ idex: idex, fecha: fechaHoraFormateada, equipo: equipo });

        // Si la combinación existe, responde con true, de lo contrario, responde con false
        res.json({ existe: !!citaExistente });
    } catch (error) {
        console.error('Error al verificar existencia de la cita:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};