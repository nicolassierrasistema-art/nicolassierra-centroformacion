import { useState } from "react";
import { useParams, Link } from "react-router";
import { DashboardHeader } from "../../components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { contenidos, Contenido, salas } from "../../data/mockData";
import { ArrowLeft, Plus, Video, FileText, ClipboardCheck, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function SalaContenido() {
  const { salaId } = useParams();
  const sala = salas.find((s) => s.id === salaId);
  const [contenidoList, setContenidoList] = useState<Contenido[]>(
    contenidos.filter((c) => c.salaId === salaId)
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    tipo: "video" as "video" | "documento" | "evaluacion",
    url: "",
  });

  const handleCreate = () => {
    const newContenido: Contenido = {
      id: String(contenidoList.length + 1),
      salaId: salaId!,
      ...formData,
      orden: contenidoList.length + 1,
    };
    setContenidoList([...contenidoList, newContenido]);
    setIsDialogOpen(false);
    setFormData({ titulo: "", descripcion: "", tipo: "video", url: "" });
    toast.success("Contenido agregado exitosamente");
  };

  const handleDelete = (id: string) => {
    setContenidoList(contenidoList.filter((c) => c.id !== id));
    toast.success("Contenido eliminado");
  };

  const getIcon = (tipo: string) => {
    switch (tipo) {
      case "video":
        return <Video className="w-5 h-5" />;
      case "documento":
        return <FileText className="w-5 h-5" />;
      case "evaluacion":
        return <ClipboardCheck className="w-5 h-5" />;
    }
  };

  if (!sala) {
    return <div>Sala no encontrada</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader title="Docente" roleLabel="Docente" />

      <div className="container mx-auto px-4 py-8">
        <Link to="/docente" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Volver a mis salas
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{sala.nombre}</h1>
          <p className="text-gray-600">{sala.descripcion}</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Contenido del Curso</CardTitle>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Contenido
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Agregar Nuevo Contenido</DialogTitle>
                    <DialogDescription>Videos, documentos o evaluaciones</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="tipo">Tipo de contenido</Label>
                      <Select
                        value={formData.tipo}
                        onValueChange={(value: any) => setFormData({ ...formData, tipo: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="documento">Documento</SelectItem>
                          <SelectItem value="evaluacion">Evaluación</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="titulo">Título</Label>
                      <Input
                        id="titulo"
                        value={formData.titulo}
                        onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                        placeholder="Título del contenido"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="descripcion">Descripción</Label>
                      <Textarea
                        id="descripcion"
                        value={formData.descripcion}
                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                        placeholder="Describe el contenido..."
                        rows={3}
                      />
                    </div>
                    {formData.tipo !== "evaluacion" && (
                      <div className="space-y-2">
                        <Label htmlFor="url">URL</Label>
                        <Input
                          id="url"
                          value={formData.url}
                          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                          placeholder="URL del video o documento"
                        />
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleCreate}>Agregar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contenidoList.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No hay contenido aún. Agrega videos, documentos o evaluaciones.
                </p>
              ) : (
                contenidoList.map((contenido, index) => (
                  <div key={contenido.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getIcon(contenido.tipo)}
                        <h3 className="font-semibold">{contenido.titulo}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{contenido.descripcion}</p>
                      <Badge variant="secondary" className="mt-2 capitalize">
                        {contenido.tipo}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(contenido.id)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
