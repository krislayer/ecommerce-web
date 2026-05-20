import { ImageResponse } from "next/og";
import { getProductByHandle } from "@/lib/catalog";

export const runtime = "edge";
export const alt = "Producto";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: "#171717",
            color: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ¡Qué Chulito!
        </div>
      ),
      { ...size },
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
        }}
      >
        <div style={{ fontSize: 28, color: "#737373", fontWeight: 600 }}>¡Qué Chulito!</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: 56, fontWeight: 700, color: "#171717", lineHeight: 1.2 }}>
            {product.name}
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: "#2563eb",
              background: "#eff6ff",
              padding: "12px 24px",
              borderRadius: 999,
              alignSelf: "flex-start",
            }}
          >
            Q{product.price.toFixed(2)}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
