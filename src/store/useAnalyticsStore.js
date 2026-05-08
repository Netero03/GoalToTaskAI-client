import { create } from "zustand";

const useAnalyticsStore = create((set) => ({
  dashboardMetrics: null,
  isLoading: false,
  setDashboardMetrics: (dashboardMetrics) => set({ dashboardMetrics }),
  setIsLoading: (isLoading) => set({ isLoading })
}));

export default useAnalyticsStore;
