export const crearComidaAPI = async (comidaData, token, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/api/Comidas/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(comidaData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al crear la comida: ${errorText}`);
    }

    return { success: true, data: comidaData };
  } catch (error) {
    // Evitar duplicar "Error al crear la comida: ..."
    throw new Error(error.message);
  }
};
