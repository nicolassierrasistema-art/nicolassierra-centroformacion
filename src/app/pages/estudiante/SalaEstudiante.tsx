import { useState } from "react";
import { useParams, Link } from "react-router";
import { DashboardHeader } from "../../components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { Badge } from "../../components/ui/badge";
import { salas, contenidos, inscripciones } from "../../data/mockData";
import { ArrowLeft, CheckCircle, PlayCircle, FileText, ClipboardCheck, Lock } from "lucide-react";

export function SalaEstudiante() {
  const { salaId } = useParams();
  const sala = salas.find((s) => s.id === salaId);
  const contenidoSala = contenidos.filter((c) => c.salaId === salaId);
  const inscripcion = inscripciones.find((i) => i.salaId === salaId && i.estudianteId === "1");
  const [completados, setCompletados] = useState<string[]>([]);

  const handleMarcarCompletado = (contenidoId: string) => {
    if (!completados.includes(contenidoId)) {
      setCompletados([...completados, contenidoId]);
    }
  };

  const progreso = Math.round((completados.length / contenidoSala.length) * 100);

  if (!sala) {
    return <div>Sala no encontrada</div>;
  }

  const getIcon = (tipo: string, isCompleted: boolean) => {
    if (isCompleted) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    switch (tipo) {
      case "video":
        return <PlayCircle className="w-5 h-5 text-blue-500" />;
      case "documento":
        return <FileText className="w-5 h-5 text-gray-500" />;
      case "evaluacion":
        return <ClipboardCheck className="w-5 h-5 text-orange-500" />;
      default:
        return <Lock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader title="Estudiante" roleLabel="Estudiante" />

      <div className="container mx-auto px-4 py-8">
        <Link to="/estudiante" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Volver a mis cursos
        </Link>

        {/* Encabezado del curso */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{sala.nombre}</h1>
          <p className="text-gray-600 mb-4">{sala.descripcion}</p>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Tu progreso</span>
                <span className="text-sm font-semibold">{progreso}%</span>
              </div>
              <Progress value={progreso} className="mb-2" />
              <p className="text-sm text-gray-500">
                {completados.length} de {contenidoSala.length} lecciones completadas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contenido del curso */}
        <Card>
          <CardHeader>
            <CardTitle>Contenido del Curso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contenidoSala.map((contenido, index) => {
                const isCompleted = completados.includes(contenido.id);
                const isLocked = index > 0 && !completados.includes(contenidoSala[index - 1].id);

                return (
                  <div
                    key={contenido.id}
                    className={`flex items-start gap-4 p-4 border rounded-lg ${
                      isLocked ? "opacity-50 bg-gray-50" : "hover:shadow-md transition-shadow"
                    }`}
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getIcon(contenido.tipo, isCompleted)}
                        <h3 className="font-semibold">{contenido.titulo}</h3>
                        {isLocked && <Lock className="w-4 h-4 text-gray-400" />}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{contenido.descripcion}</p>
                      <Badge variant="secondary" className="capitalize">
                        {contenido.tipo}
                      </Badge>
                    </div>
                    <div className="flex flex-col gap-2">
                      {isCompleted ? (
                        <Badge variant="default" className="whitespace-nowrap">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completado
                        </Badge>
                      ) : !isLocked ? (
                        <>
                          <Button size="sm">
                            <PlayCircle className="w-4 h-4 mr-2" />
                            {contenido.tipo === "evaluacion" ? "Realizar" : "Ver"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMarcarCompletado(contenido.id)}
                          >
                            Marcar completado
                          </Button>
                        </>
                      ) : (
                        <Badge variant="outline" className="whitespace-nowrap">
                          Bloqueado
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
