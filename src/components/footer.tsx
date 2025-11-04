import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mac-bg-secondary border-t border-mac-separator mt-mac-2xl">
      <div className="max-w-7xl mx-auto px-mac-md py-mac-xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-mac-xl">
            <div>
            <h3 className="mac-text-title-3 mac-text-primary mb-mac-md">
                ¡Qué Chulito!
              </h3>
            <p className="mac-text-body mac-text-secondary">
                Moda y estilo para toda la familia en Guatemala
              </p>
            </div>

            <div>
            <h4 className="mac-text-headline mac-text-primary mb-mac-md">Enlaces</h4>
            <ul className="space-y-mac-sm">
                <li>
                <Link 
                  href="/catalogo" 
                  className="mac-text-body mac-text-secondary hover:mac-text-primary mac-transition-colors"
                >
                    Catálogo
                  </Link>
                </li>
                <li>
                <Link 
                  href="/about" 
                  className="mac-text-body mac-text-secondary hover:mac-text-primary mac-transition-colors"
                >
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                <Link 
                  href="/contact" 
                  className="mac-text-body mac-text-secondary hover:mac-text-primary mac-transition-colors"
                >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            <div>
            <h4 className="mac-text-headline mac-text-primary mb-mac-md">Contacto</h4>
            <ul className="space-y-mac-sm">
              <li className="flex items-center gap-mac-sm">
                <Phone className="w-4 h-4 mac-text-secondary" />
                <span className="mac-text-body mac-text-secondary">
                  WhatsApp: +502 5012-3456
                </span>
                </li>
              <li className="flex items-center gap-mac-sm">
                <Mail className="w-4 h-4 mac-text-secondary" />
                <span className="mac-text-body mac-text-secondary">
                  Email: info@quechulito.com
                </span>
                </li>
              <li className="flex items-center gap-mac-sm">
                <MapPin className="w-4 h-4 mac-text-secondary" />
                <span className="mac-text-body mac-text-secondary">
                  Ciudad de Guatemala
                </span>
                </li>
              </ul>
            </div>
          </div>

        <div className="mac-separator mt-mac-xl"></div>
        <div className="text-center mt-mac-lg">
          <p className="mac-text-caption-1 mac-text-tertiary">
            &copy; {new Date().getFullYear()} ¡Qué Chulito! Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
