const Cita = require('../Models/Cita');

exports.actualizarCita = async (req, res) => {
  try {
    console.log('Datos recibidos en req.body:', req.body);
    const { id } = req.params;
    const { nuevaFecha, nuevaHora, nuevoRut, nuevoExamen, nuevoMotivo, nuevoIdMedico, nuevoEquipo, nuevoRutm } = req.body;

    // Combinar fecha y hora
    const nuevaFechaHora = new Date(`${nuevaFecha}T${nuevaHora}`);
    
    const camposActualizados = {
      fecha: nuevaFechaHora,
      rutp: nuevoRut,
      idex: nuevoExamen,
      motivo: nuevoMotivo,
      idmedico: nuevoIdMedico,
      equipo: nuevoEquipo,
      rutm: nuevoRutm,
    };

    // Encuentra y actualiza la cita, y devuelve la versión actualizada
    const citaActualizada = await Cita.findOneAndUpdate(
      { _id: id },
      camposActualizados,
      { new: true }
    );

    console.log('Cita encontrada y actualizada:', citaActualizada);

    if (!citaActualizada) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }

    res.json(citaActualizada);
  } catch (error) {
    console.error('Error al actualizar la cita:', error);
    res.status(500).json({ error: 'Error al actualizar la cita' });
  }
};