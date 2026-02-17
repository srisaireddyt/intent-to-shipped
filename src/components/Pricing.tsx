import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Check, Sparkles, Building2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with basic agentic features at no cost.",
    icon: Zap,
    color: "execution",
    features: [
      "Basic agentic PM features",
      "Up to 2 active projects",
      "Community support",
      "Core intent capture",
      "Standard story generation",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$7",
    period: "per user / month",
    description: "Full AI capabilities, payments, and advanced workflows.",
    icon: Sparkles,
    color: "intent",
    features: [
      "Everything in Free",
      "Unlimited projects",
      "Full AI-powered capabilities",
      "Payment integration",
      "Priority support",
      "Advanced story crafting",
      "Custom validation rules",
    ],
    cta: "Start Pro Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored to you",
    description: "Custom solutions with advanced analytics and dedicated support.",
    icon: Building2,
    color: "validation",
    features: [
      "Everything in Professional",
      "Advanced analytics & reporting",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantees",
      "On-premise deployment options",
      "Team training & onboarding",
    ],
    cta: "Contact Sales",
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
                  <p className="mt-1 text-sm text-muted-foreground">{tier.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-extrabold tracking-tight text-foreground">
                    {tier.price}
                  </span>
                  <span className="ml-2 text-sm text-muted-foreground">{tier.period}</span>
                </div>

                {/* Features */}
                <ul className="mb-8 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${colors.text}`} />
                      {f}
                    </li>
                  ))}
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
