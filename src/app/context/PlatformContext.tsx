import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface PlatformConfig {
  platformName: string;
  platformTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  logoUrl: string;
  heroImages: string[]; // Array de URLs de imágenes del hero
}

interface PlatformContextType {
  config: PlatformConfig;
  updateConfig: (newConfig: Partial<PlatformConfig>) => void;
}

const defaultConfig: PlatformConfig = {
  platformName: "Centro de Formación Online Nicolás Sierra",
  platformTagline: "Formación profesional de calidad",
  heroTitle: "Transforma tu futuro con educación de calidad",
  heroSubtitle: "Plataforma educativa integral para empresas, responsables SST y trabajadores. Gestiona cursos, evalúa competencias y certifica logros de manera profesional.",
  logoUrl: "",
  heroImages: [],
};

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<PlatformConfig>(() => {
    try {
      const saved = localStorage.getItem("mooc_platform_config");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Si el nombre guardado es el antiguo, forzar actualización al nuevo
        if (parsed.platformName === "MOOC Academy" || parsed.platformName !== "Centro de Formación Online Nicolás Sierra") {
          return { ...defaultConfig };
        }
        // Merge with default config to ensure all fields exist
        return { ...defaultConfig, ...parsed, heroImages: parsed.heroImages || [] };
      }
    } catch (error) {
      console.error("Error loading platform config:", error);
    }
    return { ...defaultConfig };
  });

  useEffect(() => {
    try {
      localStorage.setItem("mooc_platform_config", JSON.stringify(config));
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.error("LocalStorage quota exceeded. Clearing old data and retrying...");
        // Intentar limpiar y guardar solo lo esencial
        try {
          const minimalConfig = {
            platformName: config.platformName,
            platformTagline: config.platformTagline,
            heroTitle: config.heroTitle,
            heroSubtitle: config.heroSubtitle,
            logoUrl: "",
          };
          localStorage.setItem("mooc_platform_config", JSON.stringify(minimalConfig));
          console.warn("Se guardó una configuración mínima debido a limitaciones de espacio");
        } catch (retryError) {
          console.error("Error saving platform config even after cleanup:", retryError);
        }
      } else {
        console.error("Error saving platform config:", error);
      }
    }
  }, [config]);

  const updateConfig = (newConfig: Partial<PlatformConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  return (
    <PlatformContext.Provider value={{ config, updateConfig }}>
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (context === undefined) {
    throw new Error("usePlatform must be used within a PlatformProvider");
  }
  return context;
}