"use client";
import { useEffect, useState } from "react";
import { ResponsiveContainer, LineChart, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Bar } from "recharts";
import {jwtDecode} from "jwt-decode";
import { environment } from "@/environment/environment"; 
import { ComidaPopularDto, CumplimientoDiarioDto } from "@/app/nutricionista/panel-control/page"; 

interface EstadisticasPaciente {
  comidasMasPopulares: ComidaPopularDto[];
  cumplimientoCaloricoDiario: CumplimientoDiarioDto[];
  diasConMasComidas: RankingDiasDto[];
}

interface RankingDiasDto {
  fecha: string;
  comidasRegistradas: number;
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

  const formatearFecha = (fecha: string) => {
    // Crear como fecha sin zona horaria (manual split)
    const [year, month, day] = fecha.split("T")[0].split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day)); // sin horario

    return date.toLocaleDateString("es-AR", {
      month: "short",
      day: "numeric",
    });
  };

  const datosCumplimiento =
    progreso?.cumplimientoCaloricoDiario.map((item) => ({
      fecha: formatearFecha(item.fecha),
      cumplimiento: Math.round(item.porcentajeCumplido),
    })) || [];

  if (!progreso) return <p className="py-10">Cargando datos...</p>;

  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold mb-6">Tu progreso semanal</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cumplimiento calórico diario */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Cumplimiento calórico diario
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={datosCumplimiento}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" tick={{ fontSize: 12 }} />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
                label={{
                  value: "% Cumplimiento",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip
                formatter={(value) => [`${value}%`, "Cumplimiento"]}
                labelStyle={{ color: "#374151" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="cumplimiento"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ fill: "#16a34a", strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, stroke: "#16a34a", strokeWidth: 2 }}
                name="Cumplimiento (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Comidas más registradas */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Comidas más registradas (últimos 7 días)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={progreso?.comidasMasPopulares}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nombre" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`${value}`, "Cantidad"]}
                labelStyle={{ color: "#374151" }}
              />
              <Legend />
              <Bar dataKey="cantidad" fill="#22c55e" name="Cantidad" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-10 bg-white dark:bg-neutral-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Días con más comidas registradas (últimos 7 días)
        </h3>
        {progreso?.diasConMasComidas
        .map((dia, index) => (
          <li
            key={index}
            className="flex justify-between items-center"
          >
            <span>{index + 1}. {dia.fecha}</span>
            <span className="font-semibold text-green-600">
              {dia.comidasRegistradas} comidas
            </span>
          </li>
        ))}
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
