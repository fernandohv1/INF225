const express = require('express');
const router = express.Router();
const usuarioController = require('../Controllers/userver');

router.post('/', usuarioController.verificarUsuario);

module.exports = router;