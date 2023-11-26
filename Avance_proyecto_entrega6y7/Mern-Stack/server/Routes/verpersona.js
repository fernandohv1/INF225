const express = require('express');
const router = express.Router();
const citaver = require('../Controllers/verpersona');

// Ruta para crear una nueva cita
router.post('/', citaver.verificarExistenciaRut);

module.exports = router;