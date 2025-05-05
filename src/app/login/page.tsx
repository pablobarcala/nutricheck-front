"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login exitoso", data);
        // redireccionar o guardar token
      } else {
        console.error("Error al iniciar sesión:", data.message);
        alert(data.message || "Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-between py-10 font-[Montserrat]">
      {/* Título */}
      <div className="mt-10 text-center">
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
