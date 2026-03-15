import mongoose from 'mongoose';

const certificadoSchema = new mongoose.Schema({
  estudianteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  salaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sala', required: true },
  fechaEmision: { type: Date, default: Date.now },
  jsonData: { type: String },
  hash: { type: String }
});

export const Certificado = mongoose.model('Certificado', certificadoSchema);
