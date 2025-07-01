"use client";

import { useState } from "react";
import { environment } from "@/environment/environment";

interface Comida {
  id: string;
  nombre: string;
  hidratos: number;
  proteinas: number;
  grasas: number;
  kcal: number;
}

export default function ModalEditarComida({ comida, onClose, onUpdate }: {
  comida: Comida;
  onClose: () => void;
  onUpdate: () => void;
}) {
  const [form, setForm] = useState({ ...comida });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsed = value === "" ? 0 : parseFloat(value);
    const updated = { ...form, [name]: parsed };

    const kcal =
      (name === "hidratos" ? parsed : updated.hidratos) * 4 +
      (name === "proteinas" ? parsed : updated.proteinas) * 4 +
      (name === "grasas" ? parsed : updated.grasas) * 9;

    setForm({ ...updated, kcal });
  };

  const handleGuardar = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${environment.API}/api/Comidas/editar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Error al actualizar");
      
      const resultado = await res.json()

      if (resultado) {
        alert("Comida actualizada");
        onUpdate();
      } else {
        alert("No se pudo actualizar la comida")
      }
      onClose();
    } catch {
      alert("No se pudo actualizar la comida");
    }
    setLoading(false);
  };

  const handleEliminar = async () => {
    const confirmar = confirm("¿Estás seguro que deseas eliminar esta comida?");
    if (!confirmar) return;

    setLoading(true);
    try {
      const res = await fetch(`${environment.API}/api/Comidas/eliminar/${form.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Error al eliminar");
      const resultado = await res.json()

      if (resultado) {
        alert("Comida eliminada"); 
        onUpdate();
      } else {
        alert("No se pudo eliminar la comida")
      }
      onClose();
    } catch {
      alert("No se pudo eliminar la comida");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Editar comida</h2>

        {(["nombre", "hidratos", "proteinas", "grasas"] as const).map((field) => (
          <div key={field}>
            <label className="block text-sm font-semibold capitalize">
              {field}
            </label>
            <input
              name={field}
              type={field === "nombre" ? "text" : "number"}
              value={form[field]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-semibold">Kcal</label>
          <input
            type="number"
            value={form.kcal}
            readOnly
            disabled
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleGuardar}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Guardar
          </button>
          <button
            onClick={handleEliminar}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Eliminar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
