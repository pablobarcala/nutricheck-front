// pacienteService.js


export const buscarPacientePorNombreAPI = async (nombre, apiUrl) => {
  const response = await fetch(`${apiUrl}/api/Pacientes/buscar?nombre=${encodeURIComponent(nombre)}`);
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  return await response.json();
};
0
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