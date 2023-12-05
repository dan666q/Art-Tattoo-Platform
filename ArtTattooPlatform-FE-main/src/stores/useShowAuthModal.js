import { create } from "zustand";

export const useShowAuthModal = create((set) => ({
  open: false,
  setOpen: (value) => {
    console.log(value);
    set(() => ({ open: value }));
  },
}));
