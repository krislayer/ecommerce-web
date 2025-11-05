"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { ShippingService } from "@/lib/services/shipping.service";
import { Truck } from "lucide-react";

export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    shippingMethod: "pickup" as "pickup" | "local",
    address: "",
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

  // Calcular envío basado en el método seleccionado
  const getShippingCost = () => {
    if (formData.shippingMethod === "pickup") {
      return 0; // Recoger en tienda es gratis
    }
    // Para envío local, usar la lógica de envío gratis
    const shippingCalc = ShippingService.calculateShipping(subtotal);
    return shippingCalc.shippingCost;
  };

  const shippingCost = getShippingCost();
  const total = subtotal + shippingCost;
  const shippingCalculation = ShippingService.calculateShipping(subtotal);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappUrl = `https://wa.me/50250123456?text=${encodeURIComponent(
      formatWhatsAppMessage()
    )}`;
    
    window.open(whatsappUrl, "_blank");
  };

  const formatWhatsAppMessage = () => {
    const itemsText = cartItems
      .map(
        (item) =>
          `• ${item.variant.sku}\n  Cantidad: ${item.quantity}\n  Precio: Q${item.variant.price.toFixed(2)}`
      )
      .join("\n\n");

    return `🛒 *Nuevo Pedido*

Cliente:
${formData.name}
${formData.phone}
${formData.email}

*Productos:*
${itemsText}

*Resumen:*
Subtotal: ${ShippingService.formatPrice(subtotal)}
Descuento: Q0.00
Envío: ${formData.shippingMethod === "pickup" ? "Gratis (Recoger en tienda)" : shippingCalculation.isFreeShipping ? "Gratis (Envío gratis por compra mayor a Q300)" : ShippingService.formatPrice(shippingCost)}
*Total: ${ShippingService.formatPrice(total)}*

*Método de envío:* ${formData.shippingMethod === "pickup" ? "Recoger en tienda" : `Envío local${formData.address ? ` - ${formData.address}` : ""}`}

Gracias por tu compra en ¡Qué Chulito! ❤️`;
  };

  return (
    <div className="min-h-screen mac-bg-grouped">
      <div className="max-w-3xl mx-auto px-mac-md py-mac-xl mac-fade-in">
        {/* Header */}
        <div className="mac-card text-center mb-mac-lg">
          <h1 className="mac-text-large-title mac-text-primary mb-mac-md">
            Finalizar Compra
          </h1>
          <p className="mac-text-title-3 mac-text-secondary">
            Completa tu información para procesar tu pedido
          </p>
        </div>

        {/* Form */}
        <div className="mac-card">
          <form onSubmit={handleSubmit} className="space-y-mac-lg">
            {/* Guest Info */}
            <div className="space-y-mac-md">
              <h2 className="mac-text-title-2 mac-text-primary">
                Información de Contacto
              </h2>
              
              <div>
                <label className="mac-text-subhead mac-text-primary mb-mac-sm block">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mac-input w-full"
                />
              </div>

              <div>
                <label className="mac-text-subhead mac-text-primary mb-mac-sm block">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mac-input w-full"
                  placeholder="50212345678"
                />
              </div>

              <div>
                <label className="mac-text-subhead mac-text-primary mb-mac-sm block">
                  Email (opcional)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mac-input w-full"
                />
              </div>
            </div>

            <div className="mac-separator"></div>

            {/* Shipping Method */}
            <div className="space-y-mac-md">
              <h2 className="mac-text-title-2 mac-text-primary">
                Método de Envío
              </h2>

              <div className="space-y-mac-sm">
                <label className="flex items-start gap-mac-md p-mac-md mac-card cursor-pointer hover:bg-mac-gray-2 dark:hover:bg-mac-gray-6 mac-transition-colors">
                  <input
                    type="radio"
                    name="shipping"
                    value="pickup"
                    checked={formData.shippingMethod === "pickup"}
                    onChange={(e) => setFormData({ ...formData, shippingMethod: e.target.value as "pickup" | "local" })}
                    className="mt-1 w-5 h-5"
                  />
                  <div className="flex-1">
                    <div className="mac-text-headline mac-text-primary mb-mac-xs">
                      Recoger en tienda
                    </div>
                    <div className="mac-text-subhead mac-text-secondary">
                      Gratis - Dirección: [Tu dirección]
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-mac-md p-mac-md mac-card cursor-pointer hover:bg-mac-gray-2 dark:hover:bg-mac-gray-6 mac-transition-colors">
                  <input
                    type="radio"
                    name="shipping"
                    value="local"
                    checked={formData.shippingMethod === "local"}
                    onChange={(e) => setFormData({ ...formData, shippingMethod: e.target.value as "pickup" | "local" })}
                    className="mt-1 w-5 h-5"
                  />
                  <div className="flex-1">
                    <div className="mac-text-headline mac-text-primary mb-mac-xs flex items-center gap-mac-sm">
                      <Truck className="w-5 h-5" />
                      Envío local
                    </div>
                    <div className="mac-text-subhead mac-text-secondary">
                      {shippingCalculation.isFreeShipping ? (
                        <span style={{ color: 'var(--mac-green)' }} className="font-medium">Gratis (Compra mayor a Q300)</span>
                      ) : (
                        <>
                          {ShippingService.formatPrice(shippingCalculation.shippingCost)} GTQ
                          {shippingCalculation.remainingForFreeShipping && (
                            <div className="mac-text-caption-1 mt-mac-xs" style={{ color: 'var(--mac-green)' }}>
                              Agrega {ShippingService.formatPrice(shippingCalculation.remainingForFreeShipping)} más para envío gratis
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </label>
              </div>

              {formData.shippingMethod === "local" && (
                <div>
                  <label className="mac-text-subhead mac-text-primary mb-mac-sm block">
                    Dirección de envío *
                  </label>
                  <textarea
                    required={formData.shippingMethod === "local"}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="mac-input w-full"
                    rows={3}
                    placeholder="Calle, número, zona..."
                  />
                </div>
              )}
            </div>

            <div className="mac-separator"></div>

            {/* Order Summary */}
            <div className="space-y-mac-md">
              <h2 className="mac-text-title-2 mac-text-primary">
                Resumen del Pedido
              </h2>

              <div className="space-y-mac-sm">
                <div className="flex justify-between mac-text-body mac-text-secondary">
                  <span>Subtotal</span>
                  <span>{ShippingService.formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between mac-text-body mac-text-secondary">
                  <span>Descuento</span>
                  <span>Q0.00</span>
                </div>
                <div className="flex justify-between mac-text-body mac-text-secondary">
                  <span className="flex items-center gap-mac-xs">
                    <Truck className="mac-icon-small" />
                    Envío
                  </span>
                  <span style={shippingCost === 0 ? { color: 'var(--mac-green)' } : {}}>
                    {formData.shippingMethod === "pickup" 
                      ? "Gratis (Recoger en tienda)" 
                      : shippingCalculation.isFreeShipping 
                        ? "Gratis (Compra mayor a Q300)" 
                        : ShippingService.formatPrice(shippingCost)
                    }
                  </span>
                </div>
                
                {/* Información adicional de envío gratis */}
                {formData.shippingMethod === "local" && !shippingCalculation.isFreeShipping && shippingCalculation.remainingForFreeShipping && (
                  <div className="mac-card p-mac-sm mac-text-caption-1 mac-text-primary">
                    <span style={{ color: 'var(--mac-green)' }} className="font-medium">
                      Agrega {ShippingService.formatPrice(shippingCalculation.remainingForFreeShipping)} más para envío gratis
                    </span>
                  </div>
                )}
                
                <div className="mac-separator"></div>
                <div className="flex justify-between mac-text-title-2 mac-text-primary">
                  <span>Total</span>
                  <span>{ShippingService.formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="mac-button-primary w-full">
              Enviar Pedido por WhatsApp
            </button>

            <p className="mac-text-caption-1 mac-text-tertiary text-center">
              Al hacer clic, se abrirá WhatsApp con tu pedido listo para enviar.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
