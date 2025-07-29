"use client"
import { useEffect, useState } from "react"

export default function CardPaciente({ paciente }: any) {
    const [comidas, setComidas] = useState<any>({
        desayuno: [],
        almuerzo: [],
        merienda: [],
        cena: [],
    });

    // Función para clasificar comida por horario
    const clasificarPorHorario = (horario: string): "desayuno" | "almuerzo" | "merienda" | "cena" => {
        if (!horario) return "desayuno";
        
        const horarioLower = horario.toLowerCase().trim();
        
        // Clasificar por palabras clave directas
        if (horarioLower.includes("desayuno") || horarioLower.includes("mañana")) {
            return "desayuno";
        } else if (horarioLower.includes("almuerzo") || horarioLower.includes("mediodía") || horarioLower.includes("mediodia")) {
            return "almuerzo";
        } else if (horarioLower.includes("merienda") || horarioLower.includes("tarde")) {
            return "merienda";
        } else if (horarioLower.includes("cena") || horarioLower.includes("noche")) {
            return "cena";
        }
        
        // Si es una hora en formato HH:MM, clasificar por rango horario
        const horaMatch = horarioLower.match(/(\d{1,2}):(\d{2})/);
        if (horaMatch) {
            const hora = parseInt(horaMatch[1]);
            
            if (hora >= 6 && hora < 11) {
                return "desayuno";
            } else if (hora >= 11 && hora < 16) {
                return "almuerzo";
            } else if (hora >= 16 && hora < 20) {
                return "merienda";
            } else {
                return "cena";
            }
        }
        
        // Si es solo un número (hora en formato 24h)
        const soloHora = parseInt(horarioLower);
        if (!isNaN(soloHora)) {
            if (soloHora >= 6 && soloHora < 11) {
                return "desayuno";
            } else if (soloHora >= 11 && soloHora < 16) {
                return "almuerzo";
            } else if (soloHora >= 16 && soloHora < 20) {
                return "merienda";
            } else {
                return "cena";
            }
        }
        
        // Default
        return "desayuno";
    };

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

        // Verificar que paciente y comidas existan
        if (paciente?.comidas && Array.isArray(paciente.comidas)) {
            paciente.comidas.forEach((comida: any) => {
                // Clasificar la comida basándose en el horario
                const tipoComida = clasificarPorHorario(comida.horario);
                nuevoEstado[tipoComida].push(comida);
            });
        }

        setComidas(nuevoEstado);
    }, [paciente]);

    const tiposComida = [
        { key: "desayuno", label: "Desayuno" },
        { key: "almuerzo", label: "Almuerzo" },
        { key: "merienda", label: "Merienda" },
        { key: "cena", label: "Cena" },
    ];

    return(
        <div className="bg-neutral-200/50 dark:bg-neutral-100/10 px-4 py-2 rounded-lg flex flex-col gap-4 items-start">
            <p className="font-bold text-xl">{paciente.nombre || "Paciente sin nombre"}</p>
            <div className="w-full flex flex-col md:flex-row md:gap-2 gap-6 items-start">
                {tiposComida.map(({ key, label }) => (
                    <div key={key} className="flex flex-col md:items-center items-start gap-2 w-full md:w-[25%]">
                        <p className="font-semibold">{label}</p>
                        <div className="flex flex-col w-full gap-2">
                            {comidas[key].length > 0 ? (
                                comidas[key].map((comida: any, i: number) => (
                                    <div key={i} className="text-center bg-neutral-300 dark:bg-neutral-300/10 rounded-md p-2">
                                        <p className="font-medium">{comida.title || "Sin nombre"}</p>
                                        {/* <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                            {comida.horario || "Sin horario"}
                                        </p> */}
                                    </div>
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