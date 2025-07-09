"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { environment } from "@/environment/environment";
import ModalBuscarPaciente from "@/components/Modales/ModalBuscarPaciente";

export default function MisPacientesPage() {
  const [pacientes, setPacientes] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const router = useRouter();

  const fetchPacientes = async () => {
    try {
      const res = await fetch(`${environment.API}/api/Nutricionistas/mis-pacientes`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Error al cargar pacientes");

      const data = await res.json();
      setPacientes(data);
    } catch (err) {
      console.error(err);
      alert("Error al cargar pacientes");
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  return (
   <div className="py-10 w-full font-[Montserrat] relative">
  <h1 className="text-3xl font-bold mb-4">Pacientes</h1>

  <div className="flex gap-4 flex-wrap justify-start items-center">
    {pacientes.map((paciente: any) => (
      <button
        key={paciente.id}
        onClick={() => router.push(`/nutricionista/pacientes/${paciente.id}`)}
        className="cursor-pointer w-full sm:w-[280px] bg-neutral-100 dark:bg-neutral-100/10 font-bold text-lg flex flex-col gap-1 text-left py-3 px-4 border border-neutral-200 dark:border-neutral-200/10 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition"
      >
        <span>{paciente.nombre}</span>
        <span className="text-sm font-normal truncate">{paciente.email}</span>
      </button>
    ))}
  </div>

  <button
    onClick={() => setMostrarModal(true)}
    className="fixed bottom-6 right-6 text-xl bg-green-500 text-black rounded-full w-12 h-12 flex items-center justify-center hover:bg-green-600 z-50"
    title="Vincular nuevo paciente"
  >
    +
  </button>

  {mostrarModal && (
    <ModalBuscarPaciente
      onClose={() => setMostrarModal(false)}
      onPacienteVinculado={() => {
        fetchPacientes();
        setMostrarModal(false);
      }}
    />
  )}
</div>
  );
}
