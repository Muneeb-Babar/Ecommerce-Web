"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Compass, HeartHandshake, Leaf, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { AppImage } from "@/components/shared/image";
import { StatsSection } from "@/components/home/stats-section";
import { fadeUp, staggerContainer, viewportOnce } from "@/components/shared/motion";

const values = [
  {
    icon: Compass,
    title: "Obsessive curation",
    text: "Every product is tested by our team before it ever reaches the site. If we wouldn't buy it ourselves, you won't see it here.",
  },
  {
    icon: Leaf,
    title: "Responsible by default",
    text: "Sustainable materials, plastic-free packaging and carbon-neutral shipping on every single order we fulfill.",
  },
  {
    icon: HeartHandshake,
    title: "Radical fairness",
    text: "Fair prices for customers and fair margins for makers. We cut out middlemen so quality stays high and value stays honest.",
  },
  {
    icon: Award,
    title: "Built to last",
    text: "We partner with makers who share our philosophy: fewer, better things. Everything we stock is designed for years, not seasons.",
  },
];

export function AboutView() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="Good products, chosen with care."
        description="NOVA started with a simple frustration — great design was scattered, hard to trust, and rarely shipped in time. We built the store we wished existed."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Story */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
        >
          <motion.div variants={fadeUp} className="relative">
            <div className="overflow-hidden rounded-[2rem]">
              <AppImage
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
                alt="Our studio workspace"
                width={900}
                height={650}
                className="aspect-[16/11] object-cover"
              />
            </div>
            <motion.div
              variants={fadeUp}
              className="absolute -bottom-6 -right-4 hidden rounded-3xl border border-border bg-background p-6 shadow-2xl sm:block md:-right-8"
            >
              <Sparkles className="size-6 text-primary" />
              <p className="mt-3 text-3xl font-extrabold tracking-tight text-foreground">2019</p>
              <p className="text-sm text-muted-foreground">Founded in Brooklyn</p>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-4xl">
              From a Brooklyn apartment to{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                40+ countries
              </span>
              .
            </h2>
            <div className="mt-6 space-y-5 text-pretty leading-relaxed text-muted-foreground">
              <p>
                It began in 2019 when our founder found a beautifully-made
                ceramic vase in a small Lisbon workshop — and couldn't buy it
                anywhere online. The maker was shipping the world's fastest,
                most stylish goods, yet had no storefront to sell them.
              </p>
              <p>
                Today, NOVA partners directly with over 150 independent makers
                and heritage brands across 40+ countries. We handle everything —
                logistics, quality checks, customer service — so they can focus
                on the craft.
              </p>
              <p>
                The result? A store where every product has a story, every price
                is fair, and every delivery arrives on time. That's our promise,
                and we've kept it for over 12,000 customers.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <StatsSection />

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={fadeUp}
              className="rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/20">
                <value.icon className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-foreground">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {value.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative isolate overflow-hidden rounded-[2.5rem] bg-foreground px-6 py-16 text-center text-background md:py-20"
        >
          <div className="pointer-events-none absolute -left-16 top-0 size-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 size-64 rounded-full bg-accent/20 blur-3xl" />
          <motion.h2
            variants={fadeUp}
            className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight md:text-4xl"
          >
            Ready to find your next favorite thing?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-xl text-pretty text-background/70"
          >
            Browse the full collection, or tell us what you're looking for — we
            love a good challenge.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/products"
              className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-black/10 transition-transform hover:scale-105"
            >
              Shop the collection
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-background/20 px-7 py-3 text-sm font-semibold text-background transition-colors hover:bg-foreground/10"
            >
              Contact us
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}