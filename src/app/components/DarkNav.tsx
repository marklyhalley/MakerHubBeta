import { motion } from "motion/react";
import { User } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { Logo, ThemeToggle } from "./common";

export function DarkNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedIn, theme, toggleTheme } = useApp();

  return (
    <div className="relative z-20 px-4 pt-4 sm:px-6 sm:pt-6">
      <nav className="max-w-5xl mx-auto flex items-center justify-between rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-2xl shadow-[0_8px_30px_-10px_rgba(0,0,0,0.5)] px-5 sm:px-7 py-3">
        <button onClick={() => navigate("/")} className="flex-shrink-0">
          <Logo light size="md" />
        </button>
        <div className="flex items-center gap-5 sm:gap-8">
          <button
            onClick={() => navigate("/builder")}
            className={`hidden sm:inline text-sm font-medium text-white/90 hover:text-white transition-colors ${location.pathname === "/builder" ? "relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-accent after:rounded-full" : ""}`}
          >
            Criar Site
          </button>
          <button
            onClick={() => navigate("/")}
            className="hidden sm:inline text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            Sobre Nós
          </button>
          {loggedIn ? (
            <>
              <button
                onClick={() => navigate("/projects")}
                className={`hidden sm:inline text-sm font-medium transition-colors ${location.pathname === "/projects" ? "text-accent" : "text-white/90 hover:text-white"}`}
              >
                Meus Projetos
              </button>
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
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="hidden sm:inline text-sm font-medium text-white/90 hover:text-white transition-colors"
              >
                Login
              </button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/builder")}
                className="px-5 py-2 rounded-full bg-primary hover:brightness-110 text-white text-sm font-semibold transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5"
              >
                Criar Site
              </motion.button>
            </>
          )}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} tone="onDark" />
        </div>
      </nav>
    </div>
  );
}
