"use client";

import { useState } from "react";

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

    const [listaComidas, setListaComidas] = useState<any[]>([]); // Agregado `any[]` para evitar error de tipo

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
            }

            // Calcular kcal aunque haya campos vacíos (tratarlos como 0)
            const hidratos = updated.hidratos === "" ? 0 : updated.hidratos;
            const proteinas = updated.proteinas === "" ? 0 : updated.proteinas;
            const grasas = updated.grasas === "" ? 0 : updated.grasas;

            updated.kcal = hidratos * 4 + proteinas * 4 + grasas * 9;

            return updated
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setListaComidas(prev => [...prev, comida]);
        setMostrarFormulario(false);
        setComida({ nombre: "", hidratos: "", proteinas: "", grasas: "", kcal: "" });
    };

    return (
        <div className="w-full min-h-screen bg-black text-white p-6">
            <div className="max-w-4xl mx-auto">
                {/* Título centrado y botón a la derecha */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-[#4AFF50]">Comidas</h1>
                    <button
                        className="cursor-pointer bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded transition"
                        onClick={() => setMostrarFormulario(!mostrarFormulario)}
                    >
                        {mostrarFormulario ? "Cancelar" : "Cargar comida"}
                    </button>
                </div>

                {/* Formulario para cargar comida */}
                {mostrarFormulario && (
                    <form
                        onSubmit={handleSubmit}
                        className="bg-neutral-900 border border-neutral-700 shadow-md rounded p-6 flex flex-col gap-4 mb-6"
                    >
                        <div className="flex flex-col gap-2">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                placeholder="Nombre del plato"
                                value={comida.nombre}
                                onChange={handleChange}
                                className="bg-black border border-neutral-700 text-white p-2 rounded"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="hidratos">Hidratos de carbono (g)</label>
                            <input
                                type="number"
                                id="hidratos"
                                name="hidratos"
                                placeholder="Hidratos de carbono (g)"
                                value={comida.hidratos}
                                onChange={handleChange}
                                className="bg-black border border-neutral-700 text-white p-2 rounded"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="proteinas">Proteínas (g)</label>
                            <input
                                type="number"
                                name="proteinas"
                                placeholder="Proteínas (g)"
                                value={comida.proteinas}
                                onChange={handleChange}
                                className="bg-black border border-neutral-700 text-white p-2 rounded"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="grasas">Grasas (g)</label>
                            <input
                                type="number"
                                name="grasas"
                                placeholder="Grasas (g)"
                                value={comida.grasas}
                                onChange={handleChange}
                                className="bg-black border border-neutral-700 text-white p-2 rounded"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="kcal">Total kcal</label>
                            <input
                                type="number"
                                name="kcal"
                                placeholder="Total kcal"
                                value={comida.kcal}
                                onChange={handleChange}
                                className="bg-black border border-neutral-700 text-white p-2 rounded"
                                readOnly
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
                        >
                            Guardar comida
                        </button>
                    </form>
                )}

                {/* Lista de comidas cargadas en cuadrícula */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {listaComidas.map((item, index) => (
                        <div
                            key={index}
                            className="bg-neutral-900 border border-neutral-700 p-4 rounded shadow"
                        >
                            <h2 className="text-lg font-semibold text-green-400">
                                {item.nombre}
                            </h2>
                            <p className="text-white">Kcal: {item.kcal}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
