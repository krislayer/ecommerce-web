import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { baseUrl } from "@/lib/seo/base-url";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "¡Qué Chulito! - Ecommerce Guatemala",
    template: "%s | ¡Qué Chulito!",
  },
  description: "Moda y estilo para toda la familia. Entregas y pickup disponibles.",
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
    <html lang="es" className={GeistSans.variable} suppressHydrationWarning>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
