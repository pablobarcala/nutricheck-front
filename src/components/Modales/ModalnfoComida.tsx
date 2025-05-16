interface Comida {
  id: string;
  nombre: string;
  caloriasTotales: number;
  descripcion?: string;
}

export default function ModalComidaPaciente({
  comida,
  onClose,
}: {
  comida: Comida;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">{comida.nombre}</h2>
        <p><strong>Calorías:</strong> {comida.caloriasTotales} kcal</p>
        {comida.descripcion && (
          <p><strong>Descripción:</strong> {comida.descripcion}</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
