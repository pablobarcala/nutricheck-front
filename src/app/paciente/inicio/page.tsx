// app/inicio/page.tsx
"use client";
import HorizontalDatePicker from "@/components/HorizontalDatePicker";
import { environment } from "@/environment/environment";
import { format } from "date-fns";
import { useState, useEffect } from "react";

const horarios = ["Desayuno", "Almuerzo", "Merienda", "Cena"];

export default function Inicio() {
    const [modalComidasPaciente, setModalComidasPaciente] = useState(false);
    const [comidasPaciente, setComidasPaciente] = useState<any[]>([]);
    const [comidaSeleccionada, setComidaSeleccionada] = useState<any | null>(null);
    const [horarioSeleccionado, setHorarioSeleccionado] = useState("");
    const [selectedDay, setSelectedDay] = useState<string>(format(new Date, "yyyy-MM-dd"));
    const [comidasDelDia, setComidasDelDia] = useState<{ [key: string]: any[] }>({});

  useEffect(() => {
    const fetchComidas = async () => {
        try {
        const res = await fetch(`${environment.API}/api/Pacientes/comidas-registradas`, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (!res.ok) throw new Error("Error al cargar comidas");

        const data = await res.json();

        setComidasPaciente(data);

        // Filtra comidas para el día seleccionado
        const filtradas = data.filter((c: any) => c.fecha === selectedDay);

        setComidasDelDia((prev) => ({
            ...prev,
            [selectedDay]: filtradas
        }));

        } catch (error) {
        alert("No se pudieron cargar las comidas del paciente");
        }
    };

    fetchComidas();
    }, [selectedDay]);

  const fetchComidasPaciente = async () => {
    try {
      const res = await fetch(`${environment.API}/api/Pacientes/comidas`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (!res.ok) throw new Error("Error al cargar comidas");
      const data = await res.json();
      setComidasPaciente(data);
    } catch {
      alert("No se pudieron cargar las comidas del paciente");
    }
  };

  const registrarComida = async () => {
    if (!comidaSeleccionada || !horarioSeleccionado || !selectedDay) return;

    const body = {
      fecha: selectedDay,
      horario: horarioSeleccionado,
      comidaId: comidaSeleccionada.id,
      nombre: comidaSeleccionada.nombre
    };

    try {
      const res = await fetch(`${environment.API}/api/Pacientes/registrar-comida`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error();
      alert("Comida registrada con éxito");
      setModalComidasPaciente(false);
      setComidaSeleccionada(null);
      setHorarioSeleccionado("");
    } catch {
      alert("Error al registrar la comida");
    }
  };

  return (
    <div className="py-10">
      <HorizontalDatePicker
        onDateChange={(date) => setSelectedDay(format(date, "yyyy-MM-dd"))}
      />

      <div className="mt-6">
        <h2 className="text-xl font-bold">Comidas del día {selectedDay}</h2>
        {(comidasDelDia[selectedDay] || []).map((c, i) => (
          <div key={i} className="border p-2 my-2 rounded">
            <span className="font-semibold">{c.horario}:</span> {c.nombre}
          </div>
        ))}
      </div>

      {/* <button
        onClick={() => setShowModal(true)}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Agregar comida
      </button> */}

      {/* Botón para abrir el modal */}
      <button
        onClick={() => {
          fetchComidasPaciente();
          setModalComidasPaciente(true);
        }}
        className="bg-green-800 text-white px-4 py-2 rounded"
      >
        Registrar comida desde lista
      </button>

      {/* Modal */}
      {modalComidasPaciente && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h2 className="text-lg font-bold mb-4 text-black">Registrar comida</h2>

            {/* Horarios */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {horarios.map((h) => (
                <button
                  key={h}
                  onClick={() => setHorarioSeleccionado(h)}
                  className={`px-3 py-1 rounded text-black ${
                    horarioSeleccionado === h
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>

            {/* Lista de comidas */}
            <div className="max-h-60 overflow-y-auto border rounded">
              {comidasPaciente.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setComidaSeleccionada(c)}
                  className={`p-2 cursor-pointer hover:bg-green-50 border-b-slate-100 border-b-2 text-black ${
                    comidaSeleccionada?.id == c.id ? "bg-green-100" : "bg-transparent"
                  }`}
                >
                    <p className="font-bold">{c.nombre}</p>
                    <p className="text-sm">{c.kcal} kcal.</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setModalComidasPaciente(false)}
                className="text-red-500"
              >
                Cancelar
              </button>
              <button
                onClick={registrarComida}
                className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
