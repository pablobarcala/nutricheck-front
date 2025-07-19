import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Nueva configuración para TailwindCSS
  experimental: {
    optimizePackageImports: [
      '@tailwindcss/typography',
      '@tailwindcss/forms'
    ],
  },
  
  // Configuración de Webpack
  webpack: (config) => {
    // Excluir el compilador de TailwindCSS del bundle
    config.externals = [...(config.externals || []), '@tailwindcss/oxide'];
    
    return config;
  },
};

export default nextConfig;