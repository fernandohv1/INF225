const mongoose = require('mongoose');

const cita = new mongoose.Schema({
    rutp: {
        type: String,
        required: true
    },
    idmedico: {
        type: String,
        required: true
    },
    idex: {
        type: Number,
        required: true
    },
    motivo: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    equipo: {
        type: Number,
        required: true
    },
    rutm: {
        type: String,
        required: true 
    }
});

const Cita = mongoose.model('Cita', cita);

module.exports = Cita;