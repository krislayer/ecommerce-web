import Link from "next/link";
import type { MenuItem } from "@/lib/menu";

export function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly MenuItem[];
}) {
  if (!links.length) return null;

  return (
    <nav aria-label={title}>
      <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        {title}
      </h3>
      <ul className="flex flex-col gap-3">
        {links.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className="text-sm text-black underline-offset-4 hover:underline dark:text-white"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
