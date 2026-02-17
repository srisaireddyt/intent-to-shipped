import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  Lightbulb,
  EyeOff,
  ShieldCheck,
  HelpCircle,
  Users,
} from "lucide-react";

const PRINCIPLES = [
  {
    icon: Lightbulb,
    title: "Intent First",
    short: "Clarifies before acting",
    detail:
      "AI is optimized for understanding what the developer means, not for shipping code quickly. If intent is unclear, the correct behavior is to surface ambiguity — not to guess.",
  },
  {
    icon: EyeOff,
    title: "Read-Only Default",
    short: "Zero auto-execution",
    detail:
      "AI suggestions are non-destructive and non-committal unless a human explicitly promotes them. Code review ✓ Prompt generation ✓ Auto-merge ✗ Silent refactors ✗",
  },
  {
    icon: ShieldCheck,
    title: "Deterministic Guards",
    short: "Rules, not guesses",
    detail:
      "Every AI output is bounded by schemas, contracts, validation rules, and known context. If it can't be validated, it can't be trusted.",
  },
  {
    icon: HelpCircle,
    title: "Explicit Ambiguity",
    short: "Uncertainty disclosed",
    detail:
      "Ambiguity is treated as first-class output — not failure. What's known, what's unclear, and what was not inferred are all surfaced transparently.",
  },
  {
    icon: Users,
    title: "Human Accountability",
    short: "AI suggests, you decide",
    detail:
      "AI may assist thinking, but responsibility for design decisions, business logic, risk, and outcomes always stays with the human.",
  },
];

const COMPARISON = [
  { market: "AI does more", silverile: "AI understands more" },
  { market: "Ship faster", silverile: "Ship with confidence" },
  { market: "Replace humans", silverile: "Amplify humans" },
  { market: "Black box", silverile: "Transparent" },
];

const PrincipleCard = ({
  principle,
  index,
  isInView,
}: {
  principle: (typeof PRINCIPLES)[0];
  index: number;
  isInView: boolean;
}) => {
  const [hovered, setHovered] = useState(false);
  const Icon = principle.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-border bg-card/80 px-5 py-8 text-center backdrop-blur-sm cursor-pointer"
      style={{ minHeight: 260 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Soft light — the "lamp" that reveals content */}
      <motion.div
        className="pointer-events-none absolute z-0"
        style={{
          width: 200,
          height: 200,
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, hsl(var(--intent) / 0.14) 0%, hsl(var(--intent) / 0.06) 40%, transparent 70%)",
          filter: "blur(2px)",
        }}
        animate={{
          scale: hovered ? 2.2 : 0.5,
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Icon */}
      <div className="relative z-10 mb-4">
        <motion.div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          animate={{
            backgroundColor: hovered
              ? "hsl(var(--intent) / 0.15)"
              : "hsl(var(--accent) / 0.6)",
          }}
          transition={{ duration: 0.4 }}
        >
          <Icon className="h-5 w-5 text-primary" />
        </motion.div>
      </div>

      {/* Title — always visible */}
      <h3 className="relative z-10 text-sm font-bold text-foreground">{principle.title}</h3>

      {/* Short label — fades out as light reveals detail */}
      <motion.p
        className="relative z-10 mt-1.5 text-xs text-muted-foreground"
        animate={{ opacity: hovered ? 0 : 1, y: hovered ? -4 : 0 }}
        transition={{ duration: 0.25 }}
      >
        {principle.short}
      </motion.p>

      {/* Detail — hidden in the dark, revealed by the soft light */}
      <motion.div
        className="relative z-10 mt-1"
        animate={{
          opacity: hovered ? 1 : 0,
          y: hovered ? 0 : 12,
        }}
        transition={{ duration: 0.45, delay: hovered ? 0.1 : 0 }}
      >
        <p className="text-[11px] leading-relaxed text-foreground/70">
          {principle.detail}
        </p>
      </motion.div>

      {/* Bottom soft edge glow */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-16"
        style={{
          background:
            "linear-gradient(to top, hsl(var(--intent) / 0.06), transparent)",
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

const SafeLightCoding = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden py-16 lg:py-24">
      <div className="absolute inset-0 bg-grid opacity-[0.04]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Safe Light Coding
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            AI should illuminate, not operate. Amplify judgment, not replace it.
          </p>
        </motion.div>

        {/* Principle cards */}
        <div className="mx-auto grid max-w-6xl gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {PRINCIPLES.map((p, i) => (
            <PrincipleCard key={p.title} principle={p} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Market vs Silverile comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-14 max-w-2xl overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-sm"
        >
          <div className="grid grid-cols-2">
            {/* Market header */}
            <div className="border-b border-r border-border px-6 py-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                Market Says
              </span>
            </div>
            {/* Silverile header */}
            <div className="border-b border-border px-6 py-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                Silverile Says
              </span>
            </div>

            {/* Rows */}
            {COMPARISON.map((row, i) => (
              <div key={row.market} className="contents">
                <div
                  className={`border-r border-border px-6 py-3.5 ${
                    i < COMPARISON.length - 1 ? "border-b" : ""
                  }`}
                >
                  <span className="text-sm text-muted-foreground/60 line-through decoration-muted-foreground/20">
                    {row.market}
                  </span>
                </div>
                <div
                  className={`px-6 py-3.5 ${
                    i < COMPARISON.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <span className="text-sm font-semibold text-primary">
                    {row.silverile}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SafeLightCoding;
