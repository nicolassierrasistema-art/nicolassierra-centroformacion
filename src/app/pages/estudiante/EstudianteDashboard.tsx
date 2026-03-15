import { useState } from "react";
import { Link } from "react-router";
import { DashboardHeader } from "../../components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { Badge } from "../../components/ui/badge";
import { salas, inscripciones, certificados } from "../../data/mockData";
import { BookOpen, Award, TrendingUp, PlayCircle, Download } from "lucide-react";

export function EstudianteDashboard() {
  const estudianteId = "1"; // ID del estudiante actual
  const misInscripciones = inscripciones.filter((i) => i.estudianteId === estudianteId);
  const misCertificados = certificados.filter((c) => c.estudianteId === estudianteId);

  const stats = [
    { title: "Cursos Activos", value: misInscripciones.length, icon: BookOpen, color: "bg-blue-500" },
    { title: "Certificados", value: misCertificados.length, icon: Award, color: "bg-green-500" },
    { title: "Progreso Promedio", value: "65%", icon: TrendingUp, color: "bg-purple-500" },
  ];

  const handleDescargarCertificado = (certificado: any) => {
    const blob = new Blob([certificado.jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `certificado-${certificado.id}.json`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader title="Estudiante" roleLabel="Estudiante" />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Mi Panel de Aprendizaje</h1>

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

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Mis Cursos */}
          <Card>
            <CardHeader>
              <CardTitle>Mis Cursos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {misInscripciones.map((inscripcion) => {
                  const sala = salas.find((s) => s.id === inscripcion.salaId);
                  if (!sala) return null;
                  
                  return (
                    <div key={inscripcion.id} className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">{sala.nombre}</h3>
                      <p className="text-sm text-gray-600 mb-3">{sala.descripcion}</p>
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-sm">
                          <span>Progreso</span>
                          <span className="font-medium">{inscripcion.progreso}%</span>
                        </div>
                        <Progress value={inscripcion.progreso} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          inscripcion.estado === "cursando" ? "default" :
                          inscripcion.estado === "completado" ? "secondary" :
                          "outline"
                        }>
                          {inscripcion.estado === "cursando" ? "En curso" :
                           inscripcion.estado === "completado" ? "Completado" :
                           "Abandonado"}
                        </Badge>
                        <Link to={`/estudiante/sala/${sala.id}`} className="ml-auto">
                          <Button size="sm">
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Continuar
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
                {misInscripciones.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    No estás inscrito en ningún curso todavía
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Mis Certificados */}
          <Card>
            <CardHeader>
              <CardTitle>Mis Certificados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {misCertificados.map((certificado) => {
                  const sala = salas.find((s) => s.id === certificado.salaId);
                  const certData = JSON.parse(certificado.jsonData);
                  
                  return (
                    <div key={certificado.id} className="border rounded-lg p-4 bg-gradient-to-br from-blue-50 to-purple-50">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{sala?.nombre}</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Emitido: {new Date(certificado.fechaEmision).toLocaleDateString("es-ES")}
                          </p>
                          <Badge variant="secondary">Nota: {certData.notaFinal}</Badge>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-3"
                        onClick={() => handleDescargarCertificado(certificado)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Descargar Certificado JSON
                      </Button>
                    </div>
                  );
                })}
                {misCertificados.length === 0 && (
                  <div className="text-center py-8">
                    <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Aún no tienes certificados.<br />
                      Completa tus cursos para obtenerlos.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
