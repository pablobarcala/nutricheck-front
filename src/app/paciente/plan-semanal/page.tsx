"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { environment } from "@/environment/environment";

interface Comida {
  // id: string;
  name: string;
  kcal: number;
}

interface DiaPlan {
  dia: string;
  comidas: Comida[];
}

interface JwtPayload {
  id: string;
  role: string;
}

export default function PlanSemanalPaciente() {
  const [planSemanal, setPlanSemanal] = useState<DiaPlan[]>([]);
  // const [pacienteId, setPacienteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await fetch(`${environment.API}/api/Pacientes/plan-semanal`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        const data = await res.json();
        setPlanSemanal(data);
      } catch (error) {
        console.error("Error al obtener el plan semanal", error);
      }
    };

    fetchPlan();
  }, []);

  return (
    <div className="p-6 font-[Montserrat]">
      <h1 className="text-2xl font-bold mb-6">🗓️ Mi Plan Semanal</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {planSemanal.map((dia) => (
          <div key={dia.dia} className="border border-neutral-200 dark:border-neutral-200/10 rounded-md p-3 shadow bg-neutral-100 dark:bg-neutral-100/10">
            <h3 className="text-lg font-semibold mb-2">{dia.dia}</h3>
            {dia.comidas.length > 0 ? (
              <ul className="space-y-1 text-sm">
                {dia.comidas.map((comida) => (
                  <li key={comida.name}>🍽️ {comida.name} — {comida.kcal} kcal</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No hay comidas asignadas</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
