"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fadeUp, staggerContainer, viewportOnce } from "@/components/shared/motion";
import { toast } from "sonner";

const channels = [
  {
    icon: Mail,
    title: "Email us",
    value: "hello@nova.store",
    sub: "We reply within 24 hours",
    href: "mailto:hello@nova.store",
  },
  {
    icon: Phone,
    title: "Call us",
    value: "+1 (555) 012-7473",
    sub: "Mon–Sat, 9am – 6pm ET",
    href: "tel:+15550127473",
  },
  {
    icon: MapPin,
    title: "Visit us",
    value: "100 Commerce Ave, Suite 21",
    sub: "New York, NY 10013",
    href: "https://maps.google.com",
  },
  {
    icon: Clock,
    title: "Support hours",
    value: "7 days a week",
    sub: "Orders & returns help anytime",
    href: "#",
  },
];

export function ContactView() {
  const [topic, setTopic] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent!", {
      description: "Our team will get back to you within 24 hours.",
    });
  };

  return (
    <>
      <PageHeader
        eyebrow="We're here for you"
        title="Get in touch"
        description="Questions about an order, a product, or something else? Our support team is here around the clock."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {channels.map((channel) => (
            <motion.a
              key={channel.title}
              variants={fadeUp}
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-black/5"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <channel.icon className="size-6" />
              </span>
              <h3 className="mt-5 text-base font-bold text-foreground">{channel.title}</h3>
              <p className="mt-1 font-semibold text-primary">{channel.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{channel.sub}</p>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px]"
        >
          {/* Form */}
          <motion.form
            variants={fadeUp}
            onSubmit={onSubmit}
            className="rounded-[2rem] border border-border bg-card p-6 md:p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <MessageSquare className="size-5" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-foreground">Send us a message</h2>
                <p className="text-sm text-muted-foreground">We'll get back within 24 hours</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">Full name</span>
                <Input required placeholder="Jane Doe" className="h-12 rounded-xl" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">Email</span>
                <Input required type="email" placeholder="you@example.com" className="h-12 rounded-xl" />
              </label>
            </div>

            <div className="mt-4">
              <span className="mb-1.5 block text-sm font-medium text-foreground">Topic</span>
              <Select value={topic} onValueChange={(v) => setTopic(v ?? "")}>
                <SelectTrigger className="h-12 w-full rounded-xl" aria-label="Select topic">
                  <SelectValue placeholder="What can we help with?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="order">Order status / tracking</SelectItem>
                  <SelectItem value="returns">Returns & refunds</SelectItem>
                  <SelectItem value="product">Product question</SelectItem>
                  <SelectItem value="shipping">Shipping & delivery</SelectItem>
                  <SelectItem value="other">Something else</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <label className="mt-4 block">
              <span className="mb-1.5 block text-sm font-medium text-foreground">Message</span>
              <textarea
                required
                rows={6}
                placeholder="Tell us a little about what's going on..."
                className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
              />
            </label>

            <Button size="lg" className="group mt-6 rounded-full px-8">
              Send message
              <Send className="ml-2 size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </Button>
          </motion.form>

          {/* FAQ mini */}
          <motion.aside variants={fadeUp} className="space-y-4">
            <div className="rounded-[2rem] bg-gradient-to-br from-primary/10 to-accent/10 p-6">
              <h3 className="text-lg font-bold text-foreground">Quick answers</h3>
              <div className="mt-4 space-y-4 text-sm">
                {[
                  {
                    q: "Where is my order?",
                    a: "It's usually on its way within 24h. You'll get a tracking link by email the moment it ships.",
                  },
                  {
                    q: "What's your return policy?",
                    a: "30-day free returns on everything, no questions asked. Refunds hit your account in 3-5 days.",
                  },
                  {
                    q: "Do you ship internationally?",
                    a: "Yes — 40+ countries, with duties calculated at checkout so there are zero surprises.",
                  },
                ].map((item) => (
                  <details key={item.q} className="group rounded-2xl border border-border bg-background p-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-foreground">
                      {item.q}
                      <span className="text-primary transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </motion.aside>
        </motion.div>
      </section>
    </>
  );
}