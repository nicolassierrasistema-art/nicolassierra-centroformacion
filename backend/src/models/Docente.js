import mongoose from 'mongoose';

const docenteSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  empresaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa' },
  especialidad: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now }
});

export const Docente = mongoose.model('Docente', docenteSchema);
