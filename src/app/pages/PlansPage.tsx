import { motion } from "motion/react";
import { pageVariants, PageGlow, PageHeader } from "../components/common";
import { LightNav } from "../components/LightNav";
import { PlansContent } from "../components/PlansContent";

export function PlansPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <PageGlow />
      <LightNav />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <motion.div variants={pageVariants} initial="initial" animate="animate">
          <PageHeader eyebrow="Assinatura" title="Planos" />
          <PlansContent />
        </motion.div>
      </div>
    </div>
  );
}
