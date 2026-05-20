"use client";

import { useSearchParams } from "next/navigation";
import { Fragment } from "react";

/** Re-renderiza hijos cuando cambian los query params (patrón vercel/commerce). */
export function SearchChildrenWrapper({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  return <Fragment key={searchParams.toString()}>{children}</Fragment>;
}
