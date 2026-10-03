"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Mail, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { fadeUp, staggerContainer, viewportOnce } from "@/components/shared/motion";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setSubscribed(true);
    toast.success("You're on the list!", {
      description: "Check your inbox for your 15% welcome code.",
    });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-primary to-accent px-6 py-16 text-center shadow-2xl shadow-primary/20 md:px-16 md:py-20"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1 }}
          className="pointer-events-none absolute -left-16 -top-16 size-64 rounded-full bg-white/10 blur-3xl"
          aria-hidden="true"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1, delay: 0.2 }}
          className="pointer-events-none absolute -bottom-20 -right-16 size-72 rounded-full bg-accent/30 blur-3xl"
          aria-hidden="true"
        />

        <motion.span
          variants={fadeUp}
          className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground backdrop-blur"
        >
          <Mail className="size-3.5" />
          Join the newsletter
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight text-primary-foreground md:text-5xl md:leading-[1.1]"
        >
          Get 15% off your first order.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-primary-foreground/80"
        >
          Subscribe for early access to drops, private sales and member-only
          deals. No spam, just good stuff — unsubscribe anytime.
        </motion.p>

        <motion.div variants={fadeUp} className="mx-auto mt-9 max-w-md">
          <AnimatePresence mode="wait">
            {subscribed ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 rounded-full bg-primary-foreground/15 px-6 py-4 text-primary-foreground backdrop-blur"
              >
                <CheckCircle2 className="size-5" />
                <span className="font-medium">Welcome aboard! 15% off is on its way.</span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -12 }}
                onSubmit={onSubmit}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  aria-label="Email address"
                  className="flex-1 rounded-full border-transparent bg-primary-foreground/15 px-5 py-3.5 text-primary-foreground placeholder:text-primary-foreground/60 backdrop-blur focus-visible:ring-primary-foreground/40 focus-visible:ring-offset-0 focus-visible:border-primary-foreground/40"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="group rounded-full bg-primary-foreground px-7 text-primary shadow-lg hover:bg-primary-foreground/90"
                >
                  Subscribe
                  <Send className="ml-2 size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
          <p className="mt-4 text-xs text-primary-foreground/60">
            By subscribing you agree to our privacy policy. Unsubscribe anytime.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}