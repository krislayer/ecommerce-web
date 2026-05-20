import clsx from "clsx";
import { formatStorePrice, STORE_CURRENCY } from "@/lib/store/format-price";

type PriceProps = {
  amount: number | string;
  className?: string;
  currencyCode?: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<"p">;

export default function Price({
  amount,
  className,
  currencyCode = STORE_CURRENCY,
  currencyCodeClassName,
  ...props
}: PriceProps) {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  const numeric = Number.isFinite(value) ? value : 0;

  return (
    <p suppressHydrationWarning className={clsx(className)} {...props}>
      {formatStorePrice(numeric, currencyCode)}
      {currencyCodeClassName ? (
        <span className={clsx("ml-1 inline", currencyCodeClassName)}>{currencyCode}</span>
      ) : null}
    </p>
  );
}
