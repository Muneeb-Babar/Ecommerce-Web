"use client";

import { cn } from "@/lib/utils";

export function ProductBadges({
  badges,
  className,
}: {
  badges?: Array<"new" | "sale" | "bestseller" | "limited">;
  className?: string;
}) {
  if (!badges?.length) return null;
  const styles: Record<string, string> = {
    new: "bg-emerald-500 text-white",
    sale: "bg-red-500 text-white",
    bestseller: "bg-amber-500 text-white",
    limited: "bg-purple-500 text-white",
  };

  return (
    <div className={cn("flex flex-col items-start gap-1.5", className)}>
      {badges.map((badge) => (
        <span
          key={badge}
          className={cn(
            "rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-lg",
            styles[badge]
          )}
        >
          {badge === "bestseller" ? "Best Seller" : badge}
        </span>
      ))}
    </div>
  );
}