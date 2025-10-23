import { LiquidGlassCard } from "@/components/liquid-glass-card";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative z-10 fade-in">
      <LiquidGlassCard className="p-10">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-adaptive-primary">
          Sobre Nosotros
        </h1>

        <div className="space-y-6">
          <p className="text-lg text-adaptive-secondary">
            ¡Qué Chulito! es tu tienda de moda y estilo en Guatemala. 
            Ofrecemos ropa y accesorios para toda la familia con el mejor 
            precio y calidad.
          </p>

          <div className="glass-secondary p-6">
            <h2 className="text-2xl font-bold mb-3 text-adaptive-primary">
              Nuestra Misión
            </h2>
            <p className="text-adaptive-secondary">
              Hacer la moda accesible para todos en Guatemala, ofreciendo 
              productos de calidad a precios justos con un servicio excepcional.
            </p>
          </div>

          <div className="glass-secondary p-6">
            <h2 className="text-2xl font-bold mb-3 text-adaptive-primary">
              Contáctanos
            </h2>
            <ul className="space-y-2 text-adaptive-secondary">
              <li>📱 WhatsApp: +502 5012-3456</li>
              <li>📧 Email: info@quechulito.com</li>
              <li>📍 Ciudad de Guatemala, Zona 10</li>
            </ul>
          </div>
        </div>
      </LiquidGlassCard>
    </div>
  );
}
