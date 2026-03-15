// Empresas
export interface Empresa {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  status: "active" | "inactive";
}

export const empresas: Empresa[] = [];

// Docentes
export interface Docente {
  id: string;
  name: string;
  email: string;
  empresaId: string;
  especialidad: string;
  createdAt: string;
}

export const docentes: Docente[] = [];

// Salas / Cursos
export interface Sala {
  id: string;
  nombre: string;
  descripcion: string;
  docenteId: string;
  empresaId: string;
  fechaInicio: string;
  fechaFin: string;
  estado: "activa" | "finalizada" | "programada";
}

export const salas: Sala[] = [];

// Estudiantes
export interface Estudiante {
  id: string;
  name: string;
  email: string;
  empresaId: string;
  createdAt: string;
}

export const estudiantes: Estudiante[] = [];

// Inscripciones a salas
export interface Inscripcion {
  id: string;
  estudianteId: string;
  salaId: string;
  fechaInscripcion: string;
  progreso: number; // 0-100
  estado: "cursando" | "completado" | "abandonado";
}

export const inscripciones: Inscripcion[] = [];

// Contenido de sala (módulos/lecciones)
export interface Contenido {
  id: string;
  salaId: string;
  titulo: string;
  descripcion: string;
  tipo: "video" | "documento" | "evaluacion";
  url?: string;
  orden: number;
}

export const contenidos: Contenido[] = [];

// Evaluaciones
export interface Evaluacion {
  id: string;
  contenidoId: string;
  estudianteId: string;
  nota: number; // 0-100
  fecha: string;
  estado: "pendiente" | "aprobado" | "reprobado";
  intentos: number;
}

export const evaluaciones: Evaluacion[] = [];

// Certificados
export interface Certificado {
  id: string;
  estudianteId: string;
  salaId: string;
  fechaEmision: string;
  jsonData: string; // JSON stringify del certificado
  hash: string; // Para validación
}

export const certificados: Certificado[] = [];