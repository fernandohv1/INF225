const mongoose = require('mongoose');

const persona = new mongoose.Schema({
    rut: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
    },
    personal: {
        type: Boolean,
        required: true
    }
});

const Persona = mongoose.model('Persona', persona);

module.exports = Persona;