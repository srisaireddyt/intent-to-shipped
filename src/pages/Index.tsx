import Navbar from "@/components/Navbar";
import PMCapabilities from "@/components/PMCapabilities";
import HeroFlow from "@/components/HeroFlow";
import { motion } from "framer-motion";
import { Brain, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero headline */}
      <section className="relative overflow-hidden pt-20 pb-4 lg:pt-24">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <Brain className="h-3.5 w-3.5 text-primary" />
              SDLC Intelligence Platform
            </div>
            <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              <span className="text-gradient-hero">Silverile</span>
              <span className="text-foreground">, Your Co Project Manager.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* PM Capabilities */}
      <PMCapabilities />

      {/* Input → Output Intelligence */}
      <HeroFlow />
    </div>
  );
};

export default Index;
