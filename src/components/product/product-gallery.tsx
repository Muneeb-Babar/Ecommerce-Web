"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Maximize2 } from "lucide-react";
import type { Product } from "@/types";
import { AppImage } from "@/components/shared/image";
import { ProductBadges } from "@/components/shared/product-badges";
import { cn } from "@/lib/utils";

export function ProductGallery({ product }: { product: Product }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [10, -10]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-12, 12]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const image = product.images[activeIndex];

  return (
    <div className="flex flex-col gap-4 lg:flex-row-reverse lg:gap-6">
      {/* Active image with 3D tilt */}
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className="group relative flex-1 overflow-hidden rounded-[2rem] border border-border bg-muted shadow-xl shadow-black/5"
        style={{ perspective: 1200 }}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative aspect-square"
        >
          <AppImage
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={activeIndex === 0}
            className="transition-transform duration-500"
          />
        </motion.div>

        <ProductBadges badges={product.badges} className="absolute left-4 top-4" />

        <button
          onClick={() => window.open(image.src, "_blank", "noopener,noreferrer")}
          aria-label="View fullscreen"
          className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-border/60 bg-background/80 text-foreground opacity-0 backdrop-blur transition-all duration-300 hover:bg-background group-hover:opacity-100"
        >
          <Maximize2 className="size-4" />
        </button>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,transparent,hsl(var(--primary)/0.06))]" />
      </motion.div>

      {/* Thumbnails */}
      <div className="flex gap-3 lg:flex-col">
        {product.images.map((img, i) => (
          <motion.button
            key={img.src}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveIndex(i)}
            aria-label={`View image ${i + 1}`}
            className={cn(
              "relative size-20 shrink-0 overflow-hidden rounded-2xl border-2 transition-colors md:size-24",
              i === activeIndex
                ? "border-primary ring-4 ring-primary/15"
                : "border-border hover:border-primary/40"
            )}
          >
            <AppImage src={img.src} alt="" fill sizes="96px" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}