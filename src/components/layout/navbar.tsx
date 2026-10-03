"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartCount, setCartOpen } from "@/store/slices/cart-slice";
import { setMobileNavOpen, setSearchOpen } from "@/store/slices/ui-slice";
import { easeOutQuint } from "@/components/shared/motion";

export function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(selectCartCount);
  const mobileNavOpen = useAppSelector((s) => s.ui.mobileNavOpen);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500",
          scrolled
            ? "border-b border-border/60 bg-background/80 backdrop-blur-xl shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8"
          aria-label="Main navigation"
        >
          <div className="flex items-center gap-3 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(setMobileNavOpen(true))}
              aria-label="Open menu"
              className="rounded-full"
            >
              <Menu className="size-5" />
            </Button>
          </div>

          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Search"
              onClick={() => dispatch(setSearchOpen(true))}
            >
              <Search className="size-5" />
            </Button>
            <ThemeToggle />
            <Link
              href="/wishlist"
              className="hidden rounded-full p-2.5 transition-colors hover:bg-muted sm:inline-flex"
              aria-label="Wishlist"
            >
              <WishlistButton />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full"
              aria-label="Open cart"
              onClick={() => dispatch(setCartOpen(true))}
            >
              <ShoppingBag className="size-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute -right-0.5 -top-0.5 grid min-w-[18px] size-[18px] place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </nav>
      </header>

      <MobileNav
        open={mobileNavOpen}
        onClose={() => dispatch(setMobileNavOpen(false))}
        pathname={pathname}
      />
    </>
  );
}

function WishlistButton() {
  const count = useAppSelector((s) => s.wishlist.ids.length);
  return (
    <span className="relative">
      <Heart className="size-5" />
      {count > 0 && (
        <span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-red-500 text-[9px] font-bold text-white">
          {count}
        </span>
      )}
    </span>
  );
}

function MobileNav({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: easeOutQuint }}
            className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-background p-6 shadow-2xl lg:hidden"
          >
            <div className="flex items-center justify-between">
              <Logo showBadge={false} />
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-full"
              >
                <X className="size-5" />
              </Button>
            </div>
            <nav className="mt-10 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => {
                const active = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, ease: easeOutQuint }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-colors",
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <Link
              href="/wishlist"
              onClick={onClose}
              className="mt-6 flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground"
            >
              <Heart className="size-4 text-red-500" />
              Saved items
            </Link>
            <div className="mt-auto rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-4 text-sm">
              <p className="font-semibold text-foreground">Free shipping over $150</p>
              <p className="mt-1 text-muted-foreground">Plus 30-day easy returns.</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}