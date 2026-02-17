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
      className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-card/80 px-5 py-8 text-center backdrop-blur-sm cursor-pointer"
      style={{ minHeight: 220 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Soft light glow on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        animate={{
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
        style={{
          background:
            "radial-gradient(circle at 50% 40%, hsl(var(--intent) / 0.1) 0%, transparent 70%)",
        }}
      />

      {/* Soft light circle behind icon */}
      <div className="relative mb-4">
        <motion.div
          className="absolute -inset-3 rounded-full"
          animate={{
            opacity: hovered ? 1 : 0,
            scale: hovered ? 1.3 : 0.8,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            background:
              "radial-gradient(circle, hsl(var(--intent) / 0.18) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
        <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-accent/60">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>

      {/* Title */}
      <h3 className="relative text-sm font-bold text-foreground">{principle.title}</h3>

      {/* Short text / Detail swap */}
      <AnimatePresence mode="wait">
        {!hovered ? (
          <motion.p
            key="short"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="relative mt-2 text-xs text-muted-foreground"
          >
            {principle.short}
          </motion.p>
        ) : (
          <motion.p
            key="detail"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="relative mt-2 text-[11px] leading-relaxed text-muted-foreground"
          >
            {principle.detail}
          </motion.p>
        )}
      </AnimatePresence>
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
