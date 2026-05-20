/** Rutas alineadas con vercel/commerce */
export function productPath(handle: string) {
  return `/product/${handle}`;
}

export function searchPath() {
  return "/search";
}

/** Colección: /search/woman, /search/man… (vercel/commerce) */
export function collectionPath(handle: string) {
  return `/search/${handle}`;
}
