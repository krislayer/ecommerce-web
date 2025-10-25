import { Phone, Mail, MapPin } from "lucide-react";
import { LiquidGlassCard } from "@/components/liquid-glass-card";
import { AdvancedLiquidGlassCard } from "@/components/advanced-liquid-glass-card";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative z-10 fade-in">
      <AdvancedLiquidGlassCard 
        variant="hero"
        className="mb-4"
      >
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            Sobre Nosotros
          </h1>
          <p className="text-white/90">
            ¡Qué Chulito! es tu tienda de moda y estilo en Guatemala
          </p>
        </div>
      </AdvancedLiquidGlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AdvancedLiquidGlassCard variant="hero">
          <h2 className="text-2xl font-bold mb-3 text-adaptive-primary">
            Nuestra Misión
          </h2>
          <p className="text-adaptive-secondary">
            Hacer la moda accesible para todos en Guatemala, ofreciendo 
            productos de calidad a precios justos con un servicio excepcional.
          </p>
        </LiquidGlassCard>

        <AdvancedLiquidGlassCard variant="hero">
          <h2 className="text-2xl font-bold mb-3 text-adaptive-primary">
            Contáctanos
          </h2>
          <ul className="space-y-2 text-adaptive-secondary">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-adaptive-primary" />
              WhatsApp: +502 5012-3456
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-adaptive-primary" />
              Email: info@quechulito.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-adaptive-primary" />
              Ciudad de Guatemala, Zona 10
            </li>
          </ul>
        </LiquidGlassCard>
      </div>
    </div>
  );
}
