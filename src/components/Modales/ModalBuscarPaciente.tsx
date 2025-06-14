"use client";

import { useState } from "react";
import ModalPaciente from "./ModalPaciente";
import { environment } from "@/environment/environment";

interface Paciente {
  id: string;
  nombre: string;
  email: string;
  fechaNacimiento: string;
  peso: number;
  altura: number;
  sexo: string;
  calorias: number;
}

export default function ModalBuscarPaciente({
  onClose,
  onPacienteVinculado,
}: {
  onClose: () => void;
  onPacienteVinculado: () => void;
}) {
  const [nombreBusqueda, setNombreBusqueda] = useState("");
  const [resultadosBusqueda, setResultadosBusqueda] = useState<Paciente[]>([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState<Paciente | null>(null);
  const [edad, setEdad] = useState<number | null>(null);

  const handleBuscar = async () => {
    if (!nombreBusqueda.trim()) return;

    try {
      const res = await fetch(
        `${environment.API}/api/Pacientes/buscar?nombre=${encodeURIComponent(nombreBusqueda)}`
      );
      if (!res.ok) throw new Error("Error al buscar pacientes");

      const data = await res.json();
      setResultadosBusqueda(data);
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

  const handleSeleccionarPaciente = (paciente: Paciente) => {
    setPacienteSeleccionado(paciente);
    setEdad(calcularEdad(paciente.fechaNacimiento));
  };

  const handleVincular = async () => {
    if (!pacienteSeleccionado) return;

    try {
      const res = await fetch(
        `${environment.API}/api/Nutricionistas/agregar-paciente?pacienteId=${pacienteSeleccionado.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error("Error al vincular paciente");

      alert("Paciente vinculado correctamente");
      onPacienteVinculado();
      handleCerrarModal();
    } catch (err) {
      console.error(err);
      alert("No se pudo vincular el paciente");
    }
  };

  const handleCerrarModal = () => {
    setPacienteSeleccionado(null);
    setEdad(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-start pt-20 z-50">
      <div className="bg-gray-800 p-6 rounded-md w-[90%] max-w-xl">
        <h2 className="text-xl font-semibold mb-4">Buscar paciente</h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Nombre del paciente"
            value={nombreBusqueda}
            onChange={(e) => setNombreBusqueda(e.target.value)}
            className="p-2 rounded-md border bg-black border-white text-white w-full"
          />
          <button
            onClick={handleBuscar}
            className="bg-[#4AFF50] text-black px-4 rounded-md hover:opacity-90"
          >
            Buscar
          </button>
        </div>

        <div className="space-y-2 mb-4">
          {resultadosBusqueda.map((paciente) => (
            <button
              key={paciente.id}
              onClick={() => handleSeleccionarPaciente(paciente)}
              className="font-bold text-left w-full border rounded-md p-2 hover:bg-white hover:text-black transition flex flex-col gap-1"
            >
              {paciente.nombre}
              <span className="text-sm font-normal">{paciente.email}</span>
            </button>
          ))}
        </div>

        {pacienteSeleccionado && edad !== null && (
          <ModalPaciente
            paciente={pacienteSeleccionado}
            edad={edad}
            onClose={() => setPacienteSeleccionado(null)}
            onVincular={handleVincular}
          />
        )}

        <div className="mt-4 text-right">
          <button onClick={handleCerrarModal} className="text-red-400 hover:underline">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
