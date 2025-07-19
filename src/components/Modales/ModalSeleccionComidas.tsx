"use client";

import { environment } from "@/environment/environment";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Comida {
  id: string;
  nombre: string;
  kcal: number;
  yaVinculada?: boolean;
}

interface Props {
  onClose: () => void;
  onVincular: (comidasIds: string[]) => void;
  comidasVinculadas: string[]; // para evitar mostrar las comidas ya asignadas
  diaSeleccionado?: string
}

export default function SeleccionarComidaModal({ 
  onClose, 
  onVincular, 
  comidasVinculadas,
  diaSeleccionado = "" 
}: Props) {
  const [comidas, setComidas] = useState<Comida[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [comidasSeleccionadas, setComidasSeleccionadas] = useState<Comida[]>([]);
  const [tabActiva, setTabActiva] = useState<"vinculadas" | "disponibles">("disponibles")

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
        const comidasMarcadas = data.map((comida: any) => ({
          ...comida,
          yaVinculada: comidasVinculadas.includes(comida.id)
        }))

        setComidas(comidasMarcadas);
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

  const comidasFiltradas = comidas
  .filter((c) => c.nombre.toLowerCase().includes(busqueda.toLowerCase()))
  .filter((c) => tabActiva === "disponibles" ? !c.yaVinculada : c.yaVinculada)

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full h-[90vh] flex flex-col p-6 text-black overflow-hidden">
        <h2 className="text-2xl font-bold mb-4">
          {diaSeleccionado ? `Comidas para ${diaSeleccionado}` : "Vincular comidas"}
        </h2>

        {/* Pestañas */}
        <div className="flex border-b mb-4">
          <button
            className={`cursor-pointer px-4 py-2 font-medium ${tabActiva === "disponibles" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500"}`}
            onClick={() => setTabActiva("disponibles")}
          >
            Comidas disponibles
          </button>
          <button
            className={`cursor-pointer px-4 py-2 font-medium ${tabActiva === "vinculadas" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500"}`}
            onClick={() => setTabActiva("vinculadas")}
          >
            Ya vinculadas
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 scroll-custom">
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
            <ul className="space-y-2 mb-4">
              {comidasFiltradas.map((comida) => (
                <li
                  key={comida.id}
                  className="border rounded-md p-2 flex justify-between items-center hover:bg-green-50"
                >
                  <div>
                    <p className="font-semibold">{comida.nombre}</p>
                    <p className="text-sm text-gray-600">{comida.kcal} kcal</p>
                    {comida.yaVinculada && (
                      <span className="text-xs text-green-600">(Ya vinculada)</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleSeleccionar(comida)}
                    className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Seleccionar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No se encontraron comidas {tabActiva === "disponibles" ? "disponibles" : "vinculadas"}.</p>
          )}
        </div>

        {/* Lista preliminar */}
        {comidasSeleccionadas.length > 0 && (
          <div className="my-2 border-t py-2">
            <h3 className="text-md font-semibold mb-2">Comidas seleccionadas:</h3>
            <ul className="space-y-2">
              {comidasSeleccionadas.map((comida) => (
                <li
                  key={comida.id}
                  className="flex justify-between items-center border p-2 rounded bg-green-100"
                >
                  <span>
                    {comida.nombre}
                    {comida.yaVinculada && (
                      <span className="text-xs text-green-600 ml-2">(Ya vinculada)</span>
                    )}
                  </span>
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
        <div className="flex justify-end gap-4 pt-4">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 hover:underline"
          >
            Cancelar
          </button>
          <button
            onClick={() => onVincular(comidasSeleccionadas.map((c) => c.id))}
            className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded"
            disabled={comidasSeleccionadas.length === 0}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
