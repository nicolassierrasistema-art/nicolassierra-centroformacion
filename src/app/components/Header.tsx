import { Link, useLocation } from "react-router";
import { BookOpen, Search, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuth } from "../context/AuthContext";

export function Header() {
  const location = useLocation();
  const { user, logout, isAdmin, isEmpresa, isResponsableSST } = useAuth();

  const isLoginPage = location.pathname === "/login";

  const getDashboardRoute = () => {
    if (isAdmin) return "/admin";
    if (isEmpresa) return "/empresa";
    if (isResponsableSST) return "/responsable-sst";
    return "/trabajador";
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-semibold">MOOC Academy</span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar cursos..."
                className="pl-10"
              />
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm hover:text-blue-600 transition-colors ${
                location.pathname === "/" ? "text-blue-600 font-medium" : ""
              }`}
            >
              Inicio
            </Link>
            {user && (
              <Link
                to={getDashboardRoute()}
                className={`text-sm hover:text-blue-600 transition-colors ${
                  location.pathname.includes(getDashboardRoute()) ? "text-blue-600 font-medium" : ""
                }`}
              >
                Mi Panel
              </Link>
            )}
            {user ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={logout} title="Cerrar sesión">
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Iniciar Sesión
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}