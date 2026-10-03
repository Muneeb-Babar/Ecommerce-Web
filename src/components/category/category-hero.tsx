"use client";

import { motion } from "framer-motion";
import type { Category } from "@/types";
import { AppImage } from "@/components/shared/image";
import { fadeUp, staggerContainer } from "@/components/shared/motion";

export function CategoryHero({ category }: { category: Category }) {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative isolate overflow-hidden pt-28 md:pt-36"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <AppImage src={category.image} alt="" fill sizes="100vw" className="scale-110 opacity-30 blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 md:pb-16 lg:px-8">
        <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur">
          {category.count} curated {category.count === 1 ? "product" : "products"}
          <span className="size-1.5 rounded-full bg-primary" />
          {category.tagline}
        </motion.div>
        <motion.h1
          variants={fadeUp}
          className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl"
        >
          {category.name}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          {category.description}
        </motion.p>
      </div>
    </motion.section>
  );
}