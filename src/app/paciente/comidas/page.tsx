"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { environment } from "@/environment/environment";// Asegúrate de que esta ruta sea correcta
import ModalInfoComida from "@/components/Modales/ModalnfoComida";

interface JwtPayload {
  email: string;
  role: string;
  exp: number;
  id: string; // Asegúrate de que el backend incluya el ID del paciente en el token
}

interface Comida {
  id: string;
  nombre: string;
  caloriasTotales: number;
  descripcion?: string;
}

export default function ComidasPacientePage() {
  const [comidas, setComidas] = useState<Comida[]>([]);
  const [comidaSeleccionada, setComidaSeleccionada] = useState<Comida | null>(null);

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
    } catch (err) {
      console.error(err);
      alert("No se pudo cargar las comidas");
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
    <div className="p-4 text-white font-[Montserrat]">
      <h1 className="text-2xl font-bold mb-4">Mis Comidas</h1>

      {comidas.map((comida) => (
        <button
          key={comida.id}
          onClick={() => setComidaSeleccionada(comida)}
          className="w-full text-left p-2 border rounded-md hover:bg-white hover:text-black transition"
        >
          {comida.nombre} - {comida.kcal} kcal
        </button>
      ))}

      {comidaSeleccionada && (
        <ModalInfoComida
          comida={comidaSeleccionada}
          onClose={() => setComidaSeleccionada(null)}
        />
      )}
    </div>
  );
}
