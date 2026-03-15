import mongoose from 'mongoose';

const inscripcionSchema = new mongoose.Schema({
  estudianteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  salaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sala', required: true },
  fechaInscripcion: { type: Date, default: Date.now },
  progreso: { type: Number, default: 0 },
  estado: { type: String, enum: ['cursando', 'completado', 'abandonado'], default: 'cursando' }
});

export const Inscripcion = mongoose.model('Inscripcion', inscripcionSchema);
