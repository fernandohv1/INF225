const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const morgan = require("morgan");

const db = require("./Database");

const app = express();

app.set("port", process.env.PORT || 5000);

// Rutas
const p = require('./Routes/NuevaPersona');
const veru = require('./Routes/veruser');
const nusuario = require('./Routes/NuevoUsuario');
const citaf = require('./Routes/citafind');
const citau = require('./Routes/citaup');
const citac = require('./Routes/citacreate');
const citafind = require('./Routes/citaRoutes');

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

// Actualiza tu ruta para incluir un parámetro ":id"
app.put('/Citaup', citau);

db();

app.listen(app.get("port"), () => {
    console.log(`Servidor está corriendo en el puerto: ${app.get("port")}`);
});

module.exports = app;