"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  Battery,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { easeOutQuint, fadeUp, staggerContainer } from "@/components/shared/motion";

const heroProduct = products[0]; // Aurora Headphones
const heroImages = [
  heroProduct.images[0].src,
  heroProduct.images[1].src,
  heroProduct.images[2].src,
];

// Deterministic particle field (no SSR mismatch).
const PARTICLES = Array.from({ length: 16 }, (_, i) => {
  const angle = (i / 16) * Math.PI * 2;
  const radius = 12 + (i % 5) * 9;
  return {
    left: `${50 + Math.cos(angle) * radius}%`,
    top: `${34 + Math.sin(angle) * radius}%`,
    size: 2 + (i % 3),
    duration: 4 + (i % 4) * 1.5,
    delay: (i % 8) * 0.6,
  };
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // content scroll transforms
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -120]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);

  // 3D product transforms on scroll
  const scrollRotateX = useTransform(scrollYProgress, [0, 0.7], [10, 58]);
  const scrollRotateY = useTransform(scrollYProgress, [0, 0.7], [18, -24]);
  const productScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.22]);
  const productY = useTransform(scrollYProgress, [0, 0.9], [0, 220]);
  const productOpacity = useTransform(scrollYProgress, [0, 0.38], [1, 0]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const orbit = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const smoothRotateX = useSpring(scrollRotateX, { stiffness: 55, damping: 16 });
  const smoothRotateY = useSpring(scrollRotateY, { stiffness: 55, damping: 16 });

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-background"
      aria-label="Hero"
    >
      <motion.div style={{ y: backgroundY }} className="absolute inset-0">
        <AnimatedBackground>
          <motion.div
            style={{ rotate: orbit }}
            className="absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,var(--color-primary)/0.18_80deg,transparent_160deg,var(--color-accent)/0.16_260deg,transparent_360deg)] opacity-70 blur-3xl"
          />
        </AnimatedBackground>
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_70%_30%,hsl(var(--accent)/0.10),transparent),radial-gradient(50%_50%_at_20%_70%,hsl(var(--primary)/0.10),transparent)]"
        aria-hidden="true"
      />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
        className="relative mx-auto grid min-h-svh max-w-7xl grid-cols-1 items-center gap-20 px-4 pb-24 pt-28 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pt-32"
      >
        {/* LEFT — content */}
        <HeroContent />

        {/* RIGHT — 3D showcase */}
        <Showcase
          rotateX={smoothRotateX}
          rotateY={smoothRotateY}
          scale={productScale}
          y={productY}
          opacity={productOpacity}
          orbit={orbit}
        />
      </motion.div>

      <ScrollIndicator scroll={scrollYProgress} />
    </section>
  );
}

function Showcase({
  rotateX,
  rotateY,
  scale,
  y,
  opacity,
  orbit,
}: {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  scale: MotionValue<number>;
  y: MotionValue<number>;
  opacity: MotionValue<number>;
  orbit: MotionValue<number>;
}) {
  // Mousemove tilt, layered on top of scroll rotation.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const mouseRx = useSpring(useTransform(my, [-0.5, 0.5], [-11, 11]), {
    stiffness: 160,
    damping: 18,
  });
  const mouseRy = useSpring(useTransform(mx, [-0.5, 0.5], [13, -13]), {
    stiffness: 160,
    damping: 18,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const resetMouse = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.35, ease: easeOutQuint }}
      className="relative mx-auto w-full max-w-[480px]"
      style={{ perspective: 1400 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouse}
    >
      {/* glowing halo */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 -z-10 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/30 via-fuchsia-500/20 to-accent/30 blur-3xl"
        aria-hidden="true"
      />

      <motion.div
        style={{ opacity }}
        className="relative"
      >
        {/* 3D scroll layer */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            scale,
            y,
            transformStyle: "preserve-3d",
          }}
          className="relative aspect-[4/5] w-full"
        >
          {/* orbit rings */}
          <motion.div
            style={{ rotate: orbit }}
            className="absolute -inset-10 -z-10 rounded-full border border-dashed border-primary/25"
            aria-hidden="true"
          />
          <motion.div
            style={{ rotate: orbit }}
            className="absolute -inset-4 -z-10 rounded-full border border-primary/15"
            aria-hidden="true"
          />

          {/* mouse-tilt layer */}
          <motion.div
            style={{
              rotateX: mouseRx,
              rotateY: mouseRy,
              transformStyle: "preserve-3d",
            }}
            className="relative size-full"
          >
            {/* glow sparkles */}
            {[
              { left: "12%", top: "18%" },
              { left: "82%", top: "14%" },
              { left: "18%", top: "84%" },
            ].map((pos, i) => (
              <motion.span
                key={i}
                animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeInOut",
                }}
                className="absolute z-40 size-2.5 rounded-full bg-gradient-to-br from-primary to-accent shadow-[0_0_14px_hsl(var(--ring))]"
                style={{ left: pos.left, top: pos.top }}
                aria-hidden="true"
              />
            ))}
            {/* back card */}
            <div
              style={{ transform: "translateZ(-130px) rotateY(18deg)" }}
              className="absolute inset-0 rounded-[2rem] border border-border/60 bg-card/60 shadow-2xl shadow-black/20 backdrop-blur-sm"
            >
              <div className="flex h-full flex-col justify-end gap-3 p-6 text-muted-foreground">
                <Volume2 className="size-5 text-primary" />
                <p className="text-sm font-semibold text-foreground">
                  42dB Active Noise Cancelling
                </p>
                <p className="text-xs leading-relaxed">
                  Adaptive transparency mode, tuned by our acoustic lab.
                </p>
              </div>
            </div>

            {/* secondary image */}
            <ShowcaseImage
              src={heroImages[1]}
              z="-80px"
              className="z-20 -translate-y-1 translate-x-3"
            />

            {/* primary image */}
            <ShowcaseImage src={heroImages[0]} z="60px" className="z-30" hoverScale />

            {/* feature chip */}
            <motion.div
              style={{ translateZ: "140px" }}
              className="absolute -left-3 top-16 z-40 md:-left-9"
            >
              <div className="flex items-center gap-2 rounded-2xl border border-border/80 bg-background/85 px-3.5 py-2.5 shadow-xl shadow-black/10 backdrop-blur-xl">
                <span className="grid size-9 place-items-center rounded-full bg-primary/10 text-primary">
                  <Battery className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-bold text-foreground">40h battery</p>
                  <p className="text-[11px] text-muted-foreground">10-min quick charge</p>
                </div>
              </div>
            </motion.div>

            {/* rating chip */}
            <motion.div
              style={{ translateZ: "120px" }}
              className="absolute -right-3 top-1/2 z-40 md:-right-9"
            >
              <div className="rounded-2xl border border-border/80 bg-background/85 px-4 py-3 shadow-xl shadow-black/10 backdrop-blur-xl">
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-1.5 text-sm font-bold text-foreground">
                  4.8 · {heroProduct.reviewCount.toLocaleString()} reviews
                </p>
              </div>
            </motion.div>

            {/* price chip */}
            <motion.div
              style={{ translateZ: "100px" }}
              className="absolute bottom-10 -left-2 z-40 md:-left-6"
            >
              <div className="rounded-2xl border border-border/80 bg-background/85 px-4 py-3 shadow-xl shadow-black/10 backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Limited offer
                </p>
                <p className="mt-1 text-xl font-bold text-foreground">
                  {formatPrice(heroProduct.price)}{" "}
                  <span className="text-sm font-medium text-muted-foreground line-through">
                    {formatPrice(heroProduct.originalPrice ?? 0)}
                  </span>
                </p>
              </div>
            </motion.div>

            {/* delivery chip */}
            <motion.div
              style={{ translateZ: "80px" }}
              className="absolute bottom-2 right-4 z-40"
            >
              <div className="flex items-center gap-2.5 rounded-2xl border border-border/80 bg-background/85 px-3.5 py-2.5 shadow-xl shadow-black/10 backdrop-blur-xl">
                <span className="grid size-9 place-items-center rounded-full bg-primary/10 text-primary">
                  <Truck className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Free express</p>
                  <p className="text-[11px] text-muted-foreground">Delivery in 2 days</p>
                </div>
              </div>
            </motion.div>

            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 300, damping: 18 }}
              style={{ translateZ: "160px" }}
              className="absolute right-4 top-4 z-40 rounded-full bg-foreground px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-background"
            >
              New drop
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function ShowcaseImage({
  src,
  z,
  className,
  hoverScale = false,
}: {
  src: string;
  z: string;
  className?: string;
  hoverScale?: boolean;
}) {
  return (
    <motion.div
      style={{ transform: `translateZ(${z})` }}
      whileHover={hoverScale ? { scale: 1.03 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`absolute inset-0 overflow-hidden rounded-[2rem] border border-border bg-muted shadow-2xl shadow-black/20 ${className ?? ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Featured product"
        className="size-full object-cover"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
    </motion.div>
  );
}

function HeroContent() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative z-10 max-w-xl"
    >
      <motion.div variants={fadeUp} className="mb-6 flex items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          <Sparkles className="size-3.5" />
          New Season 2026
        </span>
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[4.5rem]"
      >
        Products with{" "}
        <span className="relative inline-block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          purpose.
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.8, ease: easeOutQuint }}
            className="absolute -bottom-2 left-0 h-1 w-full origin-left rounded-full bg-gradient-to-r from-primary to-accent"
          />
        </span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="mt-7 max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
      >
        Every item in our store is hand-picked, obsessively tested and built to
        last. From audio gear to artisan ceramics — discover essentials that
        make everyday feel extraordinary.
      </motion.p>

      <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
        <Button asChild size="lg" className="group rounded-full px-7 text-base shadow-xl shadow-primary/20">
          <Link href="/products">
            Shop the collection
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="group rounded-full px-7 text-base">
          <Link href="/products/aurora-wireless-headphones">
            <span className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
              <Play className="size-3 fill-current" />
            </span>
            Featured product
          </Link>
        </Button>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2.5">
            {[
              "photo-1494790108377-be9c29b29330",
              "photo-1507003211169-0a1dd7228f2d",
              "photo-1438761681033-6461ffad8d80",
              "photo-1500648767791-00dcc994a43e",
            ].map((id) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={id}
                src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=100&q=80`}
                alt=""
                className="size-9 rounded-full border-2 border-background object-cover"
              />
            ))}
          </div>
          <div className="text-sm">
            <p className="flex items-center gap-1 font-semibold text-foreground">
              12k+ happy customers
            </p>
            <p className="text-muted-foreground">4.9 average rating</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="size-5 text-emerald-500" />
          30-day money-back guarantee
        </div>
      </motion.div>
    </motion.div>
  );
}

function AnimatedBackground({ children }: { children?: React.ReactNode }) {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      {/* floating gradient blobs */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -24, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-40 top-16 size-[26rem] rounded-full bg-primary/15 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -36, 0], y: [0, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -right-32 top-1/3 size-[30rem] rounded-full bg-accent/15 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, 28, 0], y: [0, -40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute bottom-0 left-1/3 size-[22rem] rounded-full bg-fuchsia-400/10 blur-3xl"
      />

      {children}

      {/* rising particles */}
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-primary/50"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{ y: [-10, -60], opacity: [0, 0.85, 0], scale: [0.6, 1.4] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_1px,transparent_1px)] bg-[size:76px_76px] opacity-[0.05] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]" />

      {/* bottom fade into page bg */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

function ScrollIndicator({ scroll }: { scroll: MotionValue<number> }) {
  const scaleX = useSpring(scroll, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      className="absolute bottom-6 left-1/2 hidden w-40 -translate-x-1/2 sm:block"
      aria-hidden="true"
    >
      <div className="mb-1.5 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        Scroll to explore
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          style={{ scaleX }}
          className="h-full w-full origin-left rounded-full bg-gradient-to-r from-primary to-accent"
        />
      </div>
    </motion.div>
  );
}