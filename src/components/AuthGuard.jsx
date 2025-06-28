'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthAndRedirect();
  }, [pathname]);

  const checkAuthAndRedirect = () => {
    try {
      // Obtener token del localStorage
      const token = localStorage.getItem('token');
      
      // Si no hay token, redirigir a login
      if (!token) {
        if (pathname !== '/login' && !isPublicRoute(pathname)) {
          router.push('/login');
          return;
        }
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      // Decodificar y validar token
      const decodedToken = jwtDecode(token);

      console.log('Token decodificado:', decodedToken);

      const currentTime = Date.now() / 1000;

      // Si el token está expirado, limpiar localStorage y redirigir a login
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        router.push('/login');
        return;
      }

      // Token válido - verificar rutas según rol
      const userRole = decodedToken.role;
      
      // Si está en login y ya está autenticado, redirigir según rol
      if (pathname === '/login') {
        redirectByRole(userRole);
        return;
      }

      // Verificar permisos de acceso según rol
      if (pathname.startsWith('/nutricionista') && userRole !== 'nutricionista') {
        redirectByRole(userRole);
        return;
      }

      if (pathname.startsWith('/paciente') && userRole !== 'paciente') {
        redirectByRole(userRole);
        return;
      }

      // Si está en raíz o dashboard, redirigir según rol
      if (pathname === '/' || pathname === '/dashboard') {
        redirectByRole(userRole);
        return;
      }

      // Todo está bien, usuario autenticado y en ruta correcta
      setIsAuthenticated(true);
      setIsLoading(false);

    } catch (error) {
      console.error('Error al validar token:', error);
      localStorage.removeItem('token');
      router.push('/login');
    }
  };

  const redirectByRole = (role) => {
    switch (role) {
      case 'nutricionista':
        router.push('/nutricionista/inicio');
        break;
      case 'paciente':
        router.push('/paciente/inicio');
        break;
      default:
        router.push('/login');
    }
  };

  const isPublicRoute = (path) => {
    const publicRoutes = ['/login', '/registro', '/'];
    return publicRoutes.some(route => path === route);
  };

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-700">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-300 mx-auto"></div>
          {/* <p className="mt-4 text-white">Verificando autenticación...</p> */}
        </div>
      </div>
    );
  }

  // Si es una ruta pública o está autenticado, mostrar contenido
  if (isPublicRoute(pathname) || isAuthenticated) {
    return children;
  }

  // Por defecto, no mostrar nada (se está redirigiendo)
  return null;
};

export default AuthGuard;