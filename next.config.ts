import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Nuevas configuraciones para resolver el error de lightningcss
  experimental: {
    optimizePackageImports: ['lightningcss'],
  },
  webpack: (config) => {
    // Excluir lightningcss del bundle de Webpack
    config.externals = [...(config.externals || []), 'lightningcss'];
    
    // Configuración adicional para manejo de assets
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });
    
    return config;
  },
  
  // Opcional: Configuración para manejar mejor los assets estáticos
  images: {
    domains: [], // Agrega aquí los dominios de tus imágenes si usas next/image
  },
};

export default nextConfig;