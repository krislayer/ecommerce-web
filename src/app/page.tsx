"use client";

import Link from "next/link";
import { Truck, Heart, HeadphonesIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen mac-bg-grouped">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-mac-md py-mac-2xl mac-fade-in">
        <div className="text-center mb-mac-2xl">
          <h1 className="mac-text-large-title mac-text-primary mb-mac-md">
              ¡Qué Chulito!
            </h1>
          <p className="mac-text-title-3 mac-text-secondary mb-mac-xl">
              Moda y estilo para toda la familia
            </p>
            
          <div className="flex flex-col sm:flex-row gap-mac-md justify-center items-center">
            <Link 
              href="/catalogo" 
              className="mac-button-primary"
            >
              Ver Catálogo
            </Link>
            <Link 
              href="/about" 
              className="mac-button-secondary"
            >
              Sobre Nosotros
            </Link>
          </div>
            </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-mac-lg">
          <div className="mac-card mac-scale-in">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-mac-blue/10 flex items-center justify-center mb-mac-md">
                <Truck className="mac-icon-xlarge" style={{ color: 'var(--mac-blue)' }} />
              </div>
              <h3 className="mac-text-headline mac-text-primary mb-mac-sm">
                Envío Rápido
              </h3>
              <p className="mac-text-body mac-text-secondary">
                Entrega en 24-48 horas en toda Guatemala
              </p>
            </div>
          </div>

          <div className="mac-card mac-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-mac-green/10 flex items-center justify-center mb-mac-md">
                <Heart className="mac-icon-xlarge" style={{ color: 'var(--mac-green)' }} />
              </div>
              <h3 className="mac-text-headline mac-text-primary mb-mac-sm">
                Calidad Premium
              </h3>
              <p className="mac-text-body mac-text-secondary">
                Productos seleccionados con los mejores materiales
              </p>
            </div>
          </div>

          <div className="mac-card mac-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-mac-purple/10 flex items-center justify-center mb-mac-md">
                <HeadphonesIcon className="mac-icon-xlarge" style={{ color: 'var(--mac-purple)' }} />
              </div>
              <h3 className="mac-text-headline mac-text-primary mb-mac-sm">
                Soporte 24/7
              </h3>
              <p className="mac-text-body mac-text-secondary">
                Atención al cliente disponible siempre
              </p>
              </div>
            </div>
        </div>
      </section>
    </div>
  );
}
