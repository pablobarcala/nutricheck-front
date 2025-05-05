import { Montserrat } from "next/font/google";
import "./globals.css";
import GlobalLayout from "@/components/GlobalLayout";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "NutriCheck",
  description: "Sistema de control entre nutricionista y paciente",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${montserrat.className} antialiased`}>
        <GlobalLayout>{children}</GlobalLayout>
      </body>
    </html>
  );
}
