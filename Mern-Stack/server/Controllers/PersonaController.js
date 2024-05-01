const Persona = require('../Models/Persona');

// Controlador para crear una nueva persona
exports.crearPersona = async (req, res) => {
  const nuevaPersona = new Persona({
    rut: req.body.rut,
    nombre: req.body.nombre,
    telefono: req.body.telefono,
    fecha: req.body.fecha,
    direccion: req.body.direccion,
    alergia: req.body.alergia,
    fonasa: req.body.fonasa,
    personal: req.body.personal
  });

  try {
    const newPersona = await nuevaPersona.save();
    res.json(newPersona);
  } catch (err){
    res.json({ message: err.message});
  }
};