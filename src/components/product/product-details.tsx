"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  Smile,
} from "lucide-react";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, viewportOnce } from "@/components/shared/motion";

export function ProductDetails({ product }: { product: Product }) {
  const [open, setOpen] = useState<string | null>("description");

  const tabs = [
    {
      id: "description",
      label: "Description",
      content: (
        <div className="space-y-4">
          <p className="text-pretty leading-relaxed text-muted-foreground">
            {product.description}
          </p>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Designed with intention and built to the highest standard, this
            piece is a favorite for a reason. Pair it with the rest of the
            {` ${product.categoryLabel.toLowerCase()}`} collection for a
            considered, cohesive look.
          </p>
        </div>
      ),
    },
    {
      id: "features",
      label: "Features & specs",
      content: (
        <ul className="grid gap-3 sm:grid-cols-2">
          {product.features.map((feature, i) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3 rounded-2xl border border-border p-4"
            >
              <PackageCheck className="mt-0.5 size-4 shrink-0 text-primary" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </motion.li>
          ))}
        </ul>
      ),
    },
    {
      id: "shipping",
      label: "Shipping & returns",
      content: (
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            {
              icon: RotateCcw,
              title: "Free 30-day returns",
              text: "Changed your mind? Send it back within 30 days for a full refund, no questions asked.",
            },
            {
              icon: PackageCheck,
              title: "Fast, tracked delivery",
              text: "Express shipping in 2-3 business days. Every order is tracked from our door to yours.",
            },
            {
              icon: ShieldCheck,
              title: "2-year warranty",
              text: "Defects covered for 24 months on all electronics. We stand behind what we sell.",
            },
            {
              icon: Smile,
              title: "Buy with confidence",
              text: "Secure checkout with 256-bit encryption and support available 7 days a week.",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-border p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                <item.icon className="size-5" />
              </span>
              <div>
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24 lg:px-8"
    >
      <motion.div variants={fadeUp} className="space-y-4">
        {tabs.map((tab) => {
          const isOpen = open === tab.id;
          return (
            <div
              key={tab.id}
              className="overflow-hidden rounded-3xl border border-border bg-card"
            >
              <button
                onClick={() => setOpen(isOpen ? null : tab.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-base font-semibold text-foreground md:text-lg">
                  {tab.label}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "grid size-8 place-items-center rounded-full",
                    isOpen ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  )}
                >
                  <ChevronDown className="size-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-6 pb-6 pt-1">{tab.content}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}