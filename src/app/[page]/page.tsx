import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { AboutPageContent } from "@/components/pages/about-page";
import { ContactPageContent } from "@/components/pages/contact-page";
import { getProductByHandleSync } from "@/lib/catalog";
import { isStaticPageHandle } from "@/lib/pages";
import { productPath } from "@/lib/paths";

const pageMetadata: Record<string, { title: string; description: string }> = {
  about: {
    title: "Sobre nosotros",
    description: "Conoce ¡Qué Chulito! — moda y estilo en Guatemala.",
  },
  contact: {
    title: "Contacto",
    description: "Contáctanos — ¡Qué Chulito!",
  },
};

export async function generateStaticParams() {
  return [{ page: "about" }, { page: "contact" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  return pageMetadata[page] ?? { title: page };
}

export default async function DynamicPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;

  const product = getProductByHandleSync(page);
  if (product?.active) {
    redirect(productPath(page));
  }

  if (page === "about") {
    return <AboutPageContent />;
  }

  if (page === "contact") {
    return <ContactPageContent />;
  }

  if (!isStaticPageHandle(page)) {
    notFound();
  }

  notFound();
}
