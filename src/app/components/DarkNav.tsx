import { motion } from "motion/react";
import { User } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { Logo, ThemeToggle, NAV_ITEMS, useScrolled } from "./common";

export function DarkNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedIn, theme, toggleTheme } = useApp();
  const scrolled = useScrolled();

  const items = NAV_ITEMS.filter((item) => !item.authOnly || loggedIn);

  return (
    <div className={`sticky top-0 z-20 px-4 sm:px-6 transition-[padding] duration-300 ${scrolled ? "pt-2" : "pt-4 sm:pt-6"}`}>
      <nav
        className={`max-w-5xl mx-auto flex items-center justify-between rounded-full border border-white/15 backdrop-blur-2xl shadow-[0_8px_30px_-10px_rgba(0,0,0,0.5)] px-5 sm:px-7 transition-all duration-300 ${
          scrolled ? "bg-white/[0.1] py-2.5" : "bg-white/[0.06] py-3"
        }`}
      >
        <button onClick={() => navigate("/")} className="flex-shrink-0">
          <Logo light size="md" />
        </button>
        <div className="flex items-center gap-1 sm:gap-2">
          {items.map((item) => {
            const active = location.pathname === item.to;
            return (
              <button
                key={item.to}
                onClick={() => navigate(item.to)}
                className="relative hidden sm:inline-flex px-4 py-2 rounded-full text-sm font-medium text-white/90 hover:text-white transition-colors"
              >
                {active && (
                  <motion.span
                    layoutId="darknav-pill"
                    className="absolute inset-0 rounded-full bg-white/15"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}

          <ThemeToggle theme={theme} toggleTheme={toggleTheme} tone="onDark" />
          {loggedIn ? (
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => navigate("/profile")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-sm transition-all ${
                location.pathname === "/profile"
                  ? "bg-accent text-[#1f2937]"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <User size={15} />
              <span className="hidden sm:inline">Perfil</span>
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-full border border-white/25 text-white text-sm font-semibold hover:bg-white/10 transition-all"
            >
              Entrar
            </motion.button>
          )}
        </div>
      </nav>
    </div>
  );
}
