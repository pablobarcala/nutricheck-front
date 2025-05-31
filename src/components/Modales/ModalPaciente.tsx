"use client";
import React from "react";

interface ModalPacienteProps {
  paciente: {
    nombre: string;
    email: string;
    fechaNacimiento: string;
    peso: number;
    altura: number;
    sexo: string;
    calorias: number;
  };
  edad: number;
  onClose: () => void;
  onVincular: () => void;
}

export default function ModalPaciente({ paciente, edad, onClose, onVincular }: ModalPacienteProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Información del paciente</h2>
        <p><strong>Nombre:</strong> {paciente.nombre}</p>
        <p><strong>Email:</strong> {paciente.email}</p>
        <p><strong>Edad:</strong> {edad} años</p>
        <p><strong>Peso:</strong> {paciente.peso} kg</p>
        <p><strong>Altura:</strong> {paciente.altura} cm</p>
        <p><strong>Sexo:</strong> {paciente.sexo}</p>
        <p><strong>Calorías recomendadas:</strong> {paciente.calorias} kcal</p>

        <div className="flex justify-end gap-2 pt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-200">Cancelar</button>
          <button onClick={onVincular} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Vincular
          </button>
        </div>
      </div>
    </div>
  );
}
