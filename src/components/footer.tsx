import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { AdvancedLiquidGlassCard } from "./advanced-liquid-glass-card";

export function Footer() {
  return (
    <footer className="mx-4 my-8 mt-16">
      <AdvancedLiquidGlassCard variant="hero">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-white mb-4">
                ¡Qué Chulito!
              </h3>
              <p className="text-sm text-white/90">
                Moda y estilo para toda la familia en Guatemala
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Enlaces</h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li>
                  <Link href="/catalogo" className="hover:text-white hover-link">
                    Catálogo
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white hover-link">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white hover-link">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  WhatsApp: +502 5012-3456
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email: info@quechulito.com
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Ciudad de Guatemala
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/70">
            <p>&copy; {new Date().getFullYear()} ¡Qué Chulito! Todos los derechos reservados.</p>
          </div>
        </div>
      </AdvancedLiquidGlassCard>
    </footer>
  );
}
