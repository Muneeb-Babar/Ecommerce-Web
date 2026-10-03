"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/components/shared/motion";

function Counter({
  value,
  suffix = "",
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration, bounce: 0 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(latest).toLocaleString()}${suffix}`;
      }
    });
    return unsubscribe;
  }, [spring, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

const stats = [
  { value: 12000, suffix: "+", label: "Happy customers" },
  { value: 150, suffix: "+", label: "Curated products" },
  { value: 40, suffix: "", label: "Countries served" },
  { value: 4.9, suffix: "/5", label: "Average rating" },
];

export function StatsSection() {
  return (
    <section className="border-y border-border/60 bg-card/40">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8"
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={fadeUp} className="flex flex-col items-center gap-1 text-center">
            <span className="bg-gradient-to-br from-primary to-accent bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}