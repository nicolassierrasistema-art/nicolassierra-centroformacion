import { useState } from "react";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faChalkboardTeacher,
  faUserGraduate,
  faPlus,
  faEdit,
  faTrash,
  faArrowTrendUp,
  faAward,
  faDollarSign,
  faBullseye,
  faBriefcase,
  faDownload,
  faFileAlt,
  faCalendar,
  faExclamationCircle,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import { DashboardHeader } from "../../components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { docentes, Docente } from "../../data/mockData";
import { toast } from "sonner";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

export function EmpresaDashboard() {
  const [docentesList, setDocentesList] = useState<Docente[]>(docentes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [timeRange, setTimeRange] = useState("month");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    especialidad: "",
  });

  const handleCreate = () => {
    const newDocente: Docente = {
      id: String(docentesList.length + 1),
      ...formData,
      empresaId: "1",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setDocentesList([...docentesList, newDocente]);
    setIsDialogOpen(false);
    setFormData({ name: "", email: "", especialidad: "" });
    toast.success("Docente creado exitosamente");
  };

  const handleDelete = (id: string) => {
    setDocentesList(docentesList.filter((d) => d.id !== id));
    toast.success("Docente eliminado");
  };

  const exportReport = () => {
    toast.success("Exportando reporte en PDF...");
  };

  // KPIs Ejecutivos
  const kpis = [
    { title: "ROI Capacitación", value: "342%", icon: faArrowTrendUp, color: "from-green-500 to-emerald-600", change: "+25%", trend: "up" },
    { title: "Inversión Total", value: "$125K", icon: faDollarSign, color: "from-blue-500 to-cyan-600", change: "+12%", trend: "up" },
    { title: "Tasa Completitud", value: "87%", icon: faBullseye, color: "from-purple-500 to-pink-600", change: "+8%", trend: "up" },
    { title: "Certificados", value: "234", icon: faAward, color: "from-orange-500 to-red-600", change: "+18%", trend: "up" },
  ];

  // Métricas Operacionales
  const operationalMetrics = [
    { title: "Docentes Activos", value: docentesList.length, icon: faUsers, status: "success" },
    { title: "Salas en Curso", value: 8, icon: faChalkboardTeacher, status: "success" },
    { title: "Estudiantes Activos", value: 156, icon: faUserGraduate, status: "success" },
    { title: "Proyectos Pendientes", value: 3, icon: faExclamationCircle, status: "warning" },
  ];

  // Datos de tendencias mensuales
  const trendData = [
    { month: "Ene", estudiantes: 95, completados: 72, inversion: 18, satisfaccion: 82 },
    { month: "Feb", estudiantes: 110, completados: 88, inversion: 22, satisfaccion: 85 },
    { month: "Mar", estudiantes: 125, completados: 98, inversion: 24, satisfaccion: 88 },
    { month: "Abr", estudiantes: 142, completados: 115, inversion: 26, satisfaccion: 89 },
    { month: "May", estudiantes: 156, completados: 136, inversion: 28, satisfaccion: 91 },
  ];

  // Performance por área
  const areaPerformance = [
    { area: "Desarrollo Web", estudiantes: 45, completados: 38, satisfaccion: 92 },
    { area: "Data Science", estudiantes: 38, completados: 32, satisfaccion: 90 },
    { area: "Diseño UX/UI", estudiantes: 30, completados: 27, satisfaccion: 95 },
    { area: "Marketing Digital", estudiantes: 25, completados: 22, satisfaccion: 88 },
    { area: "DevOps", estudiantes: 18, completados: 17, satisfaccion: 93 },
  ];

  // Distribución de inversión
  const investmentData = [
    { name: "Desarrollo Web", value: 35000, color: "#3b82f6" },
    { name: "Data Science", value: 28000, color: "#8b5cf6" },
    { name: "Diseño", value: 22000, color: "#ec4899" },
    { name: "Marketing", value: 20000, color: "#f59e0b" },
    { name: "DevOps", value: 20000, color: "#10b981" },
  ];

  // Radar de competencias
  const competenciasData = [
    { competencia: "Técnicas", A: 85, fullMark: 100 },
    { competencia: "Liderazgo", A: 78, fullMark: 100 },
    { competencia: "Comunicación", A: 92, fullMark: 100 },
    { competencia: "Innovación", A: 88, fullMark: 100 },
    { competencia: "Colaboración", A: 95, fullMark: 100 },
  ];

  // Objetivos y metas
  const goals = [
    { title: "Certificar 200 empleados", progress: 87, target: 200, current: 174, deadline: "Jun 2026" },
    { title: "ROI > 300%", progress: 95, target: 300, current: 285, deadline: "Dic 2026" },
    { title: "Satisfacción > 90%", progress: 92, target: 90, current: 83, deadline: "Ago 2026" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <DashboardHeader title="Empresa" roleLabel="CEO - Panel Ejecutivo" />

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Dashboard Ejecutivo
              </h1>
              <p className="text-gray-600">Visión estratégica de tu programa de capacitación</p>
            </div>
            <div className="flex gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <FontAwesomeIcon icon={faCalendar} className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Esta semana</SelectItem>
                  <SelectItem value="month">Este mes</SelectItem>
                  <SelectItem value="quarter">Este trimestre</SelectItem>
                  <SelectItem value="year">Este año</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={exportReport} className="gap-2">
                <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
                Exportar Reporte
              </Button>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="overview">📊 Overview</TabsTrigger>
            <TabsTrigger value="analytics">📈 Análisis</TabsTrigger>
            <TabsTrigger value="team">👥 Equipo</TabsTrigger>
            <TabsTrigger value="goals">🎯 Objetivos</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            {/* KPIs Ejecutivos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpis.map((kpi, index) => {
                const Icon = kpi.icon;
                return (
                  <motion.div
                    key={kpi.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">{kpi.title}</p>
                            <p className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                              {kpi.value}
                            </p>
                            <div className="flex items-center gap-1 mt-2">
                              <FontAwesomeIcon icon={faArrowTrendUp} className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-green-600 font-medium">{kpi.change}</span>
                              <span className="text-xs text-gray-400">vs mes anterior</span>
                            </div>
                          </div>
                          <div className={`bg-gradient-to-br ${kpi.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <FontAwesomeIcon icon={Icon} className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Tendencias y Performance */}
            <div className="grid lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle>Evolución de Estudiantes y Completitud</CardTitle>
                    <CardDescription>Tendencia de participación y finalización</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={320}>
                      <AreaChart data={trendData}>
                        <defs>
                          <linearGradient id="colorEstudiantes" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="colorCompletados" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="estudiantes" stroke="#3b82f6" fillOpacity={1} fill="url(#colorEstudiantes)" name="Estudiantes" />
                        <Area type="monotone" dataKey="completados" stroke="#10b981" fillOpacity={1} fill="url(#colorCompletados)" name="Completados" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle>Inversión y Satisfacción</CardTitle>
                    <CardDescription>Correlación entre inversión y resultados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={320}>
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis yAxisId="left" stroke="#6b7280" />
                        <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                        <Tooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="inversion" stroke="#f59e0b" strokeWidth={3} name="Inversión (K)" />
                        <Line yAxisId="right" type="monotone" dataKey="satisfaccion" stroke="#8b5cf6" strokeWidth={3} name="Satisfacción %" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Métricas Operacionales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Estado Operacional en Tiempo Real</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {operationalMetrics.map((metric, index) => {
                      const Icon = metric.icon;
                      return (
                        <div key={metric.title} className="flex items-center gap-3 p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl border">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            metric.status === "success" ? "bg-green-100" : "bg-orange-100"
                          }`}>
                            <FontAwesomeIcon icon={Icon} className={`w-6 h-6 ${metric.status === "success" ? "text-green-600" : "text-orange-600"}`} />
                          </div>
                          <div>
                            <p className="text-2xl font-bold">{metric.value}</p>
                            <p className="text-xs text-gray-500">{metric.title}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* ANALYTICS TAB */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Performance por Área */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Performance por Área de Conocimiento</CardTitle>
                  <CardDescription>Comparativa de resultados por programa</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={areaPerformance} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" stroke="#6b7280" />
                      <YAxis dataKey="area" type="category" width={120} stroke="#6b7280" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="estudiantes" fill="#3b82f6" radius={[0, 8, 8, 0]} name="Inscritos" />
                      <Bar dataKey="completados" fill="#10b981" radius={[0, 8, 8, 0]} name="Completados" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Distribución de Inversión */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Distribución de Inversión por Área</CardTitle>
                  <CardDescription>Asignación presupuestaria actual</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={investmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {investmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {investmentData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm text-gray-700">{item.name}</span>
                        </div>
                        <span className="text-sm font-semibold">${(item.value / 1000).toFixed(0)}K</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Radar de Competencias */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Mapa de Competencias Organizacional</CardTitle>
                  <CardDescription>Nivel promedio de desarrollo de competencias</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <RadarChart data={competenciasData}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="competencia" stroke="#6b7280" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#6b7280" />
                      <Radar name="Nivel Actual" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">Promedio General: <span className="font-bold text-purple-600">87.6%</span></p>
                  </div>
                </CardContent>
              </Card>

              {/* Insights Estratégicos */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faBriefcase} className="w-5 h-5 text-blue-600" />
                    Insights Estratégicos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border-l-4 border-green-500">
                    <div className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm">ROI superior al objetivo</p>
                        <p className="text-xs text-gray-600 mt-1">La inversión en capacitación ha generado un retorno del 342%, superando la meta del 300% establecida.</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
                    <div className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faArrowTrendUp} className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm">Crecimiento sostenido</p>
                        <p className="text-xs text-gray-600 mt-1">Incremento mensual promedio del 15% en participación de estudiantes durante los últimos 5 meses.</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-lg border-l-4 border-purple-500">
                    <div className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faAward} className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm">Alta tasa de completitud</p>
                        <p className="text-xs text-gray-600 mt-1">El 87% de los estudiantes completan sus programas, indicando alta calidad del contenido y engagement.</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-lg border-l-4 border-orange-500">
                    <div className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faBullseye} className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm">Oportunidad de expansión</p>
                        <p className="text-xs text-gray-600 mt-1">Diseño UX/UI muestra la mayor satisfacción (95%). Considerar ampliar oferta en esta área.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TEAM TAB */}
          <TabsContent value="team" className="space-y-6">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Gestión de Equipo Docente</CardTitle>
                    <CardDescription>Administra y monitorea tu equipo de instructores</CardDescription>
                  </div>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg">
                        <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
                        Nuevo Docente
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Crear Nuevo Docente</DialogTitle>
                        <DialogDescription>Registra un nuevo docente en tu empresa</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nombre completo</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Ej: Carlos Ruiz"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="docente@empresa.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="especialidad">Especialidad</Label>
                          <Input
                            id="especialidad"
                            value={formData.especialidad}
                            onChange={(e) => setFormData({ ...formData, especialidad: e.target.value })}
                            placeholder="Ej: Desarrollo Web"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleCreate} className="bg-gradient-to-r from-blue-600 to-cyan-600">
                          Crear Docente
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {docentesList.map((docente, index) => (
                    <motion.div
                      key={docente.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-5 border rounded-xl hover:shadow-lg transition-all duration-200 bg-white"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                          {docente.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{docente.name}</h3>
                          <p className="text-sm text-gray-500">{docente.email}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700">{docente.especialidad}</Badge>
                            <Badge variant="outline">
                              Desde: {new Date(docente.createdAt).toLocaleDateString("es-ES")}
                            </Badge>
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                              ✓ Activo
                            </Badge>
                          </div>
                        </div>
                        <div className="hidden lg:flex items-center gap-6 text-center">
                          <div>
                            <p className="text-2xl font-bold text-blue-600">12</p>
                            <p className="text-xs text-gray-500">Salas</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-purple-600">45</p>
                            <p className="text-xs text-gray-500">Estudiantes</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-green-600">4.8</p>
                            <p className="text-xs text-gray-500">Rating</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="icon" className="hover:bg-blue-50">
                          <FontAwesomeIcon icon={faEdit} className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDelete(docente.id)} className="hover:bg-red-50">
                          <FontAwesomeIcon icon={faTrash} className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* GOALS TAB */}
          <TabsContent value="goals" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Objetivos Estratégicos */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faBullseye} className="w-5 h-5 text-blue-600" />
                    Objetivos Estratégicos 2026
                  </CardTitle>
                  <CardDescription>Seguimiento de metas corporativas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {goals.map((goal, index) => (
                    <div key={goal.title} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{goal.title}</p>
                          <p className="text-sm text-gray-500">
                            {goal.current} de {goal.target} · Deadline: {goal.deadline}
                          </p>
                        </div>
                        <Badge className={goal.progress >= 90 ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}>
                          {goal.progress}%
                        </Badge>
                      </div>
                      <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${goal.progress}%` }}
                          transition={{ delay: index * 0.2, duration: 1 }}
                          className={`absolute h-full rounded-full ${
                            goal.progress >= 90 
                              ? "bg-gradient-to-r from-green-500 to-emerald-600" 
                              : "bg-gradient-to-r from-blue-500 to-purple-600"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Proyecciones */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Proyecciones Fin de Año</CardTitle>
                  <CardDescription>Estimaciones basadas en tendencia actual</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Estudiantes Proyectados</span>
                      <FontAwesomeIcon icon={faArrowTrendUp} className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-blue-600">285</p>
                    <p className="text-xs text-gray-500 mt-1">+82% vs inicio de año</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">ROI Estimado</span>
                      <FontAwesomeIcon icon={faDollarSign} className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-green-600">420%</p>
                    <p className="text-xs text-gray-500 mt-1">Superando meta en +120%</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Certificaciones Totales</span>
                      <FontAwesomeIcon icon={faAward} className="w-4 h-4 text-purple-600" />
                    </div>
                    <p className="text-3xl font-bold text-purple-600">320</p>
                    <p className="text-xs text-gray-500 mt-1">+37% sobre objetivo</p>
                  </div>
                </CardContent>
              </Card>

              {/* Recomendaciones */}
              <Card className="border-0 shadow-xl lg:col-span-2 bg-gradient-to-br from-orange-50 to-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5 text-orange-600" />
                    Recomendaciones Estratégicas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-4 bg-white rounded-lg border-l-4 border-orange-500">
                    <p className="font-semibold text-sm mb-1">1. Expandir programa de Diseño UX/UI</p>
                    <p className="text-xs text-gray-600">Dado el alto índice de satisfacción (95%) y completitud (90%), se recomienda aumentar la oferta en esta área y asignar +30% de presupuesto adicional.</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
                    <p className="font-semibold text-sm mb-1">2. Programa de mentoring</p>
                    <p className="text-xs text-gray-600">Implementar sistema de mentoring 1-on-1 con los docentes mejor evaluados para acelerar el desarrollo de competencias de liderazgo (actualmente en 78%).</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border-l-4 border-green-500">
                    <p className="font-semibold text-sm mb-1">3. Certificación internacional</p>
                    <p className="text-xs text-gray-600">Establecer alianzas con instituciones internacionales para validar certificaciones y aumentar el valor percibido del programa.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}