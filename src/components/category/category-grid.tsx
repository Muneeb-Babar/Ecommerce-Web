"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Layers } from "lucide-react";
import type { Category } from "@/types";
import { AppImage } from "@/components/shared/image";
import { staggerContainer, viewportOnce } from "@/components/shared/motion";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {categories.map((cat) => (
          <motion.div
            key={cat.slug}
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="group relative overflow-hidden rounded-[2rem] bg-muted"
          >
            <Link href={`/category/${cat.slug}`} className="block">
              <div className="relative aspect-[16/11]">
                <AppImage
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-7">
                <div className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-lg bg-white/15 text-white backdrop-blur">
                    <Layers className="size-4" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                    {cat.count} {cat.count === 1 ? "item" : "items"}
                  </span>
                </div>
                <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
                  {cat.name}
                </h2>
                <p className="mt-1 text-sm text-white/80">{cat.tagline}</p>
                <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-foreground transition-all duration-300 group-hover:gap-3">
                  Explore
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}