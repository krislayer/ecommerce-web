import type { Metadata } from "next";
import { ThreeItemGrid } from "@/components/grid/three-items";
import { Carousel } from "@/components/carousel";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  description: "Moda y estilo para toda la familia en Guatemala. Entregas y pickup disponibles.",
  openGraph: {
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <ThreeItemGrid />
      <Carousel />
      <Footer />
    </>
  );
}
