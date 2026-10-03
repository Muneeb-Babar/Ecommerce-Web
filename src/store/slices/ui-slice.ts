"use client";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UIState {
  mobileNavOpen: boolean;
  searchOpen: boolean;
  announcementDismissed: boolean;
}

const initialState: UIState = {
  mobileNavOpen: false,
  searchOpen: false,
  announcementDismissed: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMobileNavOpen(state, action: PayloadAction<boolean>) {
      state.mobileNavOpen = action.payload;
    },
    setSearchOpen(state, action: PayloadAction<boolean>) {
      state.searchOpen = action.payload;
    },
    dismissAnnouncement(state) {
      state.announcementDismissed = true;
    },
  },
});

export const { setMobileNavOpen, setSearchOpen, dismissAnnouncement } =
  uiSlice.actions;

export default uiSlice.reducer;