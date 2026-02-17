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
    short: "Understand, then act",
    detail:
      "We optimize for meaning, not speed. Unclear intent? We ask — never assume.",
  },
  {
    icon: EyeOff,
    title: "Read-Only Default",
    short: "Suggest, never commit",
    detail:
      "Every AI output is a proposal. Nothing ships until a human says go.",
  },
  {
    icon: ShieldCheck,
    title: "Deterministic Guards",
    short: "Validated, not vibes",
    detail:
      "Schemas and contracts gate every output. If it can't be proven, it doesn't pass.",
  },
  {
    icon: HelpCircle,
    title: "Explicit Ambiguity",
    short: "Uncertainty is data",
    detail:
      'We don\'t hide doubt — we surface it. "I\'m not sure" is a valid AI answer.',
  },
  {
    icon: Users,
    title: "Human Ownership",
    short: "You decide, always",
    detail:
      "AI accelerates thinking. Decisions, risk, and accountability stay human.",
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = principle.icon;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
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
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border"
      style={{ minHeight: 260 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Base layer — visible by default */}
      <div className="flex h-full flex-col items-center justify-center p-6 text-center bg-card/80 backdrop-blur-sm">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/60">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground">{principle.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{principle.short}</p>
      </div>

      {/* Flashlight-revealed layer */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-6 text-center transition-opacity duration-300"
        style={{
          background: "hsl(var(--intent))",
          opacity: isHovering ? 1 : 0,
          WebkitMaskImage: isHovering
            ? `radial-gradient(circle 140px at ${mousePos.x}px ${mousePos.y}px, black 0%, black 40%, transparent 100%)`
            : "none",
          maskImage: isHovering
            ? `radial-gradient(circle 140px at ${mousePos.x}px ${mousePos.y}px, black 0%, black 40%, transparent 100%)`
            : "none",
        }}
      >
        <Icon className="mb-4 h-6 w-6 text-primary-foreground/70" />
        <p className="text-base font-bold leading-relaxed text-primary-foreground">
          {principle.detail}
        </p>
      </div>

      {/* Cursor glow effect */}
      {isHovering && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, hsl(var(--intent) / 0.2), transparent 70%)`,
          }}
        />
      )}
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
