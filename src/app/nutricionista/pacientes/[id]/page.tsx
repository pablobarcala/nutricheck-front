"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SeleccionarComidaModal from "@/components/Modales/ModalSeleccionComidas";

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

interface Comida {
  id: string;
  nombre: string;
  calorias: number;
}

export default function PacienteDetallePage() {
  const { id } = useParams();
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [edad, setEdad] = useState<number | null>(null);
  const [comidas, setComidas] = useState<Comida[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const calcularEdad = (fecha: string) => {
    const birthDate = new Date(fecha);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const fetchPaciente = async () => {
    try {
      const res = await fetch(`/api/Pacientes/${id}`);
      if (!res.ok) throw new Error("Error al cargar paciente");

      const data = await res.json();
      setPaciente(data);
      setEdad(calcularEdad(data.fechaNacimiento));
    } catch (err) {
      console.error(err);
      alert("No se pudo cargar la información del paciente");
    }
  };

  const fetchComidasPaciente = async () => {
    try {
      const res = await fetch(`/api/Pacientes/${id}/comidas`);
      if (!res.ok) throw new Error("Error al cargar comidas");

      const data = await res.json();
      setComidas(data);
    } catch (err) {
      console.error(err);
      alert("No se pudieron cargar las comidas del paciente");
    }
  };

  const handleVincularComida = async (comidaId: string) => {
    try {
      const res = await fetch(`/api/Pacientes/${id}/comidas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comidaId }),
      });

      if (!res.ok) throw new Error("Error al vincular comida");

      fetchComidasPaciente(); // Refrescar lista de comidas
      setMostrarModal(false);
    } catch (err) {
      console.error(err);
      alert("No se pudo vincular la comida");
    }
  };

  useEffect(() => {
    if (id) {
      fetchPaciente();
      fetchComidasPaciente();
    }
  }, [id]);

  if (!paciente) {
    return <div className="p-4 text-white">Cargando datos del paciente...</div>;
  }

  return (
    <div className="p-4 text-white font-[Montserrat]">
      <h1 className="text-2xl font-bold mb-4">Información del Paciente</h1>

      <div className="space-y-2 mb-6">
        <p><strong>Nombre:</strong> {paciente.nombre}</p>
        <p><strong>Email:</strong> {paciente.email}</p>
        <p><strong>Edad:</strong> {edad} años</p>
        <p><strong>Peso:</strong> {paciente.peso} kg</p>
        <p><strong>Altura:</strong> {paciente.altura} cm</p>
        <p><strong>Sexo:</strong> {paciente.sexo}</p>
        <p><strong>Calorías recomendadas:</strong> {paciente.caloriasRecomendadas} kcal</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Comidas asignadas</h2>
        <ul className="space-y-1">
          {comidas.length > 0 ? comidas.map((comida) => (
            <li key={comida.id} className="border p-2 rounded-md">
              🍽️ {comida.nombre} — {comida.calorias} kcal
            </li>
          )) : <p>No hay comidas asignadas aún.</p>}
        </ul>
      </div>

      <button
        onClick={() => setMostrarModal(true)}
        className="bg-green-500 text-black font-semibold px-4 py-2 rounded hover:bg-green-600"
      >
        Vincular nueva comida
      </button>

      {mostrarModal && (
        <SeleccionarComidaModal
          onClose={() => setMostrarModal(false)}
          onVincular={handleVincularComida}
        />
      )}
    </div>
  );
}
