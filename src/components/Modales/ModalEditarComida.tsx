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
    <div className="bg-white text-black p-6 rounded-2xl w-full max-w-md shadow-lg space-y-5 font-[Montserrat]">
      <h2 className="text-2xl font-bold text-neutral-800">Editar Comida</h2>

      {(["nombre", "hidratos", "proteinas", "grasas"] as const).map((field) => (
        <div key={field} className="flex flex-col gap-1">
          <label className="text-sm font-semibold capitalize text-neutral-700">
            {field}
          </label>
          <input
            name={field}
            type={field === "nombre" ? "text" : "number"}
            value={form[field]}
            onChange={handleChange}
            className="p-2 rounded-lg border border-gray-300 bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        </div>
      ))}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-neutral-700">Kcal</label>
        <input
          type="number"
          value={form.kcal}
          readOnly
          disabled
          className="p-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed"
        />
      </div>

      <div className="flex justify-between mt-6 gap-2">
        <button
          onClick={handleGuardar}
          disabled={loading}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Guardar
        </button>
        <button
          onClick={handleEliminar}
          disabled={loading}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Eliminar
        </button>
        <button
          onClick={onClose}
          className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
);
}
