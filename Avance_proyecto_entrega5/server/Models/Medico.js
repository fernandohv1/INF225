const mongoose = require('mongoose');

const medico = new mongoose.Schema({
    rut: {
        type: String,
        required: true,
        unique: true
    },
    idmedico: {
        type: String,
        required: true,
        unique: true
    },
    especialidad: {
        type: String,
        required: true
    }
});

const Medico = mongoose.model('Medico', medico);

module.exports = Medico;