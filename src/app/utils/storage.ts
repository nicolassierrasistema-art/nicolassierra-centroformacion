import { 
  Empresa, 
  Docente, 
  Sala, 
  Estudiante, 
  Inscripcion, 
  Contenido, 
  Evaluacion, 
  Certificado 
} from '../data/mockData';

// Claves de localStorage
const STORAGE_KEYS = {
  EMPRESAS: 'mooc_empresas',
  DOCENTES: 'mooc_docentes',
  SALAS: 'mooc_salas',
  ESTUDIANTES: 'mooc_estudiantes',
  INSCRIPCIONES: 'mooc_inscripciones',
  CONTENIDOS: 'mooc_contenidos',
  EVALUACIONES: 'mooc_evaluaciones',
  CERTIFICADOS: 'mooc_certificados',
  INITIALIZED: 'mooc_initialized'
};

// Inicializar localStorage con datos vacíos
export function initializeStorage() {
  const isInitialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
  
  if (!isInitialized) {
    localStorage.setItem(STORAGE_KEYS.EMPRESAS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.DOCENTES, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.SALAS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.ESTUDIANTES, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.INSCRIPCIONES, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.CONTENIDOS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.EVALUACIONES, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.CERTIFICADOS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
  }
}

// Empresas
export function getEmpresas(): Empresa[] {
  const data = localStorage.getItem(STORAGE_KEYS.EMPRESAS);
  return data ? JSON.parse(data) : [];
}

export function saveEmpresas(empresas: Empresa[]) {
  localStorage.setItem(STORAGE_KEYS.EMPRESAS, JSON.stringify(empresas));
}

export function addEmpresa(empresa: Empresa) {
  const empresas = getEmpresas();
  empresas.push(empresa);
  saveEmpresas(empresas);
}

export function deleteEmpresa(id: string) {
  const empresas = getEmpresas().filter(e => e.id !== id);
  saveEmpresas(empresas);
}

// Docentes
export function getDocentes(): Docente[] {
  const data = localStorage.getItem(STORAGE_KEYS.DOCENTES);
  return data ? JSON.parse(data) : [];
}

export function saveDocentes(docentes: Docente[]) {
  localStorage.setItem(STORAGE_KEYS.DOCENTES, JSON.stringify(docentes));
}

export function addDocente(docente: Docente) {
  const docentes = getDocentes();
  docentes.push(docente);
  saveDocentes(docentes);
}

// Salas
export function getSalas(): Sala[] {
  const data = localStorage.getItem(STORAGE_KEYS.SALAS);
  return data ? JSON.parse(data) : [];
}

export function saveSalas(salas: Sala[]) {
  localStorage.setItem(STORAGE_KEYS.SALAS, JSON.stringify(salas));
}

export function addSala(sala: Sala) {
  const salas = getSalas();
  salas.push(sala);
  saveSalas(salas);
}

// Estudiantes
export function getEstudiantes(): Estudiante[] {
  const data = localStorage.getItem(STORAGE_KEYS.ESTUDIANTES);
  return data ? JSON.parse(data) : [];
}

export function saveEstudiantes(estudiantes: Estudiante[]) {
  localStorage.setItem(STORAGE_KEYS.ESTUDIANTES, JSON.stringify(estudiantes));
}

export function addEstudiante(estudiante: Estudiante) {
  const estudiantes = getEstudiantes();
  estudiantes.push(estudiante);
  saveEstudiantes(estudiantes);
}

// Inscripciones
export function getInscripciones(): Inscripcion[] {
  const data = localStorage.getItem(STORAGE_KEYS.INSCRIPCIONES);
  return data ? JSON.parse(data) : [];
}

export function saveInscripciones(inscripciones: Inscripcion[]) {
  localStorage.setItem(STORAGE_KEYS.INSCRIPCIONES, JSON.stringify(inscripciones));
}

// Contenidos
export function getContenidos(): Contenido[] {
  const data = localStorage.getItem(STORAGE_KEYS.CONTENIDOS);
  return data ? JSON.parse(data) : [];
}

export function saveContenidos(contenidos: Contenido[]) {
  localStorage.setItem(STORAGE_KEYS.CONTENIDOS, JSON.stringify(contenidos));
}

// Evaluaciones
export function getEvaluaciones(): Evaluacion[] {
  const data = localStorage.getItem(STORAGE_KEYS.EVALUACIONES);
  return data ? JSON.parse(data) : [];
}

export function saveEvaluaciones(evaluaciones: Evaluacion[]) {
  localStorage.setItem(STORAGE_KEYS.EVALUACIONES, JSON.stringify(evaluaciones));
}

// Certificados
export function getCertificados(): Certificado[] {
  const data = localStorage.getItem(STORAGE_KEYS.CERTIFICADOS);
  return data ? JSON.parse(data) : [];
}

export function saveCertificados(certificados: Certificado[]) {
  localStorage.setItem(STORAGE_KEYS.CERTIFICADOS, JSON.stringify(certificados));
}

// Estadísticas calculadas
export function getStatistics() {
  const empresas = getEmpresas();
  const docentes = getDocentes();
  const salas = getSalas();
  const estudiantes = getEstudiantes();
  const inscripciones = getInscripciones();
  
  // Calcular métricas por mes (últimos 6 meses)
  const monthlyData = [];
  const now = new Date();
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = months[date.getMonth()];
    const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    const empresasCount = empresas.filter(e => e.createdAt.startsWith(monthStr)).length;
    const docentesCount = docentes.filter(d => d.createdAt.startsWith(monthStr)).length;
    const estudiantesCount = estudiantes.filter(e => e.createdAt.startsWith(monthStr)).length;
    
    monthlyData.push({
      month: monthName,
      empresas: empresasCount,
      docentes: docentesCount,
      estudiantes: estudiantesCount
    });
  }
  
  return {
    totalEmpresas: empresas.length,
    totalDocentes: docentes.length,
    totalSalas: salas.length,
    totalEstudiantes: estudiantes.length,
    totalInscripciones: inscripciones.length,
    activeSalas: salas.filter(s => s.estado === 'activa').length,
    monthlyData,
    empresas,
    docentes,
    salas,
    estudiantes
  };
}

// Resetear todos los datos
export function resetAllData() {
  localStorage.removeItem(STORAGE_KEYS.INITIALIZED);
  initializeStorage();
}
