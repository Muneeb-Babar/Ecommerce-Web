"use client";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { discountPercent } from "@/lib/format";

export function Price({
  price,
  originalPrice,
  currency = "USD",
  size = "md",
  className,
  showDiscount = true,
}: {
  price: number;
  originalPrice?: number;
  currency?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showDiscount?: boolean;
}) {
  const discount = discountPercent(price, originalPrice);
  const priceClass =
    size === "xl"
      ? "text-3xl md:text-4xl"
      : size === "lg"
        ? "text-xl md:text-2xl"
        : size === "md"
          ? "text-base md:text-lg"
          : "text-sm";

  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-1", className)}>
      <span className={cn("font-bold tracking-tight text-foreground", priceClass)}>
        {formatPrice(price, currency)}
      </span>
      {originalPrice && originalPrice > price && (
        <span className="text-sm text-muted-foreground line-through">
          {formatPrice(originalPrice, currency)}
        </span>
      )}
      {showDiscount && discount > 0 && (
        <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-red-500">
          -{Math.round(discount)}%
        </span>
      )}
    </div>
  );
}