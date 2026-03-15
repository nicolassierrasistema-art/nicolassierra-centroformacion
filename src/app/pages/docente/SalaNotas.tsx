import { useState } from "react";
import { useParams, Link } from "react-router";
import { DashboardHeader } from "../../components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { evaluaciones, estudiantes, salas, Evaluacion } from "../../data/mockData";
import { ArrowLeft, Upload, Award } from "lucide-react";
import { toast } from "sonner";

export function SalaNotas() {
  const { salaId } = useParams();
  const sala = salas.find((s) => s.id === salaId);
  const [evaluacionesList, setEvaluacionesList] = useState<Evaluacion[]>(evaluaciones);
  const [selectedEstudiante, setSelectedEstudiante] = useState<string | null>(null);
  const [certificadoData, setCertificadoData] = useState({
    notaFinal: "",
    observaciones: "",
  });

  const handleGenerarCertificado = () => {
    const estudiante = estudiantes.find((e) => e.id === selectedEstudiante);
    
    const certificadoJSON = {
      estudiante: estudiante?.name,
      email: estudiante?.email,
      curso: sala?.nombre,
      fechaEmision: new Date().toISOString().split("T")[0],
      notaFinal: certificadoData.notaFinal,
      observaciones: certificadoData.observaciones,
      docente: "Carlos Ruiz",
      hash: `cert-${Date.now()}`,
    };

    // Descargar JSON
    const blob = new Blob([JSON.stringify(certificadoJSON, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `certificado-${estudiante?.name.replace(/\s/g, "-")}.json`;
    a.click();
    
    toast.success("Certificado generado y descargado");
    setSelectedEstudiante(null);
    setCertificadoData({ notaFinal: "", observaciones: "" });
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
          <h1 className="text-3xl font-bold mb-2">Notas y Evaluaciones</h1>
          <p className="text-gray-600">{sala.nombre}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registro de Calificaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Estudiante</TableHead>
                  <TableHead>Evaluación</TableHead>
                  <TableHead>Nota</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Intentos</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {evaluacionesList.map((evaluacion) => {
                  const estudiante = estudiantes.find((e) => e.id === evaluacion.estudianteId);
                  return (
                    <TableRow key={evaluacion.id}>
                      <TableCell className="font-medium">{estudiante?.name}</TableCell>
                      <TableCell>Evaluación #{evaluacion.contenidoId}</TableCell>
                      <TableCell>
                        <span className={`font-semibold ${
                          evaluacion.nota >= 70 ? "text-green-600" : "text-red-600"
                        }`}>
                          {evaluacion.nota}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(evaluacion.fecha).toLocaleDateString("es-ES")}</TableCell>
                      <TableCell>
                        <Badge variant={
                          evaluacion.estado === "aprobado" ? "default" :
                          evaluacion.estado === "reprobado" ? "destructive" :
                          "secondary"
                        }>
                          {evaluacion.estado === "aprobado" ? "Aprobado" :
                           evaluacion.estado === "reprobado" ? "Reprobado" :
                           "Pendiente"}
                        </Badge>
                      </TableCell>
                      <TableCell>{evaluacion.intentos}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedEstudiante(evaluacion.estudianteId)}
                            >
                              <Award className="w-4 h-4 mr-2" />
                              Certificar
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Generar Certificado</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>Estudiante</Label>
                                <Input value={estudiante?.name} disabled />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="notaFinal">Nota Final</Label>
                                <Input
                                  id="notaFinal"
                                  type="number"
                                  value={certificadoData.notaFinal}
                                  onChange={(e) => setCertificadoData({ ...certificadoData, notaFinal: e.target.value })}
                                  placeholder="0-100"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="observaciones">Observaciones</Label>
                                <Textarea
                                  id="observaciones"
                                  value={certificadoData.observaciones}
                                  onChange={(e) => setCertificadoData({ ...certificadoData, observaciones: e.target.value })}
                                  placeholder="Comentarios adicionales..."
                                  rows={3}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={handleGenerarCertificado}>
                                <Upload className="w-4 h-4 mr-2" />
                                Generar Certificado JSON
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
