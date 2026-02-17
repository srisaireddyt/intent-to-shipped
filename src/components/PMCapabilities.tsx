import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  Wand2,
  AlertTriangle,
  BarChart3,
  Workflow,
  Bug,
  Globe,
  Zap,
  ArrowRight,
} from "lucide-react";

const CAPABILITIES = [
  {
    icon: Wand2,
    title: "StoryCraft AI",
    subtitle: "Story Generation",
    color: "intent",
    tagline: "From idea to actionable story in seconds",
    bullets: [
      "Auto-generate user stories from minimal input",
      "Test cases & acceptance criteria instantly",
      "Text + image input modes",
    ],
    differentiator: "Others require manual story writing",
    silverile: "Silverile generates complete, validated stories autonomously",
  },
  {
    icon: AlertTriangle,
    title: "Risk Detection",
    subtitle: "Proactive Alerting",
    color: "feedback",
    tagline: "Know before it breaks",
    bullets: [
      "Sprint risk & completion probability",
      "Stalled story detection",
      "Team health & velocity tracking",
    ],
    differentiator: "Others alert after deadlines miss",
    silverile: "Silverile predicts risks before they escalate",
  },
  {
    icon: BarChart3,
    title: "Smart Dashboards",
    subtitle: "Predictive Analytics",
    color: "execution",
    tagline: "Insights that drive action, not just reports",
    bullets: [
      "Real-time KPI & velocity tracking",
      "Sprint completion forecasting",
      "Action recommendations",
    ],
    differentiator: "Others show static charts",
    silverile: "Silverile recommends what to do next",
  },
  {
    icon: Workflow,
    title: "Workflow AI",
    subtitle: "Autonomous Management",
    color: "validation",
    tagline: "Your sprint runs itself",
    bullets: [
      "Smart Kanban with status automation",
      "Assignment & workload optimization",
      "Sprint capacity planning",
    ],
    differentiator: "Others need manual drag-and-drop",
    silverile: "Silverile auto-assigns and rebalances workload",
  },
  {
    icon: Bug,
    title: "Defect Intelligence",
    subtitle: "Quality Assurance",
    color: "destructive",
    tagline: "Catch patterns, not just bugs",
    bullets: [
      "Auto severity classification",
      "Root cause & pattern analysis",
      "Test coverage insights",
    ],
    differentiator: "Others log bugs passively",
    silverile: "Silverile finds root causes and predicts regressions",
  },
];

const CapabilityCard = ({
  cap,
  index,
  isInView,
}: {
  cap: (typeof CAPABILITIES)[0];
  index: number;
  isInView: boolean;
}) => {
  const [hovered, setHovered] = useState(false);
  const Icon = cap.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-sm transition-all duration-300"
      style={{ minHeight: 280 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Default State */}
      <AnimatePresence>
        {!hovered && (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex h-full flex-col items-center justify-center p-6 text-center"
          >
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ background: `hsl(var(--${cap.color}) / 0.12)` }}
            >
              <Icon className="h-6 w-6" style={{ color: `hsl(var(--${cap.color}))` }} />
            </div>
            <h3 className="text-base font-bold text-foreground">{cap.title}</h3>
            <p
              className="mt-1 text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: `hsl(var(--${cap.color}) / 0.7)` }}
            >
              {cap.subtitle}
            </p>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              {cap.tagline}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover State */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="hovered"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex flex-col justify-start gap-3 overflow-y-auto p-4"
            style={{
              background: `linear-gradient(135deg, hsl(var(--${cap.color}) / 0.12), hsl(var(--${cap.color}) / 0.05))`,
              borderColor: `hsl(var(--${cap.color}) / 0.3)`,
              boxShadow: `0 0 30px -8px hsl(var(--${cap.color}) / 0.2)`,
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-2.5">
              <Icon className="h-4 w-4 shrink-0" style={{ color: `hsl(var(--${cap.color}))` }} />
              <span className="text-sm font-bold text-foreground">{cap.title}</span>
            </div>

            {/* Bullets */}
            <ul className="mt-3 flex flex-col gap-1.5">
              {cap.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-[11px] text-muted-foreground sm:text-xs">
                  <Zap
                    className="mt-0.5 h-3 w-3 shrink-0"
                    style={{ color: `hsl(var(--${cap.color}) / 0.6)` }}
                  />
                  {b}
                </li>
              ))}
            </ul>

            {/* Differentiator */}
            <div className="mt-3 rounded-lg border border-border/50 bg-background/60 p-2.5">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                <ArrowRight className="h-2.5 w-2.5" />
                Why Silverile
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground line-through decoration-destructive/40">
                {cap.differentiator}
              </p>
              <p
                className="mt-0.5 text-[11px] font-semibold leading-relaxed"
                style={{ color: `hsl(var(--${cap.color}))` }}
              >
                {cap.silverile}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const PMCapabilities = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative overflow-hidden py-10 lg:py-14">
      <div className="absolute inset-0 bg-grid opacity-[0.06]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">

        {/* Cards Grid */}
        <div className="mx-auto grid max-w-5xl gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {CAPABILITIES.map((cap, i) => (
            <CapabilityCard key={cap.title} cap={cap} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Differentiator strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          {[
            { label: "Proactive Intelligence", color: "intent" },
            { label: "Context-Aware Automation", color: "execution" },
            { label: "Seamless Integration", color: "validation" },
          ].map((d) => (
            <div key={d.label} className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ background: `hsl(var(--${d.color}))` }}
              />
              <span className="text-xs font-semibold text-muted-foreground">{d.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PMCapabilities;
