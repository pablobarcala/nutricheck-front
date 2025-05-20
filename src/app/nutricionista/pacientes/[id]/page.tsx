"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import SeleccionarComidaModal from "@/components/Modales/ModalSeleccionComidas";
import { environment } from "@/environment/environment";

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
  calorias: number;
}

export default function PacienteDetallePage() {
  const { id } = useParams();
  const [rol, setRol] = useState<string | null>(null);
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [edad, setEdad] = useState<number | null>(null);
  const [comidas, setComidas] = useState<Comida[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [form, setForm] = useState({
    calorias: 0,
    porcentajeGrasas: 0,
    porcentajeCarbohidratos: 0,
    porcentajeProteinas: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      setRol(decoded.role);
    }
  }, []);

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
      setForm({
        calorias: data.calorias || 0,
        porcentajeGrasas: data.porcentajeGrasas || 0,
        porcentajeCarbohidratos: data.porcentajeCarbohidratos || 0,
        porcentajeProteinas: data.porcentajeProteinas || 0,
      });
    } catch (err) {
      alert("No se pudo cargar la información del paciente");
    }
  };

  const fetchComidasPaciente = async () => {
    try {
      const res = await fetch(`/api/Pacientes/${id}/comidas`);
      if (!res.ok) throw new Error("Error al cargar comidas");
      const data = await res.json();
      setComidas(data);
    } catch {
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
      if (!res.ok) throw new Error();
      fetchComidasPaciente();
      setMostrarModal(false);
    } catch {
      alert("Error al vincular la comida");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleGuardar = async () => {
    try {
      const res = await fetch(`${environment.API}/api/Pacientes/${id}/macros`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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
        porcentajeGrasas: paciente.porcentajeGrasas,
        porcentajeCarbohidratos: paciente.porcentajeCarbohidratos,
        porcentajeProteinas: paciente.porcentajeProteinas,
      });
    }
    setModoEdicion(false);
  };

  useEffect(() => {
    if (id) {
      fetchPaciente();
      fetchComidasPaciente();
    }
  }, [id]);

  if (!paciente) return <div className="p-4 text-white">Cargando datos del paciente...</div>;

  return (
    <div className="p-4 text-white font-[Montserrat]">
      <h1 className="text-2xl font-bold mb-6">Información del Paciente</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-600 p-4 rounded-lg shadow"><p className="text-sm text-gray-400">Nombre</p><p className="text-lg font-semibold">{paciente.nombre}</p></div>
        <div className="bg-gray-600 p-4 rounded-lg shadow"><p className="text-sm text-gray-400">Email</p><p className="text-lg font-semibold">{paciente.email}</p></div>
        <div className="bg-gray-600 p-4 rounded-lg shadow"><p className="text-sm text-gray-400">Edad</p><p className="text-lg font-semibold">{edad} años</p></div>
        <div className="bg-gray-600 p-4 rounded-lg shadow"><p className="text-sm text-gray-400">Peso</p><p className="text-lg font-semibold">{paciente.peso} kg</p></div>
        <div className="bg-gray-600 p-4 rounded-lg shadow"><p className="text-sm text-gray-400">Altura</p><p className="text-lg font-semibold">{paciente.altura} cm</p></div>
        <div className="bg-gray-600 p-4 rounded-lg shadow"><p className="text-sm text-gray-400">Sexo</p><p className="text-lg font-semibold">{paciente.sexo}</p></div>
      </div>

      <div className="bg-gray-700 p-4 rounded-md mb-8">
        <h2 className="text-xl font-semibold mb-3">🔬 Recomendaciones nutricionales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {["calorias", "porcentajeGrasas", "porcentajeCarbohidratos", "porcentajeProteinas"].map((field) => (
            <div key={field}>
              <label className="text-sm block mb-1 capitalize">{field.replace("porcentaje", "% ").replace("calorias", "Calorías")}</label>
              <input
                name={field}
                type="number"
                value={(form as any)[field]}
                onChange={handleChange}
                disabled={!modoEdicion}
                className="w-full bg-black border border-white rounded-md p-2"
              />
            </div>
          ))}
        </div>
        {rol === "nutricionista" && (
          <div className="mt-4 space-x-2">
            {modoEdicion ? (
              <>
                <button onClick={handleGuardar} className="bg-green-500 px-4 py-1 rounded-md">Guardar</button>
                <button onClick={handleCancelar} className="bg-gray-500 px-4 py-1 rounded-md">Cancelar</button>
              </>
            ) : (
              <button onClick={() => setModoEdicion(true)} className="bg-blue-500 px-4 py-1 rounded-md">Editar</button>
            )}
          </div>
        )}
      </div>

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
