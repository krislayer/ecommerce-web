import { LiquidGlassCard } from "@/components/liquid-glass-card";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative z-10 fade-in">
      <LiquidGlassCard className="p-10">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-adaptive-primary">
          Contáctanos
        </h1>

        <div className="space-y-6">
          <p className="text-lg text-adaptive-secondary">
            Estamos aquí para ayudarte. Escríbenos o visítanos en nuestra tienda física.
          </p>

          <div className="glass-secondary p-6">
            <h2 className="text-2xl font-bold mb-4 text-adaptive-primary">
              Información de Contacto
            </h2>
            <ul className="space-y-3 text-adaptive-secondary">
              <li className="flex items-center gap-3">
                <span className="text-2xl">📱</span>
                <span>WhatsApp: +502 5012-3456</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">📧</span>
                <span>Email: info@quechulito.com</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <span>Ciudad de Guatemala, Zona 10</span>
              </li>
            </ul>
          </div>

          <div className="glass-secondary p-6">
            <h2 className="text-2xl font-bold mb-4 text-adaptive-primary">
              Horarios de Atención
            </h2>
            <ul className="space-y-2 text-adaptive-secondary">
              <li>Lunes a Viernes: 9:00 AM - 7:00 PM</li>
              <li>Sábados: 9:00 AM - 6:00 PM</li>
              <li>Domingos: 10:00 AM - 4:00 PM</li>
            </ul>
          </div>

          <div className="glass-secondary p-6">
            <h2 className="text-2xl font-bold mb-4 text-adaptive-primary">
              Síguenos en Redes Sociales
            </h2>
            <div className="flex gap-4 text-adaptive-secondary">
              <a href="#" className="hover:text-adaptive-primary transition-colors">Facebook</a>
              <a href="#" className="hover:text-adaptive-primary transition-colors">Instagram</a>
              <a href="#" className="hover:text-adaptive-primary transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </LiquidGlassCard>
    </div>
  );
}

