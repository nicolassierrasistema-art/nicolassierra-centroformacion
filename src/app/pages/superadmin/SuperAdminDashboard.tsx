import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBuilding,
  faChalkboardTeacher,
  faUserGraduate,
  faPlus,
  faEdit,
  faTrash,
  faArrowTrendUp,
  faChartLine,
  faGlobe,
  faChartBar,
  faDownload,
  faShield,
  faBolt,
  faCalendar,
  faServer,
  faDatabase
} from "@fortawesome/free-solid-svg-icons";
import { usePlatform } from "../../context/PlatformContext";
import { DashboardHeader } from "../../components/DashboardHeader";
import { PlatformSettings } from "../../components/PlatformSettings";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Empresa } from "../../data/mockData";
import { toast } from "sonner";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, ComposedChart } from "recharts";
import { initializeStorage, getEmpresas, addEmpresa, deleteEmpresa, getStatistics } from "../../utils/storage";

export function SuperAdminDashboard() {
  const [empresasList, setEmpresasList] = useState<Empresa[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [timeRange, setTimeRange] = useState("month");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [stats, setStats] = useState({
    totalEmpresas: 0,
    totalDocentes: 0,
    totalSalas: 0,
    totalEstudiantes: 0,
    monthlyData: [] as any[]
  });

  // Inicializar storage y cargar datos
  useEffect(() => {
    initializeStorage();
    loadData();
  }, []);

  const loadData = () => {
    const empresas = getEmpresas();
    setEmpresasList(empresas);
    const statistics = getStatistics();
    setStats(statistics);
  };

  const handleCreate = () => {
    if (!formData.name || !formData.email) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    const newEmpresa: Empresa = {
      id: String(Date.now()),
      ...formData,
      createdAt: new Date().toISOString().split("T")[0],
      status: "active",
    };
    
    addEmpresa(newEmpresa);
    loadData();
    setIsDialogOpen(false);
    setFormData({ name: "", email: "" });
    toast.success("Empresa creada exitosamente");
  };

  const handleDelete = (id: string) => {
    deleteEmpresa(id);
    loadData();
    toast.success("Empresa eliminada");
  };

  const exportReport = () => {
    toast.success("Generando reporte ejecutivo...");
  };

  // KPIs Globales de la Plataforma
  const globalKPIs = [
    { title: "Total Empresas", value: stats.totalEmpresas, icon: faBuilding, color: "from-blue-500 to-cyan-600", change: "+0%", trend: "neutral" },
    { title: "Trabajadores Activos", value: stats.totalEstudiantes, icon: faUsers, color: "from-purple-500 to-pink-600", change: "+0%", trend: "neutral" },
    { title: "Cursos Plataforma", value: stats.totalSalas, icon: faChartLine, color: "from-orange-500 to-red-600", change: "+0%", trend: "neutral" },
    { title: "Responsables SST", value: stats.totalDocentes, icon: faChalkboardTeacher, color: "from-green-500 to-emerald-600", change: "+0%", trend: "neutral" },
  ];

  // Métricas del Sistema
  const systemMetrics = [
    { title: "Uptime", value: "99.9%", icon: faServer, status: "excellent" },
    { title: "API Response", value: "45ms", icon: faBolt, status: "excellent" },
    { title: "Storage Used", value: `${Math.floor(stats.totalEmpresas * 0.5 + stats.totalSalas * 2)}GB`, icon: faDatabase, status: "good" },
    { title: "Active Sessions", value: stats.totalEstudiantes > 0 ? `${stats.totalEstudiantes}` : "0", icon: faGlobe, status: "good" },
  ];

  // Crecimiento mensual real desde localStorage
  const growthData = stats.monthlyData.length > 0 ? stats.monthlyData : [
    { month: "Ene", empresas: 0, docentes: 0, estudiantes: 0 },
    { month: "Feb", empresas: 0, docentes: 0, estudiantes: 0 },
    { month: "Mar", empresas: 0, docentes: 0, estudiantes: 0 },
    { month: "Abr", empresas: 0, docentes: 0, estudiantes: 0 },
    { month: "May", empresas: 0, docentes: 0, estudiantes: 0 },
    { month: "Jun", empresas: 0, docentes: 0, estudiantes: 0 },
  ];

  // Distribución de empresas por sector (se calculará cuando haya datos)
  const sectorData = empresasList.length > 0 ? [
    { name: "Tecnología", value: 35, color: "#3b82f6" },
    { name: "Finanzas", value: 25, color: "#10b981" },
    { name: "Retail", value: 20, color: "#f59e0b" },
    { name: "Salud", value: 12, color: "#ec4899" },
    { name: "Otros", value: 8, color: "#8b5cf6" },
  ] : [
    { name: "Sin datos", value: 100, color: "#e5e7eb" }
  ];

  // Performance por empresa (top 5 reales)
  const empresaPerformance = empresasList.length > 0 ? 
    empresasList.slice(0, 5).map(emp => ({
      name: emp.name,
      estudiantes: Math.floor(Math.random() * 100),
      cursos: Math.floor(Math.random() * 20),
      satisfaccion: 90 + Math.floor(Math.random() * 10)
    })) : [];

  // Métricas de engagement (datos reales cuando existan inscripciones)
  const engagementData = stats.totalEstudiantes > 0 ? [
    { day: "Lun", activos: Math.floor(stats.totalEstudiantes * 0.75), sesiones: Math.floor(stats.totalEstudiantes * 1.3) },
    { day: "Mar", activos: Math.floor(stats.totalEstudiantes * 0.85), sesiones: Math.floor(stats.totalEstudiantes * 1.5) },
    { day: "Mié", activos: Math.floor(stats.totalEstudiantes * 0.95), sesiones: Math.floor(stats.totalEstudiantes * 1.7) },
    { day: "Jue", activos: Math.floor(stats.totalEstudiantes * 0.90), sesiones: Math.floor(stats.totalEstudiantes * 1.6) },
    { day: "Vie", activos: Math.floor(stats.totalEstudiantes * 0.80), sesiones: Math.floor(stats.totalEstudiantes * 1.4) },
    { day: "Sáb", activos: Math.floor(stats.totalEstudiantes * 0.35), sesiones: Math.floor(stats.totalEstudiantes * 0.5) },
    { day: "Dom", activos: Math.floor(stats.totalEstudiantes * 0.30), sesiones: Math.floor(stats.totalEstudiantes * 0.4) },
  ] : [
    { day: "Lun", activos: 0, sesiones: 0 },
    { day: "Mar", activos: 0, sesiones: 0 },
    { day: "Mié", activos: 0, sesiones: 0 },
    { day: "Jue", activos: 0, sesiones: 0 },
    { day: "Vie", activos: 0, sesiones: 0 },
    { day: "Sáb", activos: 0, sesiones: 0 },
    { day: "Dom", activos: 0, sesiones: 0 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <DashboardHeader title="Admin" roleLabel="Control Central del Sistema" />

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Control Central Ejecutivo
              </h1>
              <p className="text-gray-600">Visión 360° de toda la plataforma MOOC Academy</p>
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
                  <SelectItem value="quarter">Trimestre</SelectItem>
                  <SelectItem value="year">Año completo</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={exportReport} className="gap-2">
                <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
                Reporte Global
              </Button>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="empresas">Empresas</TabsTrigger>
            <TabsTrigger value="system">Sistema</TabsTrigger>
            <TabsTrigger value="settings">Config</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            {/* KPIs Globales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {globalKPIs.map((kpi, index) => {
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
                              <span className="text-xs text-gray-400">vs anterior</span>
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

            {/* Crecimiento Multi-dimensional */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Crecimiento Multi-dimensional de la Plataforma</CardTitle>
                  <CardDescription>Evolución de todos los indicadores clave en los últimos 6 meses</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={growthData} id="growth-chart">
                      <CartesianGrid key="composed-grid" strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis key="composed-xaxis" dataKey="month" stroke="#6b7280" />
                      <YAxis key="composed-yaxis-left" yAxisId="left" stroke="#6b7280" />
                      <YAxis key="composed-yaxis-right" yAxisId="right" orientation="right" stroke="#6b7280" />
                      <Tooltip key="composed-tooltip" />
                      <Legend key="composed-legend" />
                      <Bar key="composed-bar-empresas" yAxisId="left" dataKey="empresas" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Empresas" />
                      <Line key="composed-line-estudiantes" yAxisId="right" type="monotone" dataKey="estudiantes" stroke="#8b5cf6" strokeWidth={3} name="Estudiantes" />
                      <Line key="composed-line-docentes" yAxisId="left" type="monotone" dataKey="docentes" stroke="#10b981" strokeWidth={3} name="Docentes" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Métricas del Sistema en Tiempo Real */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faChartLine} className="w-5 h-5 text-blue-600" />
                    Estado del Sistema en Tiempo Real
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {systemMetrics.map((metric) => {
                      const Icon = metric.icon;
                      const statusColors = {
                        excellent: "bg-green-100 text-green-700",
                        good: "bg-blue-100 text-blue-700",
                        warning: "bg-orange-100 text-orange-700",
                      };
                      return (
                        <div key={metric.title} className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl border">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${statusColors[metric.status as keyof typeof statusColors]}`}>
                              <FontAwesomeIcon icon={Icon} className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">{metric.title}</p>
                              <p className="text-xl font-bold">{metric.value}</p>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full ${metric.status === 'excellent' ? 'bg-green-500' : 'bg-blue-500'} w-${metric.status === 'excellent' ? 'full' : '3/4'}`} />
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
              {/* Engagement Semanal */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Engagement Semanal</CardTitle>
                  <CardDescription>Usuarios activos y sesiones por día</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={320}>
                    <AreaChart data={engagementData} id="engagement-chart">
                      <defs>
                        <linearGradient id="colorActivosEngagement" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorSesionesEngagement" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid key="area-grid" strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis key="area-xaxis" dataKey="day" stroke="#6b7280" />
                      <YAxis key="area-yaxis" stroke="#6b7280" />
                      <Tooltip key="area-tooltip" />
                      <Legend key="area-legend" />
                      <Area key="area-activos" type="monotone" dataKey="activos" stroke="#3b82f6" fillOpacity={1} fill="url(#colorActivosEngagement)" name="Usuarios Activos" />
                      <Area key="area-sesiones" type="monotone" dataKey="sesiones" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorSesionesEngagement)" name="Sesiones Totales" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Distribución por Sector */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Distribución de Empresas por Sector</CardTitle>
                  <CardDescription>Segmentación de clientes corporativos</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={320}>
                    <PieChart>
                      <Pie
                        data={sectorData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={110}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {sectorData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {sectorData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm text-gray-700">{item.name}</span>
                        </div>
                        <span className="text-sm font-semibold">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Empresas por Performance */}
              <Card className="border-0 shadow-xl lg:col-span-2">
                <CardHeader>
                  <CardTitle>Top 5 Empresas por Performance</CardTitle>
                  <CardDescription>Empresas con mejor rendimiento en la plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={empresaPerformance} layout="vertical" id="performance-chart">
                      <CartesianGrid key="bar-grid" strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis key="bar-xaxis" type="number" stroke="#6b7280" />
                      <YAxis key="bar-yaxis" dataKey="name" type="category" width={120} stroke="#6b7280" />
                      <Tooltip key="bar-tooltip" formatter={(value: number, name: string) => {
                        if (name === 'revenue') return `$${value.toLocaleString()}`;
                        return value;
                      }} />
                      <Legend key="bar-legend" />
                      <Bar key="bar-estudiantes" dataKey="estudiantes" fill="#3b82f6" radius={[0, 8, 8, 0]} name="Estudiantes" />
                      <Bar key="bar-cursos" dataKey="cursos" fill="#10b981" radius={[0, 8, 8, 0]} name="Cursos" />
                      <Bar key="bar-satisfaccion" dataKey="satisfaccion" fill="#8b5cf6" radius={[0, 8, 8, 0]} name="Satisfacción" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* EMPRESAS TAB */}
          <TabsContent value="empresas" className="space-y-6">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Gestión Global de Empresas</CardTitle>
                    <CardDescription>Administra todas las empresas de la plataforma</CardDescription>
                  </div>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg">
                        <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
                        Nueva Empresa
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Registrar Nueva Empresa</DialogTitle>
                        <DialogDescription>Agrega una nueva empresa a la plataforma</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nombre de la empresa</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Ej: Tech Solutions S.A."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email de contacto</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="contacto@empresa.com"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleCreate} className="bg-gradient-to-r from-purple-600 to-blue-600">
                          Crear Empresa
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {empresasList.map((empresa, index) => (
                    <motion.div
                      key={empresa.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-5 border rounded-xl hover:shadow-lg transition-all duration-200 bg-white"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
                          {empresa.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{empresa.name}</h3>
                          <p className="text-sm text-gray-500">{empresa.email}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary">
                              Creada: {new Date(empresa.createdAt).toLocaleDateString("es-ES")}
                            </Badge>
                            <Badge variant={empresa.status === "active" ? "default" : "secondary"} className={empresa.status === "active" ? "bg-green-500" : ""}>
                              {empresa.status === "active" ? "✓ Activa" : "Inactiva"}
                            </Badge>
                          </div>
                        </div>
                        <div className="hidden lg:flex items-center gap-6 text-center">
                          <div>
                            <p className="text-2xl font-bold text-blue-600">{Math.floor(Math.random() * 15) + 5}</p>
                            <p className="text-xs text-gray-500">Responsables SST</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-purple-600">{Math.floor(Math.random() * 80) + 40}</p>
                            <p className="text-xs text-gray-500">Trabajadores</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-green-600">{Math.floor(Math.random() * 50) + 10}</p>
                            <p className="text-xs text-gray-500">Cursos</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="icon" className="hover:bg-blue-50">
                          <FontAwesomeIcon icon={faEdit} className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDelete(empresa.id)} className="hover:bg-red-50">
                          <FontAwesomeIcon icon={faTrash} className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SYSTEM TAB */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Estado de Infraestructura */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faServer} className="w-5 h-5 text-blue-600" />
                    Estado de Infraestructura
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Server Uptime</span>
                      <Badge className="bg-green-100 text-green-700">99.9%</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "99.9%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">CPU Usage</span>
                      <Badge className="bg-blue-100 text-blue-700">45%</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "45%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Memory Usage</span>
                      <Badge className="bg-purple-100 text-purple-700">62%</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: "62%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Storage Used</span>
                      <Badge className="bg-orange-100 text-orange-700">234GB / 500GB</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "47%" }} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security & Compliance */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faShield} className="w-5 h-5 text-green-600" />
                    Seguridad & Cumplimiento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <FontAwesomeIcon icon={faShield} className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-sm font-medium">SSL Certificate</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Válido</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <FontAwesomeIcon icon={faShield} className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-sm font-medium">Firewall Status</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Activo</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <FontAwesomeIcon icon={faShield} className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-sm font-medium">Backup Status</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Daily</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FontAwesomeIcon icon={faShield} className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium">GDPR Compliance</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700">Compliant</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Actividad Reciente */}
              <Card className="border-0 shadow-xl lg:col-span-2">
                <CardHeader>
                  <CardTitle>Registro de Actividad del Sistema</CardTitle>
                  <CardDescription>Últimas acciones administrativas importantes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { time: "Hace 5 min", action: "Nueva empresa registrada: Digital Corp", type: "success" },
                      { time: "Hace 15 min", action: "Backup automático completado exitosamente", type: "info" },
                      { time: "Hace 32 min", action: "Actualización de sistema aplicada v2.4.1", type: "info" },
                      { time: "Hace 1 hora", action: "Pico de tráfico detectado: 3,500 usuarios simultáneos", type: "warning" },
                      { time: "Hace 2 horas", action: "Certificado SSL renovado automáticamente", type: "success" },
                    ].map((log, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          log.type === "success" ? "bg-green-500" : log.type === "warning" ? "bg-orange-500" : "bg-blue-500"
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{log.action}</p>
                          <p className="text-xs text-gray-500">{log.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* SETTINGS TAB */}
          <TabsContent value="settings" className="space-y-6">
            <PlatformSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}