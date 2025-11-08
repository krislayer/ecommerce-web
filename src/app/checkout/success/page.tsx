"use client";

import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen mac-bg-grouped flex items-center justify-center px-mac-md">
      <div className="max-w-md w-full mac-card text-center mac-fade-in">
        {/* Ícono de éxito */}
        <div className="flex justify-center mb-mac-lg">
          <div className="w-20 h-20 rounded-full bg-[#34C759] dark:bg-[#30D158] flex items-center justify-center shadow-mac-md">
            <CheckCircle className="w-12 h-12 text-white" strokeWidth={2} />
          </div>
        </div>

        {/* Título */}
        <h1 className="mac-text-title-1 mac-text-primary mb-mac-md">
          ¡Pedido Enviado!
        </h1>

        {/* Mensaje */}
        <p className="mac-text-body mac-text-secondary mb-mac-xl">
          Tu pedido ha sido enviado exitosamente por WhatsApp. 
          Nos pondremos en contacto contigo pronto para confirmar los detalles y coordinar la entrega.
        </p>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-mac-md">
          <Link 
            href="/catalogo" 
            className="mac-button-primary flex-1"
          >
            Seguir Comprando
          </Link>
          <Link 
            href="/" 
            className="mac-button-secondary flex-1"
          >
            Volver al Inicio
          </Link>
        </div>
        
        {/* Nota sobre historial */}
        <p className="mac-text-caption-1 mac-text-tertiary mt-mac-lg">
          💡 Tu historial de pedidos está disponible en tu conversación de WhatsApp
        </p>
      </div>
    </div>
  );
}
