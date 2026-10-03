"use client";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Product } from "@/types";

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(
      state,
      action: PayloadAction<{
        product: Product;
        quantity?: number;
        color?: string;
        size?: string;
      }>
    ) {
      const { product, quantity = 1, color, size } = action.payload;
      const existing = state.items.find(
        (item) =>
          item.productId === product.id &&
          item.color === color &&
          item.size === size
      );

      if (existing) {
        existing.quantity = Math.min(existing.quantity + quantity, 99);
      } else {
        state.items.push({
          productId: product.id,
          slug: product.slug,
          name: product.name,
          brand: product.brand,
          image: product.images[0]?.src ?? "",
          price: product.price,
          originalPrice: product.originalPrice,
          quantity,
          color,
          size,
        });
      }
    },
    removeItem(
      state,
      action: PayloadAction<{ productId: string; color?: string; size?: string }>
    ) {
      const { productId, color, size } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.color === color &&
            item.size === size
          )
      );
    },
    updateQuantity(
      state,
      action: PayloadAction<{
        productId: string;
        color?: string;
        size?: string;
        quantity: number;
      }>
    ) {
      const { productId, color, size, quantity } = action.payload;
      const item = state.items.find(
        (i) =>
          i.productId === productId &&
          i.color === color &&
          i.size === size
      );
      if (item) {
        item.quantity = Math.max(1, Math.min(quantity, 99));
      }
    },
    clearCart(state) {
      state.items = [];
    },
    setCartOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  setCartOpen,
} = cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartSubtotal = (state: { cart: CartState }) =>
  state.cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

export const selectCartOriginalTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce(
    (sum, item) => sum + (item.originalPrice ?? item.price) * item.quantity,
    0
  );

export default cartSlice.reducer;