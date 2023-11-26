const mongoose = require('mongoose');

const usuario = new mongoose.Schema({
    rut: {
        type: String,
        required: true,
        unique: true
    },
    clave: {
        type: String,
        required: true
    }
});

const Usuario = mongoose.model('Usuario', usuario);

module.exports = Usuario;