const Usuario = require('../Models/Usuario');

exports.verificarUsuario = async (req, res) => {
  const { rut, clave } = req.body;

  try {
    const usuario = await Usuario.findOne({ rut, clave });

    if (usuario) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};