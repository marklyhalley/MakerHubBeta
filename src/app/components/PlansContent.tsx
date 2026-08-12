import { useState } from "react";
import { motion } from "motion/react";

// ─────────────────────────────────────────────
// PLANS CONTENT (reused in plans page & profile)
// ─────────────────────────────────────────────
export function PlansContent() {
  const [selected, setSelected] = useState<number | null>(null);
  const plans = [
    { tokens: 15, price: "R$ 75,00", stacks: 1, highlight: false },
    { tokens: 30, price: "R$ 150,00", stacks: 2, highlight: false },
    { tokens: 50, price: "R$ 250,00", stacks: 3, highlight: true },
  ];
  return (
    <div className="bg-card rounded-2xl border border-border dark:border-white/10 shadow-sm dark:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.7)] p-8">
      <h3 className="font-['Poppins',sans-serif] font-bold text-3xl text-primary dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#a9b6ff] dark:to-accent text-center mb-8">Planos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {plans.map((p, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`group relative rounded-2xl border-2 transition-all overflow-hidden ${
              selected === i
                ? "border-primary shadow-lg shadow-primary/15 dark:shadow-[0_0_28px_-6px_rgba(118,134,224,0.7)]"
                : "border-border dark:border-white/10 hover:border-primary/40"
            }`}
          >
            {p.highlight && (
              <div className="absolute top-2 left-0 right-0 flex justify-center">
                <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wide dark:shadow-[0_0_12px_-2px_rgba(118,134,224,0.8)]">Popular</span>
              </div>
            )}
            <div className="p-5 pt-8 flex flex-col items-center">
              <span className="text-sm font-semibold text-foreground mb-4">{p.tokens} Tokens</span>
              <div className="flex items-end justify-center gap-0.5 mb-4">
                {[...Array(p.stacks)].map((_, j) => (
                  <div key={j} style={{ height: `${20 + j * 10}px` }} className="w-5 rounded-sm bg-primary/20 flex items-end justify-center">
                    <div className="w-full rounded-sm bg-primary" style={{ height: `${30 + j * 8}%` }} />
                  </div>
                ))}
              </div>
            </div>
            <div className={`py-4 text-center font-['Poppins',sans-serif] font-semibold text-lg transition-colors ${selected === i ? "bg-accent text-[#1f2937]" : "bg-accent/30 dark:bg-accent/10 text-foreground"}`}>
              {p.price}
            </div>
          </button>
        ))}
      </div>
      {selected !== null && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full mt-6 py-3 rounded-xl bg-primary hover:brightness-110 text-white font-semibold text-sm transition-all dark:shadow-[0_0_24px_-4px_rgba(118,134,224,0.6)]"
        >
          Comprar {plans[selected].tokens} Tokens por {plans[selected].price}
        </motion.button>
      )}
    </div>
  );
}
