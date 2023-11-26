const express = require('express');
const router = express.Router();
const citac = require('../Controllers/crearcita');

// Ruta para crear una nueva persona
router.post('/', citac.crearCita);

module.exports = router;