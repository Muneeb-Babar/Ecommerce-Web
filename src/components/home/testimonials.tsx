"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/data/content";
import { AppImage } from "@/components/shared/image";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";
import { easeOutQuint } from "@/components/shared/motion";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const paginate = (dir: 1 | -1) => {
    setDirection(dir);
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  const t = testimonials[index];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-card/50 py-16 md:py-24">
      <div
        className="pointer-events-none absolute -left-24 top-1/4 size-72 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-1/4 size-72 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Loved by thousands"
          title="Don't take our word for it"
          description="Real reviews from real customers who've experienced the NOVA difference."
        />

        <div className="relative">
          <div className="relative min-h-[320px] overflow-hidden rounded-[2.5rem] border border-border bg-background/80 shadow-2xl shadow-black/5 backdrop-blur md:min-h-[280px]">
            <Quote className="absolute left-6 top-6 size-16 text-primary/10" aria-hidden="true" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.5, ease: easeOutQuint }}
                className="flex h-full min-h-[320px] flex-col justify-between px-8 py-10 md:min-h-[280px] md:px-14 md:py-12"
              >
                <div className="flex items-center gap-1 text-amber-400" aria-label={`${t.rating} star rating`}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>

                <p className="mt-6 text-pretty text-lg leading-relaxed text-foreground md:text-2xl md:leading-relaxed">
                  “{t.quote}”
                </p>

                <footer className="mt-8 flex items-center gap-4">
                  <AppImage
                    src={t.avatar}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="size-12 rounded-full border-2 border-border object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {t.role} · {t.location}
                    </p>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
              className="grid size-11 place-items-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
            >
              <ChevronLeft className="size-5" />
            </motion.button>

            <div className="flex items-center gap-2">
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === index ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                />
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
              className="grid size-11 place-items-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
            >
              <ChevronRight className="size-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}