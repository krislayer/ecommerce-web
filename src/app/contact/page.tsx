import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen mac-bg-grouped">
      <div className="max-w-4xl mx-auto px-mac-md py-mac-xl mac-fade-in">
        {/* Header */}
        <div className="mac-card text-center mb-mac-lg">
          <h1 className="mac-text-large-title mac-text-primary mb-mac-md">
            Contáctanos
          </h1>
          <p className="mac-text-title-3 mac-text-secondary">
            Estamos aquí para ayudarte. Escríbenos o visítanos en nuestra tienda física.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-mac-lg mb-mac-lg">
          <div className="mac-card mac-scale-in">
            <h2 className="mac-text-title-2 mac-text-primary mb-mac-md">
              Información de Contacto
            </h2>
            <ul className="space-y-mac-md mac-text-body mac-text-secondary">
              <li className="flex items-center gap-mac-md">
                <Phone className="w-6 h-6 mac-text-secondary" />
                <span>WhatsApp: +502 5012-3456</span>
              </li>
              <li className="flex items-center gap-mac-md">
                <Mail className="w-6 h-6 mac-text-secondary" />
                <span>Email: info@quechulito.com</span>
              </li>
              <li className="flex items-center gap-mac-md">
                <MapPin className="w-6 h-6 mac-text-secondary" />
                <span>Ciudad de Guatemala, Zona 10</span>
              </li>
            </ul>
          </div>

          <div className="mac-card mac-scale-in" style={{ animationDelay: '0.1s' }}>
            <h2 className="mac-text-title-2 mac-text-primary mb-mac-md">
              Horarios de Atención
            </h2>
            <ul className="space-y-mac-sm mac-text-body mac-text-secondary">
              <li>Lunes a Viernes: 9:00 AM - 7:00 PM</li>
              <li>Sábados: 9:00 AM - 6:00 PM</li>
              <li>Domingos: 10:00 AM - 4:00 PM</li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="mac-card">
          <h2 className="mac-text-title-2 mac-text-primary mb-mac-md">
            Síguenos en Redes Sociales
          </h2>
          <div className="flex flex-wrap gap-mac-md">
            <a 
              href="#" 
              className="mac-button-secondary"
            >
              Facebook
            </a>
            <a 
              href="#" 
              className="mac-button-secondary"
            >
              Instagram
            </a>
            <a 
              href="#" 
              className="mac-button-secondary"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
