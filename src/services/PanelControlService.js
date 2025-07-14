// PanelControlService.js

export const getPromedioRendimientoAPI = async (token, apiUrl) => {
  const res = await fetch(`${apiUrl}/api/Panel/promedio-rendimiento`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return await res.json();
};

export const getPacientesBajoCumplimientoAPI = async (token, apiUrl) => {
  const res = await fetch(`${apiUrl}/api/Panel/bajo-cumplimiento`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return await res.json();
};

export const getProgresoCaloricoDiarioAPI = async (token, apiUrl) => {
  const res = await fetch(`${apiUrl}/api/Panel/progreso-diario`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return await res.json();
};

export const getComidasPopularesAPI = async (token, apiUrl) => {
  const res = await fetch(`${apiUrl}/api/Panel/comidas-populares`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return await res.json();
};

export const getDistribucionActividadAPI = async (token, apiUrl) => {
  const res = await fetch(`${apiUrl}/api/Panel/nivel-actividad`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return await res.json();
};

export const getPacientesConstantesAPI = async (token, apiUrl) => {
  const res = await fetch(`${apiUrl}/api/Panel/pacientes-constantes`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return await res.json();
};

export const getPacientesAusentesAPI = async (token, apiUrl) => {
  const res = await fetch(`${apiUrl}/api/Panel/pacientes-ausentes`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return await res.json();
};
