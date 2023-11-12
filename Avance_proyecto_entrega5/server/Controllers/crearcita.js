const Cita = require('../Models/Cita');

exports.crearCita = async (req, res) => {
  try {
    console.log('Datos del cuerpo:', req.body);
    const nuevaFechaHora = new Date(`${req.body.fecha}T${req.body.hora}`);
    // Crear una nueva instancia de Cita con los datos recibidos
    const nuevaCita = new Cita({
      rutp: req.body.paciente,
      idmedico: req.body.doctor,
      idex: req.body.examen,
      motivo: req.body.motivo,
      fecha: nuevaFechaHora,
      equipo: req.body.equipo,
      rutm: req.body.rutm,
    });

    const citaGuardada = await nuevaCita.save();

    res.status(201).json(citaGuardada);
  } catch (error) {
    console.error('Error al crear la cita:', error);
    res.status(500).json({ error: 'Error al crear la cita' });
  }
};