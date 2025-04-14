"use client";
import { useEffect, useState } from "react";
import HorizontalDatePicker from "./HorizontalDatePicker";

export default function HomeNutricionista() {
    const [saludo, setSaludo] = useState("");

    useEffect(() => {
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
                py-5
                w-full
            "
        >
            <p className="font-bold text-xl">{saludo}, Juan</p>
            <HorizontalDatePicker />
        </div>
    );
}
