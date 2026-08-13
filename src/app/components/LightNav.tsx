import { motion } from "motion/react";
import { User } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { Logo, ThemeToggle, NAV_ITEMS, useScrolled } from "./common";

export function LightNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedIn, theme, toggleTheme } = useApp();
  const scrolled = useScrolled();

  const items = NAV_ITEMS.filter((item) => !item.authOnly || loggedIn);

  return (
    <div className={`sticky top-0 z-30 px-3 sm:px-6 transition-[padding] duration-300 ${scrolled ? "pt-1.5" : "pt-3 sm:pt-4"}`}>
      <nav
        className={`max-w-6xl mx-auto flex items-center justify-between rounded-full backdrop-blur-2xl border border-border dark:border-white/10 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.6)] px-4 sm:px-6 transition-all duration-300 ${
          scrolled ? "bg-card/95 dark:bg-card/85 py-2" : "bg-card/85 dark:bg-card/70 py-2.5"
        }`}
      >
        <button onClick={() => navigate("/")} className="flex-shrink-0">
          <Logo size="md" />
        </button>
        <div className="flex items-center gap-1 sm:gap-2">
          {items.map((item) => {
            const active = location.pathname === item.to;
            return (
              <button
                key={item.to}
                onClick={() => navigate(item.to)}
                className="relative hidden sm:inline-flex px-4 py-2 rounded-full text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
              >
                {active && (
                  <motion.span
                    layoutId="lightnav-pill"
                    className="absolute inset-0 rounded-full bg-accent dark:shadow-[0_0_16px_-2px_rgba(126,215,255,0.6)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className={`relative z-10 ${active ? "text-[#1f2937]" : ""}`}>{item.label}</span>
              </button>
            );
          })}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => navigate("/profile")}
            className={`ml-1 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              location.pathname === "/profile"
                ? "bg-primary text-white dark:shadow-[0_0_16px_-2px_rgba(118,134,224,0.7)]"
                : "bg-muted text-foreground hover:bg-muted/70"
            }`}
          >
            <User size={15} />
            <span className="hidden sm:inline">Perfil</span>
          </motion.button>
        </div>
      </nav>
    </div>
  );
}
