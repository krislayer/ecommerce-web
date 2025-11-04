import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

// Inter es la fuente más cercana a SF Pro disponible en Google Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "¡Qué Chulito! - Ecommerce Guatemala",
  description: "Moda y estilo para toda la familia. Envíos y pickup disponibles.",
  keywords: ["ropa mujer", "moda", "Guatemala", "GTQ"],
  authors: [{ name: "¡Qué Chulito!" }],
  openGraph: {
    title: "¡Qué Chulito! - Ecommerce Guatemala",
    description: "Moda y estilo para toda la familia",
    type: "website",
    locale: "es_GT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased mac-bg-grouped`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
