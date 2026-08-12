import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, Zap, Palette, Rocket, Puzzle } from "lucide-react";
import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { CountUp, Grain, PageGlow, Stars } from "../components/common";
import { DarkNav } from "../components/DarkNav";

export function HomePage() {
  const navigate = useNavigate();
  const { loggedIn } = useApp();
  const [typed, setTyped] = useState("");
  const full = "COMECE AGORA";
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(full.slice(0, i + 1));
      i++;
      if (i >= full.length) clearInterval(t);
    }, 60);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative flex flex-col overflow-hidden">
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=1920&h=1080&fit=crop&auto=format"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-[#1f2937]/60 to-primary/40" />
          {/* Mesh glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
          <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
          <Grain opacity={0.05} />
        </div>

        <DarkNav />

        {/* Hero */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium backdrop-blur-sm">
              <Sparkles size={13} className="text-accent" />
              Criador de sites com I.A
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-['Poppins',sans-serif] font-extrabold text-[clamp(4rem,10vw,9rem)] leading-none tracking-tight text-accent mb-6"
            style={{ textShadow: "0 0 80px rgba(126,215,255,0.25)" }}
          >
            {typed}
            <span className="animate-pulse text-white/30">|</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-['Inter',sans-serif] text-lg text-white/75 max-w-md leading-relaxed mb-10"
          >
            Conte-nos sobre sua empresa e como ela deve funcionar — nossa I.A começa a trabalhar por você.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-4"
          >
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate(loggedIn ? "/builder" : "/register")}
              className="group flex items-center gap-2 px-8 py-4 rounded-full bg-primary hover:brightness-110 text-white font-semibold text-base transition-all shadow-xl shadow-primary/40 hover:shadow-primary/60 hover:-translate-y-0.5"
            >
              Criar site
              <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/plans")}
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-base border border-white/20 backdrop-blur-sm transition-all"
            >
              Ver planos
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="relative z-10 flex items-center justify-center pb-8">
          <Stars light />
        </div>

        {/* Features strip */}
        <div className="relative z-10 border-t border-white/10 backdrop-blur-sm bg-black/20">
          <div className="max-w-4xl mx-auto px-8 py-6 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10 gap-4 sm:gap-0">
            {[
              { icon: Zap, label: "Geração em segundos" },
              { icon: Palette, label: "Design profissional" },
              { icon: Rocket, label: "Publicação com 1 clique" },
            ].map((f) => (
              <div key={f.label} className="flex items-center justify-center gap-3 px-6 pt-4 sm:pt-0">
                <f.icon size={18} className="text-accent" />
                <span className="text-white/70 text-sm font-medium">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento showcase */}
      <section className="relative bg-background py-24 px-6">
        <PageGlow fixed={false} />
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              Por que o MakerHub
            </span>
            <h2 className="font-['Poppins',sans-serif] font-bold text-3xl sm:text-4xl text-foreground dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#a9b6ff] dark:to-accent">
              Do zero ao site pronto, sem fricção
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(160px,auto)] gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-3xl border border-border dark:border-white/10 bg-card p-8 flex flex-col justify-between shadow-sm dark:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.7)]"
            >
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl" />
              <div className="relative">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-primary/10 dark:bg-primary/20 mb-5">
                  <Sparkles size={20} className="text-primary" />
                </span>
                <h3 className="font-['Poppins',sans-serif] font-semibold text-2xl text-foreground mb-2">I.A que entende seu negócio</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                  Descreva sua empresa em uma frase e nossa I.A monta a estrutura, o conteúdo e o sistema ERP que fazem sentido para o seu setor.
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-2 text-xs font-mono text-muted-foreground bg-muted dark:bg-white/[0.05] rounded-xl px-4 py-3 border border-border dark:border-white/10">
                <Sparkles size={12} className="text-accent flex-shrink-0" />
                "clínica odontológica com agendamento online..."
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-2 relative overflow-hidden rounded-3xl border border-border dark:border-white/10 bg-card p-6 flex items-center gap-4 shadow-sm dark:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.7)]"
            >
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-accent/10 dark:bg-accent/20 flex-shrink-0">
                <Palette size={20} className="text-accent" />
              </span>
              <div>
                <h3 className="font-['Poppins',sans-serif] font-semibold text-lg text-foreground mb-1">Design profissional automático</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Layouts modernos e responsivos, sem precisar mexer em uma linha de CSS.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative overflow-hidden rounded-3xl border border-border dark:border-white/10 bg-card p-6 flex flex-col shadow-sm dark:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.7)]"
            >
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-success/10 mb-4">
                <Puzzle size={20} className="text-success" />
              </span>
              <h3 className="font-['Poppins',sans-serif] font-semibold text-base text-foreground mb-1">Sistema ERP incluso</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Gestão pronta para operar seu negócio desde o primeiro dia.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative overflow-hidden rounded-3xl border border-border dark:border-white/10 bg-card p-6 flex flex-col shadow-sm dark:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.7)]"
            >
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-primary/10 dark:bg-primary/20 mb-4">
                <Rocket size={20} className="text-primary" />
              </span>
              <h3 className="font-['Poppins',sans-serif] font-semibold text-base text-foreground mb-1">Publicação com 1 clique</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Do rascunho ao ar em segundos, sem configuração de servidor.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="md:col-span-4 rounded-3xl border border-border dark:border-white/10 bg-card px-8 py-7 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border dark:divide-white/10 gap-6 sm:gap-0 shadow-sm dark:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.7)]"
            >
              {[
                { value: 12400, suffix: "+", label: "sites gerados" },
                { value: 5, suffix: ".0", label: "avaliação média" },
                { value: 40, suffix: "s", label: "tempo médio de geração" },
              ].map((s) => (
                <div key={s.label} className="text-center px-4">
                  <div className="font-['Poppins',sans-serif] font-bold text-3xl sm:text-4xl text-primary dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#a9b6ff] dark:to-accent">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-muted-foreground text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
