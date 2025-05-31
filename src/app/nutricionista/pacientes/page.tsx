"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { environment } from "@/environment/environment";

// interface Paciente {
//   id: string;
//   nombre: string;
// }

export default function MisPacientesPage() {
  const [pacientes, setPacientes] = useState<[]>([]);
  const [filtro, setFiltro] = useState("");
  const router = useRouter();

  // Buscar pacientes desde el backend
  useEffect(() => {
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
    }
    // const delayDebounce = setTimeout(() => {
    //   const fetchPacientes = async () => {
    //     try {
    //       if (!filtro.trim()) {
    //         setPacientes([]); // Limpia si está vacío
    //         return;
    //       }

    //       const res = await fetch(
    //         `${environment.API}/api/Pacientes/buscar/${filtro}`
    //       );
    //       if (!res.ok) throw new Error("Error al buscar pacientes");

    //       const data = await res.json();
    //       setPacientes(data);
    //     } catch (err) {
    //       console.error(err);
    //       alert("Error al buscar pacientes");
    //     }
    //   };

    fetchPacientes();
    // }, 300); // Espera 300ms para evitar llamar en cada tecla

    // return () => clearTimeout(delayDebounce);
  }, []);

  return (
    <div className="p-4 text-white font-[Montserrat]">
      <h1 className="text-2xl font-bold mb-4">Pacientes</h1>

      {/* <input
        type="text"
        placeholder="Buscar por nombre"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="p-2 rounded-md border bg-black border-white text-white w-full mb-4"
      /> */}

      <div className="flex gap-4 flex-wrap justify-center items-center">
        {pacientes.map((paciente: any) => (
          <button
            key={paciente.id}
            onClick={() =>
              router.push(`/nutricionista/pacientes/${paciente.id}`)
            }
            className="font-bold text-xl flex flex-col gap-2 text-left py-2 pl-2 pr-24 border rounded-md hover:bg-white hover:text-black transition"
          >
            {paciente.nombre}
            <span className="text-sm font-normal">{paciente.email}</span>
          </button>
        ))}

        {pacientes.length === 0 && filtro.trim() !== "" && (
          <p className="text-gray-400">No se encontraron pacientes</p>
        )}
      </div>
    </div>
  );
}
