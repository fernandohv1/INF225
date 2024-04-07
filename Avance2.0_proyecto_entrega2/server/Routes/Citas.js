const express = require('express');
const routerCitas = express.Router();
const moment = require('moment');
const Cita = require('../Models/Cita');

//Controllers GET
const citafind = require('../Controllers/citabusc');
const citaController = require('../Controllers/citabuscar');
const citaex = require('../Controllers/citaex');

//GET
// Ruta para obtener las citas por rut, fecha y hora
routerCitas.get('/:rut/:fecha/:hora', citafind.obtenerCitasPorRutFechaHora);

// Ruta para buscar citas por fecha
routerCitas.get('/:fecha', citaController.buscarPorFecha);

// Ruta para buscar citas por rut en fechas posteriores a la fecha ingresada
routerCitas.get('/:rut/:fecha', async (req, res)=>{
  try {
    const { rut, fecha } = req.params;
    console.log(rut);
    console.log(fecha);

    result = await Cita.find({
      "fecha": { $gte: fecha },
      "rutp": rut
    })
    res.json(result);
  } catch (e) {
    console.error(e)
  }
});



// Ruta para ver si una cita existe
routerCitas.get('/:idex/:fecha/:hora/:equipo', citaex.citaExiste);




//Controllers POST
const citac = require('../Controllers/crearcita');

//POST
// Ruta para crear una nueva cita
routerCitas.post('/crear', citac.crearCita);




//PUT
// Actualizar una cita
routerCitas.put('/:_id', async (req, res) => {
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
});

module.exports = routerCitas;