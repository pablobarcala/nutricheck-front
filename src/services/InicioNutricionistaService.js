// src/services/InicioNutricionistaService.js

export const obtenerNombreNutricionistaAPI = async (token, apiUrl) => {
  const response = await fetch(`${apiUrl}/api/Nutricionistas/nombre`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  const data = await response.json();
  return data.nombre;
};

export const obtenerComidasDelDiaAPI = async (fecha, token, apiUrl) => {
  const response = await fetch(`${apiUrl}/api/Comidas/dia?fecha=${fecha}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  return await response.json();
};
