import { useState } from "react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { pageVariants } from "../components/common";
import { AuthPage, SocialButtons } from "../components/AuthLayout";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); login(); navigate("/projects"); }, 1200);
  };

  return (
    <AuthPage>
      <motion.div
        variants={pageVariants} initial="initial" animate="animate"
        className="w-full max-w-md bg-card text-card-foreground rounded-3xl shadow-2xl shadow-black/30 dark:shadow-[0_25px_70px_-25px_rgba(118,134,224,0.4)] p-10 border border-white/10"
      >
        <div className="text-center mb-8">
          <h2 className="font-['Poppins',sans-serif] font-bold text-3xl text-primary mb-1">
            Bem-vindo ao Maker Hub
          </h2>
          <p className="text-sm text-muted-foreground">Entre para continuar criando</p>
        </div>

        <SocialButtons />

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground font-medium">ou</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">E-mail</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full h-11 px-4 rounded-xl border border-border bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-primary hover:brightness-110 text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : null}
            Continuar por e-mail
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-5">
          Não tem uma conta?{" "}
          <button onClick={() => navigate("/register")} className="text-foreground font-semibold hover:text-primary transition-colors underline underline-offset-2">
            Cadastre-se
          </button>
        </p>
        <p className="text-center text-xs text-muted-foreground/70 mt-4">
          Termos de serviço · Política de privacidade
        </p>
      </motion.div>
    </AuthPage>
  );
}
