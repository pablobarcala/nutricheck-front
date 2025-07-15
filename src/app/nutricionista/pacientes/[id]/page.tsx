"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import SeleccionarComidaModal from "@/components/Modales/ModalSeleccionComidas";
import { environment } from "@/environment/environment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { ComidaPopularDto, CumplimientoDiarioDto } from "../../panel-control/page";

type JwtPayload = {
  id: string;
  role: string;
};

interface Paciente {
  id: string;
  nombre: string;
  email: string;
  fechaNacimiento: string;
  peso: number;
  altura: number;
  sexo: string;
  calorias: number;
  porcentajeGrasas: number;
  porcentajeCarbohidratos: number;
  porcentajeProteinas: number;
}

interface Comida {
  id: string;
  nombre: string;
  kcal: number;
}

interface EstadisticasPaciente {
  comidasMasPopulares: ComidaPopularDto[];
  cumplimientoCaloricoDiario: CumplimientoDiarioDto[];
  diasConMasComidas: RankingDiasDto[];
}

interface RankingDiasDto {
  fecha: string;
  comidasRegistradas: number;
}

export default function PacienteDetallePage() {
  const { id } = useParams();
  const [rol, setRol] = useState<string | null>(null);
  const [paciente, setPaciente] = useState<any | null>(null);
  const [edad, setEdad] = useState<number | null>(null);
  const [comidas, setComidas] = useState<Comida[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [comidasRegistradas, setComidasRegistradas] = useState([]);
  const [form, setForm] = useState({
    calorias: 0,
    grasas: 0,
    carbohidratos: 0,
    proteinas: 0,
  });
  // TOMAR ESTADISTICAS DEL PACIENTE
  const [progreso, setProgreso] = useState<EstadisticasPaciente | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      setRol(decoded.role);
    }
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

  const calcularEdad = (fecha: string) => {
    const birthDate = new Date(fecha);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const fetchComidasRegistradas = async () => {
    try {
      const res = await fetch(`${environment.API}/api/Pacientes/${id}/comidas`);
      if (!res.ok) throw new Error("Error al cargar comidas registradas");
      const data = await res.json();
      setComidasRegistradas(data);
    } catch {
      alert("No se pudieron cargar las comidas registradas del paciente");
    }
  };

  const fetchPaciente = async () => {
    try {
      const res = await fetch(`${environment.API}/api/Pacientes/paciente/${id}`);
      if (!res.ok) throw new Error("Error al cargar paciente");
      const data = await res.json();
      setPaciente(data);
      setEdad(calcularEdad(data.paciente.fechaNacimiento));
      setForm({
        calorias: data.paciente.calorias || 0,
        grasas: data.paciente.grasas || 0,
        carbohidratos: data.paciente.carbohidratos || 0,
        proteinas: data.paciente.proteinas || 0,
      });
    } catch (err) {
      alert("No se pudo cargar la información del paciente");
    }
  };

  const fetchComidasPaciente = async () => {
    try {
      const res = await fetch(`${environment.API}/api/Pacientes/comidas/${id}`);
      if (!res.ok) throw new Error("Error al cargar comidas");
      const data = await res.json();
      setComidas(data);
    } catch {
      alert("No se pudieron cargar las comidas del paciente");
    }
  };

  const fetchProgreso = async () => {
    try {
      const res = await fetch(`${environment.API}/api/Pacientes/estadisticas/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      console.log(data)
      setProgreso(data);
    } catch {
      console.error("Error al cargar progreso del paciente");
    }
  };

  const handleVincularComidas = async (comidasIds: string[]) => {
  try {
    for (const comidaId of comidasIds) {
      const res = await fetch(`${environment.API}/api/Pacientes/agregar-comida/${id}/${comidaId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Error al vincular comida");
    }

    await fetchComidasPaciente();
    setMostrarModal(false);
  } catch {
    alert("Error al vincular las comidas");
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleGuardar = async () => {
    try {
      const res = await fetch(`${environment.API}/api/Pacientes/editar-valores-nutricionales/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      alert("Información actualizada");
      setModoEdicion(false);
      fetchPaciente(); // refrescar paciente actualizado
    } catch {
      alert("Error al guardar");
    }
  };

  const handleCancelar = () => {
    if (paciente) {
      setForm({
        calorias: paciente.calorias,
        grasas: paciente.paciente.grasas,
        carbohidratos: paciente.paciente.porcentajeCarbohidratos,
        proteinas: paciente.paciente.porcentajeProteinas,
      });
    }
    setModoEdicion(false);
  };

  useEffect(() => {
    if (id) {
      fetchPaciente();
      fetchComidasPaciente();
      fetchProgreso();
      // fetchComidasRegistradas();
    }
  }, [id]);

  useEffect(() => {
  if (mostrarModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [mostrarModal]);

  if (!paciente) return <div className="p-4">Cargando datos del paciente...</div>;

  return (
    <>
      <div className="py-10 font-[Montserrat]">
          <h1 className="text-2xl font-bold mb-6">Información del Paciente</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-neutral-100 dark:bg-neutral-100/10 p-4 rounded-lg shadow"><p className="text-sm text-gray-400">Nombre</p><p className="text-lg font-semibold">{paciente.nombre}</p></div>
            <div className="bg-neutral-100 dark:bg-neutral-100/10 p-4 rounded-lg shadow"><p className="text-sm text-gray-400">Email</p><p className="text-lg font-semibold">{paciente.email}</p></div>
            <div className="bg-neutral-100 dark:bg-neutral-100/10 p-4 rounded-lg shadow"><p className="text-sm text-gray-400">Edad</p><p className="text-lg font-semibold">{edad} años</p></div>
            <div className="bg-neutral-100 dark:bg-neutral-100/10 p-4 rounded-lg shadow"><p className="text-sm text-gray-400">Peso</p><p className="text-lg font-semibold">{paciente.paciente.peso} kg</p></div>
            <div className="bg-neutral-100 dark:bg-neutral-100/10 p-4 rounded-lg shadow"><p className="text-sm text-gray-400">Altura</p><p className="text-lg font-semibold">{paciente.paciente.altura} cm</p></div>
            <div className="bg-neutral-100 dark:bg-neutral-100/10 p-4 rounded-lg shadow"><p className="text-sm text-gray-400">Sexo</p><p className="text-lg font-semibold">{paciente.paciente.sexo}</p></div>
          </div>

          <div className="bg-green-100 dark:bg-green-800 p-4 rounded-md mb-8">
            <h2 className="text-xl font-semibold mb-3">🔬 Recomendaciones nutricionales</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {["calorias", "grasas", "carbohidratos", "proteinas"].map((field) => (
                <div key={field}>
                  <label className="text-sm block mb-1 capitalize">{field} {field === 'calorias' ? '' : '(%)'}</label>
                  <input
                    name={field}
                    type="number"
                    value={(form as any)[field]}
                    onChange={handleChange}
                    disabled={!modoEdicion}
                    className="w-full border border-green-200 dark:border-green-700 rounded-md p-2"
                  />
                </div>
              ))}
            </div>
            {rol === "nutricionista" && (
              <div className="mt-4 space-x-2">
                {modoEdicion ? (
                  <>
                    <button onClick={handleGuardar} className="bg-green-500 px-4 py-1 rounded-md">Guardar</button>
                    <button onClick={handleCancelar} className="bg-gray-500 px-4 py-1 rounded-md text-white">Cancelar</button>
                  </>
                ) : (
                  <button onClick={() => setModoEdicion(true)} className="bg-blue-500 px-4 py-1 rounded-md text-white">Editar</button>
                )}
              </div>
            )}
          </div>

          <div className="mb-6">
            <div className="w-full flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold w-fit">Comidas asignadas</h2>
              <button
                onClick={() => setMostrarModal(true)}
                className="bg-green-500 text-black font-semibold px-4 py-2 rounded hover:bg-green-600"
              >
                Vincular nueva comida
              </button>

              {mostrarModal && (
                <SeleccionarComidaModal
                  onClose={() => setMostrarModal(false)}
                  onVincular={handleVincularComidas}
                  comidasVinculadas={comidas.map((c) => c.id)}
                />
              )}
            </div>
            <ul className="space-y-2">
              {comidas.length > 0 ? comidas.map((comida) => (
                <li key={comida.id} className="border border-neutral-200 dark:border-neutral-200/10 p-3 rounded-md bg-neutral-100 dark:bg-neutral-100/10">
                  <span className="font-semibold">{comida.nombre}</span> — {comida.kcal} kcal
                </li>
              )) : (
                <p className="text-gray-400">No hay comidas asignadas aún.</p>
              )}
            </ul>
          </div>
          {/* <div className="mb-6 mt-10">
            <h2 className="text-xl font-semibold mb-3">📋 Comidas registradas por el paciente</h2>
              <ul className="space-y-2">
                {comidasRegistradas.length > 0 ? comidasRegistradas.map((comida: any) => (
                  <li key={comida.id} className="border border-gray-600 p-3 rounded-md bg-gray-800">
                    <p className="font-semibold">{comida.nombre}</p>
                    <p>{comida.caloriasTotales} kcal — {new Date(comida.fecha).toLocaleDateString()}</p>
                  </li>
                )) : (
                  <p className="text-gray-400">Este paciente aún no registró comidas.</p>
                )}
            </ul>
          </div> */}
      </div>
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-6">Progreso del paciente</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gráfico de cumplimiento calórico diario */}
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

          {/* Gráfico de comidas más registradas */}
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Comidas más registradas (últimos 7 días)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={progreso?.comidasMasPopulares}>
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
          {/* <ResponsiveContainer width="100%" height={300}>
            <BarChart data={progreso?.diasConMasComidas}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad" fill="#10b981" name="Cantidad" />
            </BarChart>
          </ResponsiveContainer> */}
        </div>
      </div>
    </>
  );
}
