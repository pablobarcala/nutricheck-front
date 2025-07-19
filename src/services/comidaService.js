export const registrarComidaAPI = async (comidaData, token, apiUrl) => {
    const body = {
        fecha: comidaData.selectedDay,
        horario: comidaData.horarioSeleccionado,
        comidaId: comidaData.comidaSeleccionada.id,
        nombre: comidaData.comidaSeleccionada.nombre,
        kcal: comidaData.comidaSeleccionada.kcal
    }

    const response = await fetch(`${apiUrl}/api/Pacientes/registrar-comida`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { success: true, data: body };
}

export const validateComidaData = (comidaSeleccionada, horarioSeleccionado, selectedDay) => {
    if (!comidaSeleccionada || !horarioSeleccionado || !selectedDay) {
        return { isValid: false, error: 'Faltan datos requeridos' };
    }
    
    if (!comidaSeleccionada.id || !comidaSeleccionada.nombre) {
        return { isValid: false, error: 'Datos de comida inválidos' };
    }
    
    return { isValid: true };
};

export const updateComidasDelDia = (prev, selectedDay, newComida) => {
    return {
        ...prev,
        [selectedDay]: [...(prev[selectedDay] || []), newComida]
    };
};