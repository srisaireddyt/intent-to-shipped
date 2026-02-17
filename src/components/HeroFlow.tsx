import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText, Image, Code, Brain,
  BookOpen, ListChecks, AlertTriangle, TestTube2,
  FileCheck, Cpu, Zap, Wand2,
  GitCompare, Target, Search, Sparkles, Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ── Types ── */
interface CardData {
  id: string;
  icon: LucideIcon;
  title: string;
  color: string;
  details: string[];
}

/* ── Data ── */
const INPUT_CARDS: CardData[] = [
  {
    id: "text",
    icon: FileText,
    title: "Text to Story",
    color: "intent",
    details: [
      "Natural language → structured requirements",
      "Sprint-aware context injection",
      "Auto-links to epics & backlog",
      "Edge case detection",
    ],
  },
  {
    id: "image",
    icon: Image,
    title: "UX to Story",
    color: "execution",
    details: [
      "Wireframes → functional requirements",
      "UI flow & state extraction",
      "API contract inference",
      "Missing validation detection",
    ],
  },
  {
    id: "code",
    icon: Code,
    title: "Code to Story",
    color: "validation",
    details: [
      "PR analysis → structured stories",
      "Reverse-engineer business intent",
      "Extract acceptance criteria",
      "Auto-generate test scenarios",
    ],
  },
  {
    id: "relevance",
    icon: GitCompare,
    title: "Code Relevance",
    color: "intent",
    details: [
      "Code ↔ story alignment scoring",
      "AST + LLM semantic analysis",
      "Scope creep detection",
      "Criteria coverage mapping",
    ],
  },
];

const OUTPUT_CARDS: CardData[] = [
  {
    id: "text",
    icon: BookOpen,
    title: "Verified Artifacts",
    color: "intent",
    details: [
      "User Story with scope & intent",
      "Acceptance Criteria (7 defined)",
      "Edge Cases (4 identified)",
      "Copilot Prompt (implementation-ready)",
    ],
  },
  {
    id: "image",
    icon: FileCheck,
    title: "Design Intelligence",
    color: "execution",
    details: [
      "Functional Requirements (8 extracted)",
      "Backend Dependencies (3 flagged)",
      "API Contracts (2 inferred)",
      "Missing States (5 detected)",
    ],
  },
  {
    id: "code",
    icon: TestTube2,
    title: "Code Intelligence",
    color: "validation",
    details: [
      "Auto-generated User Story",
      "Acceptance Criteria (5 inferred)",
      "Unit Tests (6 generated)",
      "Integration Tests (3 generated)",
    ],
  },
  {
    id: "relevance",
    icon: Target,
    title: "Paired Verification",
    color: "intent",
    details: [
      "Intent Alignment Score: 91%",
      "Criteria Coverage: 5/7 matched",
      "Scope Creep Flags (2 detected)",
      "Paired Unit Tests (9 generated)",
    ],
  },
];

/* ── Cube Card ── */
const CubeCard = ({ card, index, side }: { card: CardData; index: number; side: "left" | "right" }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = card.icon;
  const rotateDirection = side === "left" ? "rotateY(180deg)" : "rotateY(-180deg)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group"
      style={{ perspective: "800px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative h-[140px] w-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: hovered ? rotateDirection : "rotateY(0deg)",
        }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-border bg-card/80 backdrop-blur-sm"
          style={{
            backfaceVisibility: "hidden",
            boxShadow: `0 0 30px -12px hsl(var(--${card.color}) / 0.15)`,
          }}
        >
          <div
            className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl"
            style={{ background: `hsl(var(--${card.color}) / 0.12)` }}
          >
            <Icon className="h-5 w-5" style={{ color: `hsl(var(--${card.color}))` }} />
          </div>
          <span className="text-sm font-bold text-foreground">{card.title}</span>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 flex flex-col justify-center rounded-xl border p-4"
          style={{
            backfaceVisibility: "hidden",
            transform: side === "left" ? "rotateY(180deg)" : "rotateY(-180deg)",
            borderColor: `hsl(var(--${card.color}) / 0.4)`,
            background: `linear-gradient(135deg, hsl(var(--${card.color}) / 0.1), hsl(var(--${card.color}) / 0.04))`,
            boxShadow: `0 0 40px -8px hsl(var(--${card.color}) / 0.25)`,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Icon className="h-3.5 w-3.5" style={{ color: `hsl(var(--${card.color}))` }} />
            <span className="text-xs font-bold" style={{ color: `hsl(var(--${card.color}))` }}>{card.title}</span>
          </div>
          <div className="flex flex-col gap-1">
            {card.details.map((d) => (
              <div key={d} className="flex items-start gap-1.5">
                <Zap className="mt-0.5 h-2.5 w-2.5 shrink-0" style={{ color: `hsl(var(--${card.color}) / 0.5)` }} />
                <span className="text-[10px] leading-tight text-muted-foreground">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Main Hero ── */
const HeroFlow = () => {
  return (
    <section className="relative overflow-hidden py-16 lg:py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center lg:mb-14"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Brain className="h-3.5 w-3.5 text-primary" />
            Intelligence Engine
          </div>
          <h2 className="mx-auto max-w-4xl text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            <span className="text-foreground">From </span>
            <span className="text-gradient-hero">Any Input</span>
            <span className="text-foreground"> to Verified Output</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            Text. Design. Code.{" "}
            <span className="font-semibold text-foreground">Silverile understands it all.</span>
          </p>
        </motion.div>

        {/* Cards Grid: Input | StoryCraft-AI | Output */}
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
            {/* Input Cards */}
            <div className="grid grid-cols-2 gap-4">
              {INPUT_CARDS.map((card, i) => (
                <CubeCard key={card.id} card={card} index={i} side="left" />
              ))}
            </div>

            {/* StoryCraft-AI Center */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center justify-center px-6 py-8 lg:px-10"
            >
              <div
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ background: "hsl(var(--execution) / 0.12)" }}
              >
                <Sparkles className="h-7 w-7" style={{ color: "hsl(var(--execution))" }} />
              </div>
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-foreground">
                  StoryCraft-AI
                </span>
              </motion.div>
              {/* Connecting dots */}
              <div className="mt-4 flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: "hsl(var(--execution))" }}
                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Output Cards */}
            <div className="grid grid-cols-2 gap-4">
              {OUTPUT_CARDS.map((card, i) => (
                <CubeCard key={card.id} card={card} index={i} side="right" />
              ))}
            </div>
          </div>
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
            <span className="font-semibold text-foreground">track what you build</span>. Silverile{" "}
            <span className="text-gradient-hero font-bold">
              verifies that what you ship matches what you intended
            </span>
            — closing the gap between requirements and reality.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroFlow;
