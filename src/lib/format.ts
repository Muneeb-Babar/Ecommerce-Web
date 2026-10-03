export function formatPrice(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDiscount(pct: number): string {
  return `${Math.round(pct)}% OFF`;
}

export function discountPercent(price: number, original?: number): number {
  if (!original || original <= price) return 0;
  return ((original - price) / original) * 100;
}

export function formatReviewCount(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return String(count);
}