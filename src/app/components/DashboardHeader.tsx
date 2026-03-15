import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import { usePlatform } from "../context/PlatformContext";
import { Button } from "./ui/button";

interface DashboardHeaderProps {
  title: string;
  roleLabel: string;
}

export function DashboardHeader({ title, roleLabel }: DashboardHeaderProps) {
  const { user, logout } = useAuth();
  const { config } = usePlatform();

  return (
    <header className="border-b border-white/30 bg-white/70 backdrop-blur-2xl sticky top-0 z-50 shadow-lg shadow-blue-500/5">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            {config.logoUrl ? (
              <img src={config.logoUrl} alt={config.platformName} className="w-9 h-9 rounded-xl object-cover shadow-lg" />
            ) : (
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <FontAwesomeIcon icon={faGraduationCap} className="text-white text-base" />
              </div>
            )}
            <div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">{config.platformName}</span>
              <span className="ml-2 text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full font-semibold shadow-lg shadow-blue-500/30">
                {roleLabel}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-xl rounded-2xl px-4 py-2 shadow-lg border border-white/50">
              <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-blue-600" />
              <div className="text-sm">
                <p className="font-semibold text-gray-900">{user?.name}</p>
                <p className="text-gray-500 text-xs">{user?.email}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={logout} title="Cerrar sesión" className="hover:bg-white/60 hover:backdrop-blur-xl rounded-xl hover:shadow-lg transition-all">
              <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4 text-gray-700 hover:text-red-600" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}