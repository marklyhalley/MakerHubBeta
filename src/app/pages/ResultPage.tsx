import { useState } from "react";
import { motion } from "motion/react";
import { Bookmark, Check, ChevronLeft, LayoutGrid, Download, Eye, Clock, MonitorSmartphone } from "lucide-react";
import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { pageVariants, PageGlow } from "../components/common";
import { LightNav } from "../components/LightNav";

export function ResultPage() {
  const navigate = useNavigate();
  const { prompt } = useApp();
  const [saved, setSaved] = useState(false);

  return (
    <div className="relative min-h-screen bg-background flex flex-col">
      <PageGlow />
      <LightNav />

      <div className="flex-1 flex flex-col items-center px-6 py-12 max-w-6xl mx-auto w-full">
        <motion.div variants={pageVariants} initial="initial" animate="animate" className="w-full">
          <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Resultado gerado por I.A</p>
              <h1 className="font-['Poppins',sans-serif] font-bold text-4xl text-primary dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#a9b6ff] dark:to-accent">Resultado:</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all ${saved ? "bg-success/10 border-success text-success dark:shadow-[0_0_16px_-4px_rgba(61,220,151,0.6)]" : "border-border text-muted-foreground hover:bg-muted dark:hover:border-white/20"}`}
              >
                {saved ? <Check size={15} /> : <Bookmark size={15} />}
                {saved ? "Salvo!" : "Salvar"}
              </button>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border dark:border-white/10 shadow-sm dark:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.7)] overflow-hidden">
            <div className="bg-muted dark:bg-white/[0.04] px-4 py-2.5 flex items-center gap-2 border-b border-border dark:border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4">
                <div className="h-6 bg-card dark:bg-white/[0.06] rounded-md flex items-center px-3">
                  <span className="text-xs text-muted-foreground font-mono truncate">https://makerhub.com.br/{prompt.slice(0, 20).toLowerCase().replace(/\s+/g, "-")}...</span>
                </div>
              </div>
            </div>

            <div className="relative p-12 flex flex-col items-center justify-center text-center min-h-[420px] overflow-hidden">
              <div className="hidden dark:block pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(118,134,224,0.18),transparent_70%)]" />
              <div className="relative mb-4 flex items-center gap-2 flex-wrap justify-center">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-semibold dark:border dark:border-success/25">
                  <Check size={12} /> Site gerado com sucesso
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold dark:border dark:border-primary/30">
                  Sistema ERP
                </span>
              </div>
              <h2 className="relative font-['Poppins',sans-serif] font-bold text-[clamp(2rem,6vw,5rem)] text-foreground leading-tight mb-4 max-w-2xl">
                {prompt || "Boa sorte galera do T.I"}
              </h2>
              <p className="relative text-muted-foreground text-sm max-w-md">
                Sua I.A gerou um sistema ERP completo com base na sua descrição. Clique em "Salvar" para editar depois.
              </p>
              <div className="relative mt-8 flex items-center gap-4">
                <button onClick={() => navigate("/builder")} className="flex items-center gap-2 text-sm text-primary font-medium hover:brightness-110 transition-colors">
                  <ChevronLeft size={15} />
                  Gerar outro
                </button>
                <button onClick={() => navigate("/projects")} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border dark:border-white/10 text-sm text-muted-foreground hover:bg-muted transition-colors">
                  <LayoutGrid size={15} />
                  Meus projetos
                </button>
              </div>
            </div>
          </div>

          {/* Download & Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="group bg-card rounded-2xl border border-border dark:border-white/10 shadow-sm dark:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.7)] p-6 flex flex-col transition-all dark:hover:border-primary/30">
              <div className="flex items-center gap-2 mb-1">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/15">
                  <Download size={15} className="text-primary" />
                </span>
                <h3 className="font-['Poppins',sans-serif] font-semibold text-base text-foreground">Download do projeto</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-5 mt-1">Baixe o código-fonte completo do seu site ERP em um arquivo .zip.</p>
              <button
                disabled
                title="Em breve"
                className="mt-auto w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-muted dark:bg-white/[0.05] border border-transparent dark:border-white/10 text-muted-foreground text-sm font-semibold cursor-not-allowed"
              >
                <Download size={15} />
                Baixar .zip
              </button>
              <span className="inline-flex items-center gap-1.5 self-center mt-3 text-[11px] font-medium text-muted-foreground">
                <Clock size={11} />
                Disponível em breve
              </span>
            </div>

            <div className="group bg-card rounded-2xl border border-border dark:border-white/10 shadow-sm dark:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.7)] p-6 flex flex-col transition-all dark:hover:border-accent/30">
              <div className="flex items-center gap-2 mb-1">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 dark:bg-accent/15">
                  <MonitorSmartphone size={15} className="text-primary" />
                </span>
                <h3 className="font-['Poppins',sans-serif] font-semibold text-base text-foreground">Preview do site</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-5 mt-1">Visualize seu site ERP em funcionamento antes de publicar.</p>
              <button
                disabled
                title="Em breve"
                className="mt-auto w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-muted dark:bg-white/[0.05] border border-transparent dark:border-white/10 text-muted-foreground text-sm font-semibold cursor-not-allowed"
              >
                <Eye size={15} />
                Abrir preview
              </button>
              <span className="inline-flex items-center gap-1.5 self-center mt-3 text-[11px] font-medium text-muted-foreground">
                <Clock size={11} />
                Disponível em breve
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
