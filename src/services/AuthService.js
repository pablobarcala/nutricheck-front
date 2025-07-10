// src/services/AuthService.js

export const loginAPI = async (email, password, apiUrl) => {
  const response = await fetch(`${apiUrl}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Error al iniciar sesión");
  }

  const data = await response.json();
  localStorage.setItem("token", data.token);
  return data;
};

export const registerAPI = async (usuarioData, apiUrl) => {
  const response = await fetch(`${apiUrl}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuarioData)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Error al registrarse");
  }

  const data = await response.json();
  return data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};
