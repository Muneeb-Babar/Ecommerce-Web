"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone, ShieldCheck, Truck, RotateCcw, CreditCard } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { NAV_LINKS, SOCIAL_LINKS, SITE_NAME } from "@/lib/constants";
import { categories } from "@/data/content";

const shopLinks = NAV_LINKS.slice(1, 3);
const categoryLinks = categories.slice(0, 6);

const supportLinks = [
  { label: "Help Center", href: "/contact" },
  { label: "Shipping Info", href: "/contact" },
  { label: "Returns & Refunds", href: "/contact" },
  { label: "Track Order", href: "/contact" },
  { label: "FAQ", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 border-b border-border py-10 md:grid-cols-4 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {SITE_NAME} curates thoughtfully designed products from brands we
              believe in — delivered fast, backed by a 30-day guarantee.
            </p>
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <a href="mailto:hello@nova.store" className="flex items-center gap-2 transition-colors hover:text-foreground">
                <Mail className="size-4" /> hello@nova.store
              </a>
              <a href="tel:+15550127473" className="flex items-center gap-2 transition-colors hover:text-foreground">
                <Phone className="size-4" /> +1 (555) 012-7473
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="size-4" /> 100 Commerce Ave, Suite 21
              </div>
            </div>
          </div>

          <FooterColumn title="Shop" links={[...shopLinks, ...categoryLinks.map((c) => ({ label: c.name, href: `/category/${c.slug}` }))]} />

          <FooterColumn title="Support" links={supportLinks} />

          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Follow us
            </h3>
            <ul className="mt-4 space-y-2">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Truck, title: "Free Shipping", sub: "On orders over $150" },
            { icon: RotateCcw, title: "30-Day Returns", sub: "No questions asked" },
            { icon: ShieldCheck, title: "Secure Checkout", sub: "256-bit SSL encrypted" },
            { icon: CreditCard, title: "Flexible Payment", sub: "Cards, wallets & BNPL" },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE_NAME} Store. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <Link key={l} href="/contact" className="transition-colors hover:text-foreground">
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
        {title}
      </h3>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}