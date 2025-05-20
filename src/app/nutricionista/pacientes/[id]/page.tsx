"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SeleccionarComidaModal from "@/components/Modales/ModalSeleccionComidas";
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
       const res = await fetch(`${environment.API}/api/Pacientes/${id}`);
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
  <h1 className="text-2xl font-bold mb-6">Información del Paciente</h1>

  {/* Grid organizada de datos personales */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
    <div className="bg-gray-600 p-4 rounded-lg shadow">
      <p className="text-sm text-gray-400">Nombre</p>
      <p className="text-lg font-semibold">{paciente.nombre}</p>
    </div>
    <div className="bg-gray-600 p-4 rounded-lg shadow">
      <p className="text-sm text-gray-400">Email</p>
      <p className="text-lg font-semibold">{paciente.email}</p>
    </div>
    <div className="bg-gray-600 p-4 rounded-lg shadow">
      <p className="text-sm text-gray-400">Edad</p>
      <p className="text-lg font-semibold">{edad} años</p>
    </div>
    <div className="bg-gray-600 p-4 rounded-lg shadow">
      <p className="text-sm text-gray-400">Peso</p>
      <p className="text-lg font-semibold">{paciente.peso} kg</p>
    </div>
    <div className="bg-gray-600 p-4 rounded-lg shadow">
      <p className="text-sm text-gray-400">Altura</p>
      <p className="text-lg font-semibold">{paciente.altura} cm</p>
    </div>
    <div className="bg-gray-600 p-4 rounded-lg shadow">
      <p className="text-sm text-gray-400">Sexo</p>
      <p className="text-lg font-semibold">{paciente.sexo}</p>
    </div>
    <div className="bg-gray-600 p-4 rounded-lg shadow">
  <p className="text-sm text-gray-400">Calorías recomendadas</p>
  <p className="text-lg font-semibold">{paciente.caloriasRecomendadas} kcal</p>
</div>
  </div>

  {/* Sección de comidas asignadas */}
  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-3">🍽️ Comidas asignadas</h2>
    <ul className="space-y-2">
      {comidas.length > 0 ? comidas.map((comida) => (
        <li key={comida.id} className="border border-gray-600 p-3 rounded-md bg-gray-900">
          <span className="font-semibold">{comida.nombre}</span> — {comida.calorias} kcal
        </li>
      )) : (
        <p className="text-gray-400">No hay comidas asignadas aún.</p>
      )}
    </ul>
  </div>

  {/* Botón para abrir modal */}
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
