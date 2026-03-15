import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBookOpen, 
  faGraduationCap, 
  faUsers, 
  faAward, 
  faArrowRight, 
  faCheckCircle, 
  faChartLine, 
  faShield,
  faRocket,
  faChevronLeft,
  faChevronRight,
  faCrown,
  faBuilding,
  faHardHat,
  faBriefcase
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { usePlatform } from "../context/PlatformContext";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export function Landing() {
  const { config } = usePlatform();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate hero images every 5 seconds
  useEffect(() => {
    if (!config.heroImages || config.heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % config.heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [config.heroImages]);

  const nextSlide = () => {
    if (!config.heroImages || config.heroImages.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % config.heroImages.length);
  };

  const prevSlide = () => {
    if (!config.heroImages || config.heroImages.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + config.heroImages.length) % config.heroImages.length);
  };

  const features = [
    {
      icon: faGraduationCap,
      title: "Formación Profesional",
      description: "Cursos diseñados por expertos para impulsar tu carrera",
      color: "from-cyan-500 to-teal-600",
    },
    {
      icon: faUsers,
      title: "Aprendizaje Colaborativo",
      description: "Interactúa con responsables SST y compañeros en tiempo real",
      color: "from-emerald-500 to-green-600",
    },
    {
      icon: faAward,
      title: "Certificación Verificable",
      description: "Obtén certificados blockchain verificables",
      color: "from-purple-500 to-indigo-600",
    },
  ];

  const stats = [
    { number: "10K+", label: "Trabajadores activos" },
    { number: "500+", label: "Cursos disponibles" },
    { number: "95%", label: "Tasa de satisfacción" },
    { number: "24/7", label: "Soporte disponible" },
  ];

  const benefits = [
    "Plataforma 100% en español",
    "Certificados con validación blockchain",
    "Soporte técnico personalizado",
    "Contenido actualizado constantemente",
    "Acceso desde cualquier dispositivo",
    "Progreso sincronizado en tiempo real",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-white/20 bg-white/60 backdrop-blur-2xl sticky top-0 z-50 shadow-lg shadow-blue-500/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {config.logoUrl ? (
                <img src={config.logoUrl} alt={config.platformName} className="w-10 h-10 rounded-2xl object-cover shadow-lg" />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <FontAwesomeIcon icon={faGraduationCap} className="text-white text-lg" />
                </div>
              )}
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {config.platformName}
              </span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link to="/login">
                <Button className="bg-white/80 backdrop-blur-xl hover:bg-white text-blue-600 rounded-2xl px-6 h-11 text-sm font-semibold shadow-lg shadow-blue-500/20 border border-white/50">
                  Iniciar Sesión
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero con Carrusel */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background con efecto de vidrio */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-purple-100/50 to-pink-100/50" />
        
        {/* Carrusel de Imágenes de Fondo */}
        {config.heroImages && config.heroImages.length > 0 && (
          <div className="absolute inset-0">
            {config.heroImages.map((image, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: currentSlide === index ? 0.15 : 0 
                }}
                transition={{ duration: 1 }}
              />
            ))}
          </div>
        )}

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-8"
          >
            <div className="bg-white/70 backdrop-blur-xl text-blue-600 px-6 py-3 rounded-full text-sm font-semibold shadow-xl shadow-blue-500/20 border border-white/50">
              <FontAwesomeIcon icon={faRocket} className="mr-2" />
              La mejor plataforma de educación online
            </div>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight tracking-tight">
            {config.heroTitle.split(' ').map((word, i) => {
              const keywords = ['educación', 'calidad', 'futuro', 'transforma'];
              const isKeyword = keywords.some(k => word.toLowerCase().includes(k.toLowerCase()));
              if (isKeyword) {
                return (
                  <span key={i} className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
                    {word}{' '}
                  </span>
                );
              }
              return <span key={i} className="text-gray-800">{word} </span>;
            })}
          </h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {config.heroSubtitle}
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/login">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white text-lg px-10 h-14 gap-3 shadow-2xl shadow-purple-500/50 rounded-2xl font-semibold border border-white/20">
                  Comenzar ahora
                  <FontAwesomeIcon icon={faArrowRight} />
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats con efecto glass */}
          <motion.div
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl shadow-blue-500/10 border border-white/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50" />
        
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              ¿Por qué elegir {config.platformName}?
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Ofrecemos las mejores herramientas para el aprendizaje en línea
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="border border-white/50 shadow-2xl shadow-blue-500/10 hover:shadow-purple-500/20 transition-all duration-500 h-full bg-white/70 backdrop-blur-xl hover:-translate-y-3 group">
                  <CardContent className="p-8 text-center">
                    <motion.div 
                      className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/30`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <FontAwesomeIcon icon={feature.icon} className="text-white text-4xl" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" />
        
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              Soluciones para cada necesidad
            </h2>
            <p className="text-gray-600 text-xl">
              Herramientas especializadas según tu rol
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: faCrown, title: "Admin", desc: "Gestión total del sistema", color: "from-purple-500 via-purple-600 to-indigo-600" },
              { icon: faBuilding, title: "Empresa", desc: "Administra tu equipo", color: "from-blue-500 via-blue-600 to-cyan-600" },
              { icon: faHardHat, title: "Responsable SST", desc: "Crea y gestiona cursos de seguridad", color: "from-emerald-500 via-green-500 to-teal-600" },
              { icon: faBriefcase, title: "Trabajador", desc: "Aprende y certifícate", color: "from-orange-500 via-pink-500 to-rose-600" },
            ].map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <Card className="border-2 border-white/60 shadow-2xl shadow-blue-500/10 hover:shadow-purple-500/30 transition-all duration-500 overflow-hidden h-full bg-white/80 backdrop-blur-xl group">
                  <div className={`h-1.5 bg-gradient-to-r ${role.color}`} />
                  <CardContent className="p-6">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br ${role.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <FontAwesomeIcon icon={role.icon} className="text-white text-3xl" />
                    </motion.div>
                    <h3 className="font-bold text-xl mb-2 text-center text-gray-800 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                      {role.title}
                    </h3>
                    <p className="text-gray-600 text-center">{role.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2aDR2NGgtNHptMCA4aDR2NGgtNHptLTggMGg0djRoLTR6bTAgOGg0djRoLTR6bS04IDBoNHY0aC00em0wLThoNHY0aC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <h2 className="text-5xl font-bold mb-6 drop-shadow-2xl">
                Todo lo que necesitas en un solo lugar
              </h2>
              <p className="text-blue-100 text-xl mb-10 leading-relaxed">
                Una plataforma completa diseñada para optimizar el proceso de enseñanza y aprendizaje.
              </p>
              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    className="flex items-center gap-4 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.03, x: 10 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-lg">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-white text-lg" />
                    </div>
                    <span className="text-lg font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <Card className="bg-white/20 backdrop-blur-2xl border-2 border-white/30 shadow-2xl hover:bg-white/30 transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 text-center text-white">
                  <FontAwesomeIcon icon={faChartLine} className="text-white text-6xl mb-4 drop-shadow-lg" />
                  <div className="text-4xl font-bold mb-2 drop-shadow-lg">+45%</div>
                  <p className="text-blue-100 font-medium">Mejor rendimiento</p>
                </CardContent>
              </Card>
              <Card className="bg-white/20 backdrop-blur-2xl border-2 border-white/30 shadow-2xl mt-8 hover:bg-white/30 transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 text-center text-white">
                  <FontAwesomeIcon icon={faShield} className="text-white text-6xl mb-4 drop-shadow-lg" />
                  <div className="text-4xl font-bold mb-2 drop-shadow-lg">100%</div>
                  <p className="text-blue-100 font-medium">Datos seguros</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 backdrop-blur-sm" />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-2xl rounded-[3rem] p-12 shadow-2xl shadow-blue-500/20 border-2 border-white/50"
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              ¿Listo para comenzar tu viaje de aprendizaje?
            </h2>
            <p className="text-gray-600 text-xl mb-10 leading-relaxed">
              Únete a miles de estudiantes que ya están transformando su futuro
            </p>
            <Link to="/login">
              <motion.div whileHover={{ scale: 1.08, y: -4 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white text-xl px-14 h-16 rounded-2xl shadow-2xl shadow-purple-500/50 font-semibold border-2 border-white/30">
                  Comenzar gratis
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDE2aDR2NGgtNHptMCA4aDR2NGgtNHptLTggMGg0djRoLTR6bTAgOGg0djRoLTR6bS04IDBoNHY0aC00em0wLThoNHY0aC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        
        <div className="container mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            {config.logoUrl ? (
              <img src={config.logoUrl} alt={config.platformName} className="w-10 h-10 rounded-xl object-cover shadow-xl" />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-xl shadow-blue-500/30">
                <FontAwesomeIcon icon={faGraduationCap} className="text-white text-xl" />
              </div>
            )}
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{config.platformName}</span>
          </div>
          <p className="text-gray-400">© 2024 {config.platformName}. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}