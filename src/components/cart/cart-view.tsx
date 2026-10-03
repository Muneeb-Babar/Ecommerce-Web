"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Lock,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppImage } from "@/components/shared/image";
import { PageHeader } from "@/components/shared/page-header";
import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FEE,
  TAX_RATE,
} from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import { colorLabel } from "@/lib/colors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeItem,
  selectCartItems,
  selectCartOriginalTotal,
  selectCartSubtotal,
  updateQuantity,
} from "@/store/slices/cart-slice";
import { fadeUp, staggerContainer } from "@/components/shared/motion";
import { toast } from "sonner";

export function CartView() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const originalTotal = useAppSelector(selectCartOriginalTotal);
  const savings = Math.max(0, originalTotal - subtotal);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  const shippingDebit = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <>
      <PageHeader
        eyebrow="Almost there"
        title="Your cart"
        description={`You have ${items.length} ${items.length === 1 ? "item" : "items"} ready for the final steps.`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Cart" }]}
      />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center gap-5 rounded-[2.5rem] border border-dashed border-border py-24 text-center"
          >
            <span className="grid size-24 place-items-center rounded-full bg-gradient-to-br from-primary/10 to-accent/10">
              <ShoppingBag className="size-10 text-primary" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-foreground">Your cart is empty</h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Looks like you haven’t added anything yet. Explore the collection
                and find something special.
              </p>
            </div>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/products">
                Start shopping
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            {/* Items */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-5"
            >
              {shippingDebit > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm"
                >
                  Add <span className="font-bold text-primary">{formatPrice(shippingDebit)}</span> more
                  to unlock <span className="font-bold">free express shipping</span>.
                </motion.div>
              )}

              {items.map((item) => (
                <motion.div
                  layout
                  key={`${item.productId}-${item.color}-${item.size}`}
                  variants={fadeUp}
                  className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5"
                >
                  <Link
                    href={`/products/${item.slug}`}
                    className="relative block size-28 shrink-0 overflow-hidden rounded-2xl bg-muted"
                  >
                    <AppImage src={item.image} alt={item.name} fill sizes="112px" />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${item.slug}`}
                      className="line-clamp-1 text-base font-semibold text-foreground hover:text-primary"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.brand}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.color && <ColorPill color={item.color} />}
                      {item.size && <span className="ml-3">Size: {item.size}</span>}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-3">
                    <div className="flex items-center rounded-full border border-border">
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId: item.productId,
                              color: item.color,
                              size: item.size,
                              quantity: item.quantity - 1,
                            })
                          )
                        }
                        aria-label="Decrease quantity"
                        className="p-2.5 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-8 text-center font-semibold tabular-nums text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId: item.productId,
                              color: item.color,
                              size: item.size,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        aria-label="Increase quantity"
                        className="p-2.5 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-base font-bold text-foreground">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      {item.originalPrice && (
                        <p className="text-xs text-muted-foreground line-through">
                          {formatPrice(item.originalPrice * item.quantity)}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() =>
                        dispatch(
                          removeItem({
                            productId: item.productId,
                            color: item.color,
                            size: item.size,
                          })
                        )
                      }
                      aria-label={`Remove ${item.name}`}
                      className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-fit space-y-5 rounded-3xl border border-border bg-card p-6 lg:sticky lg:top-28"
            >
              <h2 className="text-lg font-bold text-foreground">Order summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold text-foreground">{formatPrice(subtotal)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discounts</span>
                    <span>-{formatPrice(savings)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold text-foreground">
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated tax</span>
                  <span className="font-semibold text-foreground">{formatPrice(tax)}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-start gap-2 rounded-2xl border border-dashed border-border p-3">
                  <Tag className="mt-0.5 size-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">Have a promo code?</p>
                    <div className="mt-2 flex gap-2">
                      <Input placeholder="e.g. NOVA15" className="h-9 rounded-lg text-sm" />
                      <Button variant="outline" size="sm" className="h-9 rounded-lg" onClick={() => toast.info("Promo codes active soon")}>
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-4">
                <span className="text-base font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold tracking-tight text-foreground">
                  {formatPrice(total)}
                </span>
              </div>

              <Button asChild size="lg" className="group w-full rounded-full text-base">
                <Link href="/checkout">
                  <Lock className="size-4" />
                  Secure checkout
                  <ArrowRight className="ml-auto size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="size-4 text-emerald-500" />
                Payments are encrypted & secure
              </div>
            </motion.div>
          </div>
        )}
      </section>
    </>
  );
}

function ColorPill({ color }: { color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="inline-block size-3 rounded-full border border-black/10"
        style={{ background: color }}
      />
      {colorLabel(color)}
    </span>
  );
}