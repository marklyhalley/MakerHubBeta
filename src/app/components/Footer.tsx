import { Mail } from "lucide-react";
import { Logo, Stars } from "./common";

export function Footer() {
  return (
    <footer className="relative bg-card border-t border-border dark:border-white/10 px-8 py-10">
      <div className="hidden dark:block pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="col-span-1 md:col-span-2">
          <Logo size="md" />
          <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-lg">
            Acreditamos que todos merecem uma chance de sonhar com algo e ver aquilo se tornar realidade. Por isso buscamos entregar as ferramentas necessárias para transformar o seu sonho em realidade.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <Mail size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-medium">makerhub@gmail.com.br</span>
          </div>
        </div>
        <div>
          <h4 className="font-['Poppins',sans-serif] font-semibold text-sm text-foreground mb-3">Jurídico</h4>
          <div className="space-y-2">
            <button className="block text-sm text-muted-foreground hover:text-primary transition-colors">Política de privacidade</button>
            <button className="block text-sm text-muted-foreground hover:text-primary transition-colors">Termos de uso</button>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-border flex flex-col sm:flex-row gap-4 items-center justify-between">
        <span className="text-xs text-muted-foreground">© 2025 MakerHub. Todos os direitos reservados.</span>
        <Stars />
      </div>
    </footer>
  );
}
