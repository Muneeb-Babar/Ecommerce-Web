"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Loader2,
  Lock,
  ShieldCheck,
  Truck,
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
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearCart,
  selectCartItems,
  selectCartSubtotal,
} from "@/store/slices/cart-slice";

export function CheckoutView() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  const [processing, setProcessing] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [payment, setPayment] = useState<"card" | "paypal" | "afterpay">("card");

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPlaced(true);
      dispatch(clearCart());
    }, 1800);
  };

  if (placed) {
    return <OrderSuccess total={total} itemCount={items.length} />;
  }

  return (
    <>
      <PageHeader
        eyebrow="One last step"
        title="Secure checkout"
        description="Your details are encrypted and never shared. Checkout in under a minute."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />

      {items.length === 0 ? (
        <EmptyCheckout />
      ) : (
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
          <form
            onSubmit={placeOrder}
            className="grid gap-10 lg:grid-cols-[1fr_380px]"
          >
            <div className="space-y-6">
              <SectionCard
                step={1}
                title="Contact"
                icon={<CreditCard className="size-4" />}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Email address">
                    <Input type="email" required placeholder="you@example.com" className="h-12 rounded-xl" />
                  </Field>
                  <Field label="Phone (optional)">
                    <Input type="tel" placeholder="+1 (555) 000-0000" className="h-12 rounded-xl" />
                  </Field>
                </div>
              </SectionCard>

              <SectionCard
                step={2}
                title="Shipping address"
                icon={<Truck className="size-4" />}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="First name">
                    <Input required placeholder="Jane" className="h-12 rounded-xl" />
                  </Field>
                  <Field label="Last name">
                    <Input required placeholder="Doe" className="h-12 rounded-xl" />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Street address">
                      <Input required placeholder="123 Commerce Avenue" className="h-12 rounded-xl" />
                    </Field>
                  </div>
                  <Field label="City">
                    <Input required placeholder="San Francisco" className="h-12 rounded-xl" />
                  </Field>
                  <Field label="ZIP / Postal code">
                    <Input required placeholder="94103" className="h-12 rounded-xl" />
                  </Field>
                </div>
              </SectionCard>

              <SectionCard
                step={3}
                title="Payment method"
                icon={<Lock className="size-4" />}
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  {(
                    [
                      { id: "card", label: "Credit card", sub: "Visa · MC · Amex" },
                      { id: "paypal", label: "PayPal", sub: "Fast & secure" },
                      { id: "afterpay", label: "Afterpay", sub: "4 payments" },
                    ] as const
                  ).map((method) => (
                    <button
                      type="button"
                      key={method.id}
                      onClick={() => setPayment(method.id)}
                      className={cn(
                        "rounded-2xl border-2 p-4 text-left transition-all duration-200",
                        payment === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-foreground">{method.label}</span>
                        <span
                          className={cn(
                            "grid size-5 place-items-center rounded-full border-2 transition-colors",
                            payment === method.id
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border"
                          )}
                        >
                          {payment === method.id && <Check className="size-3" />}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{method.sub}</p>
                    </button>
                  ))}
                </div>

                {payment === "card" && (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Field label="Card number">
                        <Input
                          required
                          inputMode="numeric"
                          placeholder="4242 4242 4242 4242"
                          className="h-12 rounded-xl tracking-widest"
                        />
                      </Field>
                    </div>
                    <Field label="Expiry date">
                      <Input required placeholder="MM / YY" className="h-12 rounded-xl" />
                    </Field>
                    <Field label="CVC">
                      <Input required inputMode="numeric" placeholder="123" className="h-12 rounded-xl" />
                    </Field>
                  </div>
                )}
              </SectionCard>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <Button asChild variant="ghost" className="group rounded-full">
                  <Link href="/cart">
                    <ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
                    Back to cart
                  </Link>
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  disabled={processing}
                  className="rounded-full px-8 shadow-xl shadow-primary/20"
                >
                  {processing ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="size-4" />
                      Pay {formatPrice(total)}
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Summary */}
            <aside className="h-fit rounded-3xl border border-border bg-card p-6 lg:sticky lg:top-28">
              <h2 className="text-lg font-bold text-foreground">Order summary</h2>
              <ul className="mt-5 space-y-4">
                {items.map((item) => (
                  <li key={`${item.productId}-${item.color}-${item.size}`} className="flex items-center gap-3">
                    <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-muted">
                      <AppImage src={item.image} alt={item.name} fill sizes="56px" />
                      <span className="absolute -right-0 -top-0 grid size-5 place-items-center rounded-full bg-foreground text-[10px] font-bold text-background">
                        {item.quantity}
                      </span>
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.brand}</p>
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-2.5 border-t border-border pt-5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="text-foreground">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-foreground">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax</span>
                  <span className="text-foreground">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-3 text-base font-bold text-foreground">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-muted/60 px-4 py-3 text-xs text-muted-foreground">
                <ShieldCheck className="size-4 text-emerald-500" />
                Secured with 256-bit SSL encryption
              </div>
            </aside>
          </form>
        </section>
      )}
    </>
  );
}

function SectionCard({
  step,
  title,
  icon,
  children,
}: {
  step: number;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-8 place-items-center rounded-full bg-primary/10 text-primary">
          {icon}
        </span>
        <h3 className="flex items-center gap-2 text-base font-bold text-foreground">
          <span className="grid size-5 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
            {step}
          </span>
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}

function EmptyCheckout() {
  return (
    <section className="mx-auto max-w-lg px-4 pb-24 text-center sm:px-6 lg:px-8">
      <div className="rounded-[2.5rem] border border-dashed border-border py-20">
        <p className="text-lg font-bold text-foreground">Your cart is empty</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Add a few products before heading to checkout.
        </p>
        <Button asChild className="mt-6 rounded-full">
          <Link href="/products">Browse products</Link>
        </Button>
      </div>
    </section>
  );
}

function OrderSuccess({
  total,
  itemCount,
}: {
  total: number;
  itemCount: number;
}) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 pb-28 pt-36 text-center sm:px-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
        className="grid size-24 place-items-center rounded-full bg-emerald-500/10"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 15 }}
          className="grid size-16 place-items-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
        >
          <Check className="size-8" />
        </motion.span>
      </motion.div>

      <h1 className="mt-8 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        Order confirmed!
      </h1>
      <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
        Thank you! Your order of{" "}
        <span className="font-semibold text-foreground">
          {itemCount} {itemCount === 1 ? "item" : "items"} · {formatPrice(total)}
        </span>{" "}
        is being prepared. You'll receive a confirmation email with tracking
        details shortly.
      </p>

      <div className="mt-8 w-full space-y-3">
        <Button asChild size="lg" className="w-full rounded-full">
          <Link href="/products">Continue shopping</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full rounded-full">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}