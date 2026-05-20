import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-5xl font-medium">¡Listo!</p>
      <p className="mt-4 text-sm text-neutral-500">
        Tu pedido fue enviado por WhatsApp. Te contactaremos pronto.
      </p>
      <Link
        href="/search"
        className="mt-8 inline-block rounded-full bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:opacity-90"
      >
        Seguir comprando
      </Link>
    </div>
  );
}
