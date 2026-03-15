import express from 'express';
import Inscripcion from '../models/Inscripcion.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { estudianteId, salaId } = req.query;
    const filter = {};
    if (estudianteId) filter.estudianteId = estudianteId;
    if (salaId) filter.salaId = salaId;
    
    const inscripciones = await Inscripcion.find(filter)
      .populate('estudianteId')
      .populate('salaId');
    res.json(inscripciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const inscripcion = new Inscripcion(req.body);
    await inscripcion.save();
    res.status(201).json(inscripcion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const inscripcion = await Inscripcion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(inscripcion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
