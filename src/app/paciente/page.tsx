"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode";
import { environment } from "@/environment/environment";

type JwtPayload = {
  email: string;
  role: string;
  exp: number;
  id: string;
};

interface Paciente {
  id: string;
  nombre: string;
  email: string;
  fechaNacimiento: string;
  peso: number;
  altura: number;
  sexo: string;
  actividad: string;
  objetivo: string;
  calorias: number;
  porcentajeGrasas: number;
  porcentajeCarbohidratos: number;
  porcentajeProteinas: number;
}

export default function PacienteVistaPage() {
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [form, setForm] = useState({
    calorias: 0,
    porcentajeGrasas: 0,
    porcentajeCarbohidratos: 0,
    porcentajeProteinas: 0,
  });
  const [rol, setRol] = useState<string | null>(null);
  const router = useRouter();

  // Obtener ID del paciente desde el token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded: JwtPayload = jwtDecode(token);
    setRol(decoded.role);

    fetch(`${environment.API}/api/Pacientes/${decoded.id}`)
      .then((res) => res.json())
      .then((data) => {
        setPaciente(data);
        setForm({
          calorias: data.calorias,
          porcentajeGrasas: data.porcentajeGrasas || 0,
          porcentajeCarbohidratos: data.porcentajeCarbohidratos || 0,
          porcentajeProteinas: data.porcentajeProteinas || 0,
        });
      })
      .catch(() => alert("Error al obtener información del paciente."));
  }, []);

  const calcularEdad = (fecha: string) => {
    const nacimiento = new Date(fecha);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const handleEditToggle = () => setModoEdicion(!modoEdicion);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleGuardar = async () => {
    try {
      const res = await fetch(`${environment.API}/api/Pacientes/${paciente?.id}/macros`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Error al guardar los datos");

      alert("Información actualizada");
      setModoEdicion(false);
    } catch (err) {
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
      setModoEdicion(false);
    }
  };

  if (!paciente) return <p className="p-4 text-white">Cargando información...</p>;

  return (
    <div className="p-4 text-white font-[Montserrat]">
      <h1 className="text-2xl font-bold mb-4">Información del Paciente</h1>

      <div className="space-y-2 mb-6">
        <p><strong>Nombre:</strong> {paciente.nombre}</p>
        <p><strong>Email:</strong> {paciente.email}</p>
        <p><strong>Edad:</strong> {calcularEdad(paciente.fechaNacimiento)} años</p>
        <p><strong>Peso:</strong> {paciente.peso} kg</p>
        <p><strong>Altura:</strong> {paciente.altura} cm</p>
        <p><strong>Sexo:</strong> {paciente.sexo}</p>
        <p><strong>Actividad física:</strong> {paciente.actividad}</p>
        <p><strong>Objetivo:</strong> {paciente.objetivo}</p>
      </div>

      <h2 className="text-xl font-semibold mb-2">Plan Nutricional</h2>
      <div className="space-y-2">
        <label>Calorías: 
          <input
            name="calorias"
            type="number"
            value={form.calorias}
            onChange={handleChange}
            disabled={!modoEdicion}
            className="ml-2 bg-black border border-white rounded-md p-1 w-20"
          />
        </label>
        <label>% Grasas:
          <input
            name="porcentajeGrasas"
            type="number"
            value={form.porcentajeGrasas}
            onChange={handleChange}
            disabled={!modoEdicion}
            className="ml-2 bg-black border border-white rounded-md p-1 w-20"
          />
        </label>
        <label>% Carbohidratos:
          <input
            name="porcentajeCarbohidratos"
            type="number"
            value={form.porcentajeCarbohidratos}
            onChange={handleChange}
            disabled={!modoEdicion}
            className="ml-2 bg-black border border-white rounded-md p-1 w-20"
          />
        </label>
        <label>% Proteínas:
          <input
            name="porcentajeProteinas"
            type="number"
            value={form.porcentajeProteinas}
            onChange={handleChange}
            disabled={!modoEdicion}
            className="ml-2 bg-black border border-white rounded-md p-1 w-20"
          />
        </label>
      </div>

      {rol === "nutricionista" && (
        <div className="mt-4 space-x-2">
          {modoEdicion ? (
            <>
              <button onClick={handleGuardar} className="bg-green-500 px-4 py-1 rounded-md">Guardar</button>
              <button onClick={handleCancelar} className="bg-gray-500 px-4 py-1 rounded-md">Cancelar</button>
            </>
          ) : (
            <button onClick={handleEditToggle} className="bg-blue-500 px-4 py-1 rounded-md">Editar</button>
          )}
        </div>
      )}

      {rol === "paciente" && (
        <button
          onClick={() => router.push("/paciente/comidas")}
          className="mt-6 bg-[#4AFF50] text-black px-4 py-2 rounded-md hover:opacity-90"
        >
          Ver mis comidas
        </button>
      )}
    </div>
  );
}
