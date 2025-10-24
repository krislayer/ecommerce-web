"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { LiquidGlassCard } from "@/components/liquid-glass-card";
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
    <div className="max-w-3xl mx-auto px-4 py-12 relative z-10 fade-in">
      <LiquidGlassCard className="p-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-adaptive-primary">
          Finalizar Compra
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Guest Info */}
          <div className="glass-secondary p-6 space-y-4">
            <h2 className="text-xl font-semibold text-adaptive-primary">
              Información de Contacto
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-adaptive-primary mb-2">
                Nombre completo *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="glass-input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-adaptive-primary mb-2">
                Teléfono *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="glass-input w-full"
                placeholder="50212345678"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-adaptive-primary mb-2">
                Email (opcional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="glass-input w-full"
              />
            </div>
          </div>

          {/* Shipping Method */}
          <div className="glass-secondary p-6 space-y-4">
            <h2 className="text-xl font-semibold text-adaptive-primary">
              Método de Envío
            </h2>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 glass-secondary cursor-pointer">
                <input
                  type="radio"
                  name="shipping"
                  value="pickup"
                  checked={formData.shippingMethod === "pickup"}
                  onChange={(e) => setFormData({ ...formData, shippingMethod: e.target.value as "pickup" | "local" })}
                  className="w-5 h-5"
                />
                <div className="flex-1">
                  <div className="font-medium text-adaptive-primary">
                    Recoger en tienda
                  </div>
                  <div className="text-sm text-adaptive-secondary">
                    Gratis - Dirección: [Tu dirección]
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 glass-secondary cursor-pointer">
                <input
                  type="radio"
                  name="shipping"
                  value="local"
                  checked={formData.shippingMethod === "local"}
                  onChange={(e) => setFormData({ ...formData, shippingMethod: e.target.value as "pickup" | "local" })}
                  className="w-5 h-5"
                />
                <div className="flex-1">
                  <div className="font-medium text-adaptive-primary flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Envío local
                  </div>
                  <div className="text-sm text-adaptive-secondary">
                    {shippingCalculation.isFreeShipping ? (
                      <span className="text-green-400 font-medium">Gratis (Compra mayor a Q300)</span>
                    ) : (
                      <>
                        {ShippingService.formatPrice(shippingCalculation.shippingCost)} GTQ
                        {shippingCalculation.remainingForFreeShipping && (
                          <div className="text-xs text-green-400 mt-1">
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
                <label className="block text-sm font-medium text-adaptive-primary mb-2">
                  Dirección de envío *
                </label>
                <textarea
                  required={formData.shippingMethod === "local"}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="glass-input w-full"
                  rows={3}
                  placeholder="Calle, número, zona..."
                />
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="glass-secondary p-6 space-y-4">
            <h2 className="text-xl font-semibold text-adaptive-primary">
              Resumen del Pedido
            </h2>

            <div className="space-y-2">
              <div className="flex justify-between text-adaptive-secondary">
                <span>Subtotal</span>
                <span>{ShippingService.formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-adaptive-secondary">
                <span>Descuento</span>
                <span>Q0.00</span>
              </div>
              <div className="flex justify-between text-adaptive-secondary">
                <span className="flex items-center gap-1">
                  <Truck className="w-4 h-4" />
                  Envío
                </span>
                <span className={shippingCost === 0 ? "text-green-400" : ""}>
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
                <div className="glass-secondary p-2 rounded text-xs text-adaptive-primary">
                  <span className="text-green-400 font-medium">
                    Agrega {ShippingService.formatPrice(shippingCalculation.remainingForFreeShipping)} más para envío gratis
                  </span>
                </div>
              )}
              
              <div className="border-t border-white/20 pt-2">
                <div className="flex justify-between text-lg font-bold text-adaptive-primary">
                  <span>Total</span>
                  <span>{ShippingService.formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full glass-button-primary py-4 px-6">
            <span className="text-adaptive-primary text-lg font-medium">Enviar Pedido por WhatsApp</span>
          </button>

          <p className="text-sm text-adaptive-tertiary text-center">
            Al hacer clic, se abrirá WhatsApp con tu pedido listo para enviar.
          </p>
        </form>
      </LiquidGlassCard>
    </div>
  );
}
