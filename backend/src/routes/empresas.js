import express from 'express';
import Empresa from '../models/Empresa.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { estado } = req.query;
    const filter = estado ? { estado } : {};
    const empresas = await Empresa.find(filter);
    res.json(empresas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const empresa = await Empresa.findById(req.params.id);
    if (!empresa) return res.status(404).json({ message: 'Empresa no encontrada' });
    res.json(empresa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const empresa = new Empresa(req.body);
    await empresa.save();
    res.status(201).json(empresa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const empresa = await Empresa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(empresa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Empresa.findByIdAndDelete(req.params.id);
    res.json({ message: 'Empresa eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
