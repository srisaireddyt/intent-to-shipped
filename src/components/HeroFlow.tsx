import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import {
  FileText, Image, Code, Brain, CheckCircle2,
  BookOpen, ListChecks, AlertTriangle, TestTube2,
  Shield, Cpu, Target, TrendingUp, Gauge,
  FileCheck, Layers, Zap, Search
} from "lucide-react";

/* ── Sub-components ── */
import InputCard from "./hero/InputCard";
import IntelligenceCore from "./hero/IntelligenceCore";
import OutputCard from "./hero/OutputCard";
import FlowLines from "./hero/FlowLines";

const HeroFlow = () => {
  const { theme } = useTheme();
  const [hoveredInput, setHoveredInput] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen overflow-hidden pt-20 pb-16 lg:pt-24">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
        style={{ background: "hsl(var(--execution) / 0.08)" }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* ── Headline ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center lg:mb-14"
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

        {/* ── 3-Column Cinematic Layout ── */}
        <div className="relative mx-auto max-w-6xl">
          {/* SVG flow lines (desktop only) */}
          <FlowLines hoveredInput={hoveredInput} />

          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr_1fr] lg:items-stretch lg:gap-4 xl:gap-8">
            {/* LEFT: Input Stack */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col gap-3"
            >
              <div className="mb-1 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground lg:text-left">
                Inputs
              </div>
              <InputCard
                id="text"
                label="Text Input"
                icon={FileText}
                color="intent"
                hoveredInput={hoveredInput}
                onHover={setHoveredInput}
              >
                <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
                  "Add Stripe payment integration with refund support and webhook validation."
                </p>
              </InputCard>

              <InputCard
                id="image"
                label="Design Input"
                icon={Image}
                color="execution"
                hoveredInput={hoveredInput}
                onHover={setHoveredInput}
              >
                <div className="flex items-center gap-2">
                  <div className="h-12 w-16 rounded-md border border-border bg-muted/50 flex items-center justify-center">
                    <Layers className="h-5 w-5 text-muted-foreground/60" />
                  </div>
                  <span className="text-[11px] text-muted-foreground">Wireframe / UI Screenshot</span>
                </div>
              </InputCard>

              <InputCard
                id="code"
                label="Code Input"
                icon={Code}
                color="validation"
                hoveredInput={hoveredInput}
                onHover={setHoveredInput}
              >
                <pre className="font-mono text-[10px] leading-relaxed text-muted-foreground overflow-hidden">
{`app.post('/refund', async (req, res) => {
  const { paymentId } = req.body;
  await stripe.refunds.create({
    payment_intent: paymentId
  });
  res.sendStatus(200);
});`}
                </pre>
              </InputCard>
            </motion.div>

            {/* CENTER: Intelligence Core */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center justify-center"
            >
              <IntelligenceCore hoveredInput={hoveredInput} />
            </motion.div>

            {/* RIGHT: Output Stack */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-col gap-3"
            >
              <div className="mb-1 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground lg:text-right">
                Validated Outputs
              </div>

              <OutputCard
                inputId="text"
                title="Structured Execution Artifact"
                color="intent"
                hoveredInput={hoveredInput}
                items={[
                  { icon: BookOpen, label: "User Story" },
                  { icon: ListChecks, label: "Acceptance Criteria" },
                  { icon: AlertTriangle, label: "Edge Cases" },
                  { icon: TestTube2, label: "Test Scenarios" },
                ]}
                tags={["Structured", "Validated", "Complete"]}
              />

              <OutputCard
                inputId="image"
                title="Executable Requirement Extraction"
                color="execution"
                hoveredInput={hoveredInput}
                items={[
                  { icon: FileCheck, label: "Functional Requirements" },
                  { icon: Cpu, label: "Backend Implications" },
                  { icon: Zap, label: "API Considerations" },
                  { icon: AlertTriangle, label: "UX Edge Cases" },
                ]}
              />

              <OutputCard
                inputId="code"
                title="Code Alignment & Test Generation"
                color="validation"
                hoveredInput={hoveredInput}
                items={[
                  { icon: TestTube2, label: "Unit Tests Generated" },
                  { icon: Layers, label: "Integration Tests Generated" },
                  { icon: Search, label: "Improvement Suggestions" },
                ]}
                metrics={[
                  { label: "Alignment Score", value: "82%", status: "warn" },
                  { label: "Missing Criteria", value: "2", status: "error" },
                  { label: "Risk Flags", value: "1", status: "warn" },
                ]}
              />
            </motion.div>
          </div>
        </div>

        {/* ── Bottom Statement ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
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
