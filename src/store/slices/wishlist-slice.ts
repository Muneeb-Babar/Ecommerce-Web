"use client";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface WishlistState {
  ids: string[];
}

const initialState: WishlistState = {
  ids: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<string>) {
      const id = action.payload;
      const index = state.ids.indexOf(id);
      if (index >= 0) {
        state.ids.splice(index, 1);
      } else {
        state.ids.push(id);
      }
    },
    setWishlist(state, action: PayloadAction<string[]>) {
      state.ids = action.payload;
    },
    clearWishlist(state) {
      state.ids = [];
    },
  },
});

export const { toggleWishlist, setWishlist, clearWishlist } =
  wishlistSlice.actions;

export const isInWishlist = (state: { wishlist: WishlistState }, id: string) =>
  state.wishlist.ids.includes(id);

export default wishlistSlice.reducer;