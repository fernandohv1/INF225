const Cita = require('../Models/Cita');
const moment = require('moment');

exports.actualizarCita = async (req, res) => {
  try {
    console.log('Datos recibidos en req.body:', req.body);
    const { _id } = req.params;

    const nuevaFecha = req.body.fecha;
    const nuevaHora = req.body.hora;

    // Combinar fecha y hora en un solo string
    const fechaHoraString = `${nuevaFecha}T${nuevaHora}`;
    console.log(fechaHoraString);

    // Crear una nueva instancia de moment con la fecha y hora sin ajustes de zona horaria
    const fechaHoraMoment = moment.utc(fechaHoraString, 'YYYY-MM-DDTHH:mm:ss');

    // Obtener la fecha y hora como objeto Date
    const fechaHoraLocal = fechaHoraMoment.toDate();

    /*
    // Formatear la fecha y hora en el formato deseado
    const fechaHoraFormateada = fechaHoraMoment.format('YYYY-MM-DDTHH:mm:ss.SSSZ');*/

    // Formatear la fecha y hora en el formato deseado
    const fechaHoraFormateada = fechaHoraMoment.utc().toISOString();

    console.log(fechaHoraFormateada);
    
    const camposActualizados = {
      fecha: fechaHoraFormateada,
      rutp: req.body.rutp,
      idex: req.body.idex,
      motivo: req.body.motivo,
      idmedico: req.body.idmedico,
      equipo: req.body.equipo,
      rutm: req.body.rutm,
    };

    // Encuentra y actualiza la cita, y devuelve la versión actualizada
    const citaActualizada = await Cita.findOneAndUpdate(
      { _id: _id },
      camposActualizados,
      { new: true }
    );

    console.log('Cita encontrada y actualizada:', citaActualizada);

    if (!citaActualizada) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }

    res.json(citaActualizada);
  } catch (error) {
    console.error('Error al actualizar la cita1:', error);
    res.status(500).json({ error: 'Error al actualizar la cita' });
  }
};