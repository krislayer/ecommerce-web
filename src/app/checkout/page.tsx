"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "@/store";
import { clearCart, removeItem, updateQuantity } from "@/store/slice/cartSlice";
import { ShippingService } from "@/lib/services/shipping.service";
import { Loading } from "@/components/loading";
import Price from "@/components/price";
import { CartLineItem } from "@/components/cart/cart-line-item";
import LoadingDots from "@/components/loading-dots";
import { buildEncodedWhatsAppOrderText } from "@/lib/whatsapp/build-order-message";
import {
  buildWhatsAppOrderUrl,
  clearCheckoutPending,
  hasPendingCheckout,
  markCheckoutPending,
} from "@/lib/whatsapp/checkout-handoff";
import { generateOrderId } from "@/lib/whatsapp/order-id";
import { homePath } from "@/lib/paths";

export default function CheckoutPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [formData, setFormData] = useState({
    name: "",
    shippingMethod: "pickup" as "pickup" | "local",
    address: "",
  });

  useEffect(() => {
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    const completeHandoff = () => {
      if (!hasPendingCheckout()) return;
      clearCheckoutPending();
      dispatch(clearCart());
      router.push(homePath());
    };

    const onVisibility = () => {
      if (!document.hidden) completeHandoff();
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", completeHandoff);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", completeHandoff);
    };
  }, [dispatch, router]);

  useEffect(() => {
    if (cartItems.length === 0 && !isSubmitting) router.push("/search");
  }, [cartItems.length, isSubmitting, router]);

  const subtotal = cartItems.reduce((s, i) => s + i.variant.price * i.quantity, 0);
  const standardShipping = ShippingService.getStandardShippingCost();
  const shippingCost = formData.shippingMethod === "pickup" ? 0 : standardShipping;
  const total = subtotal + shippingCost;
  const isValid = formData.name.length >= 2 && (formData.shippingMethod === "pickup" || formData.address.length > 0);

  const buildOrderPayload = (orderId: string) => ({
    orderId,
    customerName: formData.name,
    shippingMethod: formData.shippingMethod,
    address: formData.address,
    items: cartItems.map((i) => ({
      productId: i.variant.productId,
      name: i.variant.name ?? i.variant.sku,
      attributes: i.variant.attributes,
      quantity: i.quantity,
      unitPrice: i.variant.price,
    })),
    subtotal,
    shippingCost,
    total,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isSubmitting) return;
    setIsSubmitting(true);

    const orderId = generateOrderId();
    const encodedText = buildEncodedWhatsAppOrderText(buildOrderPayload(orderId));
    const whatsappUrl = buildWhatsAppOrderUrl(encodedText, isMobile);

    markCheckoutPending();

    if (isMobile) {
      window.location.href = whatsappUrl;
      return;
    }

    const opened = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (!opened) window.location.href = whatsappUrl;
  };

  if ((cartItems.length === 0 && !isSubmitting) || isSubmitting) {
    return <Loading fullScreen size="xl" label="Abriendo WhatsApp…" />;
  }

  const inputClass =
    "text-md w-full rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400";

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <h1 className="mb-8 text-lg font-semibold">Finalizar compra</h1>

      <ul className="mb-8 grow overflow-auto">
        {cartItems.map((item) => (
          <CartLineItem
            key={item.variant.id}
            item={item}
            onRemove={() => dispatch(removeItem(item.variant.id))}
            onUpdateQuantity={(qty) => dispatch(updateQuantity({ id: item.variant.id, quantity: qty }))}
          />
        ))}
      </ul>

      <form onSubmit={submit} className="space-y-6">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm text-neutral-500 dark:text-neutral-400">
            Nombre
          </label>
          <input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClass}
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <p className="mb-3 text-sm text-neutral-500 dark:text-neutral-400">Entrega</p>
          <div className="space-y-4 text-sm">
            <label className="flex cursor-pointer gap-3">
              <input
                type="radio"
                className="mt-1 shrink-0"
                checked={formData.shippingMethod === "pickup"}
                onChange={() => setFormData({ ...formData, shippingMethod: "pickup" })}
              />
              <span className="flex flex-col gap-0.5">
                <span className="font-medium text-black dark:text-white">
                  Entrega coordinada (gratis)
                </span>
                <span className="text-neutral-500 dark:text-neutral-400">
                  Coordinaremos el punto de encuentro por WhatsApp
                </span>
              </span>
            </label>
            <label className="flex cursor-pointer gap-3">
              <input
                type="radio"
                className="mt-1 shrink-0"
                checked={formData.shippingMethod === "local"}
                onChange={() => setFormData({ ...formData, shippingMethod: "local" })}
              />
              <span className="flex flex-col gap-0.5">
                <span className="font-medium text-black dark:text-white">
                  A domicilio — {ShippingService.formatPrice(ShippingService.getStandardShippingCost())}
                </span>
                <span className="text-neutral-500 dark:text-neutral-400">Solo cabecera municipal</span>
              </span>
            </label>
          </div>
        </div>

        {formData.shippingMethod === "local" ? (
          <div>
            <label htmlFor="address" className="mb-2 block text-sm text-neutral-500 dark:text-neutral-400">
              Dirección
            </label>
            <textarea
              id="address"
              required
              rows={3}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className={`${inputClass} resize-none`}
              placeholder="Agrega una referencia para facilitar la entrega"
            />
          </div>
        ) : null}

        <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
          {formData.shippingMethod === "local" ? (
            <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
              <p>Envío</p>
              <p className="text-right text-black dark:text-white">
                {ShippingService.formatPrice(standardShipping)}
              </p>
            </div>
          ) : null}
          <div
            className={`mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700 ${formData.shippingMethod === "local" ? "pt-1" : ""}`}
          >
            <p>Total</p>
            <Price amount={total} className="text-right text-base text-black dark:text-white" />
          </div>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? <LoadingDots className="bg-white" /> : "Enviar pedido por WhatsApp"}
        </button>
      </form>
    </div>
  );
}
