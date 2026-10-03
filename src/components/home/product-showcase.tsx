"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { staggerContainer, viewportOnce } from "@/components/shared/motion";

export function ProductShowcase({
  products,
  eyebrow,
  title,
  description,
  ctaHref,
  ctaLabel = "View all products",
}: {
  products: Product[];
  eyebrow: string;
  title: string;
  description?: string;
  ctaHref: string;
  ctaLabel?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} align="left" className="mb-0" />
        <Button asChild variant="outline" className="group mb-1 hidden shrink-0 rounded-full md:inline-flex">
          <Link href={ctaHref}>
            {ctaLabel}
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </motion.div>

      <div className="mt-10 text-center md:hidden">
        <Button asChild variant="outline" className="rounded-full">
          <Link href={ctaHref}>
            {ctaLabel}
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}