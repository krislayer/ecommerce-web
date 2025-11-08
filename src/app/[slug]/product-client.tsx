"use client";

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/store/slice/cartSlice";
import { setCartOpen } from "@/store/slice/cartSlice";
import { useFavorites } from "@/lib/hooks/useFavorites";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Heart, ChevronRight, Share2, Package, RotateCcw, Truck, Sparkles, Copy, Check, ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/domain/entities/product";
import type { RootState } from "@/store";
import { categories } from "@/lib/data/categories";
import { sampleProducts } from "@/lib/data/products";

// Constante para la cantidad de productos relacionados a mostrar
// Configurado para 4 coincidiendo con el grid lg:grid-cols-4
const RELATED_PRODUCTS_LIMIT = 4;

interface ProductClientProps {
  product: Product;
  relatedProducts?: Product[];
}

export function ProductClient({ product }: ProductClientProps) {
  const dispatch = useDispatch();
  const { isFavorite, handleToggleFavorite, isAuthenticated } = useFavorites();
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  const isProductFavorite = isFavorite(product.id);

  // Obtener categorías del producto
  const productCategories = product.categoryIds
    .map(catId => categories.find(c => c.id === catId))
    .filter((cat): cat is NonNullable<typeof cat> => cat !== undefined);

  // Productos relacionados (misma categoría, excluyendo el actual)
  // Muestra hasta RELATED_PRODUCTS_LIMIT productos relacionados
  const relatedProducts = sampleProducts
    .filter(p => 
      p.id !== product.id && 
      p.active &&
      p.categoryIds.some(catId => product.categoryIds.includes(catId))
    )
    .slice(0, RELATED_PRODUCTS_LIMIT);

  // Cerrar menú de compartir al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    };

    if (showShareMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareMenu]);

  // Función para compartir - móvil usa Web Share API, web muestra menú
  const handleShareClick = async () => {
    // En móviles, usar Web Share API nativa si está disponible
    if (typeof window !== 'undefined' && navigator.share && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
        return;
      } catch (err) {
        // Usuario canceló o hubo error - mostrar menú de todas formas
      }
    }
    
    // En web o si Web Share API no está disponible, mostrar menú
    setShowShareMenu(!showShareMenu);
  };

  // Funciones de compartir específicas
  const shareToWhatsApp = () => {
    // WhatsApp detecta automáticamente URLs que comienzan con http:// o https://
    // En localhost no funcionará, pero en producción con HTTPS sí será clickeable
    const url = window.location.href;
    const message = `Mira este producto: ${product.name}\n\n${url}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    setShowShareMenu(false);
  };

  const copyLink = async () => {
    if (typeof window === 'undefined') return;
    
    const url = window.location.href;
    
    // Intentar con Clipboard API moderno
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        setLinkCopied(true);
        setTimeout(() => {
          setLinkCopied(false);
          setShowShareMenu(false);
        }, 2000);
        return;
      } catch (err) {
        // Si falla, usar método alternativo
      }
    }
    
    // Fallback para navegadores más antiguos o móviles
    try {
      // Crear un elemento temporal de texto
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        setLinkCopied(true);
        setTimeout(() => {
          setLinkCopied(false);
          setShowShareMenu(false);
        }, 2000);
      }
    } catch (err) {
      // Error al copiar
      console.error('Error al copiar enlace:', err);
    }
  };

  // Obtener atributos del producto para mostrar
  const productAttrs = Object.entries(product.attrs).filter(([key]) => 
    key !== 'size' // Excluir size porque ya está en la selección de variantes
  );

  const formatPrice = (price: number) => {
    if (price % 1 === 0) {
      return `Q${price}`;
    }
    return `Q${price.toFixed(2)}`;
  };


  const handleAddToCart = () => {
    // Validar que se haya seleccionado una talla
    if (!selectedAttributes.size) {
      return;
    }

    const tempVariant = {
      id: product.id,
      productId: product.id,
      attributes: selectedAttributes,
      price: product.price,
      stock: 10,
      sku: product.id,
      image: product.images[0],
    };

    dispatch(
      addItem({
        variant: tempVariant,
        quantity,
      })
    );
    dispatch(setCartOpen(true));
  };

  // Función para agregar productos relacionados al carrito
  const handleRelatedAddToCart = (relatedProduct: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Crear un ProductVariant básico para el carrito
    const variant = {
      id: `${relatedProduct.id}-default`,
      productId: relatedProduct.id,
      sku: relatedProduct.id,
      name: relatedProduct.name,
      price: relatedProduct.price,
      stock: 10, // Stock por defecto
      attributes: relatedProduct.attrs,
      image: relatedProduct.images[0],
    };

    dispatch(addItem({
      variant,
      quantity: 1,
    }));
    
    // Abrir el carrito después de agregar
    dispatch(setCartOpen(true));
  };

  // Función para manejar favoritos en productos relacionados
  const handleRelatedFavoriteClick = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }
    
    handleToggleFavorite(productId);
  };

  // Verificar si el botón de agregar al carrito debe estar deshabilitado
  const isAddToCartDisabled = !selectedAttributes.size || !product.active;

  return (
    <div className="min-h-screen mac-bg-grouped">
      <div className="max-w-7xl mx-auto px-mac-md py-mac-xl mac-fade-in">
        {/* Breadcrumbs */}
        {productCategories.length > 0 && (
          <div className="mb-mac-md">
            <nav className="flex items-center gap-mac-xs mac-text-footnote mac-text-secondary">
              <Link href="/" className="hover:mac-text-primary mac-transition-colors">
                Inicio
              </Link>
              <ChevronRight className="mac-icon-small" />
              <Link href="/catalogo" className="hover:mac-text-primary mac-transition-colors">
                Catálogo
              </Link>
              {productCategories.map((category, index) => (
                <span key={category.id} className="flex items-center gap-mac-xs">
                  <ChevronRight className="mac-icon-small" />
                  <Link 
                    href={`/catalogo?category=${category.id}`}
                    className="hover:mac-text-primary mac-transition-colors"
                  >
                    {category.name}
                  </Link>
                </span>
              ))}
            </nav>
          </div>
        )}

        {/* Header con título y acciones */}
        <div className="mac-card mb-mac-lg">
          <div className="flex items-start justify-between gap-mac-md">
            <div className="flex-1">
              <h1 className="mac-text-large-title mac-text-primary mb-mac-sm">
                {product.name}
              </h1>
              {/* Badges de información */}
              <div className="flex flex-wrap gap-mac-sm">
                {/* Badge de condición */}
                {product.condition === "new" ? (
                  <span 
                    className="mac-chip inline-flex items-center gap-mac-xs badge-new"
                  >
                    <Sparkles className="mac-icon-small" />
                    <span className="font-medium">Nuevo</span>
                  </span>
                ) : (
                  <span 
                    className="mac-chip inline-flex items-center gap-mac-xs badge-used"
                  >
                    <span className="font-medium">Seminuevo</span>
                  </span>
                )}
                {/* Badge de calificación para productos seminuevos */}
                {product.condition === "used" && product.conditionRating !== undefined && (
                  <span className="mac-chip mac-text-caption-1 badge-rating">
                    <span className="font-semibold">{product.conditionRating}</span>
                    <span className="mac-text-tertiary">/10</span>
                  </span>
                )}
              </div>
            </div>
            {/* Botones de acción */}
            <div className="flex items-center gap-mac-sm">
              {/* Botón Compartir con menú */}
              <div className="relative" ref={shareMenuRef}>
                <button
                  onClick={handleShareClick}
                  className="mac-touch-target rounded-full flex items-center justify-center hover:bg-mac-gray-2 dark:hover:bg-mac-gray-6 mac-transition-colors"
                  aria-label="Compartir producto"
                  aria-expanded={showShareMenu}
                >
                  <Share2 className="mac-icon-large mac-text-secondary" />
                </button>
                
                {/* Menú de compartir */}
                {showShareMenu && (
                  <div className="absolute right-0 top-full mt-mac-xs mac-card min-w-[200px] z-50 shadow-mac-md">
                    <div className="py-mac-xs">
                      <button
                        onClick={shareToWhatsApp}
                        className="w-full px-mac-md py-mac-md flex items-center gap-mac-sm hover:bg-mac-gray-2 dark:hover:bg-mac-gray-6 mac-transition-colors text-left mac-text-body mac-text-primary min-h-[44px]"
                      >
                        <Share2 className="mac-icon-medium mac-text-secondary" />
                        WhatsApp
                      </button>
                      <div className="mac-separator my-mac-xs"></div>
                      <button
                        onClick={copyLink}
                        className="w-full px-mac-md py-mac-md flex items-center gap-mac-sm hover:bg-mac-gray-2 dark:hover:bg-mac-gray-6 mac-transition-colors text-left mac-text-body mac-text-primary min-h-[44px]"
                      >
                        {linkCopied ? (
                          <>
                            <Check className="mac-icon-medium" style={{ color: 'var(--mac-green)' }} />
                            <span style={{ color: 'var(--mac-green)' }}>Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="mac-icon-medium mac-text-secondary" />
                            Copiar enlace
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {/* Botón Favoritos */}
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    window.location.href = "/login";
                    return;
                  }
                  handleToggleFavorite(product.id);
                }}
                className={`mac-touch-target rounded-full flex items-center justify-center mac-transition-colors shrink-0 ${
                  isProductFavorite
                    ? "bg-mac-red/10"
                    : "hover:bg-mac-gray-2 dark:hover:bg-mac-gray-6"
                } ${!isAuthenticated ? "opacity-70" : ""}`}
                aria-label={isProductFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                title={!isAuthenticated ? "Inicia sesión para agregar favoritos" : ""}
              >
                <Heart 
                  className="mac-icon-large mac-text-secondary" 
                  fill={isProductFavorite ? "var(--mac-red)" : "none"} 
                  stroke={isProductFavorite ? "var(--mac-red)" : "currentColor"}
                  style={isProductFavorite ? { color: 'var(--mac-red)' } : {}}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mac-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-mac-xl">
            {/* Images Gallery */}
            <div className="space-y-mac-md">
              {/* Imagen principal */}
              <div className="aspect-square relative overflow-hidden bg-mac-gray-2 rounded-mac-lg mac-card p-0">
                <Image
                  src={product.images[selectedImageIndex]}
                  alt={`${product.name} - Imagen ${selectedImageIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  priority
                />
              </div>
              
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-mac-sm overflow-x-auto pb-mac-xs">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 aspect-square w-20 h-20 relative overflow-hidden rounded-mac-md border-2 transition-all mac-touch-target ${
                        selectedImageIndex === index
                          ? "border-mac-blue ring-2 ring-mac-blue/20"
                          : "border-transparent hover:border-mac-separator"
                      }`}
                      aria-label={`Ver imagen ${index + 1} de ${product.images.length}`}
                      aria-pressed={selectedImageIndex === index}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} - Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-mac-lg">
              {/* Precio */}
              <div>
                <div className="flex items-baseline gap-mac-md">
                  <p className="mac-text-title-1 mac-text-primary" style={{ color: 'var(--mac-blue)' }}>
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
              {/* Separador después del precio */}
              <div className="mac-separator my-mac-lg"></div>

              {/* Descripción */}
              <div>
                <h2 className="mac-text-subhead mac-text-primary mb-mac-sm font-semibold">
                  Descripción
                </h2>
                <p className="mac-text-body mac-text-secondary leading-relaxed">{product.description}</p>
              </div>

              {/* Separador visual */}
              <div className="mac-separator my-mac-lg"></div>

              {/* Variant Selection */}
              <div className="space-y-mac-md">
                <div>
                  <label className="mac-text-subhead mac-text-primary mb-mac-sm block font-semibold">
                    Talla
                  </label>
                  <div className="flex flex-wrap gap-mac-sm">
                    {["S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        onClick={() =>
                          setSelectedAttributes({ ...selectedAttributes, size: size })
                        }
                        className={`mac-chip mac-touch-target ${
                          selectedAttributes.size === size
                            ? "selected"
                            : ""
                        }`}
                        aria-label={`Seleccionar talla ${size}`}
                        aria-pressed={selectedAttributes.size === size}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {!selectedAttributes.size && (
                    <p className="mac-text-footnote mac-text-secondary mt-mac-sm">
                      Selecciona una talla para continuar
                    </p>
                  )}
                </div>
              </div>

              {/* Separador visual */}
              <div className="mac-separator my-mac-lg"></div>

              {/* Especificaciones/Atributos */}
              {productAttrs.length > 0 && (
                <>
                  <div>
                    <h2 className="mac-text-subhead mac-text-primary mb-mac-sm font-semibold">
                      Especificaciones
                    </h2>
                    <div className="space-y-mac-xs">
                      {productAttrs.map(([key, value]) => (
                        <div key={key} className="flex justify-between py-mac-xs">
                          <span className="mac-text-body mac-text-secondary capitalize">
                            {key.replace(/-/g, ' ')}:
                          </span>
                          <span className="mac-text-body mac-text-primary font-medium">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mac-separator my-mac-lg"></div>
                </>
              )}

              {/* Quantity */}
              <div>
                <label className="mac-text-subhead mac-text-primary mb-mac-sm block font-semibold">
                  Cantidad
                </label>
                <div className="flex items-center gap-mac-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="mac-touch-target flex items-center justify-center rounded-mac-sm bg-mac-gray-2 dark:bg-mac-gray-6 hover:bg-mac-gray-3 dark:hover:bg-mac-gray-5 mac-transition-colors"
                    aria-label="Disminuir cantidad"
                  >
                    <Minus className="mac-icon-medium mac-text-primary" />
                  </button>
                  <span className="mac-text-body mac-text-primary min-w-[40px] text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="mac-touch-target flex items-center justify-center rounded-mac-sm bg-mac-gray-2 dark:bg-mac-gray-6 hover:bg-mac-gray-3 dark:hover:bg-mac-gray-5 mac-transition-colors"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="mac-icon-medium mac-text-primary" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={isAddToCartDisabled}
                className={`mac-button-primary w-full mt-mac-md ${
                  isAddToCartDisabled 
                    ? "opacity-50 cursor-not-allowed pointer-events-none" 
                    : ""
                }`}
                aria-label={isAddToCartDisabled ? "Selecciona una talla para agregar al carrito" : "Agregar al carrito"}
              >
                {isAddToCartDisabled ? "Selecciona una talla" : "Agregar al Carrito"}
              </button>
            </div>
          </div>
        </div>

        {/* Información de entrega y devoluciones */}
        <div className="mac-card mt-mac-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-mac-lg">
            <div className="flex items-start gap-mac-md">
              <div className="rounded-full bg-mac-blue/10 p-mac-sm flex-shrink-0">
                <Truck className="mac-icon-medium" style={{ color: 'var(--mac-blue)' }} />
              </div>
              <div>
                <h3 className="mac-text-subhead mac-text-primary mb-mac-xs font-semibold">
                  Entrega Gratis
                </h3>
                <p className="mac-text-footnote mac-text-secondary">
                  En compras mayores a Q300
                </p>
              </div>
            </div>
            <div className="flex items-start gap-mac-md">
              <div className="rounded-full bg-mac-green/10 p-mac-sm flex-shrink-0">
                <Package className="mac-icon-medium" style={{ color: 'var(--mac-green)' }} />
              </div>
              <div>
                <h3 className="mac-text-subhead mac-text-primary mb-mac-xs font-semibold">
                  Entrega Rápida
                </h3>
                <p className="mac-text-footnote mac-text-secondary">
                  De 24 a 48 horas
                </p>
              </div>
            </div>
            <div className="flex items-start gap-mac-md">
              <div className="rounded-full bg-mac-orange/10 p-mac-sm flex-shrink-0">
                <RotateCcw className="mac-icon-medium" style={{ color: 'var(--mac-orange)' }} />
              </div>
              <div>
                <h3 className="mac-text-subhead mac-text-primary mb-mac-xs font-semibold">
                  Devoluciones
                </h3>
                <p className="mac-text-footnote mac-text-secondary">
                  Hasta 30 días después
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Productos Relacionados */}
        {relatedProducts.length > 0 && (
          <div className="mt-mac-xl">
            <h2 className="mac-text-title-2 mac-text-primary mb-mac-lg">
              Productos Relacionados
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-mac-md">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/${relatedProduct.id}`} className="h-full group">
                  <div className="mac-product-card h-full flex flex-col">
                    {/* Imagen */}
                    <div className="aspect-square relative overflow-hidden bg-mac-gray-2 shrink-0">
                      <Image
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-[1.02] mac-transition-transform"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                    
                    {/* Contenido */}
                    <div className="p-mac-md flex flex-col grow">
                      {/* Badges de condición y calificación */}
                      <div className="flex flex-wrap gap-mac-xs mb-mac-sm">
                        {relatedProduct.condition === "new" ? (
                          <span className="badge-new mac-chip inline-flex items-center gap-mac-xs" style={{ padding: '2px 8px', fontSize: '11px' }}>
                            <Sparkles className="mac-icon-small" style={{ width: '10px', height: '10px' }} />
                            <span className="font-medium">Nuevo</span>
                          </span>
                        ) : (
                          <>
                            <span className="badge-used mac-chip inline-flex items-center gap-mac-xs" style={{ padding: '2px 8px', fontSize: '11px' }}>
                              <span className="font-medium">Seminuevo</span>
                            </span>
                            {relatedProduct.conditionRating !== undefined && (
                              <span className="badge-rating mac-chip mac-text-caption-1" style={{ padding: '2px 8px', fontSize: '11px' }}>
                                <span className="font-semibold">{relatedProduct.conditionRating}</span>
                                <span className="mac-text-tertiary">/10</span>
                              </span>
                            )}
                          </>
                        )}
                      </div>

                      {/* Título */}
                      <h3 className="mac-product-card-title line-clamp-2 mb-mac-sm">
                        {relatedProduct.name}
                      </h3>
                      
                      {/* Precio */}
                      <div className="mb-mac-sm">
                        <p className="mac-product-card-price">
                          {formatPrice(relatedProduct.price)}
                        </p>
                      </div>

                      {/* Botones de acción */}
                      <div className="flex gap-mac-sm mt-auto justify-end">
                        {/* Botón Favoritos */}
                        <button
                          onClick={(e) => handleRelatedFavoriteClick(relatedProduct.id, e)}
                          className={`mac-touch-target rounded-full flex items-center justify-center mac-transition-colors ${
                            isFavorite(relatedProduct.id)
                              ? "bg-mac-red/10"
                              : "hover:bg-mac-gray-2 dark:hover:bg-mac-gray-6"
                          } ${!isAuthenticated ? "opacity-70" : ""}`}
                          aria-label={isFavorite(relatedProduct.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
                          title={!isAuthenticated ? "Inicia sesión para agregar favoritos" : ""}
                        >
                          <Heart 
                            className="mac-icon-medium mac-text-secondary" 
                            fill={isFavorite(relatedProduct.id) ? "var(--mac-red)" : "none"} 
                            stroke={isFavorite(relatedProduct.id) ? "var(--mac-red)" : "currentColor"}
                            style={isFavorite(relatedProduct.id) ? { color: 'var(--mac-red)' } : {}}
                          />
                        </button>

                        {/* Botón Agregar al Carrito */}
                        <button
                          onClick={(e) => handleRelatedAddToCart(relatedProduct, e)}
                          className="mac-touch-target rounded-full flex items-center justify-center hover:bg-mac-gray-2 dark:hover:bg-mac-gray-6 mac-transition-colors"
                          aria-label="Agregar al carrito"
                        >
                          <ShoppingCart className="mac-icon-medium mac-text-secondary" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
