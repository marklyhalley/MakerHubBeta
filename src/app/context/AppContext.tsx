import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "makerhub_theme";

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage indisponível — segue para a preferência do sistema
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

type AppContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
  prompt: string;
  setPrompt: (s: string) => void;
  businessType: string | null;
  setBusinessType: (s: string | null) => void;
  modules: string[];
  toggleModule: (id: string) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [loggedIn, setLoggedIn] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [businessType, setBusinessType] = useState<string | null>(null);
  const [modules, setModules] = useState<string[]>([]);

  const toggleModule = (id: string) =>
    setModules((m) => (m.includes(id) ? m.filter((x) => x !== id) : [...m, id]));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // localStorage indisponível — a preferência de tema não será persistida
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const value: AppContextValue = {
    theme,
    toggleTheme,
    loggedIn,
    login: () => setLoggedIn(true),
    logout: () => setLoggedIn(false),
    prompt,
    setPrompt,
    businessType,
    setBusinessType,
    modules,
    toggleModule,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp deve ser usado dentro de um AppProvider");
  return ctx;
}
