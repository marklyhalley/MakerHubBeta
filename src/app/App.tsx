import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Star, ChevronRight, ArrowRight, Sparkles, LayoutGrid, User,
  LogOut, Bookmark, Globe, Lock, Moon, Coins, Camera, Pencil,
  Plus, Loader2, Send, Eye, ChevronLeft, Check, Mail, Apple,
  Sun, X
} from "lucide-react";

type Page = "home" | "login" | "register" | "builder" | "result" | "projects" | "profile" | "plans";

const BRAND = {
  indigo: "#505ba6",
  sky: "#7ed7ff",
  light: "#f7f9fc",
  dark: "#1f2937",
  green: "#3ddc97",
};

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
};

// ─────────────────────────────────────────────
// LOGO
// ─────────────────────────────────────────────
function Logo({ light = false, size = "md" }: { light?: boolean; size?: "sm" | "md" | "lg" }) {
  const sz = size === "lg" ? "text-4xl" : size === "sm" ? "text-xl" : "text-2xl";
  return (
    <span className={`font-['Raleway',sans-serif] font-bold tracking-tight ${sz} ${light ? "text-white" : "text-[#1f2937]"} select-none`}>
      <span className="text-[#505ba6]">MAKER</span>
      <span className={light ? "text-white" : "text-[#1f2937]"}>Hub</span>
    </span>
  );
}

// ─────────────────────────────────────────────
// STARS
// ─────────────────────────────────────────────
function Stars({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className="fill-[#7ed7ff] text-[#7ed7ff]" />
        ))}
      </div>
      <span className={`text-xs font-medium ${light ? "text-white/70" : "text-gray-500"}`}>
        5.0 Excelente · 67 avaliações
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────
// DARK NAV (for hero pages)
// ─────────────────────────────────────────────
function DarkNav({
  page, setPage, loggedIn,
}: { page: Page; setPage: (p: Page) => void; loggedIn: boolean }) {
  return (
    <nav className="relative z-20 flex items-center justify-between px-8 py-5">
      <button onClick={() => setPage("home")} className="flex-shrink-0">
        <Logo light size="md" />
      </button>
      <div className="flex items-center gap-8">
        <button
          onClick={() => setPage("builder")}
          className={`text-sm font-medium text-white/90 hover:text-white transition-colors ${page === "builder" ? "relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#7ed7ff] after:rounded-full" : ""}`}
        >
          Criar Site
        </button>
        <button
          onClick={() => setPage("home")}
          className="text-sm font-medium text-white/90 hover:text-white transition-colors"
        >
          Sobre Nós
        </button>
        {loggedIn ? (
          <>
            <button
              onClick={() => setPage("projects")}
              className={`text-sm font-medium transition-colors ${page === "projects" ? "text-[#7ed7ff]" : "text-white/90 hover:text-white"}`}
            >
              Meus Projetos
            </button>
            <button
              onClick={() => setPage("profile")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-sm transition-all ${
                page === "profile"
                  ? "bg-[#7ed7ff] text-[#1f2937]"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <User size={15} />
              Perfil
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setPage("login")}
              className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => setPage("builder")}
              className="px-5 py-2 rounded-full bg-[#505ba6] hover:bg-[#3f4a96] text-white text-sm font-semibold transition-all shadow-lg shadow-[#505ba6]/30 hover:shadow-[#505ba6]/50 hover:-translate-y-0.5"
            >
              Criar Site
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────
// LIGHT NAV (for content pages)
// ─────────────────────────────────────────────
function LightNav({
  page, setPage,
}: { page: Page; setPage: (p: Page) => void }) {
  const navItems: { label: string; target: Page }[] = [
    { label: "Criar novo", target: "builder" },
    { label: "Meus projetos", target: "projects" },
    { label: "Planos", target: "plans" },
  ];
  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[rgba(80,91,166,0.1)] flex items-center justify-between px-8 py-4">
      <button onClick={() => setPage("home")} className="flex-shrink-0">
        <Logo size="md" />
      </button>
      <div className="flex items-center gap-2">
        {navItems.map((item) => (
          <button
            key={item.target}
            onClick={() => setPage(item.target)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              page === item.target
                ? "bg-[#7ed7ff] text-[#1f2937]"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={() => setPage("profile")}
          className={`ml-2 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            page === "profile"
              ? "bg-[#505ba6] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <User size={15} />
          Perfil
        </button>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────
function HomePage({ setPage, loggedIn }: { setPage: (p: Page) => void; loggedIn: boolean }) {
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
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=1920&h=1080&fit=crop&auto=format"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-[#1f2937]/60 to-[#505ba6]/40" />
        {/* Mesh glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#505ba6]/20 via-transparent to-transparent" />
      </div>

      <DarkNav page="home" setPage={setPage} loggedIn={loggedIn} />

      {/* Hero */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium backdrop-blur-sm">
            <Sparkles size={13} className="text-[#7ed7ff]" />
            Criador de sites com I.A
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-['Poppins',sans-serif] font-extrabold text-[clamp(4rem,10vw,9rem)] leading-none tracking-tight text-[#7ed7ff] mb-6"
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
          <button
            onClick={() => setPage(loggedIn ? "builder" : "register")}
            className="group flex items-center gap-2 px-8 py-4 rounded-full bg-[#505ba6] hover:bg-[#3f4a96] text-white font-semibold text-base transition-all shadow-xl shadow-[#505ba6]/40 hover:shadow-[#505ba6]/60 hover:-translate-y-0.5"
          >
            Criar site
            <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => setPage("plans")}
            className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-base border border-white/20 backdrop-blur-sm transition-all"
          >
            Ver planos
          </button>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 flex items-center justify-center pb-8">
        <Stars light />
      </div>

      {/* Features strip */}
      <div className="relative z-10 border-t border-white/10 backdrop-blur-sm bg-black/20">
        <div className="max-w-4xl mx-auto px-8 py-6 grid grid-cols-3 divide-x divide-white/10">
          {[
            { icon: "⚡", label: "Geração em segundos" },
            { icon: "🎨", label: "Design profissional" },
            { icon: "🚀", label: "Publicação com 1 clique" },
          ].map((f) => (
            <div key={f.label} className="flex items-center justify-center gap-3 px-6">
              <span className="text-xl">{f.icon}</span>
              <span className="text-white/70 text-sm font-medium">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// AUTH CARD WRAPPER
// ─────────────────────────────────────────────
function AuthPage({ children, setPage }: { children: React.ReactNode; setPage: (p: Page) => void }) {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=1920&h=1080&fit=crop&auto=format"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-[#1f2937]/65 to-[#505ba6]/45" />
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="px-8 py-5">
          <button onClick={() => setPage("home")}>
            <Logo light size="md" />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          {children}
        </div>
        <div className="flex justify-center pb-8">
          <Stars light />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// LOGIN PAGE
// ─────────────────────────────────────────────
function LoginPage({ setPage, onLogin }: { setPage: (p: Page) => void; onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); setPage("projects"); }, 1200);
  };

  return (
    <AuthPage setPage={setPage}>
      <motion.div
        variants={pageVariants} initial="initial" animate="animate"
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-black/30 p-10"
      >
        <div className="text-center mb-8">
          <h2 className="font-['Poppins',sans-serif] font-bold text-3xl text-[#505ba6] mb-1">
            Bem-vindo ao Maker Hub
          </h2>
          <p className="text-sm text-gray-500">Entre para continuar criando</p>
        </div>

        <div className="space-y-3 mb-6">
          <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl h-12 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Entrar com Google
          </button>
          <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl h-12 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Apple size={18} className="text-gray-800" />
            Entrar com Apple
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">ou</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">E-mail</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-[#f7f9fc] text-sm focus:outline-none focus:ring-2 focus:ring-[#505ba6]/30 focus:border-[#505ba6] transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-[#505ba6] hover:bg-[#3f4a96] text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : null}
            Continuar por e-mail
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Não tem uma conta?{" "}
          <button onClick={() => setPage("register")} className="text-[#1f2937] font-semibold hover:text-[#505ba6] transition-colors underline underline-offset-2">
            Cadastre-se
          </button>
        </p>
        <p className="text-center text-xs text-gray-400 mt-4">
          Termos de serviço · Política de privacidade
        </p>
      </motion.div>
    </AuthPage>
  );
}

// ─────────────────────────────────────────────
// REGISTER PAGE
// ─────────────────────────────────────────────
function RegisterPage({ setPage, onLogin }: { setPage: (p: Page) => void; onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); setPage("builder"); }, 1400);
  };

  return (
    <AuthPage setPage={setPage}>
      <motion.div
        variants={pageVariants} initial="initial" animate="animate"
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-black/30 p-10"
      >
        <div className="text-center mb-8">
          <h2 className="font-['Poppins',sans-serif] font-bold text-3xl text-[#505ba6] mb-1">
            Crie sua conta
          </h2>
          <p className="text-sm text-gray-500">Comece a criar sites em segundos</p>
        </div>

        <div className="space-y-3 mb-6">
          <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl h-12 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Entrar com Google
          </button>
          <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl h-12 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Apple size={18} className="text-gray-800" />
            Entrar com Apple
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">ou</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">E-mail</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-[#f7f9fc] text-sm focus:outline-none focus:ring-2 focus:ring-[#505ba6]/30 focus:border-[#505ba6] transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Senha</label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-[#f7f9fc] text-sm focus:outline-none focus:ring-2 focus:ring-[#505ba6]/30 focus:border-[#505ba6] transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-[#505ba6] hover:bg-[#3f4a96] text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : null}
            Concluir cadastro
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Já tem uma conta?{" "}
          <button onClick={() => setPage("login")} className="text-[#1f2937] font-semibold hover:text-[#505ba6] transition-colors underline underline-offset-2">
            Entrar
          </button>
        </p>
      </motion.div>
    </AuthPage>
  );
}

// ─────────────────────────────────────────────
// BUILDER PAGE
// ─────────────────────────────────────────────
function BuilderPage({
  setPage, loggedIn, prompt, setPrompt,
}: {
  setPage: (p: Page) => void;
  loggedIn: boolean;
  prompt: string;
  setPrompt: (s: string) => void;
}) {
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
    if (!loggedIn) { setPage("register"); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setPage("result"); }, 2200);
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=1920&h=1080&fit=crop&auto=format"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/72 via-[#1f2937]/62 to-[#505ba6]/42" />
      </div>

      <DarkNav page="builder" setPage={setPage} loggedIn={loggedIn} />

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

          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl shadow-black/30 p-5">
            <textarea
              ref={textRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="quero um site sobre..."
              rows={4}
              className="w-full resize-none text-[#1f2937] text-base font-['Inter',sans-serif] placeholder-gray-400 focus:outline-none bg-transparent leading-relaxed"
            />
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-400">{prompt.length} / 500 caracteres</span>
              <button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#505ba6] hover:bg-[#3f4a96] disabled:opacity-50 text-white text-sm font-semibold transition-all"
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
            <div className="grid grid-cols-2 gap-2">
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

// ─────────────────────────────────────────────
// RESULT PAGE
// ─────────────────────────────────────────────
function ResultPage({ setPage, prompt }: { setPage: (p: Page) => void; prompt: string }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f9fc] flex flex-col">
      <LightNav page="result" setPage={setPage} />

      <div className="flex-1 flex flex-col items-center px-6 py-12 max-w-6xl mx-auto w-full">
        <motion.div variants={pageVariants} initial="initial" animate="animate" className="w-full">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Resultado gerado por I.A</p>
              <h1 className="font-['Poppins',sans-serif] font-bold text-4xl text-[#505ba6]">Resultado:</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all ${saved ? "bg-[#3ddc97]/10 border-[#3ddc97] text-[#3ddc97]" : "border-gray-200 text-gray-600 hover:bg-gray-100"}`}
              >
                {saved ? <Check size={15} /> : <Bookmark size={15} />}
                {saved ? "Salvo!" : "Salvar"}
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#505ba6] hover:bg-[#3f4a96] text-white text-sm font-semibold transition-all">
                <Globe size={15} />
                Publicar
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gray-100 px-4 py-2.5 flex items-center gap-2 border-b border-gray-100">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4">
                <div className="h-6 bg-white rounded-md flex items-center px-3">
                  <span className="text-xs text-gray-400 font-mono truncate">https://makerhub.com.br/{prompt.slice(0, 20).toLowerCase().replace(/\s+/g, "-")}...</span>
                </div>
              </div>
            </div>

            <div className="p-12 flex flex-col items-center justify-center text-center min-h-[420px]">
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3ddc97]/10 text-[#3ddc97] text-xs font-semibold">
                  <Check size={12} /> Site gerado com sucesso
                </span>
              </div>
              <h2 className="font-['Poppins',sans-serif] font-bold text-[clamp(2rem,6vw,5rem)] text-[#1f2937] leading-tight mb-4 max-w-2xl">
                {prompt || "Boa sorte galera do T.I"}
              </h2>
              <p className="text-gray-400 text-sm max-w-md">
                Seu site foi gerado com base na sua descrição. Clique em "Publicar" para colocá-lo no ar ou "Salvar" para editar depois.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <button onClick={() => setPage("builder")} className="flex items-center gap-2 text-sm text-[#505ba6] font-medium hover:text-[#3f4a96] transition-colors">
                  <ChevronLeft size={15} />
                  Gerar outro
                </button>
                <button onClick={() => setPage("projects")} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                  <LayoutGrid size={15} />
                  Meus projetos
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PROJECTS PAGE
// ─────────────────────────────────────────────
const PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop&auto=format",
];

function ProjectsPage({ setPage }: { setPage: (p: Page) => void }) {
  const projects = [
    { name: "Clínica Dental", date: "Editado há 2 dias", published: true },
    { name: "Loja Fashion", date: "Editado há 5 dias", published: false },
    { name: "Portfólio Foto", date: "Editado há 1 semana", published: true },
    { name: "Academia Fit", date: "Editado há 2 semanas", published: false },
  ];

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <LightNav page="projects" setPage={setPage} />
      <div className="max-w-6xl mx-auto px-8 py-12">
        <motion.div variants={pageVariants} initial="initial" animate="animate">
          <div className="flex items-center justify-between mb-10">
            <h1 className="font-['Poppins',sans-serif] font-bold text-5xl text-[#505ba6]">Meus projetos</h1>
            <button
              onClick={() => setPage("builder")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7ed7ff] hover:bg-[#5fcef8] text-[#1f2937] text-sm font-semibold transition-all shadow-sm shadow-[#7ed7ff]/30"
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
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={PROJECT_IMAGES[i]}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${p.published ? "bg-[#3ddc97]/90 text-white" : "bg-white/90 text-gray-600"}`}>
                      {p.published ? "Publicado" : "Rascunho"}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-['Poppins',sans-serif] font-semibold text-base text-[#1f2937] mb-1">{p.name}</h3>
                  <p className="text-xs text-gray-400">{p.date}</p>
                </div>
              </motion.div>
            ))}

            {/* New project card */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              onClick={() => setPage("builder")}
              className="group bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#505ba6] hover:bg-[#505ba6]/5 flex flex-col items-center justify-center h-full min-h-[280px] transition-all cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-gray-100 group-hover:bg-[#505ba6]/10 flex items-center justify-center mb-3 transition-colors">
                <Plus size={24} className="text-gray-400 group-hover:text-[#505ba6] transition-colors" />
              </div>
              <span className="text-sm font-medium text-gray-400 group-hover:text-[#505ba6] transition-colors">Novo projeto</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PROFILE PAGE
// ─────────────────────────────────────────────
function ProfilePage({ setPage, onLogout }: { setPage: (p: Page) => void; onLogout: () => void }) {
  const [name, setName] = useState("Miguel Silva");
  const [darkMode, setDarkMode] = useState(false);
  const [subPage, setSubPage] = useState<"settings" | "plans">("settings");

  const fields = [
    { icon: <Lock size={16} />, label: "Senha", value: "Alterar senha" },
    { icon: <User size={16} />, label: "Gênero", value: "Masculino" },
    { icon: <Globe size={16} />, label: "Idioma", value: "Português (Brasil)" },
  ];

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <LightNav page="profile" setPage={setPage} />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <motion.div variants={pageVariants} initial="initial" animate="animate">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-[#1f2937] flex items-center justify-center shadow-lg">
                <User size={44} className="text-white" />
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#505ba6] text-white flex items-center justify-center shadow-md hover:bg-[#3f4a96] transition-colors">
                <Plus size={14} />
              </button>
            </div>
            <h2 className="font-['Poppins',sans-serif] font-semibold text-2xl text-[#1f2937]">{name}</h2>
          </div>

          {/* Sub tabs */}
          <div className="flex gap-2 bg-white rounded-xl p-1 border border-gray-100 mb-8">
            {(["settings", "plans"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSubPage(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${subPage === t ? "bg-[#505ba6] text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                {t === "settings" ? "Configurações" : "Planos"}
              </button>
            ))}
          </div>

          {subPage === "settings" ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
              {/* Name field */}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex-1 border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between bg-[#f7f9fc]">
                    <span className="font-['Inter',sans-serif] font-medium text-[#1f2937]">{name}</span>
                    <Pencil size={14} className="text-gray-400" />
                  </div>
                </div>
              </div>

              {fields.map((f) => (
                <div key={f.label} className="p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#1f2937] mb-2">
                    <span className="text-[#505ba6]">{f.icon}</span>
                    {f.label}
                  </div>
                  <div className="border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between bg-[#f7f9fc]">
                    <span className="text-sm text-gray-500">{f.value}</span>
                    <Pencil size={14} className="text-gray-400" />
                  </div>
                </div>
              ))}

              {/* Tokens */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#1f2937] mb-2">
                  <Coins size={16} className="text-[#505ba6]" />
                  Tokens
                </div>
                <div className="border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between bg-[#f7f9fc]">
                  <span className="text-sm text-gray-500">15 Tokens</span>
                  <button onClick={() => setSubPage("plans")} className="text-xs text-[#505ba6] font-semibold hover:text-[#3f4a96] underline underline-offset-2 transition-colors">
                    comprar mais
                  </button>
                </div>
              </div>

              {/* Dark mode */}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#1f2937]">
                    {darkMode ? <Moon size={16} className="text-[#505ba6]" /> : <Sun size={16} className="text-[#505ba6]" />}
                    Modo noturno
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${darkMode ? "bg-[#505ba6]" : "bg-gray-300"}`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${darkMode ? "translate-x-6" : "translate-x-0.5"}`} />
                  </button>
                </div>
              </div>

              {/* Logout */}
              <div className="p-5">
                <button
                  onClick={() => { onLogout(); setPage("home"); }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-100 text-red-500 hover:bg-red-50 text-sm font-medium transition-colors"
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

// ─────────────────────────────────────────────
// PLANS CONTENT (reused in plans page & profile)
// ─────────────────────────────────────────────
function PlansContent() {
  const [selected, setSelected] = useState<number | null>(null);
  const plans = [
    { tokens: 15, price: "R$ 75,00", stacks: 1, highlight: false },
    { tokens: 30, price: "R$ 150,00", stacks: 2, highlight: false },
    { tokens: 50, price: "R$ 250,00", stacks: 3, highlight: true },
  ];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
      <h3 className="font-['Poppins',sans-serif] font-bold text-3xl text-[#505ba6] text-center mb-8">Planos</h3>
      <div className="grid grid-cols-3 gap-4">
        {plans.map((p, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`group relative rounded-2xl border-2 transition-all overflow-hidden ${
              selected === i
                ? "border-[#505ba6] shadow-lg shadow-[#505ba6]/15"
                : "border-gray-200 hover:border-[#505ba6]/40"
            }`}
          >
            {p.highlight && (
              <div className="absolute top-2 left-0 right-0 flex justify-center">
                <span className="px-2 py-0.5 rounded-full bg-[#505ba6] text-white text-[10px] font-bold uppercase tracking-wide">Popular</span>
              </div>
            )}
            <div className="p-5 pt-8 flex flex-col items-center">
              <span className="text-sm font-semibold text-[#1f2937] mb-4">{p.tokens} Tokens</span>
              <div className="flex items-end justify-center gap-0.5 mb-4">
                {[...Array(p.stacks)].map((_, j) => (
                  <div key={j} style={{ height: `${20 + j * 10}px` }} className="w-5 rounded-sm bg-[#505ba6]/20 flex items-end justify-center">
                    <div className="w-full rounded-sm bg-[#505ba6]" style={{ height: `${30 + j * 8}%` }} />
                  </div>
                ))}
              </div>
            </div>
            <div className={`py-4 text-center font-['Poppins',sans-serif] font-semibold text-lg transition-colors ${selected === i ? "bg-[#7ed7ff] text-[#1f2937]" : "bg-[#7ed7ff]/30 text-[#1f2937]"}`}>
              {p.price}
            </div>
          </button>
        ))}
      </div>
      {selected !== null && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full mt-6 py-3 rounded-xl bg-[#505ba6] hover:bg-[#3f4a96] text-white font-semibold text-sm transition-all"
        >
          Comprar {plans[selected].tokens} Tokens por {plans[selected].price}
        </motion.button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// PLANS PAGE
// ─────────────────────────────────────────────
function PlansPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <LightNav page="plans" setPage={setPage} />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <motion.div variants={pageVariants} initial="initial" animate="animate">
          <PlansContent />
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer className="bg-white border-t border-gray-100 px-8 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="col-span-2">
          <Logo size="md" />
          <p className="mt-4 text-gray-500 text-sm leading-relaxed max-w-lg">
            Acreditamos que todos merecem uma chance de sonhar com algo e ver aquilo se tornar realidade. Por isso buscamos entregar as ferramentas necessárias para transformar o seu sonho em realidade.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <Mail size={16} className="text-gray-400" />
            <span className="text-sm text-gray-600 font-medium">makerhub@gmail.com.br</span>
          </div>
        </div>
        <div>
          <h4 className="font-['Poppins',sans-serif] font-semibold text-sm text-[#1f2937] mb-3">Jurídico</h4>
          <div className="space-y-2">
            <button className="block text-sm text-gray-500 hover:text-[#505ba6] transition-colors">Política de privacidade</button>
            <button className="block text-sm text-gray-500 hover:text-[#505ba6] transition-colors">Termos de uso</button>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-400">© 2025 MakerHub. Todos os direitos reservados.</span>
        <Stars />
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [loggedIn, setLoggedIn] = useState(false);
  const [prompt, setPrompt] = useState("");

  const showFooter = ["home"].includes(page);

  return (
    <div className="min-h-screen bg-[#f7f9fc] font-['Inter',sans-serif]" style={{ scrollbarWidth: "none" }}>
      <style>{`*::-webkit-scrollbar{display:none}`}</style>
      <AnimatePresence mode="wait">
        <motion.div key={page} className="min-h-screen flex flex-col">
          {page === "home" && (
            <HomePage setPage={setPage} loggedIn={loggedIn} />
          )}
          {page === "login" && (
            <LoginPage setPage={setPage} onLogin={() => setLoggedIn(true)} />
          )}
          {page === "register" && (
            <RegisterPage setPage={setPage} onLogin={() => setLoggedIn(true)} />
          )}
          {page === "builder" && (
            <BuilderPage
              setPage={setPage}
              loggedIn={loggedIn}
              prompt={prompt}
              setPrompt={setPrompt}
            />
          )}
          {page === "result" && (
            <ResultPage setPage={setPage} prompt={prompt} />
          )}
          {page === "projects" && (
            <ProjectsPage setPage={setPage} />
          )}
          {page === "profile" && (
            <ProfilePage setPage={setPage} onLogout={() => setLoggedIn(false)} />
          )}
          {page === "plans" && (
            <PlansPage setPage={setPage} />
          )}
          {showFooter && <Footer setPage={setPage} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
