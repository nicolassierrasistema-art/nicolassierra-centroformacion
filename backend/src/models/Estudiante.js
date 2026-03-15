import mongoose from 'mongoose';

const estudianteSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  empresaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa' },
  fechaCreacion: { type: Date, default: Date.now }
});

export const Estudiante = mongoose.model('Estudiante', estudianteSchema);
