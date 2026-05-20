import clsx from "clsx";
import type { Product } from "@/lib/domain/entities/product";
import { formatProductCondition } from "@/lib/product/condition";
import Price from "./price";

export default function Label({
  title,
  amount,
  currencyCode = "GTQ",
  position = "bottom",
  condition,
}: {
  title: string;
  amount: number | string;
  currencyCode?: string;
  position?: "bottom" | "center";
  condition?: Product["condition"];
}) {
  return (
    <div
      className={clsx("absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label", {
        "lg:px-20 lg:pb-[35%]": position === "center",
      })}
    >
      <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
        <div className="mr-4 min-w-0 grow pl-2 leading-none">
          {condition ? (
            <p className="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {formatProductCondition(condition)}
            </p>
          ) : null}
          <h3 className="line-clamp-2 tracking-tight">{title}</h3>
        </div>
        <Price
          className="flex-none rounded-full bg-blue-600 p-2 text-white"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
}
