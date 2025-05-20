"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { environment } from "@/environment/environment";

interface Paciente {
  id: string;
  nombre: string;
}

export default function MisPacientesPage() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [filtro, setFiltro] = useState("");
  const router = useRouter();

  // Buscar pacientes desde el backend
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchPacientes = async () => {
        try {
          if (!filtro.trim()) {
            setPacientes([]); // Limpia si está vacío
            return;
          }

          const res = await fetch(
            `${environment.API}/api/Pacientes/buscar/${filtro}`
          );
          if (!res.ok) throw new Error("Error al buscar pacientes");

          const data = await res.json();
          setPacientes(data);
        } catch (err) {
          console.error(err);
          alert("Error al buscar pacientes");
        }
      };

      fetchPacientes();
    }, 300); // Espera 300ms para evitar llamar en cada tecla

    return () => clearTimeout(delayDebounce);
  }, [filtro]);

  return (
    <div className="p-4 text-white font-[Montserrat]">
      <h1 className="text-2xl font-bold mb-4">Buscar Pacientes</h1>

      <input
        type="text"
        placeholder="Buscar por nombre"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="p-2 rounded-md border bg-black border-white text-white w-full mb-4"
      />

      <div className="space-y-2">
        {pacientes.map((paciente) => (
          <button
            key={paciente.id}
            onClick={() =>
              router.push(`/nutricionista/paciente/${paciente.id}`)
            }
            className="w-full text-left p-2 border rounded-md hover:bg-white hover:text-black transition"
          >
            {paciente.nombre}
          </button>
        ))}

        {pacientes.length === 0 && filtro.trim() !== "" && (
          <p className="text-gray-400">No se encontraron pacientes</p>
        )}
      </div>
    </div>
  );
}
