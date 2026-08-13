import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Star, Sun, Moon, Package, Wallet, ShoppingCart, CalendarCheck, Users, LayoutDashboard,
} from "lucide-react";
import type { Theme } from "../context/AppContext";
import type { LucideIcon } from "lucide-react";

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

// ─────────────────────────────────────────────
// ERP MODULES & BUSINESS TYPES (shared taxonomy)
// ─────────────────────────────────────────────
export const ERP_MODULES: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "estoque", label: "Estoque", icon: Package },
  { id: "financeiro", label: "Financeiro", icon: Wallet },
  { id: "vendas", label: "Vendas", icon: ShoppingCart },
  { id: "agendamento", label: "Agendamento", icon: CalendarCheck },
  { id: "rh", label: "RH", icon: Users },
];

export const BUSINESS_TYPES: string[] = [
  "Loja / Varejo",
  "Clínica / Saúde",
  "Academia",
  "Serviços",
  "Restaurante",
  "Educação",
];

// ─────────────────────────────────────────────
// MESH BACKDROP (autoral, substitui fotos de banco de imagens nas heroes escuras)
// ─────────────────────────────────────────────
export function MeshBackdrop() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#0b0e1a]">
      <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_10%,black_35%,transparent_100%)]" />
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[50rem] h-[50rem] rounded-full bg-primary/40 blur-[120px]"
        animate={{ x: [0, 60, -30, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-1/4 w-[42rem] h-[42rem] rounded-full bg-accent/25 blur-[120px]"
        animate={{ x: [0, -50, 30, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 w-[36rem] h-[36rem] rounded-full bg-success/15 blur-[130px]"
        animate={{ x: [0, 40, -20, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-[#0b0e1a]" />
      <Grain opacity={0.04} />
    </div>
  );
}

// ─────────────────────────────────────────────
// BROWSER MOCKUP (barra de endereço + abas para previews de site/ERP)
// ─────────────────────────────────────────────
export function BrowserMockup({
  url, children, className = "", compact = false,
}: { url: string; children: React.ReactNode; className?: string; compact?: boolean }) {
  return (
    <div className={`bg-card rounded-2xl border border-border dark:border-white/10 overflow-hidden ${className}`}>
      <div className={`bg-muted dark:bg-white/[0.04] flex items-center gap-2 border-b border-border dark:border-white/10 ${compact ? "px-3 py-1.5" : "px-4 py-2.5"}`}>
        <div className="flex gap-1">
          <div className={`rounded-full bg-red-400 ${compact ? "w-1.5 h-1.5" : "w-3 h-3"}`} />
          <div className={`rounded-full bg-yellow-400 ${compact ? "w-1.5 h-1.5" : "w-3 h-3"}`} />
          <div className={`rounded-full bg-green-400 ${compact ? "w-1.5 h-1.5" : "w-3 h-3"}`} />
        </div>
        <div className="flex-1 mx-2">
          <div className={`bg-card dark:bg-white/[0.06] rounded-md flex items-center px-2 ${compact ? "h-4" : "h-6"}`}>
            <span className={`text-muted-foreground font-mono truncate ${compact ? "text-[9px]" : "text-xs"}`}>{url}</span>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// ERP DASHBOARD MOCK (composição estática representando o painel gerado)
// ─────────────────────────────────────────────
export function ErpDashboardMock({ modules, compact = false }: { modules: string[]; compact?: boolean }) {
  const items = ERP_MODULES.filter((m) => modules.includes(m.id));
  const shown = items.length ? items : ERP_MODULES.slice(0, 3);

  return (
    <div className={`flex ${compact ? "min-h-[160px]" : "min-h-[360px]"} text-left`}>
      {!compact && (
        <div className="hidden sm:flex w-40 flex-shrink-0 flex-col gap-1 border-r border-border dark:border-white/10 bg-muted/40 dark:bg-white/[0.02] p-3">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium mb-1">
            <LayoutDashboard size={13} /> Dashboard
          </div>
          {shown.map((m) => (
            <div key={m.id} className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-muted-foreground text-xs">
              <m.icon size={13} /> {m.label}
            </div>
          ))}
        </div>
      )}
      <div className={`flex-1 space-y-2 ${compact ? "p-2.5" : "p-4 sm:p-5 space-y-4"}`}>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`rounded-lg sm:rounded-xl border border-border dark:border-white/10 bg-card ${compact ? "p-1.5" : "p-3"}`}>
              <div className={`rounded bg-foreground/10 mb-1.5 ${compact ? "h-1 w-5" : "h-2 w-10"}`} />
              <div className={`rounded bg-primary/25 ${compact ? "h-2 w-7" : "h-4 w-14"}`} />
            </div>
          ))}
        </div>
        <div className={`rounded-lg sm:rounded-xl border border-border dark:border-white/10 bg-card flex items-end gap-1 sm:gap-2 ${compact ? "p-2 h-10" : "p-4 h-24"}`}>
          {[40, 65, 35, 80, 55, 70, 45].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-primary/70 to-accent/60" style={{ height: `${h}%` }} />
          ))}
        </div>
        {!compact && (
          <div className="rounded-xl border border-border dark:border-white/10 bg-card p-3 space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-muted" />
                <div className="h-2 flex-1 rounded bg-foreground/10" />
                <div className="h-2 w-10 rounded bg-foreground/10" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SITE MOCK (composição estática representando o site gerado)
// ─────────────────────────────────────────────
export function SiteMock({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${compact ? "p-2.5 space-y-2 min-h-[160px]" : "p-5 sm:p-8 space-y-5 min-h-[360px]"}`}>
      <div className={`rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 border border-border dark:border-white/10 space-y-2 ${compact ? "p-2.5" : "p-6 sm:space-y-3"}`}>
        <div className={`rounded-full bg-primary/30 ${compact ? "h-1 w-10" : "h-2 w-24"}`} />
        <div className={`rounded bg-foreground/15 ${compact ? "h-1.5 w-2/3" : "h-4 w-2/3"}`} />
        {!compact && <div className="h-2 w-1/2 rounded bg-foreground/10" />}
        <div className={`rounded-full bg-primary/40 ${compact ? "h-2.5 w-10 mt-1" : "h-7 w-28 mt-2"}`} />
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className={`rounded-md sm:rounded-lg border border-border dark:border-white/10 bg-card space-y-1.5 ${compact ? "p-1.5" : "p-3"}`}>
            {!compact && <div className="w-6 h-6 rounded-md bg-accent/20" />}
            <div className="h-1.5 sm:h-2 w-full rounded bg-foreground/10" />
            <div className="h-1.5 sm:h-2 w-3/4 rounded bg-foreground/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PROJECT THUMBNAIL (preview sintético gerado por CSS, sem foto de banco de imagens)
// ─────────────────────────────────────────────
function hashSeed(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function ProjectThumbnail({ seed }: { seed: string }) {
  const variant = hashSeed(seed) % 3;
  const glow = variant === 0 ? "bg-primary/30" : variant === 1 ? "bg-accent/30" : "bg-success/25";

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-muted to-card overflow-hidden">
      <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.06)_1px,transparent_0)] dark:[background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:14px_14px]" />
      <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl ${glow}`} />
      <div className="absolute inset-4 rounded-lg border border-border/60 dark:border-white/10 bg-card/70 backdrop-blur-sm p-2.5 flex flex-col gap-1.5">
        <div className="flex items-center gap-1 mb-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400/70" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/70" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-400/70" />
        </div>
        {variant === 2 ? (
          <div className="flex-1 flex gap-1.5">
            <div className="w-1/4 rounded bg-primary/15" />
            <div className="flex-1 grid grid-cols-2 gap-1.5">
              {[...Array(4)].map((_, i) => <div key={i} className="rounded bg-foreground/[0.06]" />)}
            </div>
          </div>
        ) : (
          <div className="flex-1 space-y-1.5">
            <div className={`h-1/2 rounded ${variant === 0 ? "bg-primary/15" : "bg-accent/15"}`} />
            <div className="grid grid-cols-3 gap-1.5 h-1/3">
              {[...Array(3)].map((_, i) => <div key={i} className="rounded bg-foreground/[0.06]" />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
