import clsx from "clsx";

const STORE_CURRENCY = "GTQ";

export function formatStorePrice(price: number, currencyCode = STORE_CURRENCY): string {
  const formatted = new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: price % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(price);

  return formatted;
}

export { STORE_CURRENCY };
