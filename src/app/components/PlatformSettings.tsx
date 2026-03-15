import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPalette, 
  faFont, 
  faImage, 
  faEye,
  faSave,
  faRotateRight,
  faUpload,
  faTrash,
  faImages,
  faGraduationCap
} from "@fortawesome/free-solid-svg-icons";
import { usePlatform } from "../context/PlatformContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

// Función para comprimir imágenes
const compressImage = (file: File, maxWidth: number = 800, maxHeight: number = 600, quality: number = 0.7): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calcular nuevas dimensiones manteniendo aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('No se pudo obtener el contexto del canvas'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convertir a base64 con compresión
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      img.onerror = () => reject(new Error('Error al cargar la imagen'));
    };
    reader.onerror = () => reject(new Error('Error al leer el archivo'));
  });
};

export function PlatformSettings() {
  const { config, updateConfig } = usePlatform();
  const [editedConfig, setEditedConfig] = useState(config);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [heroImagePreviews, setHeroImagePreviews] = useState<string[]>(config.heroImages || []);

  // Update local states cuando config cambia
  useEffect(() => {
    setHeroImagePreviews(config.heroImages || []);
    setEditedConfig(config);
  }, [config]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      compressImage(file).then(result => {
        setLogoPreview(result);
        const updatedConfig = { ...editedConfig, logoUrl: result };
        setEditedConfig(updatedConfig);
        // Actualizar inmediatamente en el contexto y localStorage
        updateConfig(updatedConfig);
        toast.success("✅ Logo cargado y actualizado exitosamente");
      }).catch(error => {
        toast.error("❌ Error al comprimir la imagen del logo");
        console.error(error);
      });
    }
  };

  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      compressImage(file).then(result => {
        setHeroImagePreviews([...heroImagePreviews, result]);
        const updatedConfig = { ...editedConfig, heroImages: [...heroImagePreviews, result] };
        setEditedConfig(updatedConfig);
        // Actualizar inmediatamente en el contexto y localStorage
        updateConfig(updatedConfig);
        toast.success("✅ Imagen de Hero cargada y actualizada exitosamente");
      }).catch(error => {
        toast.error("❌ Error al comprimir la imagen de Hero");
        console.error(error);
      });
    }
  };

  const handleHeroImageRemove = (index: number) => {
    const newPreviews = heroImagePreviews.filter((_, i) => i !== index);
    setHeroImagePreviews(newPreviews);
    const updatedConfig = { ...editedConfig, heroImages: newPreviews };
    setEditedConfig(updatedConfig);
    // Actualizar inmediatamente en el contexto y localStorage
    updateConfig(updatedConfig);
    toast.success("✅ Imagen de Hero eliminada exitosamente");
  };

  const handleSave = () => {
    updateConfig(editedConfig);
    toast.success("✅ Configuración guardada exitosamente");
  };

  const handleReset = () => {
    const defaultConfig = {
      platformName: "Centro de Formación Online Nicolás Sierra",
      platformTagline: "Formación profesional de calidad",
      heroTitle: "Transforma tu futuro con educación de calidad",
      heroSubtitle: "Plataforma educativa integral para empresas, responsables SST y trabajadores. Gestiona cursos, evalúa competencias y certifica logros de manera profesional.",
      logoUrl: "",
      heroImages: []
    };
    setEditedConfig(defaultConfig);
    updateConfig(defaultConfig);
    setLogoPreview("");
    setHeroImagePreviews([]);
    toast.success("Configuración restablecida a valores por defecto");
  };

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Formulario de Edición */}
        <div className="space-y-6">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FontAwesomeIcon icon={faPalette} className="w-5 h-5 text-purple-600" />
                Identidad de Marca
              </CardTitle>
              <CardDescription>Personaliza la apariencia de tu plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="platformName" className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faFont} className="w-4 h-4" />
                  Nombre de la Plataforma
                </Label>
                <Input
                  id="platformName"
                  value={editedConfig.platformName}
                  onChange={(e) => setEditedConfig({ ...editedConfig, platformName: e.target.value })}
                  placeholder="Ej: MOOC Academy"
                  className="text-lg font-semibold"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="platformTagline">
                  Tagline / Eslogan
                </Label>
                <Input
                  id="platformTagline"
                  value={editedConfig.platformTagline}
                  onChange={(e) => setEditedConfig({ ...editedConfig, platformTagline: e.target.value })}
                  placeholder="Ej: Educación sin límites"
                />
              </div>

              {/* Sección de Carga de Imágenes */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faUpload} className="w-4 h-4 text-blue-600" />
                  Carga de Imágenes
                </h3>
                
                <div className="space-y-4">
                  {/* Upload Logo */}
                  <div className="space-y-2">
                    <Label htmlFor="logoUpload" className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faImage} className="w-4 h-4" />
                      Logo de la Plataforma
                    </Label>
                    <div className="flex items-center gap-3">
                      <Input
                        id="logoUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('logoUpload')?.click()}
                        className="flex-1"
                      >
                        <FontAwesomeIcon icon={faUpload} className="w-4 h-4 mr-2" />
                        Seleccionar Logo
                      </Button>
                      {(logoPreview || editedConfig.logoUrl) && (
                        <div className="w-12 h-12 rounded-lg border-2 border-gray-200 overflow-hidden flex items-center justify-center bg-white">
                          <img 
                            src={logoPreview || editedConfig.logoUrl} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">Formatos: JPG, PNG, SVG. Sin límite de tamaño</p>
                  </div>

                  {/* Upload Hero Images */}
                  <div className="space-y-2">
                    <Label htmlFor="heroImageUpload" className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faImages} className="w-4 h-4" />
                      Imágenes de Hero ({heroImagePreviews.length})
                    </Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Input
                          id="heroImageUpload"
                          type="file"
                          accept="image/*"
                          onChange={handleHeroImageUpload}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('heroImageUpload')?.click()}
                          className="flex-1"
                        >
                          <FontAwesomeIcon icon={faUpload} className="w-4 h-4 mr-2" />
                          Agregar Imagen Hero
                        </Button>
                      </div>
                      {/* Preview Grid */}
                      {heroImagePreviews.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 p-2 bg-gray-50 rounded-lg">
                          {heroImagePreviews.map((preview, index) => (
                            <div key={index} className="relative group">
                              <img 
                                src={preview} 
                                alt={`Hero ${index + 1}`} 
                                className="w-full aspect-video object-cover rounded-lg border-2 border-gray-200"
                              />
                              <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                onClick={() => handleHeroImageRemove(index)}
                                className="absolute top-1 right-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <FontAwesomeIcon icon={faTrash} className="w-3 h-3" />
                              </Button>
                              <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                                #{index + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      Agrega imágenes para el carrusel del Hero. Rotan automáticamente cada 5 segundos. Máximo 800x600px
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle>Contenido del Landing</CardTitle>
              <CardDescription>Configura los textos principales de tu página de inicio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="heroTitle">
                  Título Principal (Hero)
                </Label>
                <Textarea
                  id="heroTitle"
                  value={editedConfig.heroTitle}
                  onChange={(e) => setEditedConfig({ ...editedConfig, heroTitle: e.target.value })}
                  placeholder="Ej: Transforma tu futuro con educación de calidad"
                  rows={2}
                  className="text-lg font-bold"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="heroSubtitle">
                  Subtítulo / Descripción
                </Label>
                <Textarea
                  id="heroSubtitle"
                  value={editedConfig.heroSubtitle}
                  onChange={(e) => setEditedConfig({ ...editedConfig, heroSubtitle: e.target.value })}
                  placeholder="Describe brevemente tu plataforma..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button 
              onClick={handleSave} 
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
              size="lg"
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Guardar Cambios
            </Button>
            <Button 
              onClick={handleReset} 
              variant="outline"
              size="lg"
            >
              <FontAwesomeIcon icon={faRotateRight} className="mr-2" />
              Restablecer
            </Button>
          </div>
        </div>

        {/* Vista Previa */}
        <div className="space-y-6">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FontAwesomeIcon icon={faEye} className="w-5 h-5 text-blue-600" />
                Vista Previa en Tiempo Real
              </CardTitle>
              <CardDescription>Así se verá en el landing</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div 
                className="space-y-6"
                key={JSON.stringify(config)}
              >
                {/* Preview del Header */}
                <div className="bg-white/80 backdrop-blur-xl p-5 rounded-3xl shadow-xl shadow-blue-500/10 border-2 border-white/50">
                  <div className="flex items-center gap-3">
                    {config.logoUrl ? (
                      <img src={config.logoUrl} alt="Logo" className="w-10 h-10 rounded-2xl object-cover shadow-lg" />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <FontAwesomeIcon icon={faGraduationCap} className="text-white text-lg" />
                      </div>
                    )}
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {config.platformName}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{config.platformTagline}</p>
                </div>

                {/* Preview del Hero */}
                <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl shadow-purple-500/10 border-2 border-white/50">
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight tracking-tight">
                      {config.heroTitle.split(' ').map((word, i) => {
                        const keywords = ['educación', 'calidad', 'futuro', 'transforma', 'aprende'];
                        const isKeyword = keywords.some(k => word.toLowerCase().includes(k.toLowerCase()));
                        if (isKeyword) {
                          return (
                            <span key={i} className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                              {word}{' '}
                            </span>
                          );
                        }
                        return <span key={i} className="text-gray-800">{word} </span>;
                      })}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {config.heroSubtitle}
                    </p>
                  </motion.div>
                </div>

                {/* Preview del Footer */}
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-5 rounded-3xl shadow-xl">
                  <div className="flex items-center justify-center gap-3">
                    {config.logoUrl ? (
                      <img src={config.logoUrl} alt="Logo" className="w-9 h-9 rounded-xl object-cover shadow-lg" />
                    ) : (
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <FontAwesomeIcon icon={faGraduationCap} className="text-white text-base" />
                      </div>
                    )}
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{config.platformName}</span>
                  </div>
                  <p className="text-gray-400 text-sm text-center mt-2">
                    © 2024 {config.platformName}. Todos los derechos reservados.
                  </p>
                </div>
              </motion.div>
            </CardContent>
          </Card>

          {/* Guía de Uso */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="text-green-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faImage} className="w-5 h-5" />
                Consejos de Personalización
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <p><strong>Nombre corto:</strong> Mantén el nombre de la plataforma conciso (2-3 palabras máximo)</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <p><strong>Tagline memorable:</strong> Usa una frase corta que describa tu propuesta de valor</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <p><strong>Logo personalizado:</strong> Carga una imagen de tu logo para mayor profesionalismo</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <p><strong>Título Hero:</strong> Incluye palabras clave como "educación", "futuro", etc. para resaltarlas automáticamente</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <p><strong>Subtítulo:</strong> Explica claramente qué hace tu plataforma y para quién es</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <p><strong>Imágenes optimizadas:</strong> Usa imágenes cuadradas o con relación 1:1 para mejor visualización. Tamaño recomendado: 512x512px</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}