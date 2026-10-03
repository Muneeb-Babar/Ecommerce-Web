"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useAppSelector } from "@/store/hooks";
import { staggerContainer } from "@/components/shared/motion";

export function WishlistView() {
  const ids = useAppSelector((s) => s.wishlist.ids);
  const wishlistProducts = products.filter((p) => ids.includes(p.id));

  return (
    <>
      <PageHeader
        eyebrow="Your picks"
        title="Wishlist"
        description={`${wishlistProducts.length} ${wishlistProducts.length === 1 ? "product" : "products"} saved for later.`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Wishlist" }]}
      />
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {wishlistProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center gap-5 rounded-[2.5rem] border border-dashed border-border py-24 text-center"
          >
            <span className="grid size-24 place-items-center rounded-full bg-gradient-to-br from-red-500/10 to-rose-500/10">
              <Heart className="size-10 text-red-500" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-foreground">Nothing saved yet</h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Tap the heart on any product to save it here for later when
                you're ready to commit.
              </p>
            </div>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/products">
                Discover products
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {wishlistProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        )}
      </section>
    </>
  );
}