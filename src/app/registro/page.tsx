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
    <div className="min-h-screen bg-black flex flex-col items-center py-10 font-[Montserrat]">
      {loading
      ?
        <LoadingSpinner />
      : <></>}

      <div className="mt-10 text-center">
        <h1 className="text-4xl font-bold">
          <span className="text-white">Nutri</span>
          <span className="text-[#4AFF50]">Check</span>
        </h1>
        <p className="text-[#ADADAD] mt-4 text-sm">Crear nueva cuenta</p>
      </div>

      {/*Tipo de usuario*/}
      <div className="mt-6 mb-4">
        <label className="text-white text-sm mr-4">Registrarse como:</label>
        <select
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          className="p-2 rounded-xl border border-white bg-black text-white outline-none text-sm"
        >
          <option value="paciente">Paciente</option>
          <option value="nutricionista">Nutricionista</option>
        </select>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-5 justify-center px-4 mt-2"
      >
        {/* Nombre */}
        <div className="flex flex-col">
          <label className="text-white text-sm mb-1">Nombre</label>
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            type="text"
            className="p-2 rounded-xl border border-white bg-black text-white outline-none text-sm"
            placeholder="Tu nombre"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-white text-sm mb-1">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            className="p-2 rounded-xl border border-white bg-black text-white outline-none text-sm"
            placeholder="Tu email"
          />
        </div>

        {/* Contraseña */}
        <div className="flex flex-col">
          <label className="text-white text-sm mb-1">Contraseña</label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            className="p-2 rounded-xl border border-white bg-black text-white outline-none text-sm"
            placeholder="Tu contraseña"
          />
        </div>

        {/* Confirmar contraseña */}
        <div className="flex flex-col">
          <label className="text-white text-sm mb-1">Confirmar contraseña</label>
          <input
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            className="p-2 rounded-xl border border-white bg-black text-white outline-none text-sm"
            placeholder="Repetí tu contraseña"
          />
        </div>

        {/* Botón */}
        <button className="bg-[#4AFF50] text-black font-semibold rounded-xl py-2 text-sm transition-transform duration-150 ease-in-out transform hover:scale-105 focus:scale-95 hover:opacity-90 focus:outline-none">
          Registrarse
        </button>
      </form>

      <div className="h-10" />
    </div>
  );
}
