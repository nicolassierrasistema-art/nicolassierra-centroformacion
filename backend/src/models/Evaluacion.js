import mongoose from 'mongoose';

const evaluacionSchema = new mongoose.Schema({
  contenidoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contenido', required: true },
  estudianteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  nota: { type: Number, default: 0 },
  fecha: { type: Date, default: Date.now },
  estado: { type: String, enum: ['pendiente', 'aprobado', 'reprobado'], default: 'pendiente' },
  intentos: { type: Number, default: 0 }
});

export const Evaluacion = mongoose.model('Evaluacion', evaluacionSchema);
