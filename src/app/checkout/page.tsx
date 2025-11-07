"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { ShippingService } from "@/lib/services/shipping.service";
import { Truck, Store, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si es móvil
    const checkMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ));
    };
    
    checkMobile();
    // Re-evaluar si cambia el tamaño de ventana (útil para responsive)
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    shippingMethod: "pickup" as "pickup" | "local",
    address: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
    address: false,
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

  const getShippingCost = () => {
    if (formData.shippingMethod === "pickup") {
      return 0;
    }
    const shippingCalc = ShippingService.calculateShipping(subtotal);
    return shippingCalc.shippingCost;
  };

  const shippingCost = getShippingCost();
  const total = subtotal + shippingCost;
  const shippingCalculation = ShippingService.calculateShipping(subtotal);

  // Validaciones según Apple HIG: feedback inmediato y claro
  const isNameValid = formData.name.length >= 2;
  const isPhoneValid = /^502\d{8}$/.test(formData.phone);
  const isEmailValid = formData.email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isAddressValid = formData.shippingMethod === "pickup" || formData.address.length > 0;
  
  const isFormValid = isNameValid && isPhoneValid && isEmailValid && isAddressValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;
    
    const whatsappUrl = `https://wa.me/50250123456?text=${encodeURIComponent(
      formatWhatsAppMessage()
    )}`;
    
    if (isMobile) {
      // En móvil: abre directamente la app de WhatsApp (si está instalada)
      // Si no está instalada, abre WhatsApp Web en el navegador
      window.location.href = whatsappUrl;
    } else {
      // En desktop: abre WhatsApp Web en una nueva pestaña
      // Si el usuario no está logueado, se le pedirá escanear el código QR
      window.open(whatsappUrl, "_blank");
    }
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

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen mac-bg-grouped flex items-center justify-center px-mac-md">
        <div className="max-w-md w-full mac-card text-center">
          <h1 className="mac-text-title-2 mac-text-primary mb-mac-md">
            Tu carrito está vacío
          </h1>
          <p className="mac-text-body mac-text-secondary mb-mac-lg">
            Agrega productos a tu carrito antes de finalizar la compra
          </p>
          <Link href="/catalogo" className="mac-button-primary inline-block">
            Ver Catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mac-bg-grouped">
      <div className="max-w-7xl mx-auto px-mac-md py-mac-xl mac-fade-in">
        {/* Header */}
        <div className="mb-mac-xl">
          <h1 className="mac-text-title-1 mac-text-primary mb-mac-xs">
            Finalizar Compra
          </h1>
          <p className="mac-text-body mac-text-secondary">
            Completa tu información para procesar tu pedido
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-mac-lg">
          {/* Columna principal - Formulario */}
          <div className="lg:col-span-2 space-y-mac-lg">
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-mac-lg">
              {/* Información de Contacto */}
              <div className="mac-card space-y-mac-md">
                <div className="mb-mac-md">
                  <h2 className="mac-text-title-2 mac-text-primary mb-mac-xs">
                    Información de contacto
                  </h2>
                  <p className="mac-text-footnote mac-text-secondary">
                    Necesitamos algunos datos para procesar tu pedido
                  </p>
                </div>
                
                <div className="space-y-mac-md">
                  <div>
                    <label htmlFor="name" className="mac-text-subhead mac-text-primary mb-mac-xs block font-medium">
                      Nombre completo
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        setTouched({ ...touched, name: true });
                      }}
                      onBlur={() => setTouched({ ...touched, name: true })}
                      className={`mac-input w-full ${
                        touched.name && !isNameValid ? "border-[#FF3B30] focus:border-[#FF3B30] focus:ring-[#FF3B30]/20" : ""
                      }`}
                      placeholder="Nombre completo"
                      aria-invalid={touched.name && !isNameValid}
                      aria-describedby={touched.name && !isNameValid ? "name-error" : undefined}
                    />
                    {touched.name && !isNameValid && (
                      <p id="name-error" className="mac-text-caption-1 text-[#FF3B30] mt-mac-xs">
                        El nombre debe tener al menos 2 caracteres
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="mac-text-subhead mac-text-primary mb-mac-xs block font-medium">
                      Teléfono
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        setTouched({ ...touched, phone: true });
                      }}
                      onBlur={() => setTouched({ ...touched, phone: true })}
                      className={`mac-input w-full ${
                        touched.phone && !isPhoneValid ? "border-[#FF3B30] focus:border-[#FF3B30] focus:ring-[#FF3B30]/20" : ""
                      }`}
                      placeholder="50212345678"
                      aria-invalid={touched.phone && !isPhoneValid}
                      aria-describedby={touched.phone && !isPhoneValid ? "phone-error" : undefined}
                    />
                    {touched.phone && !isPhoneValid && (
                      <p id="phone-error" className="mac-text-caption-1 text-[#FF3B30] mt-mac-xs">
                        Formato: 50212345678
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="mac-text-subhead mac-text-primary mb-mac-xs block font-medium">
                      Email <span className="mac-text-caption-1 mac-text-tertiary font-normal">(opcional)</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        setTouched({ ...touched, email: true });
                      }}
                      onBlur={() => setTouched({ ...touched, email: true })}
                      className={`mac-input w-full ${
                        touched.email && !isEmailValid ? "border-[#FF3B30] focus:border-[#FF3B30] focus:ring-[#FF3B30]/20" : ""
                      }`}
                      placeholder="tu@email.com"
                      aria-invalid={touched.email && !isEmailValid}
                      aria-describedby={touched.email && !isEmailValid ? "email-error" : undefined}
                    />
                    {touched.email && !isEmailValid && (
                      <p id="email-error" className="mac-text-caption-1 text-[#FF3B30] mt-mac-xs">
                        Email inválido
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Método de Envío */}
              <div className="mac-card space-y-mac-md">
                <div className="mb-mac-md">
                  <h2 className="mac-text-title-2 mac-text-primary mb-mac-xs">
                    Método de envío
                  </h2>
                  <p className="mac-text-footnote mac-text-secondary">
                    ¿Cómo quieres recibir tu pedido?
                  </p>
                </div>

                {/* Radio buttons estilo Apple - Lista agrupada */}
                <div className="mac-list">
                  <label 
                    className={`mac-list-item flex items-start gap-mac-md cursor-pointer mac-transition-colors ${
                      formData.shippingMethod === "pickup" ? "bg-[#007AFF]/10 dark:bg-[#0A84FF]/10" : ""
                    }`}
                  >
                    <div className="flex items-center justify-center mt-0.5 shrink-0">
                      <input
                        type="radio"
                        name="shipping"
                        value="pickup"
                        checked={formData.shippingMethod === "pickup"}
                        onChange={(e) => setFormData({ ...formData, shippingMethod: e.target.value as "pickup" | "local" })}
                        className="sr-only"
                      />
                      <div 
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mac-transition-all ${
                          formData.shippingMethod === "pickup"
                            ? "border-[#007AFF] bg-[#007AFF] dark:border-[#0A84FF] dark:bg-[#0A84FF]"
                            : "border-[#8E8E93] bg-transparent dark:border-[#636366]"
                        }`}
                      >
                        {formData.shippingMethod === "pickup" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`mac-text-body mb-mac-xs flex items-center gap-mac-sm ${
                        formData.shippingMethod === "pickup" ? "font-semibold mac-text-primary" : "mac-text-primary"
                      }`}>
                        <Store 
                          className={`w-4 h-4 shrink-0 ${
                            formData.shippingMethod === "pickup" ? "text-[#007AFF] dark:text-[#0A84FF]" : "mac-text-secondary"
                          }`}
                        />
                        Recoger en tienda
                      </div>
                      <div className="mac-text-footnote mac-text-secondary">
                        Gratis - Dirección: [Tu dirección]
                      </div>
                    </div>
                  </label>

                  <label 
                    className={`mac-list-item flex items-start gap-mac-md cursor-pointer mac-transition-colors ${
                      formData.shippingMethod === "local" ? "bg-[#007AFF]/10 dark:bg-[#0A84FF]/10" : ""
                    }`}
                  >
                    <div className="flex items-center justify-center mt-0.5 shrink-0">
                      <input
                        type="radio"
                        name="shipping"
                        value="local"
                        checked={formData.shippingMethod === "local"}
                        onChange={(e) => setFormData({ ...formData, shippingMethod: e.target.value as "pickup" | "local" })}
                        className="sr-only"
                      />
                      <div 
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mac-transition-all ${
                          formData.shippingMethod === "local"
                            ? "border-[#007AFF] bg-[#007AFF] dark:border-[#0A84FF] dark:bg-[#0A84FF]"
                            : "border-[#8E8E93] bg-transparent dark:border-[#636366]"
                        }`}
                      >
                        {formData.shippingMethod === "local" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`mac-text-body mb-mac-xs flex items-center gap-mac-sm ${
                        formData.shippingMethod === "local" ? "font-semibold mac-text-primary" : "mac-text-primary"
                      }`}>
                        <Truck 
                          className={`w-4 h-4 shrink-0 ${
                            formData.shippingMethod === "local" ? "text-[#007AFF] dark:text-[#0A84FF]" : "mac-text-secondary"
                          }`}
                        />
                        Envío local
                      </div>
                      <div className="mac-text-footnote mac-text-secondary">
                        {shippingCalculation.isFreeShipping ? (
                          <span className="text-[#34C759] dark:text-[#30D158] font-medium">
                            Gratis (Compra mayor a Q300)
                          </span>
                        ) : (
                          <div>
                            <span>{ShippingService.formatPrice(shippingCalculation.shippingCost)} GTQ</span>
                            {shippingCalculation.remainingForFreeShipping && (
                              <div className="mac-text-caption-1 mt-mac-xs text-[#34C759] dark:text-[#30D158]">
                                Agrega {ShippingService.formatPrice(shippingCalculation.remainingForFreeShipping)} más para envío gratis
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </label>
                </div>

                {formData.shippingMethod === "local" && (
                  <div className="mt-mac-md mac-fade-in">
                    <label htmlFor="address" className="mac-text-subhead mac-text-primary mb-mac-xs block font-medium">
                      Dirección de envío
                    </label>
                    <textarea
                      id="address"
                      required={formData.shippingMethod === "local"}
                      value={formData.address}
                      onChange={(e) => {
                        setFormData({ ...formData, address: e.target.value });
                        setTouched({ ...touched, address: true });
                      }}
                      onBlur={() => setTouched({ ...touched, address: true })}
                      className={`mac-input w-full resize-none ${
                        touched.address && !isAddressValid ? "border-[#FF3B30] focus:border-[#FF3B30] focus:ring-[#FF3B30]/20" : ""
                      }`}
                      rows={3}
                      placeholder="Calle, número, zona..."
                      aria-invalid={touched.address && !isAddressValid}
                      aria-describedby={touched.address && !isAddressValid ? "address-error" : undefined}
                    />
                    {touched.address && !isAddressValid && (
                      <p id="address-error" className="mac-text-caption-1 text-[#FF3B30] mt-mac-xs">
                        La dirección es requerida para envío local
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Botón de envío - Solo visible en mobile */}
              <div className="lg:hidden">
                <button
                  type="submit"
                  className={`mac-button-primary w-full ${
                    !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!isFormValid}
                  aria-label="Enviar pedido por WhatsApp"
                >
                  <Lock className="w-4 h-4" />
                  Enviar Pedido por WhatsApp
                </button>
                <p className="mac-text-caption-1 mac-text-tertiary text-center mt-mac-sm">
                  {isMobile 
                    ? "Se abrirá WhatsApp con tu pedido listo para enviar. Si no tienes WhatsApp instalado, se abrirá WhatsApp Web."
                    : "Se abrirá WhatsApp Web en una nueva pestaña. Si no estás logueado, escanea el código QR con tu teléfono."
                  }
                </p>
              </div>
            </form>
          </div>

          {/* Columna lateral - Resumen sticky (solo desktop) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-mac-xl">
              <div className="mac-card space-y-mac-md">
                {/* Productos */}
                <div>
                  <h2 className="mac-text-title-2 mac-text-primary mb-mac-md">
                    Resumen del pedido
                  </h2>
                  
                  <div className="space-y-mac-sm mb-mac-md">
                    {cartItems.map((item) => (
                      <div key={item.variant.id} className="flex items-center gap-mac-md">
                        {item.variant.image && (
                          <div className="relative w-16 h-16 rounded-mac-sm overflow-hidden bg-mac-gray-2 shrink-0">
                            <Image
                              src={item.variant.image}
                              alt={item.variant.sku}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="mac-text-footnote mac-text-primary font-medium truncate">
                            {item.variant.sku}
                          </p>
                          <p className="mac-text-caption-1 mac-text-secondary mt-mac-xs">
                            Cantidad: {item.quantity} × {ShippingService.formatPrice(item.variant.price)}
                          </p>
                        </div>
                        <p className="mac-text-body mac-text-primary font-semibold shrink-0">
                          {ShippingService.formatPrice(item.variant.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Separador */}
                <div className="mac-separator"></div>

                {/* Resumen de precios */}
                <div className="space-y-mac-sm">
                  <div className="flex justify-between items-center">
                    <span className="mac-text-body mac-text-secondary">Subtotal</span>
                    <span className="mac-text-body mac-text-primary">{ShippingService.formatPrice(subtotal)}</span>
                  </div>
                  
                  {formData.shippingMethod === "local" && !shippingCalculation.isFreeShipping && shippingCalculation.remainingForFreeShipping && (
                    <div className="mac-text-caption-1 text-[#34C759] dark:text-[#30D158]">
                      Agrega {ShippingService.formatPrice(shippingCalculation.remainingForFreeShipping)} más para envío gratis
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="mac-text-body mac-text-secondary">Envío</span>
                    <span className={`mac-text-body ${shippingCost === 0 ? "text-[#34C759] dark:text-[#30D158] font-medium" : "mac-text-primary"}`}>
                      {formData.shippingMethod === "pickup" 
                        ? "Gratis" 
                        : shippingCalculation.isFreeShipping 
                          ? "Gratis" 
                          : ShippingService.formatPrice(shippingCost)
                      }
                    </span>
                  </div>
                  
                  <div className="mac-separator my-mac-md"></div>
                  
                  <div className="flex justify-between items-center">
                    <span className="mac-text-title-3 mac-text-primary">Total</span>
                    <span className="mac-text-title-3 mac-text-primary font-semibold">{ShippingService.formatPrice(total)}</span>
                  </div>
                </div>

                {/* Botón de envío - Solo visible en desktop */}
                <div className="hidden lg:block pt-mac-md">
                  <button
                    type="submit"
                    form="checkout-form"
                    className={`mac-button-primary w-full ${
                      !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!isFormValid}
                    aria-label="Enviar pedido por WhatsApp"
                  >
                    <Lock className="w-4 h-4" />
                    Enviar Pedido por WhatsApp
                  </button>
                  <p className="mac-text-caption-1 mac-text-tertiary text-center mt-mac-sm">
                    Se abrirá WhatsApp con tu pedido listo para enviar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
