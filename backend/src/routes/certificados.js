import express from 'express';
import Certificado from '../models/Certificado.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { estudianteId, salaId } = req.query;
    const filter = {};
    if (estudianteId) filter.estudianteId = estudianteId;
    if (salaId) filter.salaId = salaId;
    
    const certificados = await Certificado.find(filter)
      .populate('estudianteId')
      .populate('salaId');
    res.json(certificados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const certificado = new Certificado(req.body);
    await certificado.save();
    res.status(201).json(certificado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/hash/:hash', async (req, res) => {
  try {
    const certificado = await Certificado.findOne({ hash: req.params.hash })
      .populate('estudianteId')
      .populate('salaId');
    if (!certificado) return res.status(404).json({ message: 'Certificado no encontrado' });
    res.json(certificado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
