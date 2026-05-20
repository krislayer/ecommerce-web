import { ImageResponse } from "next/og";

export const alt = "¡Qué Chulito!";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "32px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: 24,
            border: "2px solid #404040",
            background: "#171717",
            color: "white",
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          QC
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, color: "white" }}>¡Qué Chulito!</div>
      </div>
    ),
    { ...size },
  );
}
