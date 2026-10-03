"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { store } from "./index";
import { addItem } from "./slices/cart-slice";
import { setWishlist } from "./slices/wishlist-slice";
import { Toaster } from "@/components/ui/sonner";
import type { CartItem, Product } from "@/types";

const STORAGE_KEY = "nexus-store-v1";

interface StoredData {
  cart?: CartItem[];
  wishlist?: string[];
}

const toProduct = (item: CartItem): Product => ({
  id: item.productId,
  slug: item.slug,
  name: item.name,
  brand: item.brand,
  price: item.price,
  originalPrice: item.originalPrice,
  currency: "USD",
  category: "",
  categoryLabel: "",
  description: "",
  features: [],
  images: [{ src: item.image, alt: item.name }],
  rating: 0,
  reviewCount: 0,
  colors: [],
  stock: 99,
  createdAt: "",
});

export function Providers({ children }: { children: React.ReactNode }) {
  const hydrated = useRef(false);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw) as StoredData;
        data.cart?.forEach((item) => {
          store.dispatch(
            addItem({
              product: toProduct(item),
              quantity: item.quantity,
              color: item.color,
              size: item.size,
            })
          );
        });
        if (data.wishlist?.length) {
          store.dispatch(setWishlist(data.wishlist));
        }
      }
    } catch {
      // ignore corrupted storage
    }
  }, []);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            cart: state.cart.items,
            wishlist: state.wishlist.ids,
          } satisfies StoredData)
        );
      } catch {
        // storage quota or privacy mode
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      {children}
      <Toaster position="bottom-right" richColors closeButton />
    </Provider>
  );
}