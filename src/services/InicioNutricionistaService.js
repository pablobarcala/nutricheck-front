// src/services/inicioNutricionistaService.js

// Trae el nombre del nutricionista autenticado
export const obtenerNombreNutricionistaAPI = async (token, apiUrl) => {
  const response = await fetch(`${apiUrl}/api/Nutricionistas/perfil`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  const data = await response.json();
  return data.nombre;
};

// Trae las comidas cargadas por los pacientes para una fecha dada
export const obtenerComidasDelDiaAPI = async (fecha, token, apiUrl) => {
  const response = await fetch(`${apiUrl}/api/Comidas/por-fecha?fecha=${fecha}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  return await response.json();
};

// Evalúa si hay comidas en el día o no
export const procesarComidasDelDia = (comidas) => {
  if (!comidas || comidas.length === 0) {
    return "No hay comidas registradas para el día seleccionado";
  }
  return comidas;
};
