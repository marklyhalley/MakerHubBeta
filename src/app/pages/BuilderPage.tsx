import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Loader2, Send } from "lucide-react";
import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { pageVariants, Stars } from "../components/common";
import { DarkNav } from "../components/DarkNav";

export function BuilderPage() {
  const navigate = useNavigate();
  const { loggedIn, prompt, setPrompt } = useApp();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/result"); }, 2200);
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=1920&h=1080&fit=crop&auto=format"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/72 via-[#1f2937]/62 to-primary/42" />
      </div>

      <DarkNav />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16">
        <motion.div
          variants={pageVariants} initial="initial" animate="animate"
          className="w-full max-w-2xl"
        >
          <div className="text-center mb-10">
            <p className="font-['Inter',sans-serif] text-white/70 text-lg mb-3 leading-relaxed">
              Conte-nos sobre sua empresa e como ela deve funcionar<br />
              para que a nossa I.A comece a trabalhar
            </p>
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
    </div>
  );
}
