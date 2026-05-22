const CHECKOUT_PENDING_KEY = "checkoutPending";

export function buildWhatsAppOrderUrl(encodedText: string, isMobile: boolean): string {
  const num = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "50256995320").replace(/\D/g, "");
  return isMobile
    ? `https://wa.me/${num}?text=${encodedText}`
    : `https://web.whatsapp.com/send?phone=${num}&text=${encodedText}`;
}

export function markCheckoutPending(): void {
  sessionStorage.setItem(CHECKOUT_PENDING_KEY, "1");
}

export function hasPendingCheckout(): boolean {
  return sessionStorage.getItem(CHECKOUT_PENDING_KEY) === "1";
}

export function clearCheckoutPending(): void {
  sessionStorage.removeItem(CHECKOUT_PENDING_KEY);
}
