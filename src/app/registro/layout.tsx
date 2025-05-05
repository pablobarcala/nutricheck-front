import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../../app/globals.css";

const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Registro - NutriCheck",
};

export default function RegistroLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${montserrat.className} bg-black text-white flex items-center justify-center min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
