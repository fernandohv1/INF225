const Cita = require('../Models/Cita');

const citaController = {
  buscarPorFecha: async (req, res) => {
    try {
      const fechaBuscada = new Date(req.params.fecha);
      // Establecer la hora a 00:00:00 para incluir todas las citas del día
      fechaBuscada.setUTCHours(0, 0, 0, 0);

      const citasEnFecha = await Cita.find({
        fecha: {
          $gte: fechaBuscada,
          $lt: new Date(fechaBuscada.getTime() + 24 * 60 * 60 * 1000) // 24 horas después
        }
      });

      res.json(citasEnFecha);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
};

module.exports = citaController;