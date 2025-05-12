"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

export default function PacienteDetallePage() {
  const { id } = useParams();
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [edad, setEdad] = useState<number | null>(null);

  // Calcular edad a partir de la fecha de nacimiento
  const calcularEdad = (fecha: string) => {
    const birthDate = new Date(fecha);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // Llamada al backend para traer datos del paciente
  useEffect(() => {
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

    if (id) fetchPaciente();
  }, [id]);

  if (!paciente) {
    return (
      <div className="p-4 text-white font-[Montserrat]">
        <p>Cargando datos del paciente...</p>
      </div>
    );
  }

  return (
    <div className="p-4 text-white font-[Montserrat]">
      <h1 className="text-2xl font-bold mb-4">Información del Paciente</h1>

      <div className="space-y-2">
        <p><strong>Nombre:</strong> {paciente.nombre}</p>
        <p><strong>Email:</strong> {paciente.email}</p>
        <p><strong>Edad:</strong> {edad} años</p>
        <p><strong>Peso:</strong> {paciente.peso} kg</p>
        <p><strong>Altura:</strong> {paciente.altura} cm</p>
        <p><strong>Sexo:</strong> {paciente.sexo}</p>
        <p><strong>Calorías recomendadas:</strong> {paciente.caloriasRecomendadas} kcal</p>
      </div>
    </div>
  );
}
