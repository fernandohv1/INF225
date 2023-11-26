const express = require('express');
const router = express.Router();
const citaex = require('../Controllers/citaex');

// Ruta para crear una nueva persona
router.post('/', citaex.citaExiste);

module.exports = router;