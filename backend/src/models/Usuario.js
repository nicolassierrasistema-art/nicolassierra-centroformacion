import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { 
    type: String, 
    enum: ['estudiante', 'docente', 'empresa', 'superadmin'], 
    required: true 
  },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  activo: { type: Boolean, default: true },
  fechaCreacion: { type: Date, default: Date.now }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
