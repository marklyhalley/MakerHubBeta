import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, Send, Search, LayoutGrid, Palette, Sparkles, Check } from "lucide-react";
import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { pageVariants, Stars, MeshBackdrop, ERP_MODULES, BUSINESS_TYPES } from "../components/common";
import { DarkNav } from "../components/DarkNav";

const GEN_STEPS = [
  { label: "Analisando seu negócio", icon: Search },
  { label: "Criando estrutura do ERP", icon: LayoutGrid },
  { label: "Aplicando design", icon: Palette },
  { label: "Finalizando", icon: Sparkles },
];

export function BuilderPage() {
  const navigate = useNavigate();
  const { loggedIn, prompt, setPrompt, businessType, setBusinessType, modules, toggleModule } = useApp();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const examples = [
    "Uma clínica odontológica moderna com agendamento online",
    "Loja de roupas femininas com catálogo e carrinho",
    "Portfólio para fotógrafo freelance com galeria",
    "Academia de ginástica com planos e depoimentos",
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    if (!loggedIn) { navigate("/register"); return; }
    setStep(0);
    setLoading(true);
  };

  useEffect(() => {
    if (!loading) return;
    if (step >= GEN_STEPS.length - 1) {
      const t = setTimeout(() => navigate("/result"), 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 650);
    return () => clearTimeout(t);
  }, [loading, step, navigate]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <MeshBackdrop />

      <DarkNav />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16">
        <motion.div
          variants={pageVariants} initial="initial" animate="animate"
          className="w-full max-w-2xl"
        >
          <div className="text-center mb-8">
            <p className="font-['Inter',sans-serif] text-white/70 text-lg mb-3 leading-relaxed">
              Conte-nos sobre sua empresa e como ela deve funcionar<br />
              para que a nossa I.A comece a trabalhar
            </p>
          </div>

          <div className="bg-white/[0.06] backdrop-blur-lg rounded-2xl border border-white/10 p-5 mb-4">
            <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-3">Tipo de negócio (opcional)</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {BUSINESS_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setBusinessType(businessType === t ? null : t)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    businessType === t
                      ? "bg-accent text-[#1f2937] border-accent"
                      : "bg-white/5 text-white/70 border-white/15 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-3">Módulos de ERP desejados (opcional)</p>
            <div className="flex flex-wrap gap-2">
              {ERP_MODULES.map((m) => {
                const active = modules.includes(m.id);
                return (
                  <button
                    key={m.id}
                    onClick={() => toggleModule(m.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      active
                        ? "bg-primary text-white border-primary"
                        : "bg-white/5 text-white/70 border-white/15 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {active ? <Check size={12} /> : <m.icon size={12} />}
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-card/95 backdrop-blur-lg rounded-2xl shadow-2xl shadow-black/30 p-5 border border-white/10">
            <textarea
              ref={textRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="quero um site sobre..."
              rows={4}
              className="w-full resize-none text-foreground text-base font-['Inter',sans-serif] placeholder-muted-foreground focus:outline-none bg-transparent leading-relaxed"
            />
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground">{prompt.length} / 500 caracteres</span>
              <button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:brightness-110 disabled:opacity-50 text-white text-sm font-semibold transition-all"
              >
                {loading ? (
                  <><Loader2 size={15} className="animate-spin" /> Gerando...</>
                ) : (
                  <><Send size={15} /> Gerar site</>
                )}
              </button>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-3 text-center">Exemplos</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {examples.map((ex) => (
                <button
                  key={ex}
                  onClick={() => { setPrompt(ex); textRef.current?.focus(); }}
                  className="text-left px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white/70 hover:text-white text-sm transition-all"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 flex justify-center pb-8">
        <Stars light />
      </div>

      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0e1a]/90 backdrop-blur-md px-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-sm"
            >
              <div className="text-center mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 mb-4"
                >
                  <Sparkles size={22} className="text-accent" />
                </motion.div>
                <h3 className="font-['Poppins',sans-serif] font-semibold text-xl text-white">Construindo seu projeto</h3>
                <p className="text-white/50 text-sm mt-1">Isso leva só alguns segundos</p>
              </div>

              <div className="space-y-3 mb-6">
                {GEN_STEPS.map((s, i) => {
                  const done = i < step || (i === step && step === GEN_STEPS.length - 1);
                  const active = i === step && !done;
                  return (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: i <= step ? 1 : 0.35, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${
                        active ? "bg-white/10 border-accent/40" : done ? "bg-white/5 border-white/10" : "bg-transparent border-white/5"
                      }`}
                    >
                      <span className={`flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 ${done ? "bg-success/20 text-success" : active ? "bg-accent/20 text-accent" : "bg-white/10 text-white/40"}`}>
                        {done ? (
                          <Check size={15} />
                        ) : active ? (
                          <Loader2 size={15} className="animate-spin" />
                        ) : (
                          <s.icon size={15} />
                        )}
                      </span>
                      <span className={`text-sm font-medium ${active ? "text-white" : done ? "text-white/70" : "text-white/40"}`}>
                        {s.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  animate={{ width: `${((step + 1) / GEN_STEPS.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
