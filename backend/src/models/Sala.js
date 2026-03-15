import mongoose from 'mongoose';

const salaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  docenteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  empresaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa' },
  fechaInicio: { type: Date },
  fechaFin: { type: Date },
  estado: { type: String, enum: ['activa', 'finalizada', 'programada'], default: 'programada' },
  fechaCreacion: { type: Date, default: Date.now }
});

export const Sala = mongoose.model('Sala', salaSchema);
