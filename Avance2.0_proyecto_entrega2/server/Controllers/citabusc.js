const Cita = require('../Models/Cita');

exports.obtenerCitasPorRutFechaHora = async (req, res) => {
  try {
    const { rut, fecha, hora } = req.params;
    const filtro = {
      rutp: rut,
      fecha: new Date(`${fecha}T${hora}Z`), // Combina la fecha y la hora en un objeto Date
    };
    console.log(filtro);
    // Realizar la consulta a la base de datos
    const citas = await Cita.find(filtro);

    // Verificar si no se encontraron coincidencias
    if (citas.length === 0) {
      res.json(false);
    } else {
      res.json(citas);
    }
  } catch (error) {
    console.error('Error al obtener citas:', error);
    res.status(500).json({ error: 'Error al obtener citas' });
  }
};