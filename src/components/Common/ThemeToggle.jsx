import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "../../theme/useTheme";

export default function ThemeToggle() {
  const themeName = useTheme((state) => state.themeName);
  const toggleTheme = useTheme((state) => state.toggleTheme);
  const isDark = themeName === "cyberpunk";

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-colors"
      style={{
        borderColor: "var(--color-border)",
        color: "var(--color-text)",
        backgroundColor: "var(--color-surface)"
      }}
      type="button"
      aria-label="Toggle theme"
      title={`Switch to ${isDark ? "Minimalist Glass" : "Cyberpunk"} theme`}
    >
      {isDark ? <SunMedium size={16} /> : <Moon size={16} />}
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
