import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Check, Sparkles, Building2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

type Feature = { label: string; sub?: string[] };

const tiers: {
  name: string;
  subtitle: string;
  icon: typeof Zap;
  color: string;
  features: Feature[];
  cta: string;
  highlighted: boolean;
}[] = [
  {
    name: "Silverile - Free plan",
    subtitle: "(Ag)ile for All, Time gAIned",
    icon: Zap,
    color: "execution",
    features: [
      { label: "Agentic Project management" },
      { label: "StoryCraft-AI", sub: ["Generate Stories from Text", "Generate Stories from Images"] },
      { label: "Monty's Views", sub: ["Organization View", "Scrum View", "Kanban View", "Timeline View"] },
      { label: "Release Management" },
      { label: "Time Management" },
      { label: "Silverile Virtual Huddle" },
      { label: "5,000 AI tokens per user per month" },
      { label: "10 Projects" },
      { label: "200 Stories per Project" },
    ],
    cta: "Free for 10 Users",
    highlighted: false,
  },
  {
    name: "Silverile - Professional",
    subtitle: "(Ag)ile for All, Time gAIned",
    icon: Sparkles,
    color: "intent",
    features: [
      { label: "Agentic Project management" },
      { label: "StoryCraft-AI", sub: ["Generate Stories from Text", "Generate Stories from Images"] },
      { label: "Monty's Views", sub: ["Agile View", "Organization View", "Scrum View", "Kanban View", "Timeline View"] },
      { label: "Release Management" },
      { label: "Time Management" },
      { label: "Compendium - Your document repository" },
      { label: "Silverile Virtual Huddle" },
      { label: "20,000 AI tokens per user per month" },
      { label: "Unlimited Projects" },
      { label: "Unlimited Stories" },
    ],
    cta: "$7.00 per User per Month",
    highlighted: true,
  },
  {
    name: "Enterprise",
    subtitle: "For more than 500 Users",
    icon: Building2,
    color: "validation",
    features: [],
    cta: "Contact Us",
    highlighted: false,
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  intent: {
    border: "border-[hsl(var(--intent)/0.3)]",
    bg: "bg-[hsl(var(--intent)/0.06)]",
    text: "text-[hsl(var(--intent))]",
    glow: "shadow-[0_8px_40px_-12px_hsl(var(--intent)/0.25)]",
  },
  execution: {
    border: "border-[hsl(var(--execution)/0.3)]",
    bg: "bg-[hsl(var(--execution)/0.06)]",
    text: "text-[hsl(var(--execution))]",
    glow: "",
  },
  validation: {
    border: "border-[hsl(var(--validation)/0.3)]",
    bg: "bg-[hsl(var(--validation)/0.06)]",
    text: "text-[hsl(var(--validation))]",
    glow: "",
  },
};

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" ref={ref} className="relative py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid opacity-[0.04]" />
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Pricing
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-foreground">Simple, </span>
            <span className="text-gradient-hero">Transparent</span>
            <span className="text-foreground"> Pricing</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground lg:text-lg">
            Choose the plan that fits your team. Scale as you grow.
          </p>
        </motion.div>

        {/* Tiers */}
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => {
            const colors = colorMap[tier.color];
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                className={`relative flex flex-col rounded-2xl border bg-card/80 backdrop-blur-sm p-8 transition-all duration-300 hover:-translate-y-1 ${
                  tier.highlighted
                    ? `${colors.border} ${colors.glow} ring-1 ring-[hsl(var(--intent)/0.15)]`
                    : "border-border hover:border-muted-foreground/20"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-[hsl(var(--intent))] px-4 py-1 text-xs font-bold text-primary-foreground">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Icon + Name */}
                <div className="mb-6">
                  <div className={`mb-4 inline-flex rounded-xl p-2.5 ${colors.bg}`}>
                    <tier.icon className={`h-5 w-5 ${colors.text}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{tier.subtitle}</p>
                </div>

                {/* Divider */}
                <div className="mb-6 border-t border-border" />

                {/* Features */}
                <ul className="mb-8 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f.label}>
                      <div className="flex items-start gap-2.5 text-sm text-foreground/80">
                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${colors.text}`} />
                        <span className="font-medium">{f.label}</span>
                      </div>
                      {f.sub && (
                        <ul className="ml-9 mt-1 space-y-1">
                          {f.sub.map((s) => (
                            <li key={s} className="text-xs text-muted-foreground">{s}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                  {tier.features.length === 0 && (
                    <li className="text-sm text-muted-foreground italic">Custom plan — contact for details</li>
                  )}
                </ul>

                {/* CTA */}
                <Button
                  className={`w-full ${
                    tier.highlighted
                      ? "bg-[hsl(var(--intent))] text-primary-foreground hover:bg-[hsl(var(--intent)/0.9)]"
                      : ""
                  }`}
                  variant={tier.highlighted ? "default" : "outline"}
                  size="lg"
                >
                  {tier.cta}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
