// src/app/login/layout.tsx
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../../app/globals.css";

const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Iniciar sesión - NutriCheck",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${montserrat.className} bg-black text-white flex items-center justify-center min-h-screen`}>
      {children}
    </div>
    // <html lang="es">
    // </html>
  );
}
