const express = require('express');
const router = express.Router();
const citaup = require('../Controllers/citaupdate');

// Ruta para crear una nueva cita
router.put('/:_id', citaup.actualizarCita);

module.exports = router;