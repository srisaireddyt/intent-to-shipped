import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import {
  FileText, Image, Code, Brain, CheckCircle2, ArrowRight,
  BookOpen, ListChecks, AlertTriangle, TestTube2,
  FileCheck, Layers, Zap, Cpu, Search, Target,
  Sparkles, Shield
} from "lucide-react";

const TRANSFORMATIONS = [
  {
    id: "text",
    color: "intent",
    input: {
      label: "Text Input",
      icon: FileText,
      content: (
        <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
          "Add Stripe payment integration with refund support and webhook validation."
        </p>
      ),
    },
    process: ["Parse Intent", "Structure Requirements", "Generate Tests", "Validate Completeness"],
    output: {
      label: "Structured Execution Artifact",
      items: [
        { icon: BookOpen, text: "User Story" },
        { icon: ListChecks, text: "Acceptance Criteria" },
        { icon: AlertTriangle, text: "Edge Cases" },
        { icon: TestTube2, text: "Test Scenarios" },
      ],
      tags: ["Structured", "Validated", "Complete"],
    },
  },
  {
    id: "image",
    color: "execution",
    input: {
      label: "Design Input",
      icon: Image,
      content: (
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-20 items-center justify-center rounded-lg border border-border bg-muted/30">
            <Layers className="h-6 w-6 text-muted-foreground/50" />
          </div>
          <span className="text-[11px] text-muted-foreground">
            Wireframe or UI Screenshot
          </span>
        </div>
      ),
    },
    process: ["Analyze Layout", "Extract Components", "Infer Logic", "Map Requirements"],
    output: {
      label: "Executable Requirement Extraction",
      items: [
        { icon: FileCheck, text: "Functional Requirements" },
        { icon: Cpu, text: "Backend Implications" },
        { icon: Zap, text: "API Considerations" },
        { icon: AlertTriangle, text: "UX Edge Cases" },
      ],
    },
  },
  {
    id: "code",
    color: "validation",
    input: {
      label: "Code Input",
      icon: Code,
      content: (
        <pre className="overflow-hidden font-mono text-[10px] leading-relaxed text-muted-foreground">
{`app.post('/refund', async (req, res) => {
  const { paymentId } = req.body;
  await stripe.refunds.create({
    payment_intent: paymentId
  });
  res.sendStatus(200);
});`}
        </pre>
      ),
    },
    process: ["Reverse-Engineer Intent", "Validate Logic", "Detect Gaps", "Generate Tests"],
    output: {
      label: "Code Alignment & Test Generation",
      items: [
        { icon: TestTube2, text: "Unit Tests Generated" },
        { icon: Layers, text: "Integration Tests" },
        { icon: Search, text: "Improvement Suggestions" },
      ],
      metrics: [
        { label: "Alignment", value: "82%", status: "warn" as const },
        { label: "Missing Criteria", value: "2", status: "error" as const },
        { label: "Risk Flags", value: "1", status: "warn" as const },
      ],
    },
  },
];

const STATUS_COLORS = {
  ok: "var(--validation)",
  warn: "var(--feedback)",
  error: "var(--destructive)",
};

const HeroFlow = () => {
  const { theme } = useTheme();
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen overflow-hidden pt-20 pb-16 lg:pt-24">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center lg:mb-16"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Brain className="h-3.5 w-3.5 text-primary" />
            SDLC Intelligence Platform
          </div>
          <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-foreground">From Intent to </span>
            <span className="text-gradient-hero">Verified Execution</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground md:text-base">
            Text. Design. Code.{" "}
            <span className="font-semibold text-foreground">Silverile understands it all.</span>
          </p>
        </motion.div>

        {/* Transformation Rows */}
        <div className="mx-auto flex max-w-6xl flex-col gap-5 lg:gap-6">
          {TRANSFORMATIONS.map((t, rowIndex) => {
            const InputIcon = t.input.icon;
            const isHovered = hoveredRow === t.id;
            const isDimmed = hoveredRow !== null && hoveredRow !== t.id;

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: rowIndex * 0.15 }}
                onMouseEnter={() => setHoveredRow(t.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <motion.div
                  animate={{ opacity: isDimmed ? 0.4 : 1, scale: isHovered ? 1.01 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative grid items-stretch gap-3 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-sm lg:grid-cols-[1fr_auto_1fr] lg:gap-0 lg:p-0"
                  style={{
                    borderColor: isHovered ? `hsl(var(--${t.color}) / 0.4)` : undefined,
                    boxShadow: isHovered ? `0 0 40px -12px hsl(var(--${t.color}) / 0.25)` : "none",
                  }}
                >
                  {/* INPUT SIDE */}
                  <div className="flex flex-col justify-center p-4 lg:p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <div
                        className="flex h-7 w-7 items-center justify-center rounded-lg"
                        style={{ background: `hsl(var(--${t.color}) / 0.15)` }}
                      >
                        <InputIcon className="h-3.5 w-3.5" style={{ color: `hsl(var(--${t.color}))` }} />
                      </div>
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.15em]"
                        style={{ color: `hsl(var(--${t.color}))` }}
                      >
                        {t.input.label}
                      </span>
                    </div>
                    {t.input.content}
                  </div>

                  {/* CENTER: Process Flow Arrow */}
                  <div className="relative flex flex-col items-center justify-center gap-1 px-4 py-3 lg:min-w-[200px] lg:border-x lg:border-border/50 lg:px-6 lg:py-4">
                    {/* Mobile: horizontal divider */}
                    <div className="mb-2 h-px w-full bg-border/50 lg:hidden" />

                    <Sparkles className="mb-1 h-4 w-4 text-primary/60" />
                    <span className="mb-1.5 text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70">
                      Silverile Intelligence
                    </span>

                    {t.process.map((step, si) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + rowIndex * 0.15 + si * 0.08 }}
                        className="flex items-center gap-1.5"
                      >
                        <div
                          className="h-1 w-1 rounded-full"
                          style={{ background: `hsl(var(--${t.color}) / 0.6)` }}
                        />
                        <span className="text-[10px] text-muted-foreground/70">{step}</span>
                      </motion.div>
                    ))}

                    <ArrowRight
                      className="mt-1.5 h-4 w-4 rotate-90 lg:rotate-0"
                      style={{ color: `hsl(var(--${t.color}) / 0.5)` }}
                    />

                    {/* Mobile: horizontal divider */}
                    <div className="mt-2 h-px w-full bg-border/50 lg:hidden" />
                  </div>

                  {/* OUTPUT SIDE */}
                  <div className="flex flex-col justify-center p-4 lg:p-6">
                    <div className="mb-2 flex items-center gap-2">
                      <Shield className="h-3.5 w-3.5" style={{ color: `hsl(var(--${t.color}))` }} />
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.1em]"
                        style={{ color: `hsl(var(--${t.color}))` }}
                      >
                        {t.output.label}
                      </span>
                    </div>

                    {/* Metrics (code row) */}
                    {t.output.metrics && (
                      <div className="mb-2 flex flex-wrap gap-1.5">
                        {t.output.metrics.map((m) => (
                          <span
                            key={m.label}
                            className="rounded-md border border-border bg-muted/30 px-2 py-0.5 text-[10px]"
                          >
                            <span className="text-muted-foreground">{m.label}: </span>
                            <span
                              className="font-bold"
                              style={{ color: `hsl(${STATUS_COLORS[m.status]})` }}
                            >
                              {m.value}
                            </span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Items */}
                    <div className="flex flex-col gap-1">
                      {t.output.items.map((item) => {
                        const OIcon = item.icon;
                        return (
                          <div key={item.text} className="flex items-center gap-1.5">
                            <OIcon
                              className="h-3 w-3 shrink-0"
                              style={{ color: `hsl(var(--${t.color}) / 0.65)` }}
                            />
                            <span className="text-[11px] text-muted-foreground">{item.text}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Tags */}
                    {t.output.tags && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {t.output.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold"
                            style={{
                              background: "hsl(var(--validation) / 0.12)",
                              color: "hsl(var(--validation))",
                            }}
                          >
                            <CheckCircle2 className="h-2.5 w-2.5" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-14 text-center"
        >
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground md:text-base">
            Traditional tools <span className="font-semibold text-foreground">track tasks</span>.
            Silverile{" "}
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
