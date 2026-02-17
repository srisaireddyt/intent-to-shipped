import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
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
      "AI is optimized for understanding what the developer means, not for shipping code quickly. If intent is unclear, it surfaces ambiguity — never guesses.",
  },
  {
    icon: EyeOff,
    title: "Read-Only Default",
    short: "Zero auto-execution",
    detail:
      "AI suggestions are non-destructive and non-committal unless a human explicitly promotes them. Code review ✓ Auto-merge ✗",
  },
  {
    icon: ShieldCheck,
    title: "Deterministic Guards",
    short: "Rules, not guesses",
    detail:
      "Every AI output is bounded by schemas, contracts, and validation rules. If it can't be validated, it can't be trusted.",
  },
  {
    icon: HelpCircle,
    title: "Explicit Ambiguity",
    short: "Uncertainty disclosed",
    detail:
      "Ambiguity is first-class output. What's known, unclear, and not inferred are all surfaced transparently.",
  },
  {
    icon: Users,
    title: "Human Accountability",
    short: "AI suggests, you decide",
    detail:
      "AI assists thinking, but design decisions, business logic, risk, and outcomes always stay with the human.",
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);
  const Icon = principle.icon;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-border bg-card/80 px-5 py-8 text-center backdrop-blur-sm cursor-pointer"
      style={{ minHeight: 260 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
    >
      {/* Always-visible layer: icon + title + short */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/60">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-sm font-bold text-foreground">{principle.title}</h3>
        <p className="mt-1.5 text-xs text-muted-foreground">{principle.short}</p>
      </div>

      {/* Hidden detail layer — revealed by flashlight */}
      <div
        className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl px-6 py-6"
        style={{
          background: "hsl(var(--foreground))",
          opacity: isInside ? 1 : 0,
          transition: "opacity 0.15s",
          WebkitMaskImage: isInside
            ? `radial-gradient(circle 120px at ${mouse.x}px ${mouse.y}px, black 40%, transparent 100%)`
            : "none",
          maskImage: isInside
            ? `radial-gradient(circle 120px at ${mouse.x}px ${mouse.y}px, black 40%, transparent 100%)`
            : "none",
        }}
      >
        {/* Bright glow at cursor */}
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 240,
            height: 240,
            left: mouse.x - 120,
            top: mouse.y - 120,
            background: "radial-gradient(circle, hsl(var(--intent) / 0.3) 0%, transparent 60%)",
            filter: "blur(4px)",
          }}
        />

        <p className="relative text-sm font-semibold leading-relaxed text-primary-foreground">
          {principle.detail}
        </p>
      </div>
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
