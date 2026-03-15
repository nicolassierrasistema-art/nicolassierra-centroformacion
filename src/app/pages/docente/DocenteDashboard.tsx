import { useState } from "react";
import { Link } from "react-router";
import { DashboardHeader } from "../../components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import { salas, Sala } from "../../data/mockData";
import { BookOpen, Users, ClipboardCheck, Plus, Edit, Settings } from "lucide-react";
import { toast } from "sonner";

export function DocenteDashboard() {
  const [salasList, setSalasList] = useState<Sala[]>(salas);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const handleCreate = () => {
    const newSala: Sala = {
      id: String(salasList.length + 1),
      ...formData,
      docenteId: "1", // ID del docente actual
      empresaId: "1",
      estado: "programada",
    };
    setSalasList([...salasList, newSala]);
    setIsDialogOpen(false);
    setFormData({ nombre: "", descripcion: "", fechaInicio: "", fechaFin: "" });
    toast.success("Sala creada exitosamente");
  };

  const stats = [
    { title: "Mis Salas", value: salasList.length, icon: BookOpen, color: "bg-blue-500" },
    { title: "Total Estudiantes", value: 45, icon: Users, color: "bg-green-500" },
    { title: "Evaluaciones Pendientes", value: 8, icon: ClipboardCheck, color: "bg-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader title="Docente" roleLabel="Docente" />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Panel del Docente</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Salas */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Mis Salas / Cursos</CardTitle>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nueva Sala
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Crear Nueva Sala</DialogTitle>
                    <DialogDescription>Crea un nuevo curso o grupo de estudio</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre de la sala</Label>
                      <Input
                        id="nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder="Ej: Desarrollo Web Full Stack - Grupo A"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="descripcion">Descripción</Label>
                      <Textarea
                        id="descripcion"
                        value={formData.descripcion}
                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                        placeholder="Describe el contenido del curso..."
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fechaInicio">Fecha de inicio</Label>
                        <Input
                          id="fechaInicio"
                          type="date"
                          value={formData.fechaInicio}
                          onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fechaFin">Fecha de fin</Label>
                        <Input
                          id="fechaFin"
                          type="date"
                          value={formData.fechaFin}
                          onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleCreate}>Crear Sala</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {salasList.map((sala) => (
                <div key={sala.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{sala.nombre}</h3>
                      <p className="text-sm text-gray-600 mb-3">{sala.descripcion}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant={
                          sala.estado === "activa" ? "default" :
                          sala.estado === "programada" ? "secondary" :
                          "outline"
                        }>
                          {sala.estado === "activa" ? "Activa" :
                           sala.estado === "programada" ? "Programada" :
                           "Finalizada"}
                        </Badge>
                        <Badge variant="outline">
                          {new Date(sala.fechaInicio).toLocaleDateString("es-ES")} - {new Date(sala.fechaFin).toLocaleDateString("es-ES")}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/docente/sala/${sala.id}/contenido`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Contenido
                      </Button>
                    </Link>
                    <Link to={`/docente/sala/${sala.id}/estudiantes`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <Users className="w-4 h-4 mr-2" />
                        Estudiantes
                      </Button>
                    </Link>
                    <Link to={`/docente/sala/${sala.id}/notas`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <ClipboardCheck className="w-4 h-4 mr-2" />
                        Notas
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
