"use client";
import { useEffect, useState } from "react";
import { ResponsiveContainer, LineChart, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Bar } from "recharts";
import {jwtDecode} from "jwt-decode";
import { environment } from "@/environment/environment"; 
import { ComidaPopularDto, CumplimientoDiarioDto } from "@/app/nutricionista/panel-control/page"; 

interface EstadisticasPaciente {
  comidasMasPopulares: ComidaPopularDto[];
  cumplimientoCaloricoDiario: CumplimientoDiarioDto[];
//   diasConMasComidas: RankingDiasDto[];
}

interface JwtPayload {
  id: string;
  role: string;
}

export default function ProgresoPaciente() {
  const [progreso, setProgreso] = useState<EstadisticasPaciente | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const { id }: JwtPayload = jwtDecode(token);
    console.log(id);
    fetch(`${environment.API}/api/Pacientes/estadisticas`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProgreso(data))
      .catch(() => console.error("Error al cargar progreso del paciente"));
  }, []);

  if (!progreso) return <p className="p-4">Cargando datos...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Tu progreso semanal</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cumplimiento calórico diario */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Cumplimiento calórico diario</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progreso.cumplimientoCaloricoDiario}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="cumplimiento"
                stroke="#16a34a"
                strokeWidth={2}
                name="Cumplimiento (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Comidas más registradas */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Comidas más registradas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={progreso.comidasMasPopulares}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nombre" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad" fill="#22c55e" name="Cantidad" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Días con más comidas
      <div className="mt-10 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Días con más comidas registradas</h3>
        <ul className="space-y-2">
          {progreso.diasConMasComidas.map((dia, i) => (
            <li key={i} className="flex justify-between border-b pb-2">
              <span>{i + 1}. {dia.fecha}</span>
              <span className="font-semibold text-green-600">{dia.comidasRegistradas} comidas</span>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
