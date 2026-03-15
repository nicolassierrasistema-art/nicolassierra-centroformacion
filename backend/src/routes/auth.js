import express from 'express';
import Usuario from '../models/Usuario.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email, password, activo: true });
    
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    res.json({
      id: usuario._id,
      email: usuario.email,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rol: usuario.rol
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/registro', async (req, res) => {
  try {
    const { email, password, nombre, apellido, rol } = req.body;
    const usuario = new Usuario({ email, password, nombre, apellido, rol });
    await usuario.save();
    res.status(201).json({ message: 'Usuario creado', id: usuario._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
