import { Routes, Route, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { AppProvider } from "./context/AppContext";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { BuilderPage } from "./pages/BuilderPage";
import { ResultPage } from "./pages/ResultPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { PlansPage } from "./pages/PlansPage";

function AnimatedRoutes() {
  const location = useLocation();
  const footerVariant = location.pathname === "/"
    ? "full"
    : location.pathname === "/plans" || location.pathname === "/result"
      ? "compact"
      : "none";

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} className="min-h-screen flex flex-col">
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/plans" element={<PlansPage />} />
        </Routes>
        {footerVariant === "full" && <Footer />}
        {footerVariant === "compact" && <Footer compact />}
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────
export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background text-foreground font-['Inter',sans-serif]" style={{ scrollbarWidth: "none" }}>
        <style>{`*::-webkit-scrollbar{display:none}`}</style>
        <AnimatedRoutes />
      </div>
    </AppProvider>
  );
}
