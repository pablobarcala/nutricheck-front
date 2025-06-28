"use client"

import { environment } from '@/environment/environment';
import { Info } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Tipos TypeScript para los datos
interface CumplimientoDiarioDto {
  fecha: string;
  porcentajeCumplido: number;
}

interface ComidaPopularDto {
  nombre: string;
  cantidad: number;
}

interface EstadisticasGlobalesDto {
  promedioCumplimientoCalorico: number;
  pacientesConBajoCumplimiento: number;
  cumplimientoCaloricoPorDia: CumplimientoDiarioDto[];
  comidasMasPopulares: ComidaPopularDto[];
}

const EstadisticasDashboard = () => {
  const [estadisticas, setEstadisticas] = useState<EstadisticasGlobalesDto | null>(null);
  const [loading, setLoading] = useState(true);

  const InfoTooltip = ({ text, className = "" }: { text: string; className?: string }) => (
    <div className={`relative inline-block group ${className}`}>
      <Info size={16} className="text-gray-400 hover:text-gray-600 cursor-help" />
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 w-64 text-center">
        {text}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
      </div>
    </div>
  );

  // Datos de ejemplo (reemplaza esto con tu llamada real al backend)
  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        const response = await fetch(`${environment.API}/api/Nutricionistas/estadisticas-globales`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();
        
        setEstadisticas(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar estadísticas:', error);
        setLoading(false);
      }
    };

    fetchEstadisticas();
  }, []);

  // Formatear fecha para el gráfico
  const formatearFecha = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-AR', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Preparar datos para el gráfico de línea
  const datosCumplimiento = estadisticas?.cumplimientoCaloricoPorDia.map(item => ({
    fecha: formatearFecha(item.fecha),
    cumplimiento: item.porcentajeCumplido
  })) || [];

  // Preparar datos para el gráfico de barras
  const datosComidasPopulares = estadisticas?.comidasMasPopulares || [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Cargando estadísticas...</div>
      </div>
    );
  }

  if (!estadisticas) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-red-600">Error al cargar las estadísticas</div>
      </div>
    );
  }

  return (
    <div className="py-10 min-h-screen">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold text-neutral mb-8">Dashboard de Estadísticas Globales</h1>
        
        {/* Tarjetas con métricas resumen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
            <div className='flex items-center gap-2 mb-2'>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-neutral-400">Promedio de Cumplimiento Calórico</h3>
                <InfoTooltip 
                    text='Porcentaje promedio de cumplimiento calórico de todos los pacientes en los últimos 7 días.'
                />
            </div>
            <div className="text-3xl font-bold text-blue-600">
              {estadisticas.promedioCumplimientoCalorico.toFixed(1)}%
            </div>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
            <div className='flex items-center gap-2 mb-2'>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-neutral-400">Pacientes con Bajo Cumplimiento</h3>
                <InfoTooltip 
                    text='Número de pacientes que no han cumplido con el 80% de su objetivo calórico en al menos 3 de los últimos 7 días.' 
                />
            </div>
            <div className="text-3xl font-bold text-red-600">
              {estadisticas.pacientesConBajoCumplimiento}
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* Gráfico de Cumplimiento Calórico por Día */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
            <div className='flex items-center gap-2 mb-4'>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-400">
                Cumplimiento Calórico por Día
                </h2>
                <InfoTooltip 
                    text='Muestra el porcentaje de cumplimiento calórico de los pacientes en los últimos 7 días.' 
                />
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={datosCumplimiento}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="fecha" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  domain={[0, 100]}
                  tick={{ fontSize: 12 }}
                  label={{ value: '% Cumplimiento', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Cumplimiento']}
                  labelStyle={{ color: '#374151' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="cumplimiento" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, stroke: '#3B82F6', strokeWidth: 2 }}
                  name="Cumplimiento (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Comidas Más Populares */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
            <div className='flex items-center gap-2 mb-4'>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-400">
                Comidas Más Populares
                </h2>
                <InfoTooltip 
                    text='Muestra las comidas más registradas por los pacientes en los últimos 7 días.'
                />
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart 
                data={datosComidasPopulares}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="nombre" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 11 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  label={{ value: 'Cantidad', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  formatter={(value) => [`${value}`, 'Registros']}
                  labelStyle={{ color: '#374151' }}
                />
                <Legend />
                <Bar 
                  dataKey="cantidad" 
                  fill="#10B981"
                  name="Cantidad de Registros"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasDashboard;