"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import LoadingSpinner from "@/components/LoadingSpinner";

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
      const response = await fetch("https://localhost:7147/api/Auth/login", {
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
    <div className="min-h-screen bg-black flex flex-col items-center py-10 font-[Montserrat]">
      {loading
      ?
        <LoadingSpinner />
      : <></>}
      
      {/* Título */}
      <div className="mt-2 text-center">
        <h1 className="text-4xl font-bold">
          <span className="text-white">Nutri</span>
          <span className="text-[#4AFF50]">Check</span>
        </h1>
        <p className="text-[#ADADAD] mt-4 text-sm">Control de dieta</p>
      </div>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-5 justify-center px-4"
      >
        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-white text-sm mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded-xl border border-white bg-black text-white outline-none text-sm"
            placeholder="Tu email"
          />
        </div>

        {/* Contraseña */}
        <div className="flex flex-col">
          <label htmlFor="password" className="text-white text-sm mb-1">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded-xl border border-white bg-black text-white outline-none text-sm"
            placeholder="Tu contraseña"
          />
        </div>

        {/* No registrado */}
        <Link
          href="/registro"
          className="text-[#ADADAD] text-xs font-light text-center hover:underline transition"
        >
          No estoy registrado
        </Link>

        {/* Botón */}
        <button
          type="submit"
          className="bg-[#4AFF50] text-black font-semibold rounded-xl py-2 text-sm hover:opacity-90 transition"
        >
          Iniciar sesión
        </button>
      </form>

      <div className="h-10" /> {/* Espacio inferior */}
    </div>
  );
}
