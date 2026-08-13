import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Bookmark, Check, ChevronLeft, LayoutGrid, Download, Eye, Clock, Globe, LayoutDashboard, Users } from "lucide-react";
import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { pageVariants, PageGlow, BrowserMockup, ErpDashboardMock, SiteMock, ERP_MODULES } from "../components/common";
import { LightNav } from "../components/LightNav";

export function ResultPage() {
  const navigate = useNavigate();
  const { prompt, modules } = useApp();
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<"site" | "erp">("site");
  const mockupRef = useRef<HTMLDivElement>(null);

  const generatedModules = modules.length ? modules : ["estoque", "financeiro", "vendas"];
  const generatedPages = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Clientes", icon: Users },
    ...ERP_MODULES.filter((m) => generatedModules.includes(m.id)).map((m) => ({ label: m.label, icon: m.icon })),
  ];

  const slug = prompt.trim() ? prompt.slice(0, 24).toLowerCase().replace(/\s+/g, "-") : "seu-projeto";
  const scrollToPreview = () => mockupRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <div className="relative min-h-screen bg-background flex flex-col">
      <PageGlow />
      <LightNav />

      <div className="flex-1 flex flex-col items-center px-6 py-12 max-w-6xl mx-auto w-full">
        <motion.div variants={pageVariants} initial="initial" animate="animate" className="w-full">
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Resultado gerado por I.A</p>
              <h1 className="font-['Poppins',sans-serif] font-bold text-3xl sm:text-4xl text-primary dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#a9b6ff] dark:to-accent max-w-2xl">
                {prompt.trim() || "Seu projeto está pronto"}
              </h1>
            </div>
            <button
              onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all ${saved ? "bg-success/10 border-success text-success dark:shadow-[0_0_16px_-4px_rgba(61,220,151,0.6)]" : "border-border text-muted-foreground hover:bg-muted dark:hover:border-white/20"}`}
            >
              {saved ? <Check size={15} /> : <Bookmark size={15} />}
              {saved ? "Salvo!" : "Salvar"}
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-semibold dark:border dark:border-success/25">
              <Check size={12} /> Site gerado com sucesso
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold dark:border dark:border-primary/30">
              Sistema ERP incluso
            </span>
          </div>

          <div ref={mockupRef}>
            <div className="flex items-center gap-1 mb-3 p-1 rounded-xl bg-muted dark:bg-white/[0.04] w-fit">
              <button
                onClick={() => setTab("site")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === "site" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Globe size={14} /> Site
              </button>
              <button
                onClick={() => setTab("erp")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === "erp" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                <LayoutDashboard size={14} /> Painel ERP
              </button>
            </div>

            <BrowserMockup
              url={`https://makerhub.com.br/${slug}${tab === "erp" ? "/admin" : ""}`}
              className="shadow-sm dark:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.7)]"
            >
              <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                {tab === "site" ? <SiteMock /> : <ErpDashboardMock modules={generatedModules} />}
              </motion.div>
            </BrowserMockup>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">O que foi gerado</p>
            <div className="flex flex-wrap gap-2">
              {generatedPages.map((p) => (
                <span
                  key={p.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border dark:border-white/10 text-xs font-medium text-foreground"
                >
                  <p.icon size={12} className="text-primary" /> {p.label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <button onClick={() => navigate("/builder")} className="flex items-center gap-2 text-sm text-primary font-medium hover:brightness-110 transition-colors">
              <ChevronLeft size={15} />
              Gerar outro
            </button>
            <button onClick={() => navigate("/projects")} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border dark:border-white/10 text-sm text-muted-foreground hover:bg-muted transition-colors">
              <LayoutGrid size={15} />
              Meus projetos
            </button>
          </div>

          {/* Download & Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
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
                  <Eye size={15} className="text-primary" />
                </span>
                <h3 className="font-['Poppins',sans-serif] font-semibold text-base text-foreground">Preview do site</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-5 mt-1">Visualize a composição do seu site e painel ERP gerados acima.</p>
              <button
                onClick={scrollToPreview}
                className="mt-auto w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-primary hover:brightness-110 text-white text-sm font-semibold transition-all"
              >
                <Eye size={15} />
                Ver preview
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
