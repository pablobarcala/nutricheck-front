import { jwtDecode } from 'jwt-decode';

// Obtener token del localStorage
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Guardar token en localStorage
export const setToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

// Eliminar token del localStorage
export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

// Verificar si el token está expirado
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    return true;
  }
};

// Obtener datos del usuario desde el token
export const getUserFromToken = () => {
  const token = getToken();
  
  if (!token || isTokenExpired(token)) {
    return null;
  }
  
  try {
    const decodedToken = jwtDecode(token);
    return {
      id: decodedToken.id,
      email: decodedToken.email,
      rol: decodedToken.rol,
      nombre: decodedToken.nombre,
    };
  } catch (error) {
    return null;
  }
};

// Verificar si el usuario está autenticado
export const isAuthenticated = () => {
  const token = getToken();
  return token && !isTokenExpired(token);
};

// Obtener el rol del usuario
export const getUserRole = () => {
  const user = getUserFromToken();
  return user ? user.rol : null;
};

// Función para logout
export const logout = () => {
  removeToken();
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};

// Hook personalizado para usar en componentes
export const useAuth = () => {
  const user = getUserFromToken();
  
  return {
    user,
    isAuthenticated: !!user,
    role: user?.rol,
    logout,
  };
};