const ORDER_ID_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function pad2(value: number): string {
  return value.toString().padStart(2, "0");
}

/** Referencia legible en WhatsApp; no implica registro en base de datos. */
export function generateOrderId(date = new Date()): string {
  const stamp = `${date.getFullYear()}${pad2(date.getMonth() + 1)}${pad2(date.getDate())}`;
  let suffix = "";
  for (let i = 0; i < 4; i++) {
    suffix += ORDER_ID_CHARS[Math.floor(Math.random() * ORDER_ID_CHARS.length)];
  }
  return `QC-${stamp}-${suffix}`;
}
