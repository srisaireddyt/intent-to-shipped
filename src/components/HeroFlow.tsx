import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Image, Code, ArrowRight, CheckCircle2, Lightbulb,
  Zap, Shield, RefreshCw, ChevronRight, Terminal, Brain,
  MessageSquare, GitCompare, TestTube2, Wand2, ArrowDownUp
} from "lucide-react";

type InputType = "text" | "image" | "code";
type LayerIndex = 0 | 1 | 2 | 3;

const INPUT_TYPES = [
  { id: "text" as InputType, label: "Text", icon: FileText, example: "\"As a user, I want to reset my password…\"", desc: "Natural language requirement or idea" },
  { id: "image" as InputType, label: "Image", icon: Image, example: "Wireframe / UI screenshot uploaded", desc: "Wireframe, mockup, or UI screenshot" },
  { id: "code" as InputType, label: "Code", icon: Code, example: "function resetPassword(email) { ... }", desc: "Source code via VS Code Extension" },
];

interface LayerData {
  title: string;
  subtitle: string;
  description: string;
  color: string;
  icon: typeof Lightbulb;
  outputs: { label: string; desc?: string }[];
  detail: string;
  badge?: string;
}

const getLayersForInput = (input: InputType): LayerData[] => {
  if (input === "code") {
    return [
      {
        title: "Intent Intelligence",
        subtitle: "StoryCraft AI — VS Code Extension",
        description: "Silverile reads your code and reverse-engineers it into structured intent. No manual story writing needed.",
        color: "intent",
        icon: Lightbulb,
        badge: "VS Code Extension",
        outputs: [
          { label: "Story from Code", desc: "Reverse-engineers code into a well-formulated user story" },
          { label: "Acceptance Criteria", desc: "Derived from code behavior and logic paths" },
          { label: "Edge Cases", desc: "Identified from code branching and error handling" },
          { label: "Test Cases", desc: "Generated from code structure and acceptance criteria" },
        ],
        detail: "Developers don't write stories — they write code. Silverile understands the code and creates the story for them.",
      },
      {
        title: "Execution Intelligence",
        subtitle: "4 Code Intelligence Modes",
        description: "Once code is connected to Silverile, four powerful capabilities unlock — from feedback to test generation.",
        color: "execution",
        icon: Zap,
        outputs: [
          { label: "Code Feedback", desc: "Attach code to an existing story → validates relevance against acceptance criteria" },
          { label: "Unit Test Scripts", desc: "Pair a story to your code → auto-generate framework-compatible unit tests" },
          { label: "Integration Test Scripts", desc: "Generate integration tests from story + code pairing" },
          { label: "Copilot Prompts", desc: "From any story, generate precise prompts to accelerate code generation" },
        ],
        detail: "Silverile bridges requirements ↔ code bidirectionally. It doesn't just define work — it validates and accelerates implementation.",
      },
      {
        title: "Code Validation",
        subtitle: "Hybrid Validation Engine",
        description: "Validates whether your code actually fulfills the story — structurally and semantically.",
        color: "validation",
        icon: Shield,
        outputs: [
          { label: "Acceptance Coverage Map", desc: "Which criteria are fulfilled, which are missing" },
          { label: "Semantic Analysis", desc: "LLM-based comparison of code intent vs story intent" },
          { label: "Static Checks", desc: "AST-level structural validation" },
          { label: "Scope Drift Detection", desc: "Detects if code goes beyond or deviates from the story" },
        ],
        detail: "We don't ask 'Did you push code?' — We ask 'Did you build what you promised?'",
      },
      {
        title: "Continuous Feedback",
        subtitle: "Closed-Loop Intelligence",
        description: "Insights feed back into stories and project — detecting risk, gaps, and alignment issues.",
        color: "feedback",
        icon: RefreshCw,
        outputs: [
          { label: "Story Refinement", desc: "Auto-updates stories based on implementation learnings" },
          { label: "Risk Alerts", desc: "Flags delivery risks based on code-story misalignment" },
          { label: "Coverage Gap Analysis", desc: "Identifies untested or unimplemented acceptance criteria" },
          { label: "Code Feedback Loop", desc: "Continuous quality signals back to the developer" },
        ],
        detail: "Silverile is a self-correcting system. Every code change feeds intelligence back into the next sprint.",
      },
    ];
  }

  // Text and Image share the same flow
  return [
    {
      title: "Intent Intelligence",
      subtitle: "StoryCraft AI",
      description: input === "image"
        ? "Upload a wireframe, mockup, or screenshot — Silverile's UI recognition structures it into executable requirements."
        : "Describe your requirement in plain language — Silverile transforms ambiguity into structured, project-aware specifications.",
      color: "intent",
      icon: Lightbulb,
      badge: input === "image" ? "UI Recognition" : undefined,
      outputs: [
        { label: "Structured User Story", desc: "Well-formulated, project-context-aware story" },
        { label: "Acceptance Criteria", desc: "Clear, testable criteria for done" },
        { label: "Edge Cases", desc: "Scenarios most teams miss until production" },
        { label: "Test Cases", desc: "Ready-to-implement test scenarios" },
        { label: "Requirement Artifacts", desc: "Structured documentation for the team" },
      ],
      detail: "Project-aware — understands your backlog, architecture, dependencies, and sprint goals. Not generic — contextual.",
    },
    {
      title: "Execution Intelligence",
      subtitle: "Implementation Artifacts",
      description: "Turns structured requirements into developer-ready artifacts — so developers move faster with clarity.",
      color: "execution",
      icon: Zap,
      outputs: [
        { label: "Copilot-Ready Prompts", desc: "Precise prompts to generate code from stories" },
        { label: "Unit Test Scripts", desc: "Framework-compatible, ready to run" },
        { label: "Integration Test Scripts", desc: "End-to-end validation scripts" },
      ],
      detail: "Bridges the gap between requirement definition and developer action — accelerating implementation with clarity.",
    },
    {
      title: "Code Validation",
      subtitle: "Hybrid Validation Engine",
      description: "Once developers write code, Silverile validates it against the original intent — structurally and semantically.",
      color: "validation",
      icon: Shield,
      outputs: [
        { label: "Acceptance Coverage Map", desc: "Which criteria are fulfilled, which are missing" },
        { label: "Semantic Analysis Report", desc: "LLM-based code vs. story comparison" },
        { label: "Static Check Results", desc: "AST-level structural validation" },
        { label: "Scope Drift Detection", desc: "Detects deviation from original intent" },
      ],
      detail: "AST analysis + LLM semantic comparison — ensures code fulfills the story, not just compiles.",
    },
    {
      title: "Continuous Feedback",
      subtitle: "Closed-Loop Intelligence",
      description: "The system feeds insights back — refining stories, detecting risk, and ensuring alignment across sprints.",
      color: "feedback",
      icon: RefreshCw,
      outputs: [
        { label: "Story Refinement", desc: "Auto-improves stories based on execution data" },
        { label: "Risk Alerts", desc: "Flags delivery risks before they escalate" },
        { label: "Coverage Gap Analysis", desc: "Identifies gaps in acceptance criteria coverage" },
        { label: "Predictive Delivery Signals", desc: "Forecasts based on velocity and patterns" },
      ],
      detail: "Silverile is not linear — it's cyclical intelligence that self-corrects across every sprint.",
    },
  ];
};

const colorClasses: Record<string, { bg: string; border: string; text: string; glow: string; muted: string }> = {
  intent: { bg: "bg-intent", border: "border-intent/30", text: "text-intent-foreground", glow: "glow-intent", muted: "bg-intent-muted" },
  execution: { bg: "bg-execution", border: "border-execution/30", text: "text-execution-foreground", glow: "glow-execution", muted: "bg-execution-muted" },
  validation: { bg: "bg-validation", border: "border-validation/30", text: "text-validation-foreground", glow: "glow-validation", muted: "bg-validation-muted" },
  feedback: { bg: "bg-feedback", border: "border-feedback/30", text: "text-feedback-foreground", glow: "glow-feedback", muted: "bg-feedback-muted" },
};

const CODE_MODES = [
  { icon: MessageSquare, title: "Story from Code", desc: "Reverse-engineer intent" },
  { icon: GitCompare, title: "Code Feedback", desc: "Validate against story" },
  { icon: TestTube2, title: "Test Generation", desc: "Unit & integration tests" },
  { icon: Wand2, title: "Copilot Prompts", desc: "Accelerate development" },
];

const HeroFlow = () => {
  const [selectedInput, setSelectedInput] = useState<InputType>("text");
  const [activeLayer, setActiveLayer] = useState<LayerIndex>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const layers = getLayersForInput(selectedInput);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveLayer((prev) => ((prev + 1) % 4) as LayerIndex);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, selectedInput]);

  const handleLayerClick = (index: LayerIndex) => {
    setIsAutoPlaying(false);
    setActiveLayer(index);
  };

  const handleInputClick = (input: InputType) => {
    setSelectedInput(input);
    setActiveLayer(0);
    setIsAutoPlaying(true);
  };

  const currentLayer = layers[activeLayer];
  const cc = colorClasses[currentLayer.color];

  return (
    <section className="relative min-h-screen overflow-hidden pt-24">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      {/* Ambient glow */}
      <motion.div
        key={`${selectedInput}-${activeLayer}`}
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
                    className={`flex flex-col items-center gap-1 rounded-lg border px-5 py-3 text-sm font-medium transition-all sm:flex-row sm:gap-2 ${
                      isActive
                        ? "border-primary/50 bg-primary/10 text-foreground glow-intent"
                        : "border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/60"
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
                className="flex flex-col items-center gap-1"
              >
                <span className="rounded-md border border-border bg-secondary/40 px-4 py-2 font-mono text-xs text-muted-foreground">
                  {INPUT_TYPES.find(i => i.id === selectedInput)?.example}
                </span>
                {selectedInput === "code" && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 flex items-center gap-1.5 text-xs text-primary"
                  >
                    <Terminal className="h-3 w-3" />
                    Via Silverile VS Code Extension
                  </motion.span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Code-specific: 4 Modes preview */}
          {selectedInput === "code" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                {CODE_MODES.map((mode, i) => {
                  const MIcon = mode.icon;
                  return (
                    <motion.div
                      key={mode.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-2.5 rounded-lg border border-primary/15 bg-primary/5 px-3 py-2.5"
                    >
                      <MIcon className="h-4 w-4 shrink-0 text-primary" />
                      <div>
                        <div className="text-xs font-semibold text-foreground">{mode.title}</div>
                        <div className="text-[10px] text-muted-foreground">{mode.desc}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Flow Pipeline */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            {layers.map((layer, index) => {
              const Icon = layer.icon;
              const isActive = activeLayer === index;
              const lc = colorClasses[layer.color];

              return (
                <motion.div
                  key={`${selectedInput}-${index}`}
                  onClick={() => handleLayerClick(index as LayerIndex)}
                  whileHover={{ scale: 1.02 }}
                  layout
                  className={`group relative cursor-pointer rounded-xl border p-5 transition-all duration-500 ${
                    isActive
                      ? `${lc.border} ${lc.muted} ${lc.glow}`
                      : "border-border bg-card/40 hover:bg-card/70"
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
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

                  {layer.badge && isActive && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`mt-2 inline-block rounded-md ${lc.bg}/20 px-2 py-0.5 text-[10px] font-bold uppercase ${lc.text}`}
                    >
                      {layer.badge}
                    </motion.span>
                  )}

                  {isActive && isAutoPlaying && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 rounded-b-xl"
                      style={{ background: `hsl(var(--${layer.color}))` }}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4.5, ease: "linear" }}
                      key={`progress-${selectedInput}-${activeLayer}`}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Active Layer Detail Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedInput}-${activeLayer}`}
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
                    {currentLayer.badge && (
                      <span className={`rounded-md ${cc.bg}/20 px-2 py-0.5 text-[10px] font-bold uppercase ${cc.text}`}>
                        {currentLayer.badge}
                      </span>
                    )}
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{currentLayer.description}</p>
                  <div className={`rounded-lg border ${cc.border} bg-background/30 p-4`}>
                    <p className={`text-xs leading-relaxed font-medium ${cc.text}`}>
                      <span className="font-bold">💡 Key Insight:</span> {currentLayer.detail}
                    </p>
                  </div>

                  {/* Input-specific context callout */}
                  {selectedInput === "code" && activeLayer === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 rounded-lg border border-execution/20 bg-execution-muted p-3"
                    >
                      <p className="flex items-start gap-2 text-xs text-execution-foreground">
                        <ArrowDownUp className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        <span>
                          <strong>Bidirectional:</strong> Attach code to a story for feedback, or start from a story to generate code — Silverile works both ways.
                        </span>
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Right: Outputs */}
                <div>
                  <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {selectedInput === "code" && activeLayer === 1 ? "Code Intelligence Capabilities" : "Generated Outputs"}
                  </span>
                  <div className="space-y-2">
                    {currentLayer.outputs.map((output, i) => (
                      <motion.div
                        key={output.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className={`rounded-lg border ${cc.border} bg-background/20 px-4 py-2.5`}
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className={`h-4 w-4 shrink-0 ${cc.text}`} />
                          <span className="text-sm font-medium text-foreground">{output.label}</span>
                          {i === 0 && (
                            <span className={`ml-auto rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${cc.bg}/20 ${cc.text}`}>
                              Primary
                            </span>
                          )}
                        </div>
                        {output.desc && (
                          <p className="ml-7 mt-1 text-xs text-muted-foreground">{output.desc}</p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Flow navigation */}
              {activeLayer < 3 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <div className={`h-px flex-1 ${cc.bg}/30`} />
                  <button
                    onClick={() => handleLayerClick((activeLayer + 1) as LayerIndex)}
                    className={`flex items-center gap-1.5 rounded-full border ${cc.border} bg-background/50 px-4 py-1.5 text-xs font-medium ${cc.text} transition-all hover:bg-background/80`}
                  >
                    Next: {layers[activeLayer + 1].title}
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
