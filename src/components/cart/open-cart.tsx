import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { iconControlClassName, iconControlGlyphClassName } from "@/lib/ui/icon-control";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className={iconControlClassName}>
      <ShoppingCartIcon className={clsx(iconControlGlyphClassName, className)} />
      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded-sm bg-blue-600 text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
