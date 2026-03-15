import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { SuperAdminDashboard as AdminDashboard } from "./pages/superadmin/SuperAdminDashboard";
import { EmpresaDashboard } from "./pages/empresa/EmpresaDashboard";
import { DocenteDashboard as ResponsableSSTDashboard } from "./pages/docente/DocenteDashboard";
import { SalaContenido } from "./pages/docente/SalaContenido";
import { SalaNotas } from "./pages/docente/SalaNotas";
import { EstudianteDashboard as TrabajadorDashboard } from "./pages/estudiante/EstudianteDashboard";
import { SalaEstudiante as SalaTrabajador } from "./pages/estudiante/SalaEstudiante";
import { NotFound } from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
      },
      // Admin Routes
      {
        path: "admin",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      // Empresa Routes
      {
        path: "empresa",
        element: (
          <ProtectedRoute allowedRoles={["empresa"]}>
            <EmpresaDashboard />
          </ProtectedRoute>
        ),
      },
      // Responsable SST Routes
      {
        path: "responsable-sst",
        element: (
          <ProtectedRoute allowedRoles={["responsable_sst"]}>
            <ResponsableSSTDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "responsable-sst/sala/:salaId/contenido",
        element: (
          <ProtectedRoute allowedRoles={["responsable_sst"]}>
            <SalaContenido />
          </ProtectedRoute>
        ),
      },
      {
        path: "responsable-sst/sala/:salaId/notas",
        element: (
          <ProtectedRoute allowedRoles={["responsable_sst"]}>
            <SalaNotas />
          </ProtectedRoute>
        ),
      },
      // Trabajador Routes
      {
        path: "trabajador",
        element: (
          <ProtectedRoute allowedRoles={["trabajador"]}>
            <TrabajadorDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "trabajador/sala/:salaId",
        element: (
          <ProtectedRoute allowedRoles={["trabajador"]}>
            <SalaTrabajador />
          </ProtectedRoute>
        ),
      },
      // Catch all - 404
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);