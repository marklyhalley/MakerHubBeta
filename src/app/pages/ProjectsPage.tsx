import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Plus, Search, LayoutGrid, List as ListIcon, FolderOpen } from "lucide-react";
import { useNavigate } from "react-router";
import { pageVariants, PageGlow, PageHeader, ProjectThumbnail, ERP_MODULES } from "../components/common";
import { LightNav } from "../components/LightNav";

const PROJECTS = [
  { name: "Clínica Dental", date: "Editado há 2 dias", published: true, modules: ["agendamento", "financeiro"] },
  { name: "Loja Fashion", date: "Editado há 5 dias", published: false, modules: ["estoque", "vendas"] },
  { name: "Portfólio Foto", date: "Editado há 1 semana", published: true, modules: [] as string[] },
  { name: "Academia Fit", date: "Editado há 2 semanas", published: false, modules: ["agendamento", "rh"] },
];

type Filter = "all" | "published" | "draft";
type View = "grid" | "list";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "published", label: "Publicados" },
  { id: "draft", label: "Rascunhos" },
];

function ModuleBadges({ modules }: { modules: string[] }) {
  if (!modules.length) return null;
  return (
    <div className="flex flex-wrap gap-1">
      {modules.map((id) => {
        const mod = ERP_MODULES.find((m) => m.id === id);
        if (!mod) return null;
        return (
          <span key={id} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">
            <mod.icon size={10} /> {mod.label}
          </span>
        );
      })}
    </div>
  );
}

export function ProjectsPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<View>("grid");

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      if (filter === "published" && !p.published) return false;
      if (filter === "draft" && p.published) return false;
      if (query.trim() && !p.name.toLowerCase().includes(query.trim().toLowerCase())) return false;
      return true;
    });
  }, [query, filter]);

  return (
    <div className="relative min-h-screen bg-background">
      <PageGlow />
      <LightNav />
      <div className="max-w-6xl mx-auto px-8 py-12">
        <motion.div variants={pageVariants} initial="initial" animate="animate">
          <PageHeader
            title="Meus projetos"
            action={
              <button
                onClick={() => navigate("/builder")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent hover:brightness-95 text-[#1f2937] text-sm font-semibold transition-all shadow-sm shadow-accent/30 dark:shadow-[0_0_24px_-4px_rgba(126,215,255,0.6)]"
              >
                <Plus size={16} />
                Criar novo
              </button>
            }
          />

          {/* Toolbar */}
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <div className="relative flex-1 min-w-[220px]">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar projeto..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border dark:border-white/10 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div className="flex items-center gap-1 p-1 rounded-xl bg-muted dark:bg-white/[0.04]">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === f.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 p-1 rounded-xl bg-muted dark:bg-white/[0.04]">
              <button
                onClick={() => setView("grid")}
                aria-label="Visualização em grade"
                className={`p-2 rounded-lg transition-all ${view === "grid" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setView("list")}
                aria-label="Visualização em lista"
                className={`p-2 rounded-lg transition-all ${view === "list" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                <ListIcon size={15} />
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <FolderOpen size={32} className="text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">Nenhum projeto encontrado.</p>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="group bg-card rounded-2xl overflow-hidden border border-border dark:border-white/10 shadow-sm dark:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.7)] hover:shadow-md dark:hover:border-primary/40 dark:hover:shadow-[0_0_0_1px_rgba(118,134,224,0.25),0_20px_40px_-20px_rgba(118,134,224,0.35)] hover:-translate-y-1 transition-all cursor-pointer"
                >
                  <div className="relative h-40 overflow-hidden">
                    <ProjectThumbnail seed={p.name} />
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${p.published ? "bg-success/90 text-white dark:shadow-[0_0_12px_-2px_rgba(61,220,151,0.7)]" : "bg-card/90 text-muted-foreground dark:border dark:border-white/10"}`}>
                        {p.published ? "Publicado" : "Rascunho"}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-['Poppins',sans-serif] font-semibold text-base text-foreground mb-1">{p.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{p.date}</p>
                    <ModuleBadges modules={p.modules} />
                  </div>
                </motion.div>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                onClick={() => navigate("/builder")}
                className="group bg-card rounded-2xl border-2 border-dashed border-border dark:border-white/15 hover:border-primary dark:hover:border-primary/60 hover:bg-primary/5 flex flex-col items-center justify-center h-full min-h-[220px] transition-all cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-muted group-hover:bg-primary/10 flex items-center justify-center mb-3 transition-colors">
                  <Plus size={24} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Novo projeto</span>
              </motion.button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="group flex items-center gap-4 bg-card rounded-2xl border border-border dark:border-white/10 shadow-sm dark:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.7)] hover:shadow-md dark:hover:border-primary/40 transition-all cursor-pointer p-3 pr-5"
                >
                  <div className="relative w-20 h-14 rounded-xl overflow-hidden flex-shrink-0">
                    <ProjectThumbnail seed={p.name} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-['Poppins',sans-serif] font-semibold text-sm text-foreground truncate">{p.name}</h3>
                    <p className="text-xs text-muted-foreground">{p.date}</p>
                  </div>
                  <ModuleBadges modules={p.modules} />
                  <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold ${p.published ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                    {p.published ? "Publicado" : "Rascunho"}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
