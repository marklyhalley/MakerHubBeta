import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Sun, Moon } from "lucide-react";
import type { Theme } from "../context/AppContext";

// ─────────────────────────────────────────────
// THEME TOGGLE
// ─────────────────────────────────────────────
export function ThemeToggle({
  theme, toggleTheme, tone = "onLight",
}: { theme: Theme; toggleTheme: () => void; tone?: "onLight" | "onDark" }) {
  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
      title={theme === "dark" ? "Tema claro" : "Tema escuro"}
      className={`relative w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center border transition-all ${
        tone === "onDark"
          ? "bg-white/10 hover:bg-white/20 border-white/20 text-white"
          : "bg-muted hover:bg-accent/15 border-border text-foreground"
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

const GRAIN_URL =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>";

// ─────────────────────────────────────────────
// FILM GRAIN (subtle texture for photo heroes)
// ─────────────────────────────────────────────
export function Grain({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 mix-blend-overlay"
      style={{ backgroundImage: `url("${GRAIN_URL}")`, opacity }}
    />
  );
}

// ─────────────────────────────────────────────
// ANIMATED COUNT-UP (for stats)
// ─────────────────────────────────────────────
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let raf: number;
    const t0 = performance.now();
    const duration = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.floor(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, value]);

  return (
    <motion.span
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true, margin: "-60px" }}
    >
      {display.toLocaleString("pt-BR")}{suffix}
    </motion.span>
  );
}

// ─────────────────────────────────────────────
// AMBIENT GLOW (background accent for content pages)
// ─────────────────────────────────────────────
export function PageGlow({ fixed = true }: { fixed?: boolean }) {
  return (
    <div className={`pointer-events-none ${fixed ? "fixed" : "absolute"} inset-0 -z-10 overflow-hidden bg-background`}>
      {/* dot-grid texture (dark mode only) */}
      <div
        className="absolute inset-0 opacity-0 dark:opacity-100 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.09)_1px,transparent_0)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent_100%)]"
      />
      {/* top wash */}
      <div className="absolute inset-x-0 top-0 h-[36rem] bg-gradient-to-b from-primary/[0.06] dark:from-primary/25 via-transparent to-transparent" />
      <div className="absolute -top-32 -left-32 w-[30rem] h-[30rem] rounded-full bg-primary/10 dark:bg-primary/30 blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-[26rem] h-[26rem] rounded-full bg-accent/10 dark:bg-accent/25 blur-3xl" />
      <div className="hidden dark:block absolute bottom-0 left-1/4 w-[24rem] h-[24rem] rounded-full bg-success/10 blur-3xl" />
    </div>
  );
}

// ─────────────────────────────────────────────
// LOGO
// ─────────────────────────────────────────────
export function Logo({ light = false, size = "md" }: { light?: boolean; size?: "sm" | "md" | "lg" }) {
  const sz = size === "lg" ? "text-4xl" : size === "sm" ? "text-xl" : "text-2xl";
  return (
    <span className={`font-['Raleway',sans-serif] font-bold tracking-tight ${sz} ${light ? "text-white" : "text-foreground"} select-none`}>
      <span className={light ? "text-accent" : "text-primary"}>MAKER</span>
      <span className={light ? "text-white" : "text-foreground"}>Hub</span>
    </span>
  );
}

// ─────────────────────────────────────────────
// STARS
// ─────────────────────────────────────────────
export function Stars({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className="fill-accent text-accent" />
        ))}
      </div>
      <span className={`text-xs font-medium ${light ? "text-white/70" : "text-muted-foreground"}`}>
        5.0 Excelente · 67 avaliações
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────
// PAGE TRANSITION VARIANTS
// ─────────────────────────────────────────────
export const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
};
