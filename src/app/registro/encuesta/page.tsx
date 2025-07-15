"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { environment } from "@/environment/environment";

interface EncuestaData {
  peso?: number;
  altura?: number;
  fechaNacimiento?: string;
  sexo: string;
  actividad: string;
}

export default function EncuestaPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<EncuestaData>({
    peso: undefined,
    altura: undefined,
    fechaNacimiento: undefined,
    sexo: "",
    actividad: "",
  });
  const router = useRouter(); // Importar el hook useRouter

  const [calorias, setCalorias] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const parsedValue =
      type === "number" ? (value === "" ? undefined : Number(value)) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
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

  const calcularCalorias = (
    sexo: string,
    edad: number,
    peso: number,
    altura: number,
    actividad: string
  ): number => {
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
      tmb = 88.36 + 13.4 * peso + 4.8 * altura - 5.7 * edad;
    } else {
      tmb = 447.6 + 9.2 * peso + 3.1 * altura - 4.3 * edad;
    }

    return Math.round(tmb * factorActividad);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Iniciar el loading

    const { peso, altura, fechaNacimiento, sexo, actividad } = formData;
    if (!peso || !altura || !fechaNacimiento || !sexo || !actividad) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (peso <= 0 || altura <= 0) {
      alert("Peso y altura deben ser mayores a cero");
      return;
    }

    const edad = calcularEdad(fechaNacimiento);
    const caloriasCalculadas = calcularCalorias(
      sexo,
      edad,
      peso,
      altura,
      actividad
    );

    setCalorias(caloriasCalculadas);

    const datosAEnviar = {
      peso,
      altura,
      fechaNacimiento,
      sexo,
      actividad,
      calorias: caloriasCalculadas,
    };

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(environment.API+"/api/Pacientes/guardar-datos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(datosAEnviar),
      });

      if (!res.ok) throw new Error("Error al enviar encuesta");

      alert("Datos de salud enviados correctamente");
      router.push("/paciente/inicio")
    } catch (error) {
      console.error(error);
      alert("Hubo un error al enviar los datos");
    } finally {
      setLoading(false); // Finalizar el loading
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 font-[Montserrat]">
      {loading
      ?
        <LoadingSpinner />
      : <></>}

      <h1 className="text-3xl font-bold mb-6">Completar datos de salud</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-4"
      >
        <div className="flex flex-col">
          <label>Peso (kg)</label>
          <input
            name="peso"
            type="number"
            min="0"
            value={formData.peso ?? ""}
            onChange={handleChange}
            className="p-2 rounded-xl border border-white bg-black text-white"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>Altura (cm)</label>
          <input
            name="altura"
            type="number"
            min="0"
            value={formData.altura ?? ""}
            onChange={handleChange}
            className="p-2 rounded-xl border border-white bg-black text-white"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>Fecha de nacimiento</label>
          <input
            name="fechaNacimiento"
            type="date"
            value={formData.fechaNacimiento ?? ""}
            onChange={handleChange}
            className="p-2 rounded-xl border border-white bg-black text-white"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>Sexo</label>
          <select
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
            className="p-2 rounded-xl border border-white bg-black text-white"
            required
          >
            <option value="">Seleccionar</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label>Actividad física</label>
          <select
            name="actividad"
            value={formData.actividad}
            onChange={handleChange}
            className="p-2 rounded-xl border border-white bg-black text-white"
            required
          >
            <option value="">Seleccionar</option>
            <option value="sedentario">Sedentario - sin ejercicio</option>
            <option value="ligera">
              Actividad ligera - 1-3 días/semana (caminar, yoga)
            </option>
            <option value="moderada">
              Moderada - 3-5 días/semana (correr suave, gimnasio)
            </option>
            <option value="intensa">
              Intensa - 6-7 días/semana (entrenamiento exigente)
            </option>
            <option value="muy_intensa">
              Muy intensa - doble turno o trabajo físico fuerte
            </option>
          </select>
        </div>

        <button className="mt-4 bg-[#4AFF50] text-black font-semibold rounded-xl py-2 hover:opacity-90">
          Enviar datos
        </button>

        {calorias !== null && (
          <p className="mt-4 text-center">
            Calorías recomendadas: <strong>{calorias}</strong>
          </p>
        )}
      </form>
    </div>
  );
}

