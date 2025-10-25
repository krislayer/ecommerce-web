import { Phone, Mail, MapPin } from "lucide-react";
import { LiquidGlassCard } from "@/components/liquid-glass-card";
import { AdvancedLiquidGlassCard } from "@/components/advanced-liquid-glass-card";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative z-10 fade-in">
      <AdvancedLiquidGlassCard 
        variant="hero"
        className="mb-4"
      >
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            Contáctanos
          </h1>
          <p className="text-white/90">
            Estamos aquí para ayudarte. Escríbenos o visítanos en nuestra tienda física.
          </p>
        </div>
      </AdvancedLiquidGlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AdvancedLiquidGlassCard variant="hero">
          <h2 className="text-2xl font-bold mb-4 text-adaptive-primary">
            Información de Contacto
          </h2>
          <ul className="space-y-3 text-adaptive-secondary">
            <li className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-adaptive-primary" />
              <span>WhatsApp: +502 5012-3456</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-adaptive-primary" />
              <span>Email: info@quechulito.com</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-adaptive-primary" />
              <span>Ciudad de Guatemala, Zona 10</span>
            </li>
          </ul>
        </LiquidGlassCard>

        <AdvancedLiquidGlassCard variant="hero">
          <h2 className="text-2xl font-bold mb-4 text-adaptive-primary">
            Horarios de Atención
          </h2>
          <ul className="space-y-2 text-adaptive-secondary">
            <li>Lunes a Viernes: 9:00 AM - 7:00 PM</li>
            <li>Sábados: 9:00 AM - 6:00 PM</li>
            <li>Domingos: 10:00 AM - 4:00 PM</li>
          </ul>
        </LiquidGlassCard>
      </div>

      <AdvancedLiquidGlassCard variant="hero" className="mt-3">
        <h2 className="text-2xl font-bold mb-4 text-adaptive-primary">
          Síguenos en Redes Sociales
        </h2>
        <div className="flex gap-4 text-adaptive-secondary">
          <a href="#" className="hover:text-adaptive-primary transition-colors glass-button px-4 py-2">
            <span className="relative z-10">Facebook</span>
          </a>
          <a href="#" className="hover:text-adaptive-primary transition-colors glass-button px-4 py-2">
            <span className="relative z-10">Instagram</span>
          </a>
          <a href="#" className="hover:text-adaptive-primary transition-colors glass-button px-4 py-2">
            <span className="relative z-10">Twitter</span>
          </a>
        </div>
      </LiquidGlassCard>
    </div>
  );
}

