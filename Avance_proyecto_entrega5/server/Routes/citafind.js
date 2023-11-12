const express = require('express');
const router = express.Router();
const citafind = require('../Controllers/citabusc');

// Ruta para crear una nueva persona
router.post('/', citafind.obtenerCitasPorRutFechaHora);

module.exports = router;