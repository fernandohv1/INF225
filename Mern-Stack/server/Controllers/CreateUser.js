const Usuario = require('../Models/Usuario');

// Controlador para crear un usuario
exports.crearUsuario = async (req, res) => {
  const nuevoUsuario = new Usuario({
    rut: req.body.rut,
    clave: req.body.clave
  });

  try {
    const newUser = await nuevoUsuario.save();
    res.json(newUser);
  } catch (err){
    res.json({ message: err.message});
  }
};