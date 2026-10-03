"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeItem,
  selectCartCount,
  selectCartSubtotal,
  selectCartOriginalTotal,
  selectCartItems,
  setCartOpen,
  updateQuantity,
} from "@/store/slices/cart-slice";
import { SITE_NAME } from "@/lib/constants";
import { easeOutQuint } from "@/components/shared/motion";
import type { CartItem } from "@/types";
import { colorLabel } from "@/lib/colors";

export function CartDrawer() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const isOpen = useAppSelector((s) => s.cart.isOpen);
  const count = useAppSelector(selectCartCount);
  const subtotal = useAppSelector(selectCartSubtotal);
  const originalTotal = useAppSelector(selectCartOriginalTotal);
  const savings = Math.max(0, originalTotal - subtotal);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(setCartOpen(false))}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: easeOutQuint }}
            aria-label="Shopping cart"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-background shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  Your Cart
                  <span className="ml-2 text-sm font-medium text-muted-foreground">
                    ({count} {count === 1 ? "item" : "items"})
                  </span>
                </h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => dispatch(setCartOpen(false))}
                aria-label="Close cart"
                className="rounded-full"
              >
                <X className="size-5" />
              </Button>
            </header>

            {items.length === 0 ? (
              <EmptyCart onClose={() => dispatch(setCartOpen(false))} />
            ) : (
              <>
                <div className="border-b border-border px-5 py-4">
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <p className="text-sm font-medium text-foreground">
                      {remaining > 0 ? (
                        <>
                          Add{" "}
                          <span className="font-bold text-primary">
                            {formatPrice(remaining)}
                          </span>{" "}
                          more for free shipping
                        </>
                      ) : (
                        "You've unlocked free shipping!"
                      )}
                    </p>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <ul className="space-y-4">
                    <AnimatePresence initial={false}>
                      {items.map((item) => (
                        <CartItemRow
                          key={`${item.productId}-${item.color}-${item.size}`}
                          item={item}
                          onRemove={() =>
                            dispatch(
                              removeItem({
                                productId: item.productId,
                                color: item.color,
                                size: item.size,
                              })
                            )
                          }
                          onUpdate={(q) =>
                            dispatch(
                              updateQuantity({
                                productId: item.productId,
                                color: item.color,
                                size: item.size,
                                quantity: q,
                              })
                            )
                          }
                        />
                      ))}
                    </AnimatePresence>
                  </ul>
                </div>

                <footer className="space-y-4 border-t border-border bg-background px-5 py-5">
                  {savings > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">You save</span>
                      <span className="font-semibold text-emerald-600">
                        {formatPrice(savings)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-sm font-medium text-foreground">
                      {subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0
                        ? "Free"
                        : formatPrice(SHIPPING_FEE)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <span className="text-lg font-semibold text-foreground">Subtotal</span>
                    <span className="text-2xl font-bold tracking-tight text-foreground">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <Button
                    asChild
                    size="lg"
                    className="group w-full rounded-full text-base"
                  >
                    <Link href="/checkout">
                      Checkout
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full rounded-full"
                  >
                    <Link href="/cart">View full cart</Link>
                  </Button>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function CartItemRow({
  item,
  onRemove,
  onUpdate,
}: {
  item: CartItem;
  onRemove: () => void;
  onUpdate: (q: number) => void;
}) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 24, transition: { duration: 0.2 } }}
      className="flex gap-3"
    >
      <Link
        href={`/products/${item.slug}`}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted"
      >
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt={item.name}
            className="size-full object-cover"
          />
        ) : (
          <span className="grid size-full place-items-center text-muted-foreground">
            <ShoppingBag className="size-6" />
          </span>
        )}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              href={`/products/${item.slug}`}
              className="line-clamp-1 text-sm font-semibold text-foreground hover:text-primary"
            >
              {item.name}
            </Link>
            <p className="mt-0.5 text-xs text-muted-foreground">{item.brand}</p>
            {(item.color || item.size) && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                {item.color && (
                  <span className="mr-1.5 inline-flex items-center gap-1">
                    <span
                      className="inline-block size-2.5 rounded-full border border-black/10"
                      style={{ background: item.color }}
                    />
                    {colorLabel(item.color)}
                  </span>
                )}
                {item.size && <span>Size {item.size}</span>}
              </p>
            )}
          </div>
          <button
            onClick={onRemove}
            aria-label={`Remove ${item.name}`}
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center rounded-full border border-border">
            <button
              onClick={() => onUpdate(item.quantity - 1)}
              aria-label="Decrease quantity"
              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-7 text-center text-sm font-semibold tabular-nums">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdate(item.quantity + 1)}
              aria-label="Increase quantity"
              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-foreground">
              {formatPrice(item.price * item.quantity)}
            </p>
            {item.originalPrice && (
              <p className="text-xs text-muted-foreground line-through">
                {formatPrice(item.originalPrice * item.quantity)}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.li>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="grid size-24 place-items-center rounded-full bg-gradient-to-br from-primary/10 to-accent/10"
      >
        <ShoppingBag className="size-10 text-primary" />
      </motion.div>
      <h3 className="text-lg font-bold text-foreground">Your cart is empty</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Looks like you haven’t added anything yet. Explore our curated collection
        and find something you’ll love.
      </p>
      <Button asChild size="lg" onClick={onClose} className="group mt-2 rounded-full">
        <Link href="/products">
          Start shopping
          <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Free shipping on orders over ${FREE_SHIPPING_THRESHOLD} — {SITE_NAME}
      </p>
    </div>
  );
}