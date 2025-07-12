// src/services/PacienteService.js

// Obtener comidas sugeridas por el nutricionista para el paciente
export const getComidasSugeridasAPI = async (token, apiUrl) => {
  const response = await fetch(`${apiUrl}/api/Comidas/sugeridas`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  return await response.json();
};

// Registrar una comida seleccionada por el paciente
export const registrarComidaPacienteAPI = async (tipo, comidaId, fecha, token, apiUrl) => {
  const response = await fetch(`${apiUrl}/api/Comidas/registrar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ tipo, comidaId, fecha })
  });

  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  return await response.json();
};

// Obtener progreso calórico del paciente
export const getProgresoCaloricoAPI = async (fecha, token, apiUrl) => {
  const response = await fetch(`${apiUrl}/api/Progreso/calorias?fecha=${fecha}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  return await response.json();
};
