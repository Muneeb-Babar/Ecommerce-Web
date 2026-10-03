"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/components/shared/motion";

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb?: { label: string; href?: string }[];
}) {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-card/60 to-background pt-28 md:pt-36"
    >
      <div
        className="pointer-events-none absolute -top-24 right-0 size-72 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 md:pb-16 lg:px-8">
        {breadcrumb && (
          <motion.nav
            variants={fadeUp}
            aria-label="Breadcrumb"
            className="mb-5 flex items-center gap-1.5 text-sm text-muted-foreground"
          >
            {breadcrumb.map((item, i) => (
              <span key={item.href} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="size-3.5" />}
                {i === breadcrumb.length - 1 ? (
                  <span className="font-medium text-foreground">{item.label}</span>
                ) : (
                  <Link href={item.href ?? "/"} className="transition-colors hover:text-foreground">
                    {item.label}
                  </Link>
                )}
              </span>
            ))}
          </motion.nav>
        )}
        {eyebrow && (
          <motion.span
            variants={fadeUp}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
          >
            <span className="size-1.5 rounded-full bg-primary" />
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          variants={fadeUp}
          className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {description}
          </motion.p>
        )}
      </div>
    </motion.section>
  );
}