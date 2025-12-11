"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if user has manual preference
    const savedTheme = localStorage.getItem("theme-preference") as Theme | null;

    if (savedTheme) {
      // User has manual preference
      applyTheme(savedTheme);
      setTheme(savedTheme);
    } else {
      // Auto mode based on time
      const autoTheme = getThemeBasedOnTime();
      applyTheme(autoTheme);
      setTheme(autoTheme);

      // Update theme every hour
      const interval = setInterval(() => {
        const newTheme = getThemeBasedOnTime();
        if (newTheme !== theme) {
          applyTheme(newTheme);
          setTheme(newTheme);
        }
      }, 60000); // Check every minute

      return () => clearInterval(interval);
    }
  }, []);

  const getThemeBasedOnTime = (): Theme => {
    const hour = new Date().getHours();
    // Dark mode from 6 PM (18:00) to 6 AM (06:00)
    if (hour >= 18 || hour < 6) {
      return "dark";
    }
    return "light";
  };

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("theme-preference", newTheme);
  };

  // Prevent flash of incorrect theme
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
