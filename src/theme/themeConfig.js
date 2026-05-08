export const themes = {
  "minimalist-glass": {
    name: "minimalist-glass",
    mode: "light",
    colors: {
      background: "#f8f9fa",
      surface: "#ffffff",
      primary: "#1890ff",
      secondary: "#52c41a",
      accent: "#faad14",
      text: "#262626",
      textSecondary: "#8c8c8c",
      border: "rgba(0, 0, 0, 0.08)",
      danger: "#ef4444"
    },
    visual3d: {
      nodeColor: "#1890ff",
      nodeGlowIntensity: 0.3,
      backgroundColor: "#f8f9fa",
      lineColor: "rgba(24, 144, 255, 0.4)",
      gridOpacity: 0.1
    },
    glassmorphism: {
      blur: "12px",
      opacity: 0.8,
      borderOpacity: 0.2
    },
    shadows: {
      soft: "0 2px 8px rgba(0, 0, 0, 0.08)",
      medium: "0 4px 16px rgba(0, 0, 0, 0.12)",
      large: "0 8px 24px rgba(0, 0, 0, 0.15)"
    }
  },
  cyberpunk: {
    name: "cyberpunk",
    mode: "dark",
    colors: {
      background: "#0a0e27",
      surface: "#151a3f",
      primary: "#00ffff",
      secondary: "#ff00ff",
      accent: "#ffff00",
      text: "#e0e0ff",
      textSecondary: "#8a8ab8",
      border: "rgba(0, 255, 255, 0.2)",
      danger: "#ff4d4f"
    },
    visual3d: {
      nodeColor: "#00ffff",
      nodeGlowIntensity: 1,
      backgroundColor: "#0a0e27",
      lineColor: "rgba(0, 255, 255, 0.6)",
      gridOpacity: 0.15
    },
    postprocessing: {
      bloom: {
        enabled: true,
        luminanceThreshold: 0.2,
        luminanceSmoothing: 0.025,
        intensity: 1.5
      },
      glitch: {
        enabled: false,
        intensity: 0.1
      }
    },
    neon: {
      enabled: true,
      glowColor: "#00ffff",
      glowIntensity: 2
    }
  }
};

export const defaultThemeName = "minimalist-glass";
