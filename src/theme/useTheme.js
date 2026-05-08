import { create } from "zustand";
import { defaultThemeName, themes } from "./themeConfig";

const THEME_STORAGE_KEY = "goal-to-task-theme";

function getStoredThemeName() {
  if (typeof window === "undefined") return defaultThemeName;
  const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
  return saved && themes[saved] ? saved : defaultThemeName;
}

export const useTheme = create((set, get) => ({
  themeName: getStoredThemeName(),
  theme: themes[getStoredThemeName()],
  setTheme: (themeName) => {
    if (!themes[themeName]) return;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_STORAGE_KEY, themeName);
    }
    set({ themeName, theme: themes[themeName] });
  },
  toggleTheme: () => {
    const current = get().themeName;
    const next = current === "minimalist-glass" ? "cyberpunk" : "minimalist-glass";
    get().setTheme(next);
  }
}));
