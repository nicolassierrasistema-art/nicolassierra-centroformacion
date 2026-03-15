import mongoose from 'mongoose';

const empresaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  estado: { type: String, enum: ['active', 'inactive'], default: 'active' },
  fechaCreacion: { type: Date, default: Date.now }
});

export const Empresa = mongoose.model('Empresa', empresaSchema);
