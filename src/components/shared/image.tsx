"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const fallbackGradient =
  "linear-gradient(135deg, hsl(var(--primary)/0.12), hsl(var(--accent)/0.12))";

export function AppImage({
  src,
  alt,
  width = 800,
  height = 800,
  className,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  fill = false,
}: {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn("grid place-items-center", fill ? "absolute inset-0" : "", className)}
        style={{ background: fallbackGradient }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="size-8 text-muted-foreground/40"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onError={() => setError(true)}
        className={cn("object-cover", className)}
        draggable={false}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      onError={() => setError(true)}
      className={cn("object-cover", className)}
      draggable={false}
    />
  );
}