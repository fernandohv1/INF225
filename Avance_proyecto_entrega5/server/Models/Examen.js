const mongoose = require('mongoose');

const examen = new mongoose.Schema({
    idex: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
    }
});

const Examen = mongoose.model('Examen', examen);

module.exports = Examen;