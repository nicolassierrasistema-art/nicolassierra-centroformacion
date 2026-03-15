import express from 'express';
import Sala from '../models/Sala.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { empresaId, docenteId, estado } = req.query;
    const filter = {};
    if (empresaId) filter.empresaId = empresaId;
    if (docenteId) filter.docenteId = docenteId;
    if (estado) filter.estado = estado;
    
    const salas = await Sala.find(filter).populate('empresaId').populate('docenteId');
    res.json(salas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const sala = await Sala.findById(req.params.id).populate('empresaId').populate('docenteId');
    if (!sala) return res.status(404).json({ message: 'Sala no encontrada' });
    res.json(sala);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const sala = new Sala(req.body);
    await sala.save();
    res.status(201).json(sala);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const sala = await Sala.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(sala);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Sala.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sala eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
