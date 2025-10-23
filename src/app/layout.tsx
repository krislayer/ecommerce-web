import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
      <body className={`${geistSans.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
