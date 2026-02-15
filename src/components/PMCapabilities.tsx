import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Wand2,
  AlertTriangle,
  BarChart3,
  Workflow,
  Bug,
  Globe,
} from "lucide-react";

const CAPABILITIES = [
  {
    icon: Wand2,
    title: "StoryCraft AI",
    subtitle: "Intelligent Story Generation",
    color: "intent",
    bullets: [
      "Auto-generate user stories from minimal input",
      "Test cases & acceptance criteria in seconds",
      "Text + image input modes",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Risk Detection",
    subtitle: "Proactive Alerting",
    color: "feedback",
    bullets: [
      "Sprint risk & completion probability",
      "Stalled story detection",
      "Team health & velocity tracking",
    ],
  },
  {
    icon: BarChart3,
    title: "Smart Dashboards",
    subtitle: "Predictive Analytics",
    color: "execution",
    bullets: [
      "Real-time KPI & velocity tracking",
      "Sprint completion forecasting",
      "Action recommendations",
    ],
  },
  {
    icon: Workflow,
    title: "Workflow AI",
    subtitle: "Autonomous Management",
    color: "validation",
    bullets: [
      "Smart Kanban with status automation",
      "Assignment & workload optimization",
      "Sprint capacity planning",
    ],
  },
  {
    icon: Bug,
    title: "Defect Intelligence",
    subtitle: "Quality Assurance",
    color: "destructive",
    bullets: [
      "Auto severity classification",
      "Root cause & pattern analysis",
      "Test coverage insights",
    ],
  },
  {
    icon: Globe,
    title: "Multi-Industry",
    subtitle: "Adaptable Platform",
    color: "primary",
    bullets: [
      "Industry-specific workflows",
      "Customizable team structures",
      "Small teams to enterprise scale",
    ],
  },
];

const PMCapabilities = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative overflow-hidden py-20 lg:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-[0.06]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center lg:mb-16"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Workflow className="h-3.5 w-3.5 text-primary" />
            Agentic Project Manager
          </div>
          <h2 className="mx-auto max-w-3xl text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            <span className="text-foreground">AI That </span>
            <span className="text-gradient-hero">Manages</span>
            <span className="text-foreground">, Not Just Tracks</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            Six intelligent agents working continuously to keep your projects healthy, your team aligned, and your delivery on track.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-2xl border border-border bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-transparent"
                style={{
                  boxShadow: "0 0 0 0 transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `hsl(var(--${cap.color}) / 0.4)`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px -10px hsl(var(--${cap.color}) / 0.2)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--border))";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 transparent";
                }}
              >
                {/* Icon */}
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `hsl(var(--${cap.color}) / 0.12)` }}
                >
                  <Icon className="h-5 w-5" style={{ color: `hsl(var(--${cap.color}))` }} />
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-foreground">{cap.title}</h3>
                <p
                  className="mb-3 text-[11px] font-semibold uppercase tracking-wider"
                  style={{ color: `hsl(var(--${cap.color}) / 0.7)` }}
                >
                  {cap.subtitle}
                </p>

                {/* Bullets */}
                <ul className="flex flex-col gap-1.5">
                  {cap.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[11px] text-muted-foreground sm:text-xs">
                      <div
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                        style={{ background: `hsl(var(--${cap.color}) / 0.5)` }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
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
