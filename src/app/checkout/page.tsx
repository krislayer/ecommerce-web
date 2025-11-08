"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "@/store";
import { clearCart } from "@/store/slice/cartSlice";
import { ShippingService } from "@/lib/services/shipping.service";
import { Truck, MapPin, Lock, AlertCircle, ExternalLink } from "lucide-react";
import Image from "next/image";
import { Loading } from "@/components/loading";
import { FreeShippingProgress } from "@/components/free-shipping-progress";

export default function CheckoutPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [desktopConfirmationVisible, setDesktopConfirmationVisible] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);

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

  // En móvil: verificar si el pedido fue enviado cuando el usuario regresa al navegador
  useEffect(() => {
    if (!isMobile || typeof window === 'undefined') return;

    const checkOrderSent = () => {
      const orderSent = sessionStorage.getItem('orderSent');
      if (orderSent === 'true') {
        // Limpiar la marca y redirigir a página de éxito
        sessionStorage.removeItem('orderSent');
        router.push("/checkout/success");
      }
    };

    // Verificar al montar el componente
    checkOrderSent();

    // Verificar cuando el usuario regresa al navegador (después de abrir WhatsApp)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkOrderSent();
      }
    };

    // Verificar cuando la ventana recupera el foco
    const handleFocus = () => {
      checkOrderSent();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [isMobile, router]);

  // Proteger ruta: redirigir si el carrito está vacío (excepto durante el proceso de envío del pedido)
  useEffect(() => {
    if (cartItems.length === 0 && !isSubmitting) {
      router.push("/catalogo");
    }
  }, [cartItems.length, isSubmitting, router]);

  const [formData, setFormData] = useState({
    name: "",
    shippingMethod: "pickup" as "pickup" | "local",
    address: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    address: false,
  });

  useEffect(() => {
    if (formData.shippingMethod === "pickup") {
      setDesktopConfirmationVisible(false);
    }
  }, [formData.shippingMethod]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

  const shippingCalculation = ShippingService.calculateShipping(subtotal);
  
  // Calcular costo de entrega basado en el método seleccionado
  const getShippingCost = () => {
    if (formData.shippingMethod === "pickup") {
      return 0;
    }
    return shippingCalculation.shippingCost;
  };

  const shippingCost = getShippingCost();
  const total = subtotal + shippingCost;

  // Validaciones según Apple HIG: feedback inmediato y claro
  const isNameValid = formData.name.length >= 2;
  const isAddressValid = formData.shippingMethod === "pickup" || formData.address.length > 0;
  
  const isFormValid = isNameValid && isAddressValid;

  const notifyWhatsappError = (error: unknown) => {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    console.error("Error al preparar el mensaje de WhatsApp:", errorMessage);
    alert(`Hubo un error al procesar tu pedido: ${errorMessage}\n\nPor favor intenta de nuevo.`);
  };

  const buildWhatsappUrls = () => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "50256995320";
    const cleanNumber = whatsappNumber.replace(/\D/g, "");

    if (cleanNumber.length < 10 || cleanNumber.length > 15) {
      throw new Error(`Número de WhatsApp inválido (${cleanNumber.length} dígitos).\n\nPor favor configura NEXT_PUBLIC_WHATSAPP_NUMBER con un número válido.`);
    }

    const message = formatWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);

    return {
      mobile: `https://wa.me/${cleanNumber}?text=${encodedMessage}`,
      desktop: `https://web.whatsapp.com/send?phone=${cleanNumber}&text=${encodedMessage}`,
    };
  };

  const handleDesktopWhatsappOpen = () => {
    try {
      const { desktop } = buildWhatsappUrls();
      window.open(desktop, "_blank");
      setDesktopConfirmationVisible(true);
    } catch (error) {
      notifyWhatsappError(error);
    }
  };

  const handleDesktopConfirmation = () => {
    dispatch(clearCart());
    setDesktopConfirmationVisible(false);
    setIsSubmitting(false);
    router.push("/checkout/success");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid || isSubmitting) return;
    
    setIsSubmitting(true);

    if (!isMobile) {
      setDesktopConfirmationVisible(false);
    }
    
    try {
      const { mobile, desktop } = buildWhatsappUrls();

      if (isMobile) {
        dispatch(clearCart());
        
        if (typeof window !== "undefined") {
          sessionStorage.setItem("orderSent", "true");
          window.location.href = mobile;
        }
      } else {
        window.open(desktop, "_blank");
        setDesktopConfirmationVisible(true);
        setIsSubmitting(false);
        return;
      }
    } catch (error) {
      notifyWhatsappError(error);
      setIsSubmitting(false);
    }
  };

  const formatWhatsAppMessage = () => {
    const itemsText = cartItems
      .map(
        (item) =>
          `• ${item.variant.sku}\n  Cantidad: ${item.quantity}\n  Precio: Q${item.variant.price.toFixed(2)}`
      )
      .join("\n\n");

    // Construir información del cliente
    const clientInfo = formData.name;

    return `🛒 *Nuevo Pedido*

Cliente:
${clientInfo}

*Productos:*
${itemsText}

*Resumen:*
Subtotal: ${ShippingService.formatPrice(subtotal)}
Descuento: Q0.00
Entrega: ${formData.shippingMethod === "pickup" ? "Gratis (Entrega coordinada)" : shippingCalculation.isFreeShipping ? "Gratis (Entrega gratis por compra mayor a Q300)" : ShippingService.formatPrice(shippingCost)}
*Total: ${ShippingService.formatPrice(total)}*

*Método de entrega:* ${formData.shippingMethod === "pickup" ? "Entrega coordinada - Coordinaremos el punto de encuentro por WhatsApp" : `Entrega a domicilio (Cabecera municipal)${formData.address ? ` - ${formData.address}` : ""}`}

Gracias por tu compra en ¡Qué Chulito! ❤️`;
  };

  // Mostrar loading si el carrito está vacío (será redirigido) o si se está enviando el pedido
  // Apple HIG: Loading full-screen debe ser minimalista - solo spinner centrado sin card
  if (cartItems.length === 0 && !isSubmitting) {
    return <Loading fullScreen size="xl" label="Redirigiendo" />;
  }

  // Mostrar loading cuando se está enviando el pedido
  if (isSubmitting) {
    return <Loading fullScreen size="xl" label="Enviando pedido" />;
  }

  return (
    <div className="min-h-screen mac-bg-grouped">
      <div className="max-w-4xl mx-auto px-mac-md py-mac-xl mac-fade-in">
        {/* Header según Apple HIG: jerarquía clara y espaciado consistente */}
        <div className="mb-mac-xl">
          <h1 className="mac-text-title-1 mac-text-primary mb-mac-sm">
            Finalizar Compra
          </h1>
          <p className="mac-text-body mac-text-secondary">
            Tu pedido se enviará por WhatsApp. Te contactaremos directamente.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-mac-xl">
          {/* Columna principal - Formulario estilo macOS System Preferences */}
          <div className="lg:col-span-2 space-y-mac-md">
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-mac-md">
              {/* Grupo 1: Información de Contacto */}
              <div className="mac-list">
                <div className="mac-list-item">
                  <h3 className="mac-text-subhead mac-text-primary block mb-mac-md font-semibold">
                    Información de contacto
                  </h3>
                  <label htmlFor="name" className="mac-text-footnote mac-text-primary block mb-mac-xs font-medium">
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
                    className={`mac-input w-full mt-mac-xs ${
                      touched.name && !isNameValid ? "border-[#FF3B30] focus:border-[#FF3B30] focus:ring-[#FF3B30]/20" : ""
                    }`}
                    placeholder="Tu nombre completo"
                    aria-invalid={touched.name && !isNameValid}
                    aria-describedby={touched.name && !isNameValid ? "name-error" : undefined}
                  />
                {touched.name && !isNameValid && (
                  <p id="name-error" className="mac-text-caption-1 text-[#FF3B30] mt-mac-xs">
                    El nombre debe tener al menos 2 caracteres
                  </p>
                )}
              </div>
            </div>

            {/* Grupo 2: Método de Entrega */}
            <div className="mac-list">
              <div className="mac-list-item">
                <h3 className="mac-text-subhead mac-text-primary block mb-mac-md font-semibold">
                  Método de entrega
                </h3>
                <div className="space-y-mac-sm">
                  <label 
                    className={`flex items-start gap-mac-md cursor-pointer rounded-mac-sm p-mac-sm -mx-mac-sm transition-colors ${
                      formData.shippingMethod === "pickup" 
                        ? "bg-[#007AFF]/10 dark:bg-[#0A84FF]/10" 
                        : "hover:bg-mac-gray-2 dark:hover:bg-mac-gray-6"
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
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
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
                        <MapPin 
                          className={`w-4 h-4 shrink-0 ${
                            formData.shippingMethod === "pickup" ? "text-[#007AFF] dark:text-[#0A84FF]" : "mac-text-secondary"
                          }`}
                        />
                        Entrega coordinada
                      </div>
                      <div className="mac-text-footnote mac-text-secondary">
                        Gratis - Coordinaremos el punto de encuentro por WhatsApp
                      </div>
                    </div>
                  </label>

                  <label 
                    className={`flex items-start gap-mac-md cursor-pointer rounded-mac-sm p-mac-sm -mx-mac-sm transition-colors ${
                      formData.shippingMethod === "local" 
                        ? "bg-[#007AFF]/10 dark:bg-[#0A84FF]/10" 
                        : "hover:bg-mac-gray-2 dark:hover:bg-mac-gray-6"
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
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
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
                        Entrega a domicilio
                      </div>
                      <div className="mac-text-footnote mac-text-secondary">
                        {shippingCalculation.isFreeShipping ? (
                          <span className="text-[#34C759] dark:text-[#30D158] font-medium">
                            Gratis (Compra mayor a Q300) - Solo cabecera municipal
                          </span>
                        ) : (
                          <span>{ShippingService.formatPrice(shippingCalculation.shippingCost)} GTQ - Solo cabecera municipal</span>
                        )}
                      </div>
                      
                      {/* Barra de progreso hacia entrega gratis - Integrada dentro del label */}
                      {formData.shippingMethod === "local" && !shippingCalculation.isFreeShipping && (
                        <div className="mt-mac-sm">
                          <FreeShippingProgress subtotal={subtotal} />
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Grupo 3: Dirección (condicional) */}
            {formData.shippingMethod === "local" && (
              <div className="mac-list mac-fade-in">
                <div className="mac-list-item">
                  <h3 className="mac-text-subhead mac-text-primary block mb-mac-md font-semibold">
                    Dirección de entrega
                  </h3>
                  <label htmlFor="address" className="sr-only">
                    Ingresa tu dirección
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
                    placeholder="No olvides agregar alguna referencia sobre tu dirección para facilitar la entrega"
                    aria-invalid={touched.address && !isAddressValid}
                    aria-describedby={touched.address && !isAddressValid ? "address-error" : undefined}
                  />
                  {touched.address && !isAddressValid && (
                    <p id="address-error" className="mac-text-caption-1 text-[#FF3B30] mt-mac-xs">
                      La dirección es requerida para entrega a domicilio
                    </p>
                  )}
                </div>
              </div>
            )}

            {!isMobile && desktopConfirmationVisible && (
              <div className="mac-card border border-[#007AFF]/20 bg-[#007AFF]/10 dark:bg-[#0A84FF]/10 mac-fade-in">
                <div className="flex items-start gap-mac-md">
                  <div className="mt-0.5">
                    <AlertCircle className="w-5 h-5 text-[#007AFF] dark:text-[#0A84FF]" />
                  </div>
                  <div className="space-y-mac-sm">
                    <div>
                      <p className="mac-text-body mac-text-primary font-semibold">
                        Confirma el envío en WhatsApp Web
                      </p>
                      <p className="mac-text-footnote mac-text-secondary mt-mac-xs">
                        Abre la pestaña de WhatsApp Web, inicia sesión si es necesario y envía el mensaje con tu pedido. Cuando hayas terminado, confirma para continuar.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-mac-sm">
                      <button
                        type="button"
                        className="mac-button-secondary flex items-center justify-center gap-mac-xs"
                        onClick={handleDesktopWhatsappOpen}
                      >
                        <ExternalLink className="mac-icon-small" />
                        Abrir WhatsApp Web
                      </button>
                      <button
                        type="button"
                        className="mac-button-primary flex items-center justify-center"
                        onClick={handleDesktopConfirmation}
                      >
                        Ya envié mi pedido
                      </button>
                    </div>
                    <p className="mac-text-caption-1 mac-text-tertiary">
                      Si no ves la conversación, asegúrate de iniciar sesión en web.whatsapp.com antes de confirmar.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Botón de envío del pedido - Solo visible en mobile */}
            <div className="lg:hidden pt-mac-md">
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
                  ? "Se abrirá WhatsApp con tu pedido listo para enviar"
                  : "Se abrirá WhatsApp Web en una nueva pestaña"
                }
              </p>
            </div>
          </form>
        </div>

        {/* Columna lateral - Resumen estilo macOS System Preferences */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-mac-xl">
            <div className="mac-list">
              <div className="mac-list-item">
                <h2 className="mac-text-title-2 mac-text-primary mb-mac-md">
                  Resumen
                </h2>
                
                {/* Productos */}
                <div className="space-y-mac-md mb-mac-md">
                  {cartItems.map((item) => (
                    <div key={item.variant.id} className="flex items-center gap-mac-md">
                      {item.variant.image && (
                        <div className="relative w-14 h-14 rounded-mac-sm overflow-hidden bg-mac-gray-2 shrink-0">
                          <Image
                            src={item.variant.image}
                            alt={item.variant.sku}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="mac-text-body mac-text-primary font-medium truncate">
                          {item.variant.sku}
                        </p>
                        <p className="mac-text-footnote mac-text-secondary mt-mac-xs">
                          {item.quantity} × {ShippingService.formatPrice(item.variant.price)}
                        </p>
                      </div>
                      <p className="mac-text-body mac-text-primary font-semibold shrink-0">
                        {ShippingService.formatPrice(item.variant.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mac-separator"></div>

                {/* Resumen de precios */}
                <div className="space-y-mac-sm mt-mac-md">
                  <div className="flex justify-between items-center">
                    <span className="mac-text-body mac-text-secondary">Subtotal</span>
                    <span className="mac-text-body mac-text-primary">{ShippingService.formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="mac-text-body mac-text-secondary">Entrega</span>
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
              </div>
            </div>

            {/* Botón de envío del pedido - Solo visible en desktop */}
            <div className="hidden lg:block mt-mac-md">
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
                Se abrirá WhatsApp Web en una nueva pestaña
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
