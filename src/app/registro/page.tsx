"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { environment } from "@/environment/environment";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormData {
  rol: "paciente" | "nutricionista";
  nombre: string;
  email: string;
  password: string;
}

export default function RegistroPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    rol: "paciente",
    nombre: "",
    email: "",
    password: "",
  });
  const router = useRouter(); // Importar el hook useRouter

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true); // Iniciar el loading
    if (formData.password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      setLoading(false); // Detener el loading
      return;
    }

    try {
      const response = await fetch(environment.API+"/api/Auth/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al registrar usuario");
      }

      const data = await response.text();
      localStorage.setItem("token", data); // Guardar el token en localStorage
      alert("Registro exitoso");
      if(formData.rol === "paciente") {
        router.push("/registro/encuesta"); // Redirigir a la encuesta si es paciente
      } else {
        router.push("/nutricionista/inicio"); // Redirigir a la página principal si es nutricionista
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Hubo un error al registrar. Intentá más tarde.");
    } finally {
      setLoading(false); // Detener el loading
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
        <div className="text-center mb-8">
          <div className="inline-block">
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white via-white to-[#4AFF50] bg-clip-text text-transparent">
              Nutri<span className="text-[#4AFF50]">Check</span>
            </h1>
            <div className="h-1 bg-gradient-to-r from-transparent via-[#4AFF50] to-transparent rounded-full"></div>
          </div>
          <p className="text-[#ADADAD] mt-6 text-base font-light">
            Crear nueva cuenta
          </p>
        </div>

        {/* Formulario con glassmorphism */}
        <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl">
          
          {/* Tipo de usuario */}
          <div className="mb-6">
            <label className="text-white text-sm font-medium block mb-2">
              Registrarse como:
            </label>
            <div className="relative">
              <select
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-white outline-none text-sm transition-all duration-300 focus:border-[#4AFF50] focus:bg-white/10 focus:shadow-lg focus:shadow-[#4AFF50]/20 appearance-none cursor-pointer"
              >
                <option value="paciente">Paciente</option>
                <option value="nutricionista">Nutricionista</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg className="w-4 h-4 text-[#ADADAD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            
            {/* Nombre */}
            <div className="space-y-2">
              <label htmlFor="nombre" className="text-white text-sm font-medium block">
                Nombre
              </label>
              <div className="relative">
                <input
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  type="text"
                  className="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-white outline-none text-sm placeholder-gray-400 transition-all duration-300 focus:border-[#4AFF50] focus:bg-white/10 focus:shadow-lg focus:shadow-[#4AFF50]/20"
                  placeholder="Tu nombre"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-white text-sm font-medium block">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  className="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-white outline-none text-sm placeholder-gray-400 transition-all duration-300 focus:border-[#4AFF50] focus:bg-white/10 focus:shadow-lg focus:shadow-[#4AFF50]/20"
                  placeholder="tu@email.com"
                />
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  className="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-white outline-none text-sm placeholder-gray-400 transition-all duration-300 focus:border-[#4AFF50] focus:bg-white/10 focus:shadow-lg focus:shadow-[#4AFF50]/20"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Confirmar contraseña */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-white text-sm font-medium block">
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  className="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-white outline-none text-sm placeholder-gray-400 transition-all duration-300 focus:border-[#4AFF50] focus:bg-white/10 focus:shadow-lg focus:shadow-[#4AFF50]/20"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Enlace de login */}
            <div className="text-center">
              <a
                href="/login"
                className="text-[#ADADAD] text-sm font-light hover:text-[#4AFF50] transition-colors duration-300 hover:underline"
              >
                ¿Ya tienes cuenta? Inicia sesión aquí
              </a>
            </div>

            {/* Botón de registro */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#4AFF50] to-[#3DE649] text-black font-semibold rounded-xl py-4 text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#4AFF50]/30 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-black"></div>
                  <span>Registrando...</span>
                </div>
              ) : (
                'Registrarse'
              )}
            </button>

          </div>
        </div>

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
