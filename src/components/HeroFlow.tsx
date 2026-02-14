import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import {
  FileText, Image, Code, Brain, CheckCircle2, ArrowDown,
  BookOpen, ListChecks, AlertTriangle, TestTube2,
  FileCheck, Layers, Zap, Cpu, Search,
  Sparkles, Shield, ChevronRight, GitCompare, Wand2,
  ToggleRight, Plus, ArrowRight, Target
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ── Types ── */
interface OutputItem {
  icon: LucideIcon;
  text: string;
}

interface Metric {
  label: string;
  value: string;
  status: "ok" | "warn" | "error";
}

interface Transformation {
  id: string;
  color: string;
  number: string;
  input: {
    label: string;
    icon: LucideIcon;
    content: React.ReactNode;
  };
  process: string[];
  output: {
    label: string;
    items: OutputItem[];
    tags?: string[];
    metrics?: Metric[];
  };
}

const STATUS_COLORS: Record<string, string> = {
  ok: "var(--validation)",
  warn: "var(--feedback)",
  error: "var(--destructive)",
};

const TRANSFORMATIONS: Transformation[] = [
  {
    id: "text",
    color: "intent",
    number: "01",
    input: {
      label: "Text Input",
      icon: FileText,
      content: (
        <div className="rounded-xl border border-border bg-muted/30 p-5">
          <p className="font-mono text-xs leading-relaxed text-foreground/80 sm:text-sm">
            "Add Stripe payment integration with refund support and webhook validation."
          </p>
        </div>
      ),
    },
    process: [
      "Parsing natural language intent",
      "Structuring into requirements",
      "Generating edge cases & tests",
      "Validating completeness",
    ],
    output: {
      label: "Structured Execution Artifact",
      items: [
        { icon: BookOpen, text: "User Story with clear scope" },
        { icon: ListChecks, text: "Acceptance Criteria (7 defined)" },
        { icon: AlertTriangle, text: "Edge Cases (4 identified)" },
        { icon: TestTube2, text: "Test Scenarios (12 generated)" },
      ],
      tags: ["Structured", "Validated", "Complete"],
    },
  },
  {
    id: "image",
    color: "execution",
    number: "02",
    input: {
      label: "Design Input",
      icon: Image,
      content: (
        <div className="rounded-xl border border-border bg-muted/30 p-5">
          {/* Fake wireframe */}
          <div className="flex flex-col gap-2">
            <div className="h-3 w-24 rounded bg-muted-foreground/15" />
            <div className="flex gap-2">
              <div className="h-20 w-1/2 rounded-lg border border-border bg-muted/50 flex items-center justify-center">
                <Layers className="h-6 w-6 text-muted-foreground/30" />
              </div>
              <div className="flex w-1/2 flex-col gap-1.5">
                <div className="h-2.5 w-full rounded bg-muted-foreground/12" />
                <div className="h-2.5 w-3/4 rounded bg-muted-foreground/12" />
                <div className="h-2.5 w-5/6 rounded bg-muted-foreground/12" />
                <div className="mt-auto h-6 w-20 rounded-md bg-muted-foreground/15" />
              </div>
            </div>
            <div className="flex gap-1.5">
              <div className="h-8 flex-1 rounded-md border border-border bg-muted/40" />
              <div className="h-8 flex-1 rounded-md border border-border bg-muted/40" />
              <div className="h-8 flex-1 rounded-md border border-border bg-muted/40" />
            </div>
          </div>
        </div>
      ),
    },
    process: [
      "Analyzing visual layout & hierarchy",
      "Extracting UI components & patterns",
      "Inferring business logic from design",
      "Mapping functional requirements",
    ],
    output: {
      label: "Executable Requirement Extraction",
      items: [
        { icon: FileCheck, text: "Functional Requirements (8 extracted)" },
        { icon: Cpu, text: "Backend Implications (3 flagged)" },
        { icon: Zap, text: "API Considerations (2 endpoints)" },
        { icon: AlertTriangle, text: "UX Edge Cases (5 detected)" },
      ],
    },
  },
  {
    id: "code",
    color: "validation",
    number: "03",
    input: {
      label: "Code Input",
      icon: Code,
      content: (
        <div className="rounded-xl border border-border bg-muted/30 p-5">
          <pre className="overflow-x-auto font-mono text-[11px] leading-relaxed text-foreground/80 sm:text-xs">
            <code>{`app.post('/refund', async (req, res) => {
  const { paymentId } = req.body;
  // Missing: input validation
  // Missing: error handling
  await stripe.refunds.create({
    payment_intent: paymentId
  });
  res.sendStatus(200);
});`}</code>
          </pre>
        </div>
      ),
    },
    process: [
      "Reverse-engineering intent from code",
      "Validating against acceptance criteria",
      "Detecting coverage gaps & risks",
      "Generating missing test cases",
    ],
    output: {
      label: "Code Alignment & Test Generation",
      items: [
        { icon: TestTube2, text: "Unit Tests (6 generated)" },
        { icon: Layers, text: "Integration Tests (3 generated)" },
        { icon: Search, text: "Improvement Suggestions (4 found)" },
      ],
      metrics: [
        { label: "Alignment Score", value: "82%", status: "warn" },
        { label: "Missing Criteria", value: "2", status: "error" },
        { label: "Risk Flags", value: "1", status: "warn" },
      ],
    },
  },
];

/* ── Code Pairing Data ── */
const CODE_PAIRED_PROCESS = [
  "Mapping code to story acceptance criteria",
  "Scoring implementation completeness",
  "Generating paired test scripts",
  "Creating AI copilot prompts from story",
];

const CODE_PAIRED_OUTPUT = {
  label: "Story-Paired Intelligence",
  items: [
    { icon: GitCompare, text: "Code Relevance Score: 91%" },
    { icon: Target, text: "Criteria Coverage: 5/7 matched" },
    { icon: TestTube2, text: "Paired Unit Tests (9 generated)" },
    { icon: Layers, text: "Paired Integration Tests (5 generated)" },
    { icon: Wand2, text: "Copilot Prompt (auto-generated)" },
  ] as OutputItem[],
  metrics: [
    { label: "Relevance", value: "91%", status: "ok" as const },
    { label: "Matched", value: "5/7", status: "warn" as const },
    { label: "Gaps", value: "2", status: "error" as const },
  ] as Metric[],
  tags: ["Story-Paired", "Verified", "Actionable"],
};

/* ── Single Transformation Section ── */
const TransformationSection = ({
  t,
  index,
  storyPaired,
  onTogglePairing,
}: {
  t: Transformation;
  index: number;
  storyPaired?: boolean;
  onTogglePairing?: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const InputIcon = t.input.icon;

  // Compute active data based on pairing toggle
  const isPaired = t.id === "code" && storyPaired;
  const activeColor = isPaired ? "intent" : t.color;
  const activeProcess = isPaired ? CODE_PAIRED_PROCESS : t.process;
  const activeOutput = isPaired ? CODE_PAIRED_OUTPUT : t.output;

  return (
    <div ref={ref} className="relative">
      {/* Section number + label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-center gap-3"
      >
        <span
          className="font-mono text-4xl font-black tracking-tighter sm:text-5xl"
          style={{ color: `hsl(var(--${t.color}) / 0.15)` }}
        >
          {t.number}
        </span>
        <div>
          <div className="flex items-center gap-2">
            <InputIcon className="h-4 w-4" style={{ color: `hsl(var(--${t.color}))` }} />
            <span
              className="text-xs font-bold uppercase tracking-[0.15em]"
              style={{ color: `hsl(var(--${t.color}))` }}
            >
              {t.input.label}
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground">
            feeds into Silverile Intelligence
          </span>
        </div>
      </motion.div>

      {/* The transformation card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="overflow-hidden rounded-2xl border border-border bg-card/70 backdrop-blur-sm"
        style={{
          boxShadow: `0 0 60px -20px hsl(var(--${t.color}) / 0.15)`,
        }}
      >
        <div className="grid lg:grid-cols-[1fr_280px_1fr]">
          {/* INPUT */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-5 sm:p-6 lg:p-8"
          >
            <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60">
              What you provide
            </div>
            {t.input.content}

            {/* Story Pairing Toggle (code section only) */}
            {t.id === "code" && onTogglePairing && (
              <motion.button
                onClick={onTogglePairing}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 flex w-full items-center gap-2.5 rounded-xl border p-3 text-left transition-colors"
                style={{
                  borderColor: storyPaired
                    ? "hsl(var(--intent) / 0.4)"
                    : "hsl(var(--border))",
                  background: storyPaired
                    ? "hsl(var(--intent) / 0.08)"
                    : "transparent",
                }}
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors"
                  style={{
                    background: storyPaired
                      ? "hsl(var(--intent) / 0.2)"
                      : "hsl(var(--muted))",
                  }}
                >
                  {storyPaired ? (
                    <CheckCircle2 className="h-4 w-4" style={{ color: "hsl(var(--intent))" }} />
                  ) : (
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="h-3 w-3" style={{ color: storyPaired ? "hsl(var(--intent))" : undefined }} />
                    <span
                      className="text-[11px] font-bold uppercase tracking-wide"
                      style={{ color: storyPaired ? "hsl(var(--intent))" : undefined }}
                    >
                      {storyPaired ? "Paired with Structured Story" : "Pair with Structured Story"}
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {storyPaired
                      ? "Code is validated against story acceptance criteria"
                      : "Toggle to see code + story pairing intelligence"}
                  </span>
                </div>
                <ArrowRight
                  className="h-3.5 w-3.5 shrink-0 transition-transform"
                  style={{
                    color: storyPaired ? "hsl(var(--intent))" : "hsl(var(--muted-foreground))",
                    transform: storyPaired ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                />
              </motion.button>
            )}
          </motion.div>

          {/* PROCESS (center) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="relative flex flex-col items-center justify-center border-y border-border/50 px-5 py-6 lg:border-x lg:border-y-0 lg:py-8"
          >
            {/* Glow behind */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                background: `radial-gradient(circle at center, hsl(var(--${activeColor})), transparent 70%)`,
              }}
            />

            <div
              className="relative mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: `hsl(var(--${activeColor}) / 0.12)` }}
            >
              <Sparkles className="h-5 w-5" style={{ color: `hsl(var(--${activeColor}))` }} />
            </div>

            <span className="relative mb-3 text-center text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
              {isPaired ? "Story + Code" : "Silverile"}
              <br />
              Intelligence
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={isPaired ? "paired" : "solo"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="relative flex flex-col gap-1.5"
              >
                {activeProcess.map((step, si) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: si * 0.06 }}
                    className="flex items-center gap-2"
                  >
                    <ChevronRight
                      className="h-3 w-3 shrink-0"
                      style={{ color: `hsl(var(--${activeColor}) / 0.5)` }}
                    />
                    <span className="text-[10px] leading-tight text-muted-foreground/80 sm:text-[11px]">
                      {step}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* OUTPUT */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="p-5 sm:p-6 lg:p-8"
          >
            <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60">
              What Silverile produces
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={isPaired ? "paired-out" : "solo-out"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border p-4"
                style={{ borderColor: `hsl(var(--${activeColor}) / 0.25)` }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <Shield className="h-3.5 w-3.5" style={{ color: `hsl(var(--${activeColor}))` }} />
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.08em] sm:text-xs"
                    style={{ color: `hsl(var(--${activeColor}))` }}
                  >
                    {activeOutput.label}
                  </span>
                </div>

                {/* Metrics */}
                {activeOutput.metrics && (
                  <div className="mb-3 grid grid-cols-3 gap-1.5">
                    {activeOutput.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-lg border border-border bg-muted/30 px-2 py-2 text-center"
                      >
                        <div
                          className="text-base font-bold sm:text-lg"
                          style={{ color: `hsl(${STATUS_COLORS[m.status]})` }}
                        >
                          {m.value}
                        </div>
                        <div className="text-[9px] text-muted-foreground">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Items */}
                <div className="flex flex-col gap-2">
                  {activeOutput.items.map((item, ii) => {
                    const OIcon = item.icon;
                    return (
                      <motion.div
                        key={item.text}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: ii * 0.05 }}
                        className="flex items-center gap-2 rounded-lg px-2 py-1.5"
                        style={{ background: `hsl(var(--${activeColor}) / 0.06)` }}
                      >
                        <OIcon
                          className="h-3.5 w-3.5 shrink-0"
                          style={{ color: `hsl(var(--${activeColor}) / 0.7)` }}
                        />
                        <span className="text-[11px] text-muted-foreground sm:text-xs">{item.text}</span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Tags */}
                {activeOutput.tags && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {activeOutput.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold"
                        style={{
                          background: `hsl(var(--${activeColor}) / 0.1)`,
                          color: `hsl(var(--${activeColor}))`,
                        }}
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      {/* Connector arrow to next section */}
      {index < TRANSFORMATIONS.length - 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="flex justify-center py-6"
        >
          <div className="flex flex-col items-center gap-1">
            <div className="h-8 w-px bg-border" />
            <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
          </div>
        </motion.div>
      )}
    </div>
  );
};

/* ── Main Hero ── */
const HeroFlow = () => {
  const [storyPaired, setStoryPaired] = useState(false);

  return (
    <section className="relative overflow-hidden pt-20 pb-16 lg:pt-24">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center lg:mb-20"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Brain className="h-3.5 w-3.5 text-primary" />
            SDLC Intelligence Platform
          </div>
          <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            <span className="text-foreground">From Intent to </span>
            <span className="text-gradient-hero">Verified Execution</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground sm:text-base md:text-lg">
            Text. Design. Code.{" "}
            <span className="font-semibold text-foreground">Silverile understands it all.</span>
          </p>
        </motion.div>

        {/* Transformation Sections */}
        <div className="mx-auto max-w-5xl">
          {TRANSFORMATIONS.map((t, i) => (
            <TransformationSection
              key={t.id}
              t={t}
              index={i}
              storyPaired={t.id === "code" ? storyPaired : undefined}
              onTogglePairing={t.id === "code" ? () => setStoryPaired((p) => !p) : undefined}
            />
          ))}
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center lg:mt-20"
        >
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base md:text-lg">
            Traditional tools{" "}
            <span className="font-semibold text-foreground">track tasks</span>. Silverile{" "}
            <span className="text-gradient-hero font-bold">
              understands intent, validates execution, and strengthens delivery
            </span>{" "}
            across your SDLC.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroFlow;
