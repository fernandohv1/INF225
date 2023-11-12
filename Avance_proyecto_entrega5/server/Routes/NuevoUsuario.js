const express = require('express');
const router = express.Router();
const createUser = require('../Controllers/CreateUser');

// Ruta para crear una nueva persona
router.post('/', createUser.crearUsuario);

module.exports = router;