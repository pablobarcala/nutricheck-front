import { Montserrat } from "next/font/google";
import "./globals.css";
import GlobalLayout from "@/components/GlobalLayout";
import { Providers } from "./providers";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "NutriCheck",
  description: "Sistema de control entre nutricionista y paciente",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {  
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased`}>
        <Providers>
          <GlobalLayout>{children}</GlobalLayout>
        </Providers>
      </body>
    </html>
  );
}
