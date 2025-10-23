import { ProductGrid } from "./product-grid";
import { sampleProducts } from "@/lib/data/products";
import { LiquidGlassCard } from "@/components/liquid-glass-card";

export default function CatalogoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 fade-in">
      <LiquidGlassCard className="p-8 mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-adaptive-primary">
          Catálogo
        </h1>
        <p className="text-lg text-adaptive-secondary">
          Descubre nuestra colección de moda y estilo
        </p>
      </LiquidGlassCard>
      <ProductGrid products={sampleProducts} />
    </div>
  );
}
