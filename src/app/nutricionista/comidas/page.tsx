"use client";

import { useEffect, useState } from "react";
import { environment } from "@/environment/environment";

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

    useEffect(() => {
        const fetchComidas = async () => {
            try {
                const response = await fetch(environment.API+"/api/Comidas/comidas-de-nutricionista", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Error al cargar las comidas");
                }

                const data = await response.json();
                setListaComidas(data);
            } catch (error) {
                console.error("Error al cargar las comidas:", error);
            }
        };

        fetchComidas();
    }, [])

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("https://localhost:7147/api/Comidas/crear", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(comida),
            })

            if(response.ok) {
                alert("Comida guardada correctamente.");
            } else {
                const errorData = await response.text();
                alert(`Error al guardar la comida: ${errorData}`);
            }
        } catch (error) {
            console.error("Error al guardar la comida:", error);
            alert("Error al guardar la comida. Inténtalo de nuevo.");
        }

        setListaComidas(prev => [...prev, comida]);
        setMostrarFormulario(false);
        setComida({ nombre: "", hidratos: "", proteinas: "", grasas: "", kcal: "" });
    };

    return (
        <div className="w-full min-h-screen py-10">
            {/* Título centrado y botón a la derecha */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Comidas</h1>
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
                    className="bg-neutral-100 dark:bg-neutral-100/10 border border-neutral-200 dark:border-neutral-200/10 shadow-md rounded p-6 flex flex-col gap-4 mb-6"
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
                            className="bg-neutral-200 dark:bg-neutral-200/10 border border-neutral-300 dark:border-neutral-300/10 p-2 rounded focus-within:outline-none"
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
                            className="bg-neutral-200 dark:bg-neutral-200/10 border border-neutral-300 dark:border-neutral-300/10 p-2 rounded focus-within:outline-none"
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
                            className="bg-neutral-200 dark:bg-neutral-200/10 border border-neutral-300 dark:border-neutral-300/10 p-2 rounded focus-within:outline-none"
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
                            className="bg-neutral-200 dark:bg-neutral-200/10 border border-neutral-300 dark:border-neutral-300/10 p-2 rounded focus-within:outline-none"
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
                            className="bg-neutral-200 dark:bg-neutral-200/10 border border-neutral-300 dark:border-neutral-300/10 p-2 rounded focus-within:outline-none"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                {listaComidas.map((item, index) => (
                    <div
                        key={index}
                        className="bg-neutral-100 dark:bg-neutral-100/10 border border-neutral-200 dark:border-neutral-200/10 p-4 rounded shadow"
                    >
                        <h2 className="text-lg font-semibold text-green-700">
                            {item.nombre}
                        </h2>
                        <p>Kcal: {item.kcal}</p>
                    </div>
                ))}
            </div>
            {/* <div className="max-w-4xl mx-auto">
            </div> */}
        </div>
    );
}
