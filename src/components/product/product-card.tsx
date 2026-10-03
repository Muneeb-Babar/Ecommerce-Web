"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { AppImage } from "@/components/shared/image";
import { Price } from "@/components/shared/price";
import { RatingStars } from "@/components/shared/rating-stars";
import { ProductBadges } from "@/components/shared/product-badges";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem, setCartOpen } from "@/store/slices/cart-slice";
import { toggleWishlist } from "@/store/slices/wishlist-slice";
import { toast } from "sonner";

export function ProductCard({
  product,
  index = 0,
  className,
}: {
  product: Product;
  index?: number;
  className?: string;
}) {
  const dispatch = useAppDispatch();
  const isWishlisted = useAppSelector((s) =>
    s.wishlist.ids.includes(product.id)
  );
  const [hovered, setHovered] = useState(false);

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItem({ product }));
    dispatch(setCartOpen(false));
    toast.success(`${product.name} added to cart`, {
      description: "Great choice — it’s on its way to your bag.",
    });
  };

  const toggleWish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product.id));
    toast[isWishlisted ? "info" : "success"](
      isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      { description: product.name }
    );
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5",
        className
      )}
    >
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-muted"
        aria-label={product.name}
      >
        {/* Primary image */}
        <AppImage
          src={product.images[0]?.src}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={cn(
            "transition-all duration-700 ease-out",
            hovered ? "scale-110 opacity-0 blur-[2px]" : "scale-100 opacity-100"
          )}
        />
        {/* Hover image */}
        {product.images[1] && (
          <AppImage
            src={product.images[1].src}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={cn(
              "transition-all duration-700 ease-out",
              hovered ? "scale-105 opacity-100" : "scale-100 opacity-0"
            )}
          />
        )}

        <ProductBadges
          badges={product.badges}
          className="absolute left-3 top-3"
        />

        {/* Quick add button */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-x-3 bottom-3"
            >
              <button
                onClick={addToCart}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-foreground/95 py-3 text-sm font-semibold text-background shadow-lg backdrop-blur transition-colors hover:bg-foreground"
              >
                <ShoppingBag className="size-4" />
                Add to cart
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      {/* Wishlist */}
      <button
        onClick={toggleWish}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className={cn(
          "absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full border border-border/60 bg-background/80 shadow-sm backdrop-blur transition-all duration-300",
          isWishlisted
            ? "text-red-500"
            : "text-foreground/60 hover:bg-background hover:text-red-500"
        )}
      >
        <motion.span
          key={String(isWishlisted)}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
        >
          <Heart className={cn("size-4", isWishlisted && "fill-current")} />
        </motion.span>
      </button>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {product.brand}
          </p>
          <p
            className={cn(
              "flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
              product.stock > 0
                ? "bg-emerald-500/10 text-emerald-600"
                : "bg-red-500/10 text-red-500"
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                product.stock > 0 ? "bg-emerald-500" : "bg-red-500"
              )}
            />
            {product.stock > 0 ? (product.stock < 20 ? "Low stock" : "In stock") : "Sold out"}
          </p>
        </div>

        <Link href={`/products/${product.slug}`} className="mt-1.5">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors hover:text-primary sm:text-base">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-1.5">
          <RatingStars rating={product.rating} count={product.reviewCount} />
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <Price price={product.price} originalPrice={product.originalPrice} size="md" />
        </div>
      </div>
    </motion.article>
  );
}