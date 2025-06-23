// pacienteService.js

export const agregarPacienteAPI = async (pacienteData, token, apiUrl) => {
  const response = await fetch(`${apiUrl}/api/Pacientes/agregar`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json", 
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify(pacienteData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export const buscarPacienteAPI = async (pacienteId, token, apiUrl) => {
  const response = await fetch(`${apiUrl}/api/Pacientes/${pacienteId}`, {
    method: "GET",
    headers: { 
      Authorization: `Bearer ${token}` 
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
export const buscarPacientePorNombreAPI = async (nombre, apiUrl) => {
  const response = await fetch(`${apiUrl}/api/Pacientes/buscar?nombre=${encodeURIComponent(nombre)}`);
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  return await response.json();
};

export const vincularPacienteANutricionistaAPI = async (pacienteId, token, apiUrl) => {
  const response = await fetch(`${apiUrl}/api/Nutricionistas/agregar-paciente?pacienteId=${pacienteId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: null,
  });
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  return await response.json();
};