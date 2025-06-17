"use client"
import { useEffect, useState } from "react"

export default function CardPaciente({ paciente }: any) {
    const [comidas, setComidas] = useState<any>({
        desayuno: [],
        almuerzo: [],
        merienda: [],
        cena: [],
    });

    useEffect(() => {
        const nuevoEstado: {
            desayuno: any[],
            almuerzo: any[],
            merienda: any[],
            cena: any[],
        } = {
            desayuno: [],
            almuerzo: [],
            merienda: [],
            cena: []
        };

        const tipos: Array<"desayuno" | "almuerzo" | "merienda" | "cena"> = ["desayuno", "almuerzo", "merienda", "cena"];

        paciente.comidas.forEach((comida: any) => {
        if (tipos.includes(comida.type)) {
            nuevoEstado[comida.type as "desayuno" | "almuerzo" | "merienda" | "cena"].push(comida);
        }
        });

        setComidas(nuevoEstado)
    }, [paciente]);

    const tiposComida = [
        { key: "desayuno", label: "Desayuno" },
        { key: "almuerzo", label: "Almuerzo" },
        { key: "merienda", label: "Merienda" },
        { key: "cena", label: "Cena" },
    ];

    return(
        <div className="bg-neutral-100 dark:bg-neutral-100/10 px-4 py-2 rounded-lg flex flex-col gap-4 items-start">
            <p className="font-bold">{paciente.nombre}</p>
            <div className="w-full flex gap-2 items-start">
                {tiposComida.map(({ key, label }) => (
                    <div key={key} className="flex flex-col items-center gap-2 w-[25%]">
                        <p className="font-bold">{label}</p>
                        <div className="flex flex-col w-full gap-2">
                            {comidas[key].length > 0 ? (
                                comidas[key].map((comida: any, i: number) => (
                                    <p key={i} className="text-center bg-neutral-300 dark:bg-neutral-300/10 rounded-md p-2">
                                        {comida.title}
                                    </p>
                                ))
                            ) : (
                                <p className="text-center text-sm text-gray-400 italic">Sin comidas</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}