const express = require('express');
const routerPersona = express.Router();
const personaController = require('../Controllers/PersonaController');
const citaver = require('../Controllers/verificarPersona');

// Ruta para crear una nueva persona
routerPersona.post('/crear', personaController.crearPersona);

// Ruta para verificar la existencia de una persona
routerPersona.get('/:rut', citaver.verificarExistenciaRut);

module.exports = routerPersona;