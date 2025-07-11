"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { environment } from "@/environment/environment";
import ModalInfoComida from "@/components/Modales/ModalnfoComida";

interface JwtPayload {
  email: string;
  role: string;
  exp: number;
  id: string;
}

interface Comida {
  id: string;
  nombre: string;
  kcal: number;
  descripcion?: string;
  fecha?: string;
}

export default function ComidasPacientePage() {
  const [comidas, setComidas] = useState<Comida[]>([]);
  const [comidaSeleccionada, setComidaSeleccionada] = useState<Comida | null>(null);
  const [form, setForm] = useState({ nombre: "", caloriasTotales: "", fecha: "" });
  const [pacienteId, setPacienteId] = useState<string | null>(null);

  const obtenerIdDesdeToken = (): string | null => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.id;
    } catch (err) {
      console.error("Token inválido", err);
      return null;
    }
  };

  const fetchComidas = async () => {
    try {
      const res = await fetch(`${environment.API}/api/Pacientes/comidas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Error al obtener comidas");
      const data = await res.json();
      setComidas(data);
      console.log(data);
    } catch (err) {
      console.error(err);
      alert("No se pudo cargar las comidas");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.caloriasTotales || !form.fecha) {
  alert("Todos los campos son obligatorios");
  return;
}

const calorias = parseInt(form.caloriasTotales);
if (isNaN(calorias) || calorias <= 0) {
  alert("Las calorías deben ser un número mayor a 0");
  return;
}

    try {
      const res = await fetch(`${environment.API}/api/comidas/registrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
             nombre: form.nombre,
             kcal: calorias,
             fecha: form.fecha,
          }),
      });

      if (!res.ok) throw new Error("Error al registrar comida");

      setForm({ nombre: "", caloriasTotales: "", fecha: "" });
      if (pacienteId) fetchComidas();
      alert("Comida registrada con éxito");
    } catch (err) {
      console.error(err);
      alert("Hubo un error al registrar la comida");
    }
  };

  useEffect(() => {
    fetchComidas();
    // const pacienteId = obtenerIdDesdeToken();
    // if (pacienteId) {
    // } else {
    //   alert("No se pudo identificar al paciente");
    // }
  }, []);

  return (
    <div className="py-10 font-[Montserrat]">
      <h1 className="text-2xl font-bold mb-6">Mis Comidas</h1>

      {comidas.map((comida) => (
        <button
          key={comida.id}
          onClick={() => setComidaSeleccionada(comida)}
          className="bg-neutral-100 dark:bg-neutral-100/10 border border-neutral-200 dark:border-neutral-200/10 p-4 rounded shadow cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-100/5 transition w-full mb-2 text-green-700"
        >
          {comida.nombre} - {comida.kcal} kcal
        </button>
      ))}

      {/* 🔍 Modal de info comida */}
      {comidaSeleccionada && (
        <ModalInfoComida
          comida={comidaSeleccionada}
          onClose={() => setComidaSeleccionada(null)}
        />
      )}
    </div>
  );
}
