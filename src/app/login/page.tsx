"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import LoadingSpinner from "@/components/LoadingSpinner";
import { environment } from "@/environment/environment";

type JwtPayload = {
  email: string;
  role: string;
  exp: number;
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Importar el hook useRouter

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true); // Iniciar el estado de carga

    try {
      const response = await fetch(environment.API+"/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.text();

      if (response.ok) {
        localStorage.setItem("token", data); // Guardar el token en localStorage

        const decoded: JwtPayload = jwtDecode(data)

        switch (decoded.role) {
          case "nutricionista":
            router.push("/nutricionista/inicio"); // Redirigir a la página del nutricionista
            break;
          case "paciente":
            router.push("/paciente/inicio"); // Redirigir a la página del paciente
            break;
          default:
            alert("Rol no reconocido");
            return;
        }
      } else {
        alert(data || "Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false); // Finalizar el estado de carga
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center py-10 font-[Montserrat] relative overflow-hidden">
      
      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#4AFF50] rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#4AFF50] rounded-full opacity-5 blur-3xl"></div>
      </div>

      {loading && <LoadingSpinner />}
      
      {/* Contenedor principal */}
      <div className="relative z-10 w-full max-w-md px-6">
        
        {/* Título con animación */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white via-white to-[#4AFF50] bg-clip-text text-transparent">
              Nutri<span className="text-[#4AFF50]">Check</span>
            </h1>
            <div className="h-1 bg-gradient-to-r from-transparent via-[#4AFF50] to-transparent rounded-full"></div>
          </div>
          <p className="text-[#ADADAD] mt-6 text-base font-light">
            Control inteligente de tu dieta
          </p>
        </div>

        {/* Formulario con glassmorphism */}
        <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl">
          <div className="space-y-6">
            
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-white text-sm font-medium block">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-white outline-none text-sm placeholder-gray-400 transition-all duration-300 focus:border-[#4AFF50] focus:bg-white/10 focus:shadow-lg focus:shadow-[#4AFF50]/20"
                  placeholder="tu@email.com"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-[#4AFF50] to-transparent opacity-0 transition-opacity duration-300 peer-focus:opacity-20 pointer-events-none"></div>
              </div>
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-white text-sm font-medium block">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-white outline-none text-sm placeholder-gray-400 transition-all duration-300 focus:border-[#4AFF50] focus:bg-white/10 focus:shadow-lg focus:shadow-[#4AFF50]/20"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Enlace de registro */}
            <div className="text-center">
              <a
                href="/registro"
                className="text-[#ADADAD] text-sm font-light hover:text-[#4AFF50] transition-colors duration-300 hover:underline"
              >
                ¿No tienes cuenta? Regístrate aquí
              </a>
            </div>

            {/* Botón de login */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#4AFF50] to-[#3DE649] text-black font-semibold rounded-xl py-4 text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#4AFF50]/30 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-black"></div>
                  <span>Iniciando sesión...</span>
                </div>
              ) : (
                'Iniciar sesión'
              )}
            </button>

          </div>
        </div>

        {/* Footer */}
        {/* <div className="text-center mt-8">
          <p className="text-[#ADADAD] text-xs">
            © 2025 NutriCheck. Cuidando tu salud.
          </p>
        </div> */}

      </div>

      {/* Partículas flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#4AFF50] rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-[#4AFF50] rounded-full animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-[#4AFF50] rounded-full animate-pulse animation-delay-2000"></div>
      </div>

    </div>
  );
}
