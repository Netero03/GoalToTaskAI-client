import { create } from "zustand";

const useUIStore = create((set) => ({
  isSidebarOpen: true,
  modals: {},
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  openModal: (key) =>
    set((state) => ({
      modals: { ...state.modals, [key]: true }
    })),
  closeModal: (key) =>
    set((state) => ({
      modals: { ...state.modals, [key]: false }
    }))
}));

export default useUIStore;
