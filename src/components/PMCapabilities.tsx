import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import {
  Wand2,
  AlertTriangle,
  BarChart3,
  Workflow,
  Bug,
  Globe,
  Zap,
  ArrowRight } from
"lucide-react";

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
  "Text + image input modes"],

  differentiator: "Others require manual story writing",
  silverile: "Silverile generates complete, validated stories autonomously"
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
  "Team health & velocity tracking"],

  differentiator: "Others alert after deadlines miss",
  silverile: "Silverile predicts risks before they escalate"
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
  "Action recommendations"],

  differentiator: "Others show static charts",
  silverile: "Silverile recommends what to do next"
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
  "Sprint capacity planning"],

  differentiator: "Others need manual drag-and-drop",
  silverile: "Silverile auto-assigns and rebalances workload"
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
  "Test coverage insights"],

  differentiator: "Others log bugs passively",
  silverile: "Silverile finds root causes and predicts regressions"
},
{
  icon: Globe,
  title: "Multi-Industry",
  subtitle: "Adaptable Platform",
  color: "primary",
  tagline: "Built for your domain, not just software",
  bullets: [
  "Industry-specific workflows",
  "Customizable team structures",
  "Small teams to enterprise scale"],

  differentiator: "Others are one-size-fits-all",
  silverile: "Silverile adapts workflows to your industry context"
}];


const CapabilityCard = ({
  cap,
  index,
  isInView




}: {cap: (typeof CAPABILITIES)[0];index: number;isInView: boolean;}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = cap.icon;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / centerY * -12);
    setRotateY((x - centerX) / centerX * 12);
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
      style={{ perspective: "1200px" }}>

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative h-[320px] cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-shadow duration-500"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isHovered ?
          "transform 0.1s ease-out, box-shadow 0.4s ease" :
          "transform 0.5s ease-out, box-shadow 0.4s ease",
          transformStyle: "preserve-3d",
          boxShadow: isHovered ?
          `0 20px 60px -15px hsl(var(--${cap.color}) / 0.35), 0 0 0 1px hsl(var(--${cap.color}) / 0.2)` :
          "0 4px 20px -8px hsl(var(--foreground) / 0.08)"
        }}>

        {/* Glow overlay on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at 50% 0%, hsl(var(--${cap.color}) / 0.12) 0%, transparent 70%)`
          }} />


        {/* Shimmer line at top */}
        <div
          className="absolute left-0 right-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500"
          style={{
            transform: isHovered ? "scaleX(1)" : "scaleX(0)",
            background: `linear-gradient(90deg, transparent, hsl(var(--${cap.color})), transparent)`
          }} />


        {/* ---- DEFAULT FACE ---- */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-all duration-500"
          style={{
            opacity: isHovered ? 0 : 1,
            transform: isHovered ? "translateZ(30px) scale(0.92)" : "translateZ(0) scale(1)"
          }}>

          <div
            className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-500"
            style={{
              background: `hsl(var(--${cap.color}) / 0.1)`,
              transform: isHovered ? "scale(0.8)" : "scale(1)"
            }}>

            <Icon className="h-7 w-7" style={{ color: `hsl(var(--${cap.color}))` }} />
          </div>
          <h3 className="text-lg font-bold text-foreground">{cap.title}</h3>
          <p
            className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.15em]"
            style={{ color: `hsl(var(--${cap.color}) / 0.7)` }}>

            {cap.subtitle}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{cap.tagline}</p>
        </div>

        {/* ---- HOVER FACE ---- */}
        




































































      </div>
    </motion.div>);

};

const PMCapabilities = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid opacity-[0.06]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center lg:mb-16">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Workflow className="h-3.5 w-3.5 text-primary" />
            Agentic Project Manager
          </div>
          




          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            Six intelligent agents working continuously. Hover to explore.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap, i) =>
          <CapabilityCard key={cap.title} cap={cap} index={i} isInView={isInView} />
          )}
        </div>

        {/* Differentiator strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3">

          {[
          { label: "Proactive Intelligence", color: "intent" },
          { label: "Context-Aware Automation", color: "execution" },
          { label: "Seamless Integration", color: "validation" }].
          map((d) =>
          <div key={d.label} className="flex items-center gap-2">
              <div
              className="h-2 w-2 rounded-full"
              style={{ background: `hsl(var(--${d.color}))` }} />

              <span className="text-xs font-semibold text-muted-foreground">{d.label}</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>);

};

export default PMCapabilities;