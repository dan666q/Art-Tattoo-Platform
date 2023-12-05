import { create } from "zustand";

export const useOpenDashboard = create((set) => ({
	isOpen: false,
	setOpen: (value) => {
		set(() => ({ isOpen: value }));
	},
}));
