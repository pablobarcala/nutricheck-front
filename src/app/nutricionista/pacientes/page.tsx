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
    <div className="p-4 text-white font-[Montserrat] relative">
      <h1 className="text-2xl font-bold mb-4">Pacientes</h1>

      <div className="flex gap-4 flex-wrap justify-center items-center">
        {pacientes.map((paciente: any) => (
          <button
            key={paciente.id}
            onClick={() => router.push(`/nutricionista/pacientes/${paciente.id}`)}
            className="font-bold text-xl flex flex-col gap-2 text-left py-2 pl-2 pr-24 border rounded-md hover:bg-white hover:text-black transition"
          >
            {paciente.nombre}
            <span className="text-sm font-normal">{paciente.email}</span>
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
            fetchPacientes(); // 🔁 Recarga pacientes al vincular
            setMostrarModal(false); // Cierra el modal
          }}
        />
      )}
    </div>
  );
}
