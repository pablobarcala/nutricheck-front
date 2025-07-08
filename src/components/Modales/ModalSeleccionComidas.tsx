"use client";

import { environment } from "@/environment/environment";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Comida {
  id: string;
  nombre: string;
  kcal: number;
}

interface Props {
  onClose: () => void;
  onVincular: (comidasIds: string[]) => void;
  comidasVinculadas: string[]; // para evitar mostrar las comidas ya asignadas
}

export default function SeleccionarComidaModal({ onClose, onVincular, comidasVinculadas }: Props) {
  const [comidas, setComidas] = useState<Comida[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [comidasSeleccionadas, setComidasSeleccionadas] = useState<Comida[]>([]);

  useEffect(() => {
  const fetchComidas = async () => {
    try {
      const res = await fetch(`${environment.API}/api/Comidas/comidas-de-nutricionista`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Error al obtener las comidas");

      const data = await res.json();

      // Excluir comidas ya vinculadas
      const filtradas = data.filter(
        (comida: any) => !comidasVinculadas.includes(comida.id)
      );

      setComidas(filtradas);
    } catch (error) {
      console.error(error);
      alert("No se pudieron cargar las comidas");
    } finally {
      setLoading(false);
    }
  };

  fetchComidas();
}, [comidasVinculadas]);

  const handleSeleccionar = (comida: Comida) => {
    if (!comidasSeleccionadas.find((c) => c.id === comida.id)) {
      setComidasSeleccionadas((prev) => [...prev, comida]);
    }
  };

  const handleEliminar = (id: string) => {
    setComidasSeleccionadas((prev) => prev.filter((c) => c.id !== id));
  };

  const comidasFiltradas = comidas.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
  <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
    <div className="bg-white rounded-lg p-6 max-w-lg w-full text-black max-h-[90vh] overflow-y-auto transition-all duration-300 pb-6">
      <h2 className="text-xl font-bold mb-4">Vincular comidas al paciente</h2>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar comida..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />

      {/* Lista de comidas filtradas */}
      {loading ? (
        <p>Cargando comidas...</p>
      ) : comidasFiltradas.length > 0 ? (
        <ul className="space-y-2 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 rounded-md">
          {comidasFiltradas.map((comida) => (
            <li
              key={comida.id}
              className="border rounded-md p-2 flex justify-between items-center hover:bg-green-50"
            >
              <div>
                <p className="font-semibold">{comida.nombre}</p>
                <p className="text-sm text-gray-600">{comida.kcal} kcal</p>
              </div>
              <button
                onClick={() => handleSeleccionar(comida)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Seleccionar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron comidas.</p>
      )}

      {/* Lista preliminar */}
      {comidasSeleccionadas.length > 0 && (
        <div className="mb-4 mt-4">
          <h3 className="text-md font-semibold mb-2">Comidas seleccionadas:</h3>
          <ul className="space-y-2 max-h-32 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-green-100 rounded-md">
            {comidasSeleccionadas.map((comida) => (
              <li
                key={comida.id}
                className="flex justify-between items-center border p-2 rounded bg-green-100"
              >
                <span>{comida.nombre}</span>
                <button
                  onClick={() => handleEliminar(comida.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Acciones */}
      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={onClose}
          className="text-sm text-gray-600 hover:underline"
        >
          Cancelar
        </button>
        <button
          onClick={() => onVincular(comidasSeleccionadas.map((c) => c.id))}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Guardar
        </button>
      </div>
    </div>
  </div>
);
}
