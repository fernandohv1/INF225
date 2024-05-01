const express = require('express');
const routerUsuario = express.Router();
const usuarioController = require('../Controllers/userver');
const createUser = require('../Controllers/CreateUser');

// Verificar si un Usuario existe (Login)
routerUsuario.get('/:rut/:clave', usuarioController.verificarUsuario);

//Crear un usuario
routerUsuario.post('/crear', createUser.crearUsuario);

module.exports = routerUsuario;