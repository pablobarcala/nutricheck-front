"use client";
import { useEffect, useState } from "react";
import HorizontalDatePicker from "./HorizontalDatePicker";
import CardPaciente from "./CardPaciente";
import { format } from "date-fns";
import { environment } from "@/environment/environment";
import { jwtDecode, JwtPayload } from "jwt-decode";

export default function HomeNutricionista() {
    const [saludo, setSaludo] = useState("");
    const [selectedDay, setSelectedDay] = useState<string>(format(new Date, "yyyy-MM-dd"))
    const [pacientesConComidas, setPacientesConComidas] = useState<any[]>([])
    const [pacientesFiltrados, setPacientesFiltrados] = useState<any[]>([])
    const [nombre, setNombre] = useState("")

    useEffect(() => {
        const fetchComidas = async () => {
            try {
                const res = await fetch(`${environment.API}/api/Nutricionistas/comidas-mis-pacientes`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (!res.ok) throw new Error("Error al cargar comidas");
        
                const data = await res.json();

                // console.log(data);
        
                setPacientesConComidas(data);
    
            } catch (error) {
                alert("No se pudieron cargar las comidas del paciente");
            }
        };

        fetchComidas()
    }, [])

    useEffect(() => {
        if (pacientesConComidas.length === 0) {
            setPacientesFiltrados([]);
            return;
        }

        const pacientesFiltradosPorFecha = pacientesConComidas.map(paciente => {
            const comidasDelDia = paciente.comidas.filter((comida: any) => comida.fecha === selectedDay)

            return {
                ...paciente,
                comidas: comidasDelDia
            }
        }).filter(paciente => paciente.comidas.length > 0)

        setPacientesFiltrados(pacientesFiltradosPorFecha)
    }, [selectedDay, pacientesConComidas])

    useEffect(() => {
        const token = localStorage.getItem("token") || "";
        const decodedToken = jwtDecode<JwtPayload>(token);
        setNombre(decodedToken.nombre || "")

        const hora = new Date().getHours();
        let mensaje = "";

        if (hora < 12) {
            mensaje = "Buen día";
        } else if (hora < 19) {
            mensaje = "Buenas tardes";
        } else {
            mensaje = "Buenas noches";
        }

        setSaludo(mensaje);
    }, []);

    return (
        <div 
            className="
                flex 
                flex-col
                gap-5
                py-10
                w-full
            "
        >
            <p className="font-bold text-3xl">{saludo}, {nombre}</p>
            <HorizontalDatePicker 
                onDateChange={(date) => setSelectedDay(format(date, "yyyy-MM-dd"))}
            />
            <p className="font-bold ">Pacientes</p>
            {/* <form action="" className="w-[30%] flex items-center gap-4">
                <input 
                    type="text" 
                    className="bg-neutral-100 dark:bg-neutral-100/10 rounded-md px-4 py-2 w-full focus-within:outline-none"
                    placeholder="Buscar paciente"
                />
                <button 
                    className="bg-[#4AFF50] rounded-full p-2 flex items-center justify-center"
                    type="submit"    
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9.5 16C7.68333 16 6.146 15.3707 4.888 14.112C3.63 12.8533 3.00067 11.316 3 9.5C2.99933 7.684 3.62867 6.14667 4.888 4.888C6.14733 3.62933 7.68467 3 9.5 3C11.3153 3 12.853 3.62933 14.113 4.888C15.373 6.14667 16.002 7.684 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5633 11.8133 14.0007 10.7507 14 9.5C13.9993 8.24933 13.562 7.187 12.688 6.313C11.814 5.439 10.7513 5.00133 9.5 5C8.24867 4.99867 7.18633 5.43633 6.313 6.313C5.43967 7.18967 5.002 8.252 5 9.5C4.998 10.748 5.43567 11.8107 6.313 12.688C7.19033 13.5653 8.25267 14.0027 9.5 14Z" fill="black"/>
                    </svg>
                </button>
            </form> */}
            {pacientesFiltrados.length === 0 ? (
                <p className="text-gray-500 text-center">No hay comidas registradas para el día seleccionado</p>
            ) : (
                pacientesFiltrados.map((paciente, index) => (
                    <CardPaciente key={index} paciente={paciente} />
                ))
            )}
        </div>
    );
}
