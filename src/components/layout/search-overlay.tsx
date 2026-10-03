"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, Star, TrendingUp, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { products } from "@/data/products";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchOpen } from "@/store/slices/ui-slice";
import { formatPrice } from "@/lib/format";
import { easeOutQuint } from "@/components/shared/motion";

const trendingTerms = ["Headphones", "Sneakers", "Vase", "Serum", "Hiking", "Trench"];

export function SearchOverlay() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const open = useAppSelector((s) => s.ui.searchOpen);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [open]);

  const closeAndReset = () => {
    setQuery("");
    dispatch(setSearchOpen(false));
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  const goToProduct = (slug: string) => {
    closeAndReset();
    router.push(`/products/${slug}`);
  };

  const submit = (term: string = query) => {
    closeAndReset();
    router.push(`/products?q=${encodeURIComponent(term)}`);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAndReset}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: easeOutQuint }}
            className="fixed inset-x-0 top-0 z-50 mx-auto mt-16 w-full max-w-2xl px-4 sm:mt-24"
          >
            <div className="overflow-hidden rounded-3xl border border-border bg-background shadow-2xl">
              <div className="relative border-b border-border p-3 pl-6">
                <Search className="absolute left-7 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                  placeholder="Search products, brands, categories..."
                  className="border-0 bg-transparent pl-11 pr-10 text-base shadow-none focus-visible:ring-0"
                  aria-label="Search products"
                />
                <ButtonDismiss onClick={closeAndReset} />
              </div>

              <div className="max-h-[50vh] overflow-y-auto p-3">
                {query.length === 0 ? (
                  <div className="p-3">
                    <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <TrendingUp className="size-3.5" /> Trending searches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {trendingTerms.map((term) => (
                        <button
                          key={term}
                          onClick={() => {
                            setQuery(term);
                            submit(term);
                          }}
                          className="rounded-full border border-border px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary/5"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : results.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      No results for “{query}”.
                    </p>
                    <button
                      onClick={() => submit()}
                      className="mt-3 text-sm font-semibold text-primary hover:underline"
                    >
                      View all products
                    </button>
                  </div>
                ) : (
                  <ul className="space-y-1">
                    {results.map((p, i) => (
                      <motion.li
                        key={p.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <button
                          onClick={() => goToProduct(p.slug)}
                          className="flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition-colors hover:bg-muted"
                        >
                          <span className="size-14 shrink-0 overflow-hidden rounded-xl bg-muted">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={p.images[0]?.src}
                              alt={p.name}
                              className="size-full object-cover"
                            />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold text-foreground">
                              {p.name}
                            </span>
                            <span className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                              <Star className="size-3 fill-amber-400 text-amber-400" />
                              {p.rating.toFixed(1)} · {p.brand}
                            </span>
                          </span>
                          <span className="text-sm font-bold text-foreground">
                            {formatPrice(p.price)}
                          </span>
                          <ArrowRight className="size-4 text-muted-foreground" />
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ButtonDismiss({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Close search"
      className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <X className="size-4" />
    </button>
  );
}