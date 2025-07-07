"use client"

import React from 'react';
import { CheckCircle, Users, Calendar, BarChart3, Shield, ArrowRight, Play, Star } from 'lucide-react';
import Link from 'next/link';

export default function NutriCheckLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="p-2 w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="143" height="143" viewBox="0 0 143 143" fill="none">
                  <path d="M74.4912 29.5057L77.0175 25.8234L69.647 20.7648L67.1207 24.453C63.1763 30.2028 62.4792 35.6606 63.2716 40.1949C64.0283 44.5683 66.1197 47.7501 67.1326 49.2158L67.1505 49.2456C68.0681 50.5684 69.0572 52.0043 69.4206 54.0361C69.7602 55.9428 69.6172 58.922 66.9896 63.2418L64.6659 67.0611L72.3045 71.7086L74.6282 67.8893C78.227 61.9667 78.9897 56.8068 78.2211 52.4751C77.512 48.483 75.5577 45.6826 74.6103 44.3181L74.4792 44.1334C73.6868 42.9834 72.5011 41.0946 72.0721 38.6636C71.6788 36.3876 71.8933 33.3011 74.4912 29.5057ZM24.2743 83.4286V83.4405H17.8751C17.0926 83.4405 16.3178 83.5946 15.5949 83.8941C14.872 84.1935 14.2152 84.6324 13.6619 85.1857C13.1086 85.739 12.6697 86.3958 12.3703 87.1187C12.0709 87.8416 11.9167 88.6164 11.9167 89.3988C11.9167 90.1813 12.0709 90.9561 12.3703 91.679C12.6697 92.4019 13.1086 93.0587 13.6619 93.612C14.2152 94.1653 14.872 94.6042 15.5949 94.9036C16.3178 95.2031 17.0926 95.3572 17.8751 95.3572H24.2743C24.2806 103.254 27.4222 110.826 33.0085 116.408C38.5949 121.99 46.1689 125.125 54.066 125.125H89.3751C97.2722 125.125 104.846 121.99 110.433 116.408C116.019 110.826 119.16 103.254 119.167 95.3572H125.125C126.705 95.3572 128.221 94.7294 129.338 93.612C130.456 92.4946 131.083 90.9791 131.083 89.3988C131.083 87.8186 130.456 86.3031 129.338 85.1857C128.221 84.0683 126.705 83.4405 125.125 83.4405H119.167V83.4286H24.2743ZM48.4711 35.0946L45.9448 38.7828C44.1275 41.4283 44.0262 43.4899 44.2824 44.9437C44.5625 46.5584 45.3549 47.8395 45.9329 48.6736L46.0401 48.8226C46.767 49.8713 48.3698 52.1652 48.9537 55.4363C49.5853 59.0113 48.9299 63.1941 46.0818 67.8893L43.7581 71.7026L36.1195 67.0611L38.4432 63.2477C40.3261 60.1494 40.3559 58.1533 40.1533 56.9915C39.915 55.6985 39.2893 54.775 38.5862 53.7621C37.0346 51.5866 35.9734 49.1004 35.476 46.475C34.8325 42.763 35.4164 38.33 38.5743 33.7242L41.1066 30.0419L48.4711 35.0946ZM103.008 38.7828L105.534 35.0946L98.1636 30.0419L95.6373 33.7242C92.4794 38.33 91.8895 42.763 92.539 46.475C93.1586 50.0321 94.8508 52.6121 95.6492 53.7621C96.3523 54.775 96.9779 55.6985 97.2103 56.9974C97.4129 58.1533 97.389 60.1553 95.5002 63.2418L93.1765 67.0611L100.821 71.7086L103.145 67.8893C105.993 63.1941 106.648 59.0113 106.011 55.4363C105.544 53.0424 104.548 50.7828 103.097 48.8226L102.996 48.6736C102.183 47.564 101.62 46.2915 101.345 44.9437C101.089 43.4899 101.19 41.4283 103.008 38.7828Z" fill="white"/>
                </svg>
              </div>
              <h1 className="ml-3 text-2xl font-bold text-gray-900">Nutri
                <span className='text-green-600'>Check</span></h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors">Características</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-green-600 transition-colors">Cómo funciona</a>
              <a href="#testimonials" className="text-gray-600 hover:text-green-600 transition-colors">Testimonios</a>
              <a href="#contact" className="text-gray-600 hover:text-green-600 transition-colors">Contacto</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href={"/login"} className="cursor-pointer hover:underline text-green-600 hover:text-green-700 font-medium">Iniciar Sesión</Link>
              <Link href={"/registro"} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Comenzar Gratis
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Revoluciona tu práctica nutricional con 
                <span className="text-green-600"> NutriCheck</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                La plataforma integral que conecta nutricionistas y pacientes para un seguimiento nutricional más efectivo y personalizado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={"/login"} className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors flex items-center">
                  Comenzar Ahora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                {/* <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors flex items-center">
                  <Play className="mr-2 w-5 h-5" />
                  Ver Demo
                </button> */}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <img src="imagenes/home-nutricionista.png" alt="Vista previa" className='rounded-xl'/>
              {/* <div className="h-80 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-green-700 font-medium">Vista previa del sistema</p>
                  <p className="text-green-600 text-sm mt-2">Aquí puedes agregar capturas de pantalla o videos del sistema</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Características principales
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              NutriCheck ofrece herramientas poderosas tanto para nutricionistas como para pacientes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-green-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Para Nutricionistas</h3>
              <p className="text-gray-600 mb-4">
                Carga y gestiona planes alimentarios personalizados para cada paciente de forma eficiente.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Gestión de pacientes</span>
                </li>
                <li className="flex items-center text-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Planes alimentarios</span>
                </li>
                <li className="flex items-center text-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Seguimiento en tiempo real</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Para Pacientes</h3>
              <p className="text-gray-600 mb-4">
                Registra tus comidas diarias y mantén un seguimiento detallado de tu progreso nutricional.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Registro diario de comidas</span>
                </li>
                <li className="flex items-center text-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Selección por horarios</span>
                </li>
                <li className="flex items-center text-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Historial completo</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Reportes y Análisis</h3>
              <p className="text-gray-600 mb-4">
                Obtén insights valiosos sobre los hábitos alimentarios y el progreso de tus pacientes.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Estadísticas detalladas</span>
                </li>
                <li className="flex items-center text-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Gráficos interactivos</span>
                </li>
                <li className="flex items-center text-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Exportación de datos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Cómo funciona NutriCheck
            </h2>
            <p className="text-xl text-gray-600">
              Un proceso simple y efectivo para transformar la gestión nutricional
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    El nutricionista crea el plan
                  </h3>
                  <p className="text-gray-600">
                    Los profesionales cargan las comidas y crean planes personalizados para cada paciente según sus necesidades específicas.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    El paciente registra sus comidas
                  </h3>
                  <p className="text-gray-600">
                    Los pacientes acceden a su perfil y seleccionan qué comieron, cuándo y en qué momento del día de manera sencilla.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Seguimiento y análisis
                  </h3>
                  <p className="text-gray-600">
                    Ambos usuarios pueden ver el progreso, estadísticas y realizar ajustes para optimizar los resultados nutricionales.
                  </p>
                </div>
              </div>
            </div>

            {/* <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="h-96 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-green-700 font-medium text-lg">Video demostrativo</p>
                  <p className="text-green-600 text-sm mt-2">Aquí puedes incrustar un video explicativo del sistema</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* System Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              El sistema en acción
            </h2>
            <p className="text-xl text-gray-600">
              Descubre la interfaz intuitiva de NutriCheck
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="h-64 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-green-700 font-medium">Panel del Nutricionista</p>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dashboard Profesional</h3>
              <p className="text-gray-600">
                Interfaz completa para gestionar pacientes, crear planes alimentarios y monitorear el progreso.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="h-64 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-green-700 font-medium">App del Paciente</p>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Interfaz Amigable</h3>
              <p className="text-gray-600">
                Diseño simple y accesible para que los pacientes registren sus comidas sin complicaciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-xl text-gray-600">
              Testimonios reales de nutricionistas y pacientes satisfechos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "NutriCheck ha revolucionado mi práctica. Ahora puedo hacer un seguimiento mucho más efectivo de mis pacientes."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  DM
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Dra. María González</p>
                  <p className="text-sm text-gray-600">Nutricionista Clínica</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "Finalmente encontré una herramienta que me ayuda a mantener mi dieta al día. Es súper fácil de usar."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  JR
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Juan Rodríguez</p>
                  <p className="text-sm text-gray-600">Paciente</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "La comunicación con mis pacientes mejoró notablemente. Los reportes son muy útiles para los ajustes."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  LC
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Lic. Carlos Mendoza</p>
                  <p className="text-sm text-gray-600">Nutricionista Deportivo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            ¿Listo para transformar tu práctica nutricional?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Únete a cientos de nutricionistas y pacientes que ya están mejorando sus resultados con NutriCheck.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/login"} className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
              Comenzar Gratis
            </Link>
            {/* <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
              Contactar Ventas
            </button> */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">N</span>
                </div>
                <h3 className="ml-2 text-xl font-bold">NutriCheck</h3>
              </div>
              <p className="text-gray-400">
                La plataforma que conecta nutricionistas y pacientes para un mejor seguimiento nutricional.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Características</a></li>
                <li><a href="#" className="hover:text-white">Precios</a></li>
                <li><a href="#" className="hover:text-white">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Documentación</a></li>
                <li><a href="#" className="hover:text-white">Ayuda</a></li>
                <li><a href="#" className="hover:text-white">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Acerca de</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Carreras</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NutriCheck. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}