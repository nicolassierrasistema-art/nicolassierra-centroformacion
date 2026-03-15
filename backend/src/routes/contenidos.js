import express from 'express';
import Contenido from '../models/Contenido.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { salaId } = req.query;
    const filter = salaId ? { salaId } : {};
    const contenidos = await Contenido.find(filter).sort({ orden: 1 });
    res.json(contenidos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const contenido = await Contenido.findById(req.params.id);
    if (!contenido) return res.status(404).json({ message: 'Contenido no encontrado' });
    res.json(contenido);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const contenido = new Contenido(req.body);
    await contenido.save();
    res.status(201).json(contenido);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const contenido = await Contenido.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(contenido);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Contenido.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contenido eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
