// Format price for display: "5000000" → "5 triệu", "3500000" → "3.5 triệu"
export function formatPrice(price: string): string {
  const num = parseInt(price.replace(/\D/g, ""));
  if (!num) return price;
  if (num >= 1000000) {
    const millions = num / 1000000;
    return `${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)} triệu`;
  }
  if (num >= 1000) return `${(num / 1000).toFixed(0)}k`;
  return price;
}

// Format number with dots: 5000000 → "5.000.000"
export function formatNumberWithDots(value: string): string {
  const num = value.replace(/\D/g, "");
  if (!num) return "";
  return Number(num).toLocaleString("vi-VN");
}
