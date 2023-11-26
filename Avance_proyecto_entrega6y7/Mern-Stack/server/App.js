const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const morgan = require("morgan");

const db = require("./Database");

const app = express();

app.set("port", process.env.PORT || 5000);

// Rutas
const Cita = require('./Models/Cita');
const p = require('./Routes/NuevaPersona');
const veru = require('./Routes/veruser');
const nusuario = require('./Routes/NuevoUsuario');
const citaf = require('./Routes/citafind');
const citau = require('./Routes/citaup');
const citac = require('./Routes/citacreate');
const citafind = require('./Routes/citaRoutes');
const citaex = require('./Routes/citaexiste');
const verpersona = require('./Routes/verpersona');
const moment = require('moment');

app.use((req, res, next) => {
    console.log('Solicitud recibida:', req.method, req.url);
    console.log('Cuerpo de la solicitud:', req.body);
    next();
  });

// Middlewares
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

app.use('/NPersona', p);
app.use('/Veruser', veru);
app.use('/NUsuario', nusuario);
app.use('/Citaf', citaf);
app.use('/Citac', citac);
app.use('/Citafind', citafind);
app.use('/Citaex', citaex);
app.use('/Userver', verpersona);

/*
// Actualiza tu ruta para incluir un parámetro ":id"
app.put('/Citaup', citau);*/


app.put('/Citaup/:_id', async (req, res) => {
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

db();

app.listen(app.get("port"), () => {
    console.log(`Servidor está corriendo en el puerto: ${app.get("port")}`);
});

module.exports = app;