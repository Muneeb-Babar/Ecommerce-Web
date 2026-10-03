"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Heart,
  Minus,
  Plus,
  RefreshCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Zap,
} from "lucide-react";
import type { Product } from "@/types";
import { Price } from "@/components/shared/price";
import { RatingStars } from "@/components/shared/rating-stars";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem, setCartOpen } from "@/store/slices/cart-slice";
import { toggleWishlist } from "@/store/slices/wishlist-slice";
import { toast } from "sonner";
import { formatReviewCount } from "@/lib/format";
import { colorLabel } from "@/lib/colors";

export function ProductInfo({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const isWishlisted = useAppSelector((s) =>
    s.wishlist.ids.includes(product.id)
  );
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState<string | undefined>(product.colors[0]);
  const [size, setSize] = useState<string | undefined>(
    product.sizes?.[2]
  );
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    dispatch(addItem({ product, quantity, color, size }));
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
    toast.success(`${product.name} added to cart`, {
      description: "Great choice — view it in your bag.",
    });
  };

  const handleBuyNow = () => {
    dispatch(addItem({ product, quantity, color, size }));
    dispatch(setCartOpen(true));
  };

  const toggleWish = () => {
    dispatch(toggleWishlist(product.id));
    toast[isWishlisted ? "info" : "success"](
      isWishlisted ? "Removed from wishlist" : "Added to wishlist"
    );
  };

  return (
    <div className="flex flex-col gap-7">
      <div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {product.brand}
          </span>
          <span className="text-muted-foreground/50">/</span>
          <span className="text-xs font-medium text-muted-foreground">
            {product.categoryLabel}
          </span>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        >
          {product.name}
        </motion.h1>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <RatingStars rating={product.rating} showValue size="md" />
          <span className="text-sm text-muted-foreground">
            {formatReviewCount(product.reviewCount)} reviews
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
              product.stock > 20
                ? "bg-emerald-500/10 text-emerald-600"
                : product.stock > 0
                  ? "bg-amber-500/10 text-amber-600"
                  : "bg-red-500/10 text-red-500"
            )}
          >
            <span
              className={cn(
                "size-1.5 animate-pulse rounded-full",
                product.stock > 20
                  ? "bg-emerald-500"
                  : product.stock > 0
                    ? "bg-amber-500"
                    : "bg-red-500"
              )}
            />
            {product.stock > 20
              ? "In stock"
              : product.stock > 0
                ? `Only ${product.stock} left`
                : "Out of stock"}
          </span>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-5">
        <Price
          price={product.price}
          originalPrice={product.originalPrice}
          size="xl"
          currency={product.currency}
        />
        <p className="mt-2 text-sm text-muted-foreground">
          Or 4 interest-free payments of{" "}
          <span className="font-semibold text-foreground">
            ${(product.price / 4).toFixed(2)}
          </span>{" "}
          with Afterpay
        </p>
      </div>

      {/* Colors */}
      {product.colors.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Color</span>
            <span className="text-sm text-muted-foreground capitalize">
              {color ? colorLabel(color) : "Select"}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                aria-label={`Select color ${c}`}
                className={cn(
                  "grid size-10 place-items-center rounded-full border-2 transition-all duration-200",
                  color === c
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50"
                )}
                style={{ background: c }}
              >
                {color === c && (
                  <Check
                    className={cn(
                      "size-4",
                      c === "#f9fafb" || c === "#f1f5f9" || c === "#f5f5f4" || c === "#ffffff"
                        ? "text-black"
                        : "size-4 text-white"
                    )}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Size</span>
            <button className="text-sm font-medium text-primary hover:underline">
              Size guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={cn(
                  "min-w-12 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-200",
                  size === s
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-foreground hover:border-foreground/50"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity + actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex items-center justify-between rounded-full border border-border px-3 py-2 sm:w-auto">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Minus className="size-4" />
          </button>
          <span className="w-12 text-center text-lg font-bold tabular-nums text-foreground">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            aria-label="Increase quantity"
            className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Plus className="size-4" />
          </button>
        </div>

        <div className="flex flex-1 gap-3">
          <Button
            size="lg"
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="group flex-1 rounded-full text-base shadow-lg shadow-primary/20"
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span
                  key="added"
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Check className="size-5" /> Added!
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <ShoppingBag className="size-5" /> Add to cart
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={toggleWish}
            aria-label="Toggle wishlist"
            className={cn(
              "size-14 shrink-0 rounded-full",
              isWishlisted && "border-red-200 bg-red-50 text-red-500"
            )}
          >
            <motion.span
              key={String(isWishlisted)}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.3 }}
            >
              <Heart className={cn("size-5", isWishlisted && "fill-current")} />
            </motion.span>
          </Button>
        </div>
      </div>

      <Button
        size="lg"
        variant="outline"
        onClick={handleBuyNow}
        className="group w-full rounded-full text-base hover:border-primary hover:bg-primary hover:text-primary-foreground"
      >
        <Zap className="size-4 fill-current transition-transform group-hover:scale-125" />
        Buy it now
      </Button>

      {/* Trust row */}
      <div className="grid grid-cols-1 gap-3 rounded-3xl border border-border p-4 sm:grid-cols-3">
        {[
          { icon: Truck, title: "Free shipping", sub: "Over $150" },
          { icon: RefreshCcw, title: "30-day returns", sub: "Free & easy" },
          { icon: ShieldCheck, title: "2-year warranty", sub: "Covered" },
        ].map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <item.icon className="size-4" />
            </span>
            <div>
              <p className="text-xs font-semibold text-foreground">{item.title}</p>
              <p className="text-[11px] text-muted-foreground">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}