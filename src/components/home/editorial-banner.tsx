"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, BadgeCheck, ShieldCheck, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppImage } from "@/components/shared/image";
import { fadeUp, staggerContainer, viewportOnce } from "@/components/shared/motion";

const perks = [
  { icon: Timer, title: "Next-day delivery", text: "On orders placed before 3pm" },
  { icon: ShieldCheck, title: "2-year warranty", text: "On every electronic product" },
  { icon: BadgeCheck, title: "Authenticity guaranteed", text: "Sourced directly from brands" },
];

export function EditorialBanner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative isolate mx-auto max-w-7xl overflow-hidden px-4 py-16 sm:px-6 md:py-24 lg:px-8"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <AppImage
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80"
          alt=""
          fill
          sizes="100vw"
          className="scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
        <div className="absolute inset-0 bg-background/40" />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-xl py-10 md:py-16"
      >
        <motion.span
          variants={fadeUp}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          Summer sale ends soon
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl md:leading-[1.1]"
        >
          Up to <span className="text-primary">40% off</span> bestsellers,
          this week only.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground"
        >
          Our most-loved products at their lowest prices of the year. Limited
          stock on select items — when they're gone, they're gone.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="group rounded-full px-7 shadow-xl shadow-primary/20">
            <Link href="/products">
              Shop the sale
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>

        <motion.ul variants={fadeUp} className="mt-10 space-y-3">
          {perks.map((perk) => (
            <li key={perk.title} className="flex items-center gap-3 rounded-2xl bg-background/70 p-3 backdrop-blur">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <perk.icon className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{perk.title}</p>
                <p className="text-xs text-muted-foreground">{perk.text}</p>
              </div>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}