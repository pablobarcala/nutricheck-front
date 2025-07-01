"use client";

import { useEffect, useState } from "react";
import { environment } from "@/environment/environment";
import ModalEditarComida from "@/components/Modales/ModalEditarComida";

interface Comida {
  nombre: string;
  hidratos: number | "";
  proteinas: number | "";
  grasas: number | "";
  kcal: number | "";
}

export default function ComidasNutricionistaPage() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [comida, setComida] = useState<Comida>({
    nombre: "",
    hidratos: "",
    proteinas: "",
    grasas: "",
    kcal: ""
  });
  const [listaComidas, setListaComidas] = useState<any[]>([]);
  const [comidaSeleccionada, setComidaSeleccionada] = useState<any | null>(null);

  const fetchComidas = async () => {
    try {
      const response = await fetch(environment.API + "/api/Comidas/comidas-de-nutricionista", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Error al cargar las comidas");

      const data = await response.json();
      setListaComidas(data);
    } catch (error) {
      console.error("Error al cargar las comidas:", error);
    }
  };

  useEffect(() => {
    fetchComidas();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const numericFields: (keyof Comida)[] = ["hidratos", "proteinas", "grasas"];
    const parsedValue = numericFields.includes(name as keyof Comida)
      ? value === "" ? "" : Number(value)
      : value;

    setComida(prev => {
      const updated = {
        ...prev,
        [name]: parsedValue
      };

      const hidratos = updated.hidratos === "" ? 0 : updated.hidratos;
      const proteinas = updated.proteinas === "" ? 0 : updated.proteinas;
      const grasas = updated.grasas === "" ? 0 : updated.grasas;
      updated.kcal = hidratos * 4 + proteinas * 4 + grasas * 9;

      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(environment.API + "/api/Comidas/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(comida),
      });

      if (response.ok) {
        alert("Comida guardada correctamente.");
        fetchComidas();
      } else {
        const errorData = await response.text();
        alert(`Error al guardar la comida: ${errorData}`);
      }
    } catch (error) {
      console.error("Error al guardar la comida:", error);
      alert("Error al guardar la comida. Inténtalo de nuevo.");
    }

    setMostrarFormulario(false);
    setComida({ nombre: "", hidratos: "", proteinas: "", grasas: "", kcal: "" });
  };

  return (
    <div className="w-full min-h-screen py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Comidas</h1>
        <button
          className="cursor-pointer bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded transition"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {mostrarFormulario ? "Cancelar" : "Cargar comida"}
        </button>
      </div>

      {mostrarFormulario && (
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-100 dark:bg-neutral-100/10 border border-neutral-200 dark:border-neutral-200/10 shadow-md rounded p-6 flex flex-col gap-4 mb-6"
        >
          {["nombre", "hidratos", "proteinas", "grasas"].map((field) => (
            <div key={field} className="flex flex-col gap-2">
              <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === "nombre" ? "text" : "number"}
                name={field}
                placeholder={field}
                value={(comida as any)[field]}
                onChange={handleChange}
                className="bg-neutral-200 dark:bg-neutral-200/10 border border-neutral-300 dark:border-neutral-300/10 p-2 rounded"
                required
              />
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <label htmlFor="kcal">Total kcal</label>
            <input
              type="number"
              name="kcal"
              value={comida.kcal}
              onChange={handleChange}
              className="bg-neutral-200 dark:bg-neutral-200/10 border border-neutral-300 dark:border-neutral-300/10 p-2 rounded"
              readOnly
            />
          </div>
          <button type="submit" className="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Guardar comida
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {listaComidas.map((item, index) => (
          <div
            key={index}
            onClick={() => setComidaSeleccionada(item)}
            className="bg-neutral-100 dark:bg-neutral-100/10 border border-neutral-200 dark:border-neutral-200/10 p-4 rounded shadow cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-100/5 transition"
          >
            <h2 className="text-lg font-semibold text-green-700">{item.nombre}</h2>
            <p>Kcal: {item.kcal}</p>
          </div>
        ))}
      </div>

      {comidaSeleccionada && (
        <ModalEditarComida
          comida={comidaSeleccionada}
          onClose={() => setComidaSeleccionada(null)}
          onUpdate={() => {
            setComidaSeleccionada(null);
            fetchComidas();
          }}
        />
      )}
    </div>
  );
}
