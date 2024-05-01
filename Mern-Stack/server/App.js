const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const morgan = require("morgan");
const moment = require('moment');

const db = require("./Database");

const app = express();

app.set("port", process.env.PORT || 5000);

// Middlewares
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

app.use((req, res, next) => {
    console.log('Solicitud recibida:', req.method, req.url);
    console.log('Cuerpo de la solicitud:', req.body);
    next();
  }
);

//Routers
// Referente a las Personas
const persona = require('./Routes/Persona');
app.use('/Persona', persona);

// Referente a los Usuarios
const usuario = require('./Routes/Usuario');
app.use('/Usuario', usuario);

// Referente a las Citas
const citas = require('./Routes/Citas');
app.use('/Citas', citas);

db();

app.listen(app.get("port"), () => {
    console.log(`Servidor está corriendo en el puerto: ${app.get("port")}`);
});

module.exports = app;