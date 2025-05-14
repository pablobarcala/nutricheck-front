"use client";

import { useState } from "react";
import ModalPaciente from "@/components/Modales/ModalPaciente";
import { environment } from "@/environment/environment";
interface Paciente {
  id: string;
  nombre: string;
  email: string;
  fechaNacimiento: string;
  peso: number;
  altura: number;
  sexo: string;
  caloriasRecomendadas: number;
}

export default function BusquedaPacientesPage() {
  const [nombre, setNombre] = useState("");
  const [resultados, setResultados] = useState<Paciente[]>([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState<Paciente | null>(null);
  const [edad, setEdad] = useState<number | null>(null);

  const handleBuscar = async () => {
    if (!nombre.trim()) return;

    try {
      const res = await fetch(`${environment.API}/api/Pacientes/buscar?nombre=${encodeURIComponent(nombre)}`);
      if (!res.ok) throw new Error("Error al buscar pacientes");

      const data = await res.json();
      setResultados(data);
    } catch (err) {
      console.error(err);
      alert("No se pudo completar la búsqueda");
    }
  };

  const calcularEdad = (fecha: string) => {
    const birthDate = new Date(fecha);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleAbrirModal = (paciente: Paciente) => {
    setPacienteSeleccionado(paciente);
    setEdad(calcularEdad(paciente.fechaNacimiento));
  };

  const handleCerrarModal = () => {
    setPacienteSeleccionado(null);
    setEdad(null);
  };

  const handleVincular = async () => {
    if (!pacienteSeleccionado) return;

    try {
      const res = await fetch("/api/Nutricionistas/vincular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pacienteId: pacienteSeleccionado.id }),
      });

      if (!res.ok) throw new Error("Error al vincular paciente");

      alert("Paciente vinculado correctamente");
      handleCerrarModal();
    } catch (err) {
      console.error(err);
      alert("No se pudo vincular el paciente");
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
            onClick={() => handleAbrirModal(paciente)}
            className="w-full text-left p-2 border rounded-md hover:bg-white hover:text-black transition"
          >
            {paciente.nombre}
          </button>
        ))}
      </div>

      {pacienteSeleccionado && edad !== null && (
        <ModalPaciente
          paciente={pacienteSeleccionado}
          edad={edad}
          onClose={handleCerrarModal}
          onVincular={handleVincular}
        />
      )}
    </div>
  );
}
