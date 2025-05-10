"use client";

import { useState } from "react";

export default function BusquedaPacientesPage() {
  const [nombre, setNombre] = useState("");
  const [resultados, setResultados] = useState<{ id: string; nombre: string }[]>([]);

  const handleBuscar = async () => {
    if (!nombre.trim()) return;

    try {
      const res = await fetch(`/api/Pacientes/buscar?nombre=${encodeURIComponent(nombre)}`);
      if (!res.ok) throw new Error("Error al buscar pacientes");

      const data = await res.json();
      setResultados(data); // Suponiendo que devuelve un array de pacientes
    } catch (err) {
      console.error(err);
      alert("No se pudo completar la búsqueda");
    }
  };

  return (
    <div className="p-4 text-white font-[Montserrat]">
      <h1 className="text-2xl mb-4 font-bold">Buscar Paciente</h1>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nombre del paciente"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="p-2 rounded-md border bg-black border-white text-white w-full"
        />
        <button
          onClick={handleBuscar}
          className="bg-[#4AFF50] text-black px-4 rounded-md hover:opacity-90"
        >
          Buscar
        </button>
      </div>

      <div className="space-y-2">
        {resultados.map((paciente) => (
          <button
            key={paciente.id}
            className="w-full text-left p-2 border rounded-md hover:bg-white hover:text-black transition"
          >
            {paciente.nombre}
          </button>
        ))}
      </div>
    </div>
  );
}
