import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Image, Code, ArrowRight, CheckCircle2, Lightbulb,
  Zap, Shield, RefreshCw, ChevronRight, Terminal, TestTube2,
  GitBranch, AlertTriangle, BarChart3, Brain
} from "lucide-react";

type InputType = "text" | "image" | "code";
type LayerIndex = 0 | 1 | 2 | 3;

const INPUT_TYPES = [
  { id: "text" as InputType, label: "Text", icon: FileText, example: "\"As a user, I want to reset my password…\"" },
  { id: "image" as InputType, label: "Image", icon: Image, example: "Wireframe / UI screenshot uploaded" },
  { id: "code" as InputType, label: "Code", icon: Code, example: "function resetPassword(email) { ... }" },
];

const LAYERS = [
  {
    id: 0 as LayerIndex,
    title: "Intent Intelligence",
    subtitle: "StoryCraft AI",
    description: "Converts raw input into structured, project-aware requirements",
    color: "intent",
    icon: Lightbulb,
    outputs: [
      "Structured User Story",
      "Acceptance Criteria",
      "Edge Cases",
      "Test Cases",
      "Requirement Artifacts",
    ],
    detail: "Project-aware — understands your backlog, architecture, dependencies, and sprint goals.",
  },
  {
    id: 1 as LayerIndex,
    title: "Execution Intelligence",
    subtitle: "Implementation Artifacts",
    description: "Turns structured requirements into developer-ready artifacts",
    color: "execution",
    icon: Zap,
    outputs: [
      "Copilot-Ready Prompts",
      "Unit Test Scripts",
      "Integration Test Scripts",
      "Framework-Compatible Code",
    ],
    detail: "Bridges the gap between requirements and developer action — accelerating implementation.",
  },
  {
    id: 2 as LayerIndex,
    title: "Code Validation",
    subtitle: "Hybrid Validation Engine",
    description: "Validates code implementation against original intent",
    color: "validation",
    icon: Shield,
    outputs: [
      "Acceptance Coverage Map",
      "Semantic Analysis Report",
      "Static Check Results",
      "Scope Drift Detection",
    ],
    detail: "AST analysis + LLM semantic comparison — ensures code fulfills the story, not just compiles.",
  },
  {
    id: 3 as LayerIndex,
    title: "Continuous Feedback",
    subtitle: "Closed-Loop Intelligence",
    description: "Feeds insights back for self-correcting execution",
    color: "feedback",
    icon: RefreshCw,
    outputs: [
      "Story Refinement",
      "Risk Alerts",
      "Coverage Gap Analysis",
      "Code Feedback",
      "Predictive Delivery Signals",
    ],
    detail: "Silverile is not linear — it's cyclical intelligence that self-corrects across every sprint.",
  },
];

const colorClasses: Record<string, { bg: string; border: string; text: string; glow: string; muted: string }> = {
  intent: {
    bg: "bg-intent",
    border: "border-intent/30",
    text: "text-intent-foreground",
    glow: "glow-intent",
    muted: "bg-intent-muted",
  },
  execution: {
    bg: "bg-execution",
    border: "border-execution/30",
    text: "text-execution-foreground",
    glow: "glow-execution",
    muted: "bg-execution-muted",
  },
  validation: {
    bg: "bg-validation",
    border: "border-validation/30",
    text: "text-validation-foreground",
    glow: "glow-validation",
    muted: "bg-validation-muted",
  },
  feedback: {
    bg: "bg-feedback",
    border: "border-feedback/30",
    text: "text-feedback-foreground",
    glow: "glow-feedback",
    muted: "bg-feedback-muted",
  },
};

const HeroFlow = () => {
  const [selectedInput, setSelectedInput] = useState<InputType>("text");
  const [activeLayer, setActiveLayer] = useState<LayerIndex>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveLayer((prev) => ((prev + 1) % 4) as LayerIndex);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleLayerClick = (index: LayerIndex) => {
    setIsAutoPlaying(false);
    setActiveLayer(index);
  };

  const handleInputClick = (input: InputType) => {
    setSelectedInput(input);
    setActiveLayer(0);
    setIsAutoPlaying(true);
  };

  const currentLayer = LAYERS[activeLayer];
  const cc = colorClasses[currentLayer.color];

  return (
    <section className="relative min-h-screen overflow-hidden pt-24">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      
      {/* Ambient glow */}
      <motion.div
        key={activeLayer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{
          background: activeLayer === 0 ? "hsl(258 80% 65%)" :
                     activeLayer === 1 ? "hsl(210 80% 60%)" :
                     activeLayer === 2 ? "hsl(160 70% 50%)" :
                     "hsl(38 80% 60%)",
        }}
      />

      <div className="container relative z-10 mx-auto px-6">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Brain className="h-3.5 w-3.5 text-primary" />
            AI Requirements-to-Code Intelligence Platform
          </div>
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            <span className="text-foreground">From Intent to </span>
            <span className="text-gradient-hero">Verified Execution</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            Silverile doesn't just track tasks — it understands, structures, and validates 
            your entire software delivery lifecycle. Watch the intelligence flow.
          </p>
        </motion.div>

        {/* Interactive Flow Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-10 max-w-6xl"
        >
          {/* Input Selector */}
          <div className="mb-8 flex flex-col items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Select Input Type
            </span>
            <div className="flex gap-2">
              {INPUT_TYPES.map((input) => {
                const Icon = input.icon;
                const isActive = selectedInput === input.id;
                return (
                  <motion.button
                    key={input.id}
                    onClick={() => handleInputClick(input.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition-all ${
                      isActive
                        ? "border-primary/50 bg-primary/10 text-foreground glow-intent"
                        : "border-border bg-secondary/30 text-muted-foreground hover:border-border hover:bg-secondary/60"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {input.label}
                  </motion.button>
                );
              })}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedInput}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="rounded-md border border-border bg-secondary/40 px-4 py-2 font-mono text-xs text-muted-foreground"
              >
                {INPUT_TYPES.find(i => i.id === selectedInput)?.example}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Flow Pipeline */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            {LAYERS.map((layer, index) => {
              const Icon = layer.icon;
              const isActive = activeLayer === index;
              const lc = colorClasses[layer.color];

              return (
                <motion.div
                  key={layer.id}
                  onClick={() => handleLayerClick(index as LayerIndex)}
                  whileHover={{ scale: 1.02 }}
                  className={`group relative cursor-pointer rounded-xl border p-5 transition-all duration-500 ${
                    isActive
                      ? `${lc.border} ${lc.muted} ${lc.glow}`
                      : "border-border bg-card/40 hover:border-border hover:bg-card/70"
                  }`}
                >
                  {/* Step indicator */}
                  <div className="mb-3 flex items-center justify-between">
                    <div className={`flex items-center gap-2`}>
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        isActive ? `${lc.bg}/20` : "bg-secondary"
                      }`}>
                        <Icon className={`h-4 w-4 ${isActive ? lc.text : "text-muted-foreground"}`} />
                      </div>
                      <span className={`text-xs font-bold uppercase tracking-wider ${
                        isActive ? lc.text : "text-muted-foreground"
                      }`}>
                        Layer {index + 1}
                      </span>
                    </div>
                    {index < 3 && (
                      <ChevronRight className={`hidden h-4 w-4 lg:block ${
                        isActive ? lc.text : "text-muted-foreground/30"
                      }`} />
                    )}
                    {index === 3 && (
                      <RefreshCw className={`hidden h-4 w-4 lg:block ${
                        isActive ? "text-feedback-foreground animate-spin" : "text-muted-foreground/30"
                      }`} style={isActive ? { animationDuration: "3s" } : {}} />
                    )}
                  </div>

                  <h3 className={`text-sm font-bold ${isActive ? "text-foreground" : "text-secondary-foreground"}`}>
                    {layer.title}
                  </h3>
                  <p className={`mt-0.5 text-xs ${isActive ? lc.text : "text-muted-foreground"}`}>
                    {layer.subtitle}
                  </p>

                  {/* Progress bar */}
                  {isActive && isAutoPlaying && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 rounded-b-xl"
                      style={{ background: `hsl(var(--${layer.color}))` }}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4, ease: "linear" }}
                      key={`progress-${activeLayer}-${Date.now()}`}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Active Layer Detail Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className={`mt-6 rounded-2xl border ${cc.border} ${cc.muted} p-6 md:p-8`}
            >
              <div className="grid gap-6 md:grid-cols-2">
                {/* Left: Description */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <currentLayer.icon className={`h-5 w-5 ${cc.text}`} />
                    <h3 className="text-lg font-bold text-foreground">{currentLayer.title}</h3>
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">{currentLayer.description}</p>
                  <div className={`rounded-lg border ${cc.border} bg-background/30 p-4`}>
                    <p className={`text-xs font-medium ${cc.text}`}>
                      <span className="font-bold">Key Insight:</span> {currentLayer.detail}
                    </p>
                  </div>

                  {/* Code-specific extras */}
                  {selectedInput === "code" && activeLayer === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2"
                    >
                      <Terminal className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">
                        <strong className="text-foreground">VS Code Extension:</strong> Silverile reads your code and reverse-engineers intent
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Right: Outputs */}
                <div>
                  <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Generated Outputs
                  </span>
                  <div className="space-y-2">
                    {currentLayer.outputs.map((output, i) => (
                      <motion.div
                        key={output}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`flex items-center gap-3 rounded-lg border ${cc.border} bg-background/20 px-4 py-2.5`}
                      >
                        <CheckCircle2 className={`h-4 w-4 shrink-0 ${cc.text}`} />
                        <span className="text-sm text-foreground">{output}</span>
                        {i === 0 && (
                          <span className={`ml-auto rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${cc.bg}/20 ${cc.text}`}>
                            Primary
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Flow arrow */}
              {activeLayer < 3 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <div className={`h-px flex-1 ${cc.bg}/30`} />
                  <button
                    onClick={() => handleLayerClick((activeLayer + 1) as LayerIndex)}
                    className={`flex items-center gap-1.5 rounded-full border ${cc.border} bg-background/50 px-4 py-1.5 text-xs font-medium ${cc.text} transition-all hover:bg-background/80`}
                  >
                    Next: {LAYERS[activeLayer + 1].title}
                    <ArrowRight className="h-3 w-3" />
                  </button>
                  <div className={`h-px flex-1 ${cc.bg}/30`} />
                </div>
              )}
              {activeLayer === 3 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <div className="h-px flex-1 bg-feedback/30" />
                  <button
                    onClick={() => handleLayerClick(0)}
                    className="flex items-center gap-1.5 rounded-full border border-feedback/30 bg-background/50 px-4 py-1.5 text-xs font-medium text-feedback-foreground transition-all hover:bg-background/80"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Cycles back to Intent
                  </button>
                  <div className="h-px flex-1 bg-feedback/30" />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Bottom tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 pb-16 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Most AI tools <span className="font-semibold text-foreground">generate</span>. 
              Silverile <span className="text-gradient-hero font-bold">verifies</span>. 
              That's the moat.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroFlow;
