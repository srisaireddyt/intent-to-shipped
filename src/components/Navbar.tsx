import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              <div className="h-5 w-1.5 rounded-full bg-primary" />
              <div className="h-7 w-1.5 rounded-full bg-primary/70" />
              <div className="h-4 w-1.5 rounded-full bg-primary/40" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              SILVERILE
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#platform" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Platform
          </a>
          <a href="#intelligence" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Intelligence
          </a>
          <a href="#developers" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Developers
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground">
            Sign In
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90">
            Get Started <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
