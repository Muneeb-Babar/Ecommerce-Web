"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/content";
import { AppImage } from "@/components/shared/image";
import { SectionHeading } from "@/components/shared/section-heading";
import { staggerContainer, viewportOnce } from "@/components/shared/motion";

export function CategoryExplore() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <SectionHeading
        eyebrow="Explore"
        title="Shop by category"
        description="Six curated worlds, each filled with goods we'd proudly own ourselves."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-5"
      >
        {categories.map((cat) => (
          <motion.div
            key={cat.slug}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="group"
          >
            <Link
              href={`/category/${cat.slug}`}
              className="flex h-full flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
                <AppImage
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 16vw"
                  className="transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-black/70" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p className="text-sm font-bold text-white">{cat.name}</p>
                  <p className="text-[11px] text-white/70">{cat.count} items</p>
                </div>
              </div>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors group-hover:text-primary">
                {cat.tagline}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}