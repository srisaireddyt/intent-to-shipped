import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Zap, Brain, Shield } from "lucide-react";
import montyWave from "@/assets/monty-wave.png";

const TRAITS = [
  { icon: Brain, label: "AI-Powered Intelligence" },
  { icon: Zap, label: "Real-Time Insights" },
  { icon: Shield, label: "Intent Verification" },
  { icon: Sparkles, label: "Story Generation" },
];

const MeetMonty = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative overflow-hidden py-16 lg:py-24">
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-border bg-card/80 backdrop-blur-sm"
            style={{
              boxShadow: "0 8px 60px -16px hsl(var(--intent) / 0.15)",
            }}
          >
            <div className="grid lg:grid-cols-[1fr_auto]">
              {/* Left — Text content */}
              <div className="relative z-10 flex flex-col justify-center p-8 sm:p-10 lg:p-14">
                <motion.span
                  initial={{ opacity: 0, x: -12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mb-3 inline-block w-fit rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary"
                >
                  Meet Your AI Companion
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl"
                >
                  Say Hi to{" "}
                  <span className="text-gradient-hero">Monty</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
                >
                  Monty is your intelligent orchestration interface — the friendly face behind Silverile's powerful engine. 
                  From crafting user stories to validating code against intent, Monty coordinates your entire SDLC workflow 
                  so you can focus on building what matters.
                </motion.p>

                {/* Trait pills */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {TRAITS.map((trait) => (
                    <div
                      key={trait.label}
                      className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/50 px-3 py-1.5"
                    >
                      <trait.icon className="h-3.5 w-3.5 text-primary" />
                      <span className="text-xs font-medium text-foreground/80">{trait.label}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right — Monty peeking from behind the card edge */}
              <div className="relative hidden lg:block lg:w-[340px] xl:w-[400px]">
                <motion.div
                  initial={{ x: 80, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                  className="absolute -right-6 bottom-0 top-0 flex items-end"
                >
                  <img
                    src={montyWave}
                    alt="Monty waving hello"
                    className="h-[110%] max-h-[420px] w-auto object-contain object-bottom drop-shadow-2xl"
                  />
                </motion.div>
                {/* Soft glow behind Monty */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 80% 60%, hsl(var(--intent) / 0.08), transparent 60%)",
                  }}
                />
              </div>

              {/* Mobile Monty — below text */}
              <div className="relative flex justify-center lg:hidden overflow-hidden">
                <motion.img
                  initial={{ y: 40, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  src={montyWave}
                  alt="Monty waving hello"
                  className="h-56 w-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MeetMonty;
