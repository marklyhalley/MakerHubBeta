import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { pageVariants, PageGlow } from "../components/common";
import { LightNav } from "../components/LightNav";

const PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop&auto=format",
];

export function ProjectsPage() {
  const navigate = useNavigate();
  const projects = [
    { name: "Clínica Dental", date: "Editado há 2 dias", published: true },
    { name: "Loja Fashion", date: "Editado há 5 dias", published: false },
    { name: "Portfólio Foto", date: "Editado há 1 semana", published: true },
    { name: "Academia Fit", date: "Editado há 2 semanas", published: false },
  ];

  return (
    <div className="relative min-h-screen bg-background">
      <PageGlow />
      <LightNav />
      <div className="max-w-6xl mx-auto px-8 py-12">
        <motion.div variants={pageVariants} initial="initial" animate="animate">
          <div className="flex items-center justify-between mb-10 gap-4 flex-wrap">
            <h1 className="font-['Poppins',sans-serif] font-bold text-5xl text-primary dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#a9b6ff] dark:to-accent">Meus projetos</h1>
            <button
              onClick={() => navigate("/builder")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent hover:brightness-95 text-[#1f2937] text-sm font-semibold transition-all shadow-sm shadow-accent/30 dark:shadow-[0_0_24px_-4px_rgba(126,215,255,0.6)]"
            >
              <Plus size={16} />
              Criar novo
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group bg-card rounded-2xl overflow-hidden border border-border dark:border-white/10 shadow-sm dark:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.7)] hover:shadow-md dark:hover:border-primary/40 dark:hover:shadow-[0_0_0_1px_rgba(118,134,224,0.25),0_20px_40px_-20px_rgba(118,134,224,0.35)] hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="relative h-48 bg-muted overflow-hidden">
                  <img
                    src={PROJECT_IMAGES[i]}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 dark:from-black/70 via-black/0 to-transparent opacity-60 dark:opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${p.published ? "bg-success/90 text-white dark:shadow-[0_0_12px_-2px_rgba(61,220,151,0.7)]" : "bg-card/90 text-muted-foreground dark:border dark:border-white/10"}`}>
                      {p.published ? "Publicado" : "Rascunho"}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-['Poppins',sans-serif] font-semibold text-base text-foreground mb-1">{p.name}</h3>
                  <p className="text-xs text-muted-foreground">{p.date}</p>
                </div>
              </motion.div>
            ))}

            {/* New project card */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              onClick={() => navigate("/builder")}
              className="group bg-card rounded-2xl border-2 border-dashed border-border dark:border-white/15 hover:border-primary dark:hover:border-primary/60 hover:bg-primary/5 flex flex-col items-center justify-center h-full min-h-[280px] transition-all cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-muted group-hover:bg-primary/10 flex items-center justify-center mb-3 transition-colors">
                <Plus size={24} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Novo projeto</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
