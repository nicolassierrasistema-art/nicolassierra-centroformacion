import express from 'express';
import Evaluacion from '../models/Evaluacion.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { estudianteId, contenidoId } = req.query;
    const filter = {};
    if (estudianteId) filter.estudianteId = estudianteId;
    if (contenidoId) filter.contenidoId = contenidoId;
    
    const evaluaciones = await Evaluacion.find(filter)
      .populate('estudianteId')
      .populate('contenidoId');
    res.json(evaluaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const evaluacion = new Evaluacion(req.body);
    await evaluacion.save();
    res.status(201).json(evaluacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const evaluacion = await Evaluacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(evaluacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
