"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import { environment } from "@/environment/environment";

interface Props {
  onClose: () => void;
  onImportSuccess: () => void;
}

interface ComidaImportada {
  nombre: string;
  hidratos: number;
  proteinas: number;
  grasas: number;
  kcal: number;
}

export default function ModalImportarComidas({ onClose, onImportSuccess }: Props) {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [preview, setPreview] = useState<ComidaImportada[]>([]);

  const handleArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setArchivo(file);
      procesarArchivo(file);
    }
  };

  const procesarArchivo = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json<any>(sheet);

      const comidas: ComidaImportada[] = json.map((row: any) => {
        const hidratos = Number(row.hidratos || 0);
        const proteinas = Number(row.proteinas || 0);
        const grasas = Number(row.grasas || 0);
        return {
          nombre: row.nombre || "Sin nombre",
          hidratos,
          proteinas,
          grasas,
          kcal: hidratos * 4 + proteinas * 4 + grasas * 9,
        };
      });

      setPreview(comidas);
    };

    reader.readAsBinaryString(file);
  };

  const handleGuardar = async () => {
    try {
      const response = await fetch(`${environment.API}/api/Comidas/crear-multiples`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(preview),
      });

      if (!response.ok) throw new Error("Error al guardar comidas");
      alert("Comidas importadas con éxito.");
      onImportSuccess();
      onClose();
    } catch (err) {
      alert("Error al guardar comidas");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-lg relative">
        <h2 className="text-neutral-900 text-xl font-bold mb-4">📥 Importar comidas desde Excel</h2>

        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleArchivo}
          className="mb-4 text-neutral-900"
        />

        {preview.length > 0 && (
          <div className="overflow-auto max-h-64 border border-gray-300 rounded shadow">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-green-100 text-green-900 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 border-b border-green-300">Nombre</th>
                  <th className="px-4 py-3 border-b border-green-300">Hidratos</th>
                  <th className="px-4 py-3 border-b border-green-300">Proteínas</th>
                  <th className="px-4 py-3 border-b border-green-300">Grasas</th>
                  <th className="px-4 py-3 border-b border-green-300">Kcal</th>
                </tr>
              </thead>
              <tbody>
                {preview.map((comida, i) => (
                  <tr
                    key={i}
                    className={`${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-green-50 transition text-black`}
                  >
                    <td className="px-4 py-2 border-b border-gray-200">{comida.nombre}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{comida.hidratos}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{comida.proteinas}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{comida.grasas}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{comida.kcal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-700"
            disabled={preview.length === 0}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
