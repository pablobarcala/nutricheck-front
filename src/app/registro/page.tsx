"use client";

import { useState } from "react";

interface FormData {
  tipo: "paciente" | "nutricionista";
  nombre: string;
  apellido: string;
  peso?: number;
  altura?: number;
  fechaNacimiento?: string;
  sexo: string;
  actividad?: string;
  email: string;
  password: string;
}

export default function RegistroPage() {
  const [formData, setFormData] = useState<FormData>({
    tipo: "paciente",
    nombre: "",
    apellido: "",
    peso: undefined,
    altura: undefined,
    fechaNacimiento: undefined,
    sexo: "",
    actividad: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? (value === "" ? undefined : Number(value)) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tipo = e.target.value as "paciente" | "nutricionista";
    setFormData((prev) => ({
      ...prev,
      tipo,
      peso: tipo === "paciente" ? prev.peso : undefined,
      altura: tipo === "paciente" ? prev.altura : undefined,
      fechaNacimiento: tipo === "paciente" ? prev.fechaNacimiento : undefined,
      actividad: tipo === "paciente" ? prev.actividad : undefined,
    }));
  };

  const calcularEdad = (fecha: string) => {
    const nacimiento = new Date(fecha);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const calcularCalorias = (sexo: string, edad: number, peso: number, altura: number, actividad: string): number => {
    const factores: Record<string, number> = {
      sedentario: 1.2,
      ligera: 1.375,
      moderada: 1.55,
      intensa: 1.725,
      muy_intensa: 1.9,
    };

    const factorActividad = factores[actividad] || 1.2;

    let tmb = 0;
    if (sexo === "masculino") {
      tmb = 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * edad);
    } else {
      tmb = 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * edad);
    }

    return Math.round(tmb * factorActividad);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    let calorias = null;
    if (formData.password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
  
    // Si es paciente, calculamos las calorías
    if (
      formData.tipo === "paciente" &&
      formData.fechaNacimiento &&
      formData.altura &&
      formData.peso &&
      formData.actividad
    ) {
      const edad = calcularEdad(formData.fechaNacimiento);
      calorias = calcularCalorias(
        formData.sexo,
        edad,
        formData.peso,
        formData.altura,
        formData.actividad
      );
      console.log("Calorías recomendadas:", calorias);
    }
  
    const datosAEnviar = {
      ...formData,
      calorias, // solo se incluye si es paciente
    };
  
    try {
      const response = await fetch("http://localhost:3001/api/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosAEnviar),
      });
  
      if (!response.ok) {
        throw new Error("Error al registrar usuario");
      }
  
      const data = await response.json();
      console.log("Usuario registrado con éxito:", data);
      alert("Registro exitoso");
      // Aquí podés limpiar el formulario o redirigir al usuario
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Hubo un error al registrar. Intentá más tarde.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center py-10 font-[Montserrat]">
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
          name="tipo"
          value={formData.tipo}
          onChange={handleTipoChange}
          className="p-2 rounded-xl border border-white bg-black text-white outline-none text-sm"
        >
          <option value="paciente">Paciente</option>
          <option value="nutricionista">Nutricionista</option>
        </select>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 justify-center px-4 mt-2"
      >
        {/* Campos comunes */} {/*Nombre*/}
        <div className="flex flex-col">
          <label className="text-white text-sm mb-1">Nombre</label>
          <input name="nombre" value={formData.nombre} onChange={handleChange} type="text" className="p-2 rounded-xl border border-white bg-black text-white outline-none text-sm" placeholder="Tu nombre" />
        </div>
         {/*Apellido*/}
        <div className="flex flex-col">
          <label className="text-white text-sm mb-1">Apellido</label>
          <input name="apellido" value={formData.apellido} onChange={handleChange} type="text" className="p-2 rounded-xl border border-white bg-black text-white outline-none text-sm" placeholder="Tu apellido" />
        </div>

        {formData.tipo === "paciente" && (
          <> {/*Peso*/}
            <div className="flex flex-col">
              <label className="text-white text-sm mb-1">Peso (kg)</label>
              <input name="peso" value={formData.peso ?? ""} onChange={handleChange} type="number" min="0" className="p-2 rounded-xl border border-white bg-black text-white outline-none text-sm" placeholder="Ej: 70" />
            </div>
              {/*Altura*/}
            <div className="flex flex-col">
              <label className="text-white text-sm mb-1">Altura (cm)</label>
              <input name="altura" value={formData.altura ?? ""} onChange={handleChange} type="number" min="0" className="p-2 rounded-xl border border-white bg-black text-white outline-none text-sm" placeholder="Ej: 170" />
            </div>
              {/*Fecha de nacimiento*/}
            <div className="flex flex-col">
              <label className="text-white text-sm mb-1">Fecha de nacimiento</label>
              <input name="fechaNacimiento" value={formData.fechaNacimiento ?? ""} onChange={handleChange} type="date" className="p-2 rounded-xl border border-white bg-black text-white outline-none text-sm" />
            </div>
              {/*Actividad Fisica*/}
            <div className="flex flex-col">
              <label className="text-white text-sm mb-1">Actividad física</label>
              <select name="actividad" value={formData.actividad ?? ""} onChange={handleChange} className="p-2 rounded-xl border border-white bg-black text-white outline-none text-sm">
                <option value="">Seleccionar</option>
                <option value="sedentario">Sedentario</option>
                <option value="ligera">Actividad ligera</option>
                <option value="moderada">Actividad moderada</option>
                <option value="intensa">Actividad intensa</option>
                <option value="muy_intensa">Actividad muy intensa</option>
              </select>
            </div>
          </>
        )}
         {/*Sexo*/}
        <div className="flex flex-col">
          <label className="text-white text-sm mb-1">Sexo</label>
          <select name="sexo" value={formData.sexo} onChange={handleChange} className="p-2 rounded-xl border border-white bg-black text-white outline-none text-sm">
            <option value="">Seleccionar</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
        </div>
         {/*Email*/}
        <div className="flex flex-col">
          <label className="text-white text-sm mb-1">Email</label>
          <input name="email" value={formData.email} onChange={handleChange} type="email" className="p-2 rounded-xl border border-white bg-black text-white outline-none text-sm" placeholder="Tu email" />
        </div>
          {/*Contraseña */}
        <div className="flex flex-col"> 
          <label className="text-white text-sm mb-1">Contraseña</label>
          <input name="password" value={formData.password} onChange={handleChange} type="password" className="p-2 rounded-xl border border-white bg-black text-white outline-none text-sm" placeholder="Tu contraseña" />
         </div>
          {/*Confirmar Contraseña */}
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="text-white text-sm mb-1">Confirmar contraseña</label>
          <input name="confirmPassword"value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}type="password"className="p-2 rounded-xl border border-white bg-black text-white outline-none text-sm"placeholder="Repetí tu contraseña"/>
       </div>
          {/*Registrase*/}
        <div className="col-span-1 md:col-span-2 mt-2">
          <button className="w-full bg-[#4AFF50] text-black font-semibold rounded-xl py-2 text-sm transition-transform duration-150 ease-in-out transform hover:scale-105 focus:scale-95 hover:opacity-90 focus:outline-none">
            Registrarse
          </button>
       </div>
      </form>

      <div className="h-10" />
    </div>
  );
}
