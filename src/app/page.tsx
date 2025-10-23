import Link from "next/link";
import { LiquidGlassCard } from "@/components/liquid-glass-card";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 fade-in">
      <div className="text-center">
        <LiquidGlassCard className="p-6 sm:p-12 mb-8">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-4 text-adaptive-primary">
            ¡Qué Chulito!
          </h1>
          <p className="text-xl sm:text-2xl text-adaptive-secondary">
            Moda y estilo para toda la familia
          </p>
        </LiquidGlassCard>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/catalogo" className="glass-button px-8 py-4">
            <span className="text-adaptive-primary font-semibold">Ver Catálogo</span>
          </Link>
          <Link href="/about" className="glass-button px-8 py-4">
            <span className="text-adaptive-primary font-semibold">Sobre Nosotros</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
