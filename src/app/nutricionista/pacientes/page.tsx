"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Paciente {
  id: string;
  nombre: string;
}

export default function MisPacientesPage() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [filtro, setFiltro] = useState("");
  const router = useRouter();

  // Trae todos los pacientes vinculados al nutricionista
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const res = await fetch("/api/Nutricionistas/pacientes"); // Ajusta el endpoint si es necesario
        if (!res.ok) throw new Error("Error al obtener pacientes");

        const data = await res.json();
        setPacientes(data);
      } catch (err) {
        console.error(err);
        alert("Error al cargar pacientes");
      }
    };

    fetchPacientes();
  }, []);

  const pacientesFiltrados = pacientes.filter((p) =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="p-4 text-white font-[Montserrat]">
      <h1 className="text-2xl font-bold mb-4">Mis Pacientes</h1>

      <input
        type="text"
        placeholder="Buscar paciente"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="p-2 rounded-md border bg-black border-white text-white w-full mb-4"
      />

      <div className="space-y-2">
        {pacientesFiltrados.map((paciente) => (
          <button
            key={paciente.id}
            onClick={() => router.push(`/nutricionista/paciente/${paciente.id}`)}
            className="w-full text-left p-2 border rounded-md hover:bg-white hover:text-black transition"
          >
            {paciente.nombre}
          </button>
        ))}

        {pacientesFiltrados.length === 0 && (
          <p className="text-gray-400">No se encontraron pacientes</p>
        )}
      </div>
    </div>
  );
}
