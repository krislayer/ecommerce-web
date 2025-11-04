import { Phone, Mail, MapPin } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen mac-bg-grouped">
      <div className="max-w-4xl mx-auto px-mac-md py-mac-xl mac-fade-in">
        {/* Header */}
        <div className="mac-card text-center mb-mac-lg">
          <h1 className="mac-text-large-title mac-text-primary mb-mac-md">
            Sobre Nosotros
          </h1>
          <p className="mac-text-title-3 mac-text-secondary">
            ¡Qué Chulito! es tu tienda de moda y estilo en Guatemala
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-mac-lg">
          <div className="mac-card mac-scale-in">
            <h2 className="mac-text-title-2 mac-text-primary mb-mac-md">
              Nuestra Misión
            </h2>
            <p className="mac-text-body mac-text-secondary">
              Hacer la moda accesible para todos en Guatemala, ofreciendo 
              productos de calidad a precios justos con un servicio excepcional.
            </p>
          </div>

          <div className="mac-card mac-scale-in" style={{ animationDelay: '0.1s' }}>
            <h2 className="mac-text-title-2 mac-text-primary mb-mac-md">
              Contáctanos
            </h2>
            <ul className="space-y-mac-md mac-text-body mac-text-secondary">
              <li className="flex items-center gap-mac-sm">
                <Phone className="w-5 h-5 mac-text-secondary" />
                WhatsApp: +502 5012-3456
              </li>
              <li className="flex items-center gap-mac-sm">
                <Mail className="w-5 h-5 mac-text-secondary" />
                Email: info@quechulito.com
              </li>
              <li className="flex items-center gap-mac-sm">
                <MapPin className="w-5 h-5 mac-text-secondary" />
                Ciudad de Guatemala, Zona 10
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
