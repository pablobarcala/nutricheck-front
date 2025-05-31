"use client";

import { environment } from "@/environment/environment";
import { useEffect, useState } from "react";

interface Comida {
  id: string;
  nombre: string;
  calorias: number;
}

interface Props {
  onClose: () => void;
  onVincular: (comidaId: string) => void;
}

export default function SeleccionarComidaModal({ onClose, onVincular }: Props) {
  const [comidas, setComidas] = useState<[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComidas = async () => {
      try {
        const res = await fetch(`${environment.API}/api/Comidas/comidas-de-nutricionista`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Error al obtener las comidas");

        const data = await res.json();
        setComidas(data);
      } catch (error) {
        console.error(error);
        alert("No se pudieron cargar las comidas");
      } finally {
        setLoading(false);
      }
    };

    fetchComidas();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full text-black">
        <h2 className="text-xl font-bold mb-4">Seleccionar Comida</h2>

        {loading ? (
          <p>Cargando comidas...</p>
        ) : comidas.length > 0 ? (
          <ul className="space-y-2 max-h-60 overflow-y-auto">
            {comidas.map((comida: any) => (
              <li key={comida.id} className="border rounded-md p-2 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{comida.nombre}</p>
                  <p className="text-sm text-gray-600">{comida.kcal} kcal</p>
                </div>
                <button
                  onClick={() => onVincular(comida.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Vincular
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay comidas cargadas aún.</p>
        )}

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-600 hover:underline"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
