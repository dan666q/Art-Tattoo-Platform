import { create } from "zustand";

export const useUserInfo = create((set) => ({
  user: {
    userID: "",
    email: "",
    Role: "",
    username: "",
  },
  setUser: (value) => {
    set(() => ({ user: value }));
  },
}));
