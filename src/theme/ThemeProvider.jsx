import { useEffect } from "react";
import { useTheme } from "./useTheme";

export default function ThemeProvider({ children }) {
  const theme = useTheme((state) => state.theme);
  const themeName = useTheme((state) => state.themeName);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    root.dataset.theme = themeName;
    root.classList.toggle("dark", theme.mode === "dark");

    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    Object.entries(theme.shadows || {}).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });

    if (theme.glassmorphism) {
      root.style.setProperty("--glass-blur", theme.glassmorphism.blur);
      root.style.setProperty("--glass-opacity", String(theme.glassmorphism.opacity));
      root.style.setProperty("--glass-border-opacity", String(theme.glassmorphism.borderOpacity));
    }

    body.style.backgroundColor = theme.colors.background;
    body.style.color = theme.colors.text;
  }, [theme, themeName]);

  return children;
}
