"use client";

import { createContext, useContext } from "react";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  mounted: boolean;
  toggle: () => void;
};

export const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  mounted: false,
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}
