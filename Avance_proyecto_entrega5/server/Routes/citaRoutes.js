const express = require('express');
const router = express.Router();
const citaController = require('../Controllers/citabuscar');

// Ruta para buscar citas por fecha
router.get('/:fecha', citaController.buscarPorFecha);

module.exports = router;