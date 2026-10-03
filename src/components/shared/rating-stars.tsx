"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  rating,
  count,
  size = "sm",
  className,
  showValue = false,
}: {
  rating: number;
  count?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  showValue?: boolean;
}) {
  const starClass =
    size === "lg" ? "size-5" : size === "md" ? "size-4" : "size-3.5";

  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      aria-label={`Rated ${rating} out of 5`}
    >
      <div className="flex items-center" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => {
          const filled = rating >= i - 0.25;
          const partial = !filled && rating >= i - 0.75;
          return (
            <span key={i} className="relative inline-flex">
              <Star className={cn(starClass, "text-muted-foreground/30")} />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: partial ? `${((rating - (i - 1)) % 1) * 100}%` : filled ? "100%" : "0%" }}
              >
                <Star className={cn(starClass, "fill-amber-400 text-amber-400")} />
              </span>
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-semibold tabular-nums text-foreground">
          {rating.toFixed(1)}
        </span>
      )}
      {typeof count === "number" && (
        <span className="text-xs text-muted-foreground">({count})</span>
      )}
    </div>
  );
}