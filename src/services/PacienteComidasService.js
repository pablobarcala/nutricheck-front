// src/services/PacienteComidasService.js

export const getComidasDelDiaAPI = async (fecha, token, apiUrl) => {
  const response = await fetch(`${apiUrl}/api/Comidas/dia?fecha=${fecha}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  return await response.json();
};
