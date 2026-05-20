import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { categories } from "@/lib/data/categories";
import { collectionPath, searchPath } from "@/lib/paths";

const legacySlugToHandle: Record<string, string> = Object.fromEntries(
  categories.map((c) => [c.slug, c.handle]),
);

/** Redirige rutas legacy a la estructura vercel/commerce (/search/{handle}). */
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/catalogo" || pathname.startsWith("/catalogo/")) {
    const url = request.nextUrl.clone();
    const suffix = pathname.replace(/^\/catalogo\/?/, "");
    url.pathname = suffix ? collectionPath(legacySlugToHandle[suffix] ?? suffix) : searchPath();

    const legacyCategory = searchParams.get("category");
    if (legacyCategory) {
      const cat = categories.find((c) => c.id === legacyCategory);
      if (cat) url.pathname = collectionPath(cat.handle);
      url.searchParams.delete("category");
    }

    return NextResponse.redirect(url, 308);
  }

  const rootSegment = pathname.replace(/^\//, "");
  const rootCat =
    categories.find((c) => c.handle === rootSegment) ??
    categories.find((c) => c.slug === rootSegment);
  if (rootCat && pathname === `/${rootSegment}`) {
    const url = request.nextUrl.clone();
    url.pathname = collectionPath(rootCat.handle);
    return NextResponse.redirect(url, 308);
  }

  if (pathname.startsWith("/search/")) {
    const segment = pathname.replace(/^\/search\/?/, "");
    if (!segment) return NextResponse.next();

    const catByHandle = categories.find((c) => c.handle === segment);
    if (catByHandle) return NextResponse.next();

    const catBySlug = categories.find((c) => c.slug === segment);
    if (catBySlug) {
      const url = request.nextUrl.clone();
      url.pathname = collectionPath(catBySlug.handle);
      return NextResponse.redirect(url, 308);
    }

    const url = request.nextUrl.clone();
    url.pathname = searchPath();
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/catalogo",
    "/catalogo/:path*",
    "/search/:path*",
    "/woman",
    "/man",
    "/kids",
    "/mujer",
    "/hombre",
    "/niño",
  ],
};
