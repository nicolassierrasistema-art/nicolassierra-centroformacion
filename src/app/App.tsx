import { RouterProvider } from "react-router";
import { router } from "./routes";
import { PlatformProvider } from "./context/PlatformContext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "./components/ui/sonner";
import "../styles/index.css";

export default function App() {
  return (
    <PlatformProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </PlatformProvider>
  );
}