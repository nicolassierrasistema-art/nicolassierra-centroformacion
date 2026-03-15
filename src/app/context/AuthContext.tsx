import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "empresa" | "responsable_sst" | "trabajador";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  empresaId?: string; // Para responsables sst y trabajadores
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  isEmpresa: boolean;
  isResponsableSST: boolean;
  isTrabajador: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users para demo
const MOCK_USERS = [
  {
    id: "1",
    name: "Administrador",
    email: "admin@mooc.com",
    password: "admin123",
    role: "admin" as const,
  },
  {
    id: "2",
    name: "Empresa Tech Solutions",
    email: "empresa@mooc.com",
    password: "empresa123",
    role: "empresa" as const,
  },
  {
    id: "3",
    name: "Carlos Ruiz - Responsable SST",
    email: "responsable@mooc.com",
    password: "responsable123",
    role: "responsable_sst" as const,
    empresaId: "2",
  },
  {
    id: "4",
    name: "Ana García",
    email: "trabajador@mooc.com",
    password: "trabajador123",
    role: "trabajador" as const,
    empresaId: "2",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("mooc_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        empresaId: foundUser.empresaId,
      };
      setUser(userData);
      localStorage.setItem("mooc_user", JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("mooc_user");
  };

  const isAdmin = user?.role === "admin";
  const isEmpresa = user?.role === "empresa";
  const isResponsableSST = user?.role === "responsable_sst";
  const isTrabajador = user?.role === "trabajador";

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAdmin,
        isEmpresa,
        isResponsableSST,
        isTrabajador,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}