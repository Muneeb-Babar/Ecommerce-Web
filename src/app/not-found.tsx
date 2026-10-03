"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center bg-background px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="flex flex-col items-center"
      >
        <p className="bg-gradient-to-r from-primary to-accent bg-clip-text text-[7rem] font-extrabold leading-none tracking-tighter text-transparent md:text-[10rem]">
          404
        </p>
        <h1 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">
          This page wandered off
        </h1>
        <p className="mt-3 max-w-md text-pretty text-muted-foreground">
          The page you are looking for does not exist, was moved, or is still
          being curated. Let us get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="group rounded-full">
            <Link href="/">
              <ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
              Back home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link href="/products">
              <Search className="mr-2 size-4" />
              Browse products
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}