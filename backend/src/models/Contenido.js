import mongoose from 'mongoose';

const contenidoSchema = new mongoose.Schema({
  salaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sala', required: true },
  titulo: { type: String, required: true },
  descripcion: { type: String },
  tipo: { type: String, enum: ['video', 'documento', 'evaluacion'], required: true },
  url: { type: String },
  orden: { type: Number, default: 0 },
  fechaCreacion: { type: Date, default: Date.now }
});

export const Contenido = mongoose.model('Contenido', contenidoSchema);
