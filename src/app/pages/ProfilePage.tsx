import { useState } from "react";
import { motion } from "motion/react";
import { Lock, User, Globe, Pencil, Coins, Moon, Sun, LogOut, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { pageVariants, PageGlow } from "../components/common";
import { LightNav } from "../components/LightNav";
import { PlansContent } from "../components/PlansContent";

export function ProfilePage() {
  const navigate = useNavigate();
  const { logout, theme, toggleTheme } = useApp();
  const [name] = useState("Miguel Silva");
  const [subPage, setSubPage] = useState<"settings" | "plans">("settings");

  const fields = [
    { icon: <Lock size={16} />, label: "Senha", value: "Alterar senha" },
    { icon: <User size={16} />, label: "Gênero", value: "Masculino" },
    { icon: <Globe size={16} />, label: "Idioma", value: "Português (Brasil)" },
  ];

  return (
    <div className="relative min-h-screen bg-background">
      <PageGlow />
      <LightNav />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <motion.div variants={pageVariants} initial="initial" animate="animate">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 dark:shadow-[0_0_40px_-6px_rgba(118,134,224,0.7)]">
                <User size={44} className="text-white" />
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-accent text-[#1f2937] flex items-center justify-center shadow-md hover:brightness-95 transition-colors">
                <Plus size={14} />
              </button>
            </div>
            <h2 className="font-['Poppins',sans-serif] font-semibold text-2xl text-foreground">{name}</h2>
          </div>

          {/* Sub tabs */}
          <div className="flex gap-2 bg-card rounded-xl p-1 border border-border dark:border-white/10 mb-8">
            {(["settings", "plans"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSubPage(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${subPage === t ? "bg-primary text-white shadow-sm dark:shadow-[0_0_16px_-4px_rgba(118,134,224,0.7)]" : "text-muted-foreground hover:text-foreground"}`}
              >
                {t === "settings" ? "Configurações" : "Planos"}
              </button>
            ))}
          </div>

          {subPage === "settings" ? (
            <div className="bg-card rounded-2xl border border-border dark:border-white/10 shadow-sm dark:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.7)] divide-y divide-border dark:divide-white/10">
              {/* Name field */}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex-1 border border-border dark:border-white/10 rounded-xl px-4 py-3 flex items-center justify-between bg-input-background">
                    <span className="font-['Inter',sans-serif] font-medium text-foreground">{name}</span>
                    <Pencil size={14} className="text-muted-foreground" />
                  </div>
                </div>
              </div>

              {fields.map((f) => (
                <div key={f.label} className="p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                    <span className="text-primary">{f.icon}</span>
                    {f.label}
                  </div>
                  <div className="border border-border dark:border-white/10 rounded-xl px-4 py-3 flex items-center justify-between bg-input-background">
                    <span className="text-sm text-muted-foreground">{f.value}</span>
                    <Pencil size={14} className="text-muted-foreground" />
                  </div>
                </div>
              ))}

              {/* Tokens */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <Coins size={16} className="text-primary" />
                  Tokens
                </div>
                <div className="border border-border dark:border-white/10 rounded-xl px-4 py-3 flex items-center justify-between bg-input-background">
                  <span className="text-sm text-muted-foreground">15 Tokens</span>
                  <button onClick={() => setSubPage("plans")} className="text-xs text-primary font-semibold hover:brightness-110 underline underline-offset-2 transition-colors">
                    comprar mais
                  </button>
                </div>
              </div>

              {/* Dark mode */}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    {theme === "dark" ? <Moon size={16} className="text-primary" /> : <Sun size={16} className="text-primary" />}
                    Modo noturno
                  </div>
                  <button
                    onClick={toggleTheme}
                    aria-label="Alternar modo noturno"
                    className={`relative w-12 h-6 rounded-full transition-colors ${theme === "dark" ? "bg-primary dark:shadow-[0_0_16px_-3px_rgba(118,134,224,0.8)]" : "bg-muted"}`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${theme === "dark" ? "translate-x-6" : "translate-x-0.5"}`} />
                  </button>
                </div>
              </div>

              {/* Logout */}
              <div className="p-5">
                <button
                  onClick={() => { logout(); navigate("/"); }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-destructive/30 text-destructive hover:bg-destructive/10 text-sm font-medium transition-colors"
                >
                  <LogOut size={15} />
                  Sair da conta
                </button>
              </div>
            </div>
          ) : (
            <PlansContent />
          )}
        </motion.div>
      </div>
    </div>
  );
}
