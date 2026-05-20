import type { ReactNode } from "react";

export type StaticPage = {
  title: string;
  description: string;
  content: ReactNode;
};

export const staticPageHandles = ["about", "contact"] as const;
export type StaticPageHandle = (typeof staticPageHandles)[number];

export function isStaticPageHandle(page: string): page is StaticPageHandle {
  return staticPageHandles.includes(page as StaticPageHandle);
}
