const express = require('express');
const router = express.Router();
const personaController = require('../Controllers/PersonaController');

// Ruta para crear una nueva persona
router.post('/', personaController.crearPersona);

module.exports = router;