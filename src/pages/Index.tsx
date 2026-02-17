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
      <section className="relative overflow-hidden pt-20 pb-8 lg:pt-24">
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
            <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground sm:text-base md:text-lg">
              Traditional tools track tasks. Silverile{" "}
              <span className="font-semibold text-foreground">understands intent, validates execution, and strengthens delivery</span>{" "}
              across your SDLC.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90">
                Get Started <ArrowRight className="h-4 w-4" />
              </button>
              <button className="rounded-xl border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground">
                See Demo
              </button>
            </div>
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
