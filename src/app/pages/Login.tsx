import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBookOpen, 
  faExclamationCircle, 
  faEnvelope, 
  faLock, 
  faWandMagicSparkles,
  faArrowLeft,
  faCrown,
  faBuilding,
  faHardHat,
  faBriefcase,
  faGraduationCap
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";
import { usePlatform } from "../context/PlatformContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { config } = usePlatform();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = await login(email, password);

    if (success) {
      const userData = JSON.parse(localStorage.getItem("mooc_user") || "{}");
      switch (userData.role) {
        case "admin":
          navigate("/admin");
          break;
        case "empresa":
          navigate("/empresa");
          break;
        case "responsable_sst":
          navigate("/responsable-sst");
          break;
        case "trabajador":
          navigate("/trabajador");
          break;
        default:
          navigate("/");
      }
    } else {
      setError("Credenciales incorrectas. Por favor, intenta de nuevo.");
    }

    setLoading(false);
  };

  const quickLoginButtons = [
    { role: "Admin", email: "admin@mooc.com", password: "admin123", color: "from-purple-500 via-purple-600 to-indigo-600", icon: faCrown },
    { role: "Empresa", email: "empresa@mooc.com", password: "empresa123", color: "from-blue-500 via-blue-600 to-cyan-600", icon: faBuilding },
    { role: "Responsable SST", email: "responsable@mooc.com", password: "responsable123", color: "from-emerald-500 via-green-500 to-teal-600", icon: faHardHat },
    { role: "Trabajador", email: "trabajador@mooc.com", password: "trabajador123", color: "from-orange-500 via-pink-500 to-rose-600", icon: faBriefcase },
  ];

  const handleQuickLogin = async (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setError("");
    setLoading(true);

    const success = await login(email, password);
    
    if (success) {
      const userData = JSON.parse(localStorage.getItem("mooc_user") || "{}");
      switch (userData.role) {
        case "admin":
          navigate("/admin");
          break;
        case "empresa":
          navigate("/empresa");
          break;
        case "responsable_sst":
          navigate("/responsable-sst");
          break;
        case "trabajador":
          navigate("/trabajador");
          break;
        default:
          navigate("/");
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <Link to="/" className="inline-block mb-8">
            <Button variant="ghost" className="gap-2 text-gray-700 hover:text-gray-900 bg-white/50 backdrop-blur-xl hover:bg-white/70 rounded-2xl">
              <FontAwesomeIcon icon={faArrowLeft} />
              Volver al inicio
            </Button>
          </Link>
          
          <div className="flex items-center gap-4 mb-8">
            {config.logoUrl ? (
              <img src={config.logoUrl} alt={config.platformName} className="w-16 h-16 rounded-3xl object-cover shadow-2xl shadow-blue-500/30" />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/40">
                <FontAwesomeIcon icon={faGraduationCap} className="text-white text-3xl" />
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {config.platformName}
              </h1>
              <p className="text-gray-600">{config.platformTagline}</p>
            </div>
          </div>
          
          <h2 className="text-5xl font-bold mb-6 leading-tight text-gray-800">
            Accede a tu <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">plataforma educativa</span>
          </h2>
          <p className="text-gray-600 text-xl mb-10 leading-relaxed">
            Gestiona cursos, certifica logros y transforma el aprendizaje en tu organización
          </p>
          
          <div className="space-y-4">
            {[
              { icon: faWandMagicSparkles, text: "Gestión integral de cursos", color: "from-blue-500 to-cyan-500" },
              { icon: faBookOpen, text: "Certificación blockchain", color: "from-purple-500 to-pink-500" },
              { icon: faLock, text: "Plataforma 100% segura", color: "from-emerald-500 to-teal-500" },
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-4 bg-white/60 backdrop-blur-xl rounded-2xl p-4 shadow-lg shadow-blue-500/10 border border-white/50 hover:scale-105 hover:shadow-purple-500/20 transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <FontAwesomeIcon icon={feature.icon} className="text-white text-xl" />
                </div>
                <span className="text-gray-800 font-medium text-lg">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-2 border-white/50 shadow-2xl shadow-purple-500/20 bg-white/80 backdrop-blur-2xl rounded-3xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Iniciar Sesión</CardTitle>
              <CardDescription className="text-gray-600 text-base">Ingresa tus credenciales para acceder</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="manual" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/60 backdrop-blur-xl p-1 rounded-2xl border border-white/50">
                  <TabsTrigger value="manual" className="data-[state=active]:bg-white data-[state=active]:shadow-lg rounded-xl">Manual</TabsTrigger>
                  <TabsTrigger value="quick" className="data-[state=active]:bg-white data-[state=active]:shadow-lg rounded-xl">Acceso Rápido</TabsTrigger>
                </TabsList>

                <TabsContent value="manual">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-800 font-semibold text-base">
                        <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-blue-600" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        className="bg-white/70 backdrop-blur-sm border-2 border-white/50 focus:border-blue-400 rounded-xl h-12 shadow-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-800 font-semibold text-base">
                        <FontAwesomeIcon icon={faLock} className="mr-2 text-purple-600" />
                        Contraseña
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                        className="bg-white/70 backdrop-blur-sm border-2 border-white/50 focus:border-purple-400 rounded-xl h-12 shadow-sm"
                      />
                    </div>

                    {error && (
                      <Alert variant="destructive" className="bg-red-50/80 backdrop-blur-xl border-2 border-red-200/50 rounded-2xl">
                        <FontAwesomeIcon icon={faExclamationCircle} className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-800">{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-2xl h-12 font-semibold shadow-xl shadow-purple-500/40 border border-white/20"
                      disabled={loading}
                    >
                      {loading ? "Ingresando..." : "Ingresar"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="quick">
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500 mb-4">
                      Acceso rápido para demostración:
                    </p>
                    {quickLoginButtons.map((btn, index) => (
                      <motion.div
                        key={btn.role}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full justify-start gap-3 h-auto py-3 hover:shadow-lg transition-all"
                          onClick={() => handleQuickLogin(btn.email, btn.password)}
                          disabled={loading}
                        >
                          <div className={`w-10 h-10 bg-gradient-to-br ${btn.color} rounded-lg flex items-center justify-center`}>
                            <FontAwesomeIcon icon={btn.icon} className="text-white text-lg" />
                          </div>
                          <div className="text-left flex-1">
                            <div className="font-semibold">{btn.role}</div>
                            <div className="text-xs text-gray-500">{btn.email}</div>
                          </div>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <div className="text-center text-sm text-gray-500">
                ¿No tienes cuenta?{" "}
                <a href="#" className="text-blue-600 hover:underline font-semibold">
                  Contacta al administrador
                </a>
              </div>
              <Link to="/" className="text-center w-full">
                <Button variant="ghost" className="w-full">
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                  Volver al inicio
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Credentials Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100"
          >
            <h4 className="font-semibold text-sm text-blue-900 mb-2 flex items-center gap-2">
              <FontAwesomeIcon icon={faWandMagicSparkles} />
              Credenciales de prueba
            </h4>
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>Admin:</strong> admin@mooc.com / admin123</p>
              <p><strong>Empresa:</strong> empresa@mooc.com / empresa123</p>
              <p><strong>Responsable SST:</strong> responsable@mooc.com / responsable123</p>
              <p><strong>Trabajador:</strong> trabajador@mooc.com / trabajador123</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}