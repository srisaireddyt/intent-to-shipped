import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import {
  FileText, Image, Code, CheckCircle2, Lightbulb,
  Zap, Shield, RefreshCw, Terminal, Brain,
  MessageSquare, GitCompare, TestTube2, Wand2,
  FileCheck, AlertTriangle, BarChart3, Target,
  Layers, BookOpen, ListChecks, Bug, Cpu, Search,
  TrendingUp, ArrowRight
} from "lucide-react";

type InputType = "text" | "image" | "code";

const INPUT_TYPES = [
  { id: "text" as InputType, label: "Text", icon: FileText, desc: "Requirement in plain language" },
  { id: "image" as InputType, label: "Image", icon: Image, desc: "Wireframe or UI screenshot" },
  { id: "code" as InputType, label: "Code", icon: Code, desc: "Via VS Code Extension" },
];

interface NodeItem {
  icon: typeof Lightbulb;
  label: string;
}

interface PairingVisual {
  inputs: string[];
  output: string;
  desc: string;
}

interface LayerVisual {
  title: string;
  color: string;
  icon: typeof Lightbulb;
  nodes: NodeItem[];
  tagline: string;
  pairings?: PairingVisual[];
}

const getFlowForInput = (input: InputType): LayerVisual[] => {
  if (input === "code") {
    return [
      {
        title: "Intent",
        color: "intent",
        icon: Lightbulb,
        tagline: "Code → Structured Story",
        nodes: [
          { icon: BookOpen, label: "Story from Code" },
          { icon: ListChecks, label: "Acceptance Criteria" },
          { icon: AlertTriangle, label: "Edge Cases" },
          { icon: TestTube2, label: "Test Cases" },
        ],
      },
      {
        title: "Execution",
        color: "execution",
        icon: Zap,
        tagline: "Code + Story Pairing",
        nodes: [
          { icon: GitCompare, label: "Code Relevance" },
          { icon: TestTube2, label: "Unit Tests" },
          { icon: Layers, label: "Integration Tests" },
          { icon: Wand2, label: "Copilot Prompts" },
        ],
        pairings: [
          { inputs: ["Code", "Story"], output: "Code Relevance", desc: "Validates code against acceptance criteria" },
          { inputs: ["Code", "Story"], output: "Test Scripts", desc: "Generates unit & integration tests" },
          { inputs: ["Story"], output: "Copilot Prompt", desc: "Generates code via AI copilot" },
        ],
      },
      {
        title: "Validation",
        color: "validation",
        icon: Shield,
        tagline: "Code vs Intent Verified",
        nodes: [
          { icon: Target, label: "Coverage Map" },
          { icon: Cpu, label: "Semantic Check" },
          { icon: Search, label: "Static Analysis" },
          { icon: AlertTriangle, label: "Scope Drift" },
        ],
      },
      {
        title: "Feedback",
        color: "feedback",
        icon: RefreshCw,
        tagline: "Self-Correcting Loop",
        nodes: [
          { icon: FileCheck, label: "Story Refinement" },
          { icon: Bug, label: "Risk Alerts" },
          { icon: BarChart3, label: "Gap Analysis" },
          { icon: TrendingUp, label: "Quality Signals" },
        ],
      },
    ];
  }

  return [
    {
      title: "Intent",
      color: "intent",
      icon: Lightbulb,
      tagline: input === "image" ? "UI → Structured Specs" : "Idea → Structured Specs",
      nodes: [
        { icon: BookOpen, label: "User Story" },
        { icon: ListChecks, label: "Acceptance Criteria" },
        { icon: AlertTriangle, label: "Edge Cases" },
        { icon: TestTube2, label: "Test Cases" },
        { icon: FileCheck, label: "Requirement Docs" },
      ],
    },
    {
      title: "Execution",
      color: "execution",
      icon: Zap,
      tagline: "Specs → Dev-Ready Artifacts",
      nodes: [
        { icon: Wand2, label: "Copilot Prompts" },
        { icon: TestTube2, label: "Unit Tests" },
        { icon: Layers, label: "Integration Tests" },
      ],
    },
    {
      title: "Validation",
      color: "validation",
      icon: Shield,
      tagline: "Code vs Intent Verified",
      nodes: [
        { icon: Target, label: "Coverage Map" },
        { icon: Cpu, label: "Semantic Check" },
        { icon: Search, label: "Static Analysis" },
        { icon: AlertTriangle, label: "Scope Drift" },
      ],
    },
    {
      title: "Feedback",
      color: "feedback",
      icon: RefreshCw,
      tagline: "Self-Correcting Loop",
      nodes: [
        { icon: FileCheck, label: "Story Refinement" },
        { icon: Bug, label: "Risk Alerts" },
        { icon: BarChart3, label: "Gap Analysis" },
        { icon: TrendingUp, label: "Delivery Signals" },
      ],
    },
  ];
};

const LAYER_COLORS_DARK: Record<string, { hsl: string; hslLight: string }> = {
  intent: { hsl: "258 65% 58%", hslLight: "258 80% 75%" },
  execution: { hsl: "210 70% 52%", hslLight: "210 80% 70%" },
  validation: { hsl: "160 55% 42%", hslLight: "160 70% 60%" },
  feedback: { hsl: "38 75% 55%", hslLight: "38 80% 68%" },
};

const LAYER_COLORS_LIGHT: Record<string, { hsl: string; hslLight: string }> = {
  intent: { hsl: "213 55% 33%", hslLight: "213 55% 33%" },
  execution: { hsl: "210 60% 42%", hslLight: "210 60% 42%" },
  validation: { hsl: "160 45% 38%", hslLight: "160 45% 38%" },
  feedback: { hsl: "38 65% 48%", hslLight: "38 65% 48%" },
};

const HeroFlow = () => {
  const { theme } = useTheme();
  const LAYER_COLORS = theme === "light" ? LAYER_COLORS_LIGHT : LAYER_COLORS_DARK;
  const isLight = theme === "light";
  const inactiveText = isLight ? "hsl(220 10% 46%)" : "hsl(225 12% 42%)";
  const inactiveTextDim = isLight ? "hsl(220 10% 52%)" : "hsl(225 12% 38%)";
  const inactiveTextMid = isLight ? "hsl(220 10% 42%)" : "hsl(225 12% 45%)";
  const inactiveBg = isLight ? "hsl(220 14% 93%)" : "hsl(230 18% 16%)";
  const cardBg = isLight ? "hsl(0 0% 100% / 0.85)" : "hsl(230 22% 11% / 0.7)";
  const inactiveBorder = isLight ? "hsl(220 13% 87%)" : "hsl(230 18% 18%)";
  const [selectedInput, setSelectedInput] = useState<InputType>("text");
  const [activeLayer, setActiveLayer] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const layers = getFlowForInput(selectedInput);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveLayer((prev) => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, selectedInput]);

  const handleLayerClick = useCallback((index: number) => {
    setIsAutoPlaying(false);
    setActiveLayer(index);
  }, []);

  const handleInputClick = useCallback((input: InputType) => {
    setSelectedInput(input);
    setActiveLayer(0);
    setIsAutoPlaying(true);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-16">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      {/* Ambient glow follows active layer */}
      <motion.div
        key={`glow-${activeLayer}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
        style={{ background: `hsl(${LAYER_COLORS[layers[activeLayer].color].hsl})` }}
      />

      <div className="container relative z-10 mx-auto px-6">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Brain className="h-3.5 w-3.5 text-primary" />
            Intent-to-Execution Intelligence
          </div>
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            <span className="text-foreground">From Intent to </span>
            <span className="text-gradient-hero">Verified Execution</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
            Watch how Silverile transforms any input into validated, shipped software.
          </p>
        </motion.div>

        {/* Input Selector - Visual Pills */}
        <div className="mb-10 flex flex-col items-center gap-3">
          <div className="flex gap-2 rounded-xl border border-border bg-card/60 p-1.5 backdrop-blur-sm">
            {INPUT_TYPES.map((input) => {
              const Icon = input.icon;
              const isActive = selectedInput === input.id;
              return (
                <motion.button
                  key={input.id}
                  onClick={() => handleInputClick(input.id)}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-secondary-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="inputBg"
                      className="absolute inset-0 rounded-lg bg-primary/15 border border-primary/30"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className="relative z-10 h-4 w-4" />
                  <span className="relative z-10">{input.label}</span>
                </motion.button>
              );
            })}
          </div>
          {selectedInput === "code" && (
            <motion.span
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1.5 text-xs text-primary"
            >
              <Terminal className="h-3 w-3" />
              Via Silverile VS Code Extension
            </motion.span>
          )}
        </div>

        {/* === VISUAL FLOW === */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto max-w-5xl"
        >
          {/* Flow container with SVG connections */}
          <div className="relative">
            {/* SVG connector lines (desktop) */}
            <svg className="pointer-events-none absolute inset-0 z-0 hidden lg:block" width="100%" height="100%" preserveAspectRatio="none">
              {[0, 1, 2].map((i) => {
                const fromColor = LAYER_COLORS[layers[i].color].hslLight;
                const toColor = LAYER_COLORS[layers[i + 1].color].hslLight;
                const isActive = activeLayer >= i + 1;
                return (
                  <motion.line
                    key={i}
                    x1={`${12.5 + i * 25 + 10}%`}
                    y1="50%"
                    x2={`${12.5 + (i + 1) * 25 - 10}%`}
                    y2="50%"
                    stroke={isActive ? `hsl(${toColor})` : inactiveBorder}
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: i * 0.15 }}
                  />
                );
              })}
            </svg>

            {/* Layer Cards */}
            <div className="relative z-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
              {layers.map((layer, index) => {
                const Icon = layer.icon;
                const isActive = activeLayer === index;
                const isPast = activeLayer > index;
                const lc = LAYER_COLORS[layer.color];

                return (
                  <motion.div
                    key={`${selectedInput}-${index}`}
                    onClick={() => handleLayerClick(index)}
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer"
                  >
                    <motion.div
                      animate={{
                        borderColor: isActive ? `hsl(${lc.hsl} / 0.5)` : isPast ? `hsl(${lc.hsl} / 0.2)` : inactiveBorder,
                        backgroundColor: isActive ? `hsl(${lc.hsl} / 0.08)` : cardBg,
                      }}
                      transition={{ duration: 0.4 }}
                      className="relative rounded-2xl border p-4 backdrop-blur-sm md:p-5"
                      style={{
                        boxShadow: isActive ? `0 0 40px -10px hsl(${lc.hsl} / 0.3)` : "none",
                      }}
                    >
                      {/* Progress bar */}
                      {isActive && isAutoPlaying && (
                        <motion.div
                          className="absolute bottom-0 left-0 h-[2px] rounded-b-2xl"
                          style={{ background: `hsl(${lc.hsl})` }}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 3.5, ease: "linear" }}
                          key={`p-${selectedInput}-${activeLayer}`}
                        />
                      )}

                      {/* Icon + Title */}
                      <div className="mb-3 flex items-center gap-2.5">
                        <motion.div
                          animate={{
                            background: isActive
                              ? `hsl(${lc.hsl} / 0.2)`
                              : isPast
                              ? `hsl(${lc.hsl} / 0.1)`
                              : inactiveBg,
                          }}
                          className="flex h-10 w-10 items-center justify-center rounded-xl"
                        >
                          <Icon
                            className="h-5 w-5"
                            style={{ color: isActive || isPast ? `hsl(${lc.hslLight})` : inactiveText }}
                          />
                        </motion.div>
                        <div>
                          <div
                            className="text-[10px] font-bold uppercase tracking-widest"
                            style={{ color: isActive || isPast ? `hsl(${lc.hslLight})` : inactiveText }}
                          >
                            {layer.title}
                          </div>
                          <AnimatePresence mode="wait">
                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-xs text-muted-foreground"
                              >
                                {layer.tagline}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Pairings visual (Code input, Execution layer) */}
                      {isActive && layer.pairings ? (
                        <div className="flex flex-col gap-1.5">
                          {layer.pairings.map((p, pi) => (
                            <motion.div
                              key={p.output}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: pi * 0.1, duration: 0.3 }}
                              className="flex items-center gap-1.5 rounded-lg px-2 py-1.5"
                              style={{ background: `hsl(${lc.hsl} / 0.1)` }}
                            >
                              <div className="flex items-center gap-1">
                                {p.inputs.map((inp, ii) => (
                                  <span key={ii}>
                                    {ii > 0 && <span className="mx-0.5 text-[9px] text-muted-foreground">+</span>}
                                    <span
                                      className="inline-block rounded border px-1.5 py-0.5 text-[9px] font-semibold"
                                      style={{
                                        borderColor: `hsl(${lc.hsl} / 0.3)`,
                                        color: `hsl(${lc.hslLight})`,
                                      }}
                                    >
                                      {inp}
                                    </span>
                                  </span>
                                ))}
                              </div>
                              <ArrowRight className="h-2.5 w-2.5 shrink-0" style={{ color: `hsl(${lc.hslLight})` }} />
                              <span
                                className="text-[10px] font-semibold md:text-[11px]"
                                style={{ color: `hsl(${lc.hslLight})` }}
                              >
                                {p.output}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        /* Node Grid */
                        <div className="grid grid-cols-2 gap-1.5">
                          {layer.nodes.map((node, ni) => {
                            const NIcon = node.icon;
                            return (
                              <motion.div
                                key={node.label}
                                initial={false}
                                animate={{
                                  opacity: isActive ? 1 : isPast ? 0.6 : 0.3,
                                  scale: isActive ? 1 : 0.95,
                                }}
                                transition={{ delay: isActive ? ni * 0.06 : 0, duration: 0.3 }}
                                className="flex items-center gap-1.5 rounded-lg px-2 py-1.5"
                                style={{
                                  background: isActive ? `hsl(${lc.hsl} / 0.1)` : "transparent",
                                }}
                              >
                                <NIcon
                                  className="h-3 w-3 shrink-0"
                                  style={{ color: isActive ? `hsl(${lc.hslLight})` : inactiveTextDim }}
                                />
                                <span
                                  className="text-[10px] font-medium leading-tight md:text-[11px]"
                                  style={{ color: isActive ? `hsl(${lc.hslLight})` : inactiveTextMid }}
                                >
                                  {node.label}
                                </span>
                              </motion.div>
                            );
                          })}
                        </div>
                      )}

                      {/* Active check */}
                      {isPast && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full"
                          style={{ background: `hsl(${lc.hsl})` }}
                        >
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Cycle-back arrow from Feedback → Intent */}
            <AnimatePresence>
              {activeLayer === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 flex items-center justify-center"
                >
                  <button
                    onClick={() => handleLayerClick(0)}
                    className="flex items-center gap-2 rounded-full border border-feedback/20 bg-feedback-muted px-4 py-2 text-xs font-medium text-feedback-foreground transition-all hover:bg-feedback-muted/80"
                  >
                    <RefreshCw className="h-3 w-3 animate-spin" style={{ animationDuration: "3s" }} />
                    Cycles back to refine Intent
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Most AI tools <span className="font-semibold text-foreground">generate</span>.
            Silverile <span className="text-gradient-hero font-bold">verifies</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroFlow;
