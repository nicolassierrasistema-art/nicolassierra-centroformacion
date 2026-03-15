import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import salasRoutes from './routes/salas.js';
import empresasRoutes from './routes/empresas.js';
import inscripcionesRoutes from './routes/inscripciones.js';
import contenidosRoutes from './routes/contenidos.js';
import evaluacionesRoutes from './routes/evaluaciones.js';
import certificadosRoutes from './routes/certificados.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/salas', salasRoutes);
app.use('/api/empresas', empresasRoutes);
app.use('/api/inscripciones', inscripcionesRoutes);
app.use('/api/contenidos', contenidosRoutes);
app.use('/api/evaluaciones', evaluacionesRoutes);
app.use('/api/certificados', certificadosRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API funcionando' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
