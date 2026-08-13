import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Sparkles, ArrowRight, Zap, Palette, Rocket, Puzzle,
  MessageSquareText, Wand2, Star, Quote,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { CountUp, PageGlow, Stars, MeshBackdrop, BrowserMockup, SiteMock } from "../components/common";
import { DarkNav } from "../components/DarkNav";

const STEPS = [
  { icon: MessageSquareText, title: "Descreva", desc: "Conte em uma frase como é o seu negócio e o que ele precisa." },
  { icon: Wand2, title: "I.A gera", desc: "Nossa I.A monta o site e a estrutura do ERP em segundos." },
  { icon: Rocket, title: "Baixe / Publique", desc: "Exporte o código-fonte ou publique com um clique." },
];

const TESTIMONIALS = [
  { name: "Marina Costa", role: "Clínica Odontológica", initials: "MC", quote: "Em menos de 5 minutos eu tinha um site e um sistema de agendamento rodando. Parecia mágica." },
  { name: "Rafael Souza", role: "Loja de Roupas", initials: "RS", quote: "O módulo de estoque veio pronto e já integrado ao site. Economizei semanas de desenvolvimento." },
  { name: "Juliana Prado", role: "Academia Fit", initials: "JP", quote: "Design profissional sem contratar ninguém. O ERP financeiro sozinho já valeu o investimento." },
];

const LOGOS = ["Nortel", "Vixen", "Cobalto", "Plúmea", "Orix"];

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
    <div className="relative flex flex-col bg-[#0b0e1a]">
      <DarkNav />
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        <MeshBackdrop />

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
              Gerador de sites + ERP com I.A
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

      {/* Como funciona */}
      <section className="relative bg-background py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              Como funciona
            </span>
            <h2 className="font-['Poppins',sans-serif] font-bold text-3xl sm:text-4xl text-foreground">
              Do prompt ao produto pronto em 3 passos
            </h2>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">
            <div className="hidden sm:block absolute top-8 left-[16.6%] right-[16.6%] h-px bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40" />
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-card border border-border dark:border-white/10 shadow-sm dark:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.7)] flex items-center justify-center mb-5">
                  <s.icon size={24} className="text-primary" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-['Poppins',sans-serif] font-semibold text-lg text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{s.desc}</p>
              </motion.div>
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
              className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-3xl border border-border dark:border-white/10 bg-card p-6 sm:p-8 flex flex-col justify-between shadow-sm dark:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.7)]"
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
              <BrowserMockup url="seusite.com.br" compact className="relative mt-8 border border-border dark:border-white/10">
                <SiteMock compact />
              </BrowserMockup>
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

      {/* Prova social */}
      <section className="relative bg-background py-24 px-6 border-t border-border dark:border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              Prova social
            </span>
            <h2 className="font-['Poppins',sans-serif] font-bold text-3xl sm:text-4xl text-foreground">
              Quem já usa, recomenda
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-3xl border border-border dark:border-white/10 bg-card p-6 shadow-sm dark:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.7)] flex flex-col"
              >
                <Quote size={26} className="text-primary/20 mb-3" />
                <p className="text-sm text-foreground leading-relaxed mb-5 flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={11} className="fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-6">Empresas que confiam no MakerHub</p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {LOGOS.map((l) => (
                <span
                  key={l}
                  className="font-['Poppins',sans-serif] font-bold text-xl text-muted-foreground/50 hover:text-primary/70 transition-colors tracking-tight select-none"
                >
                  {l}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative bg-background px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary to-[#3d4785] px-8 py-16 sm:py-20 text-center"
        >
          <div className="absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.12)_1px,transparent_0)] [background-size:26px_26px]" />
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-accent/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          <div className="relative">
            <h2 className="font-['Poppins',sans-serif] font-bold text-3xl sm:text-5xl text-white mb-4 max-w-2xl mx-auto leading-tight">
              Seu site e seu ERP, prontos em minutos
            </h2>
            <p className="text-white/75 text-base max-w-lg mx-auto mb-8">
              Descreva sua empresa agora e deixe nossa I.A cuidar do resto.
            </p>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate(loggedIn ? "/builder" : "/register")}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white hover:brightness-95 text-primary font-semibold text-base transition-all shadow-xl shadow-black/20 hover:-translate-y-0.5"
            >
              Criar meu site agora
              <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
