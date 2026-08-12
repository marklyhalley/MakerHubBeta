import { motion } from "motion/react";
import { User } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { Logo, ThemeToggle } from "./common";

const navItems: { label: string; target: string }[] = [
  { label: "Criar novo", target: "/builder" },
  { label: "Meus projetos", target: "/projects" },
  { label: "Planos", target: "/plans" },
];

export function LightNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useApp();

  return (
    <div className="sticky top-0 z-30 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav className="max-w-6xl mx-auto flex items-center justify-between rounded-full bg-card/85 dark:bg-card/70 backdrop-blur-2xl border border-border dark:border-white/10 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.6)] px-4 sm:px-6 py-2.5">
        <button onClick={() => navigate("/")} className="flex-shrink-0">
          <Logo size="md" />
        </button>
        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => navigate(item.target)}
              className={`hidden sm:inline-flex px-4 py-2 rounded-full text-sm font-medium transition-all ${
                location.pathname === item.target
                  ? "bg-accent text-[#1f2937] dark:shadow-[0_0_16px_-2px_rgba(126,215,255,0.6)]"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </button>
          ))}
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
