import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  FileCheck2,
  Lightbulb,
  PenLine,
  Rocket,
  ShieldCheck,
} from "lucide-react";

const heroPath = [
  { label: "Idea", icon: Lightbulb },
  { label: "Plan", icon: PenLine },
  { label: "Build", icon: Code2 },
  { label: "Launch", icon: Rocket },
];

const heroGuardrails = [
  { label: "Confidential", icon: ShieldCheck },
  { label: "Handover", icon: FileCheck2 },
];

export function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-layout mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-24 sm:px-6 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1>Your idea deserves more than staying in your notes app.</h1>
          <p className="hero-copy">
            NplusOne is your technical +1 for shaping, building and launching MVPs,
            AI workflows, apps and platforms.
          </p>

          <div className="hero-cta-row flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#book-call" className="btn btn-primary btn-large">
              Let&apos;s discuss your idea
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="#contact-form" className="btn btn-secondary btn-large">
              Tell us what you want to build
            </a>
          </div>

          <p className="hero-trust-line flex items-start gap-2 text-sm font-medium text-stone-600 sm:text-base">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-stone-800" aria-hidden="true" />
            No tech background needed. Bring the problem; we&apos;ll shape the build.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="hero-visual"
          aria-label="NplusOne idea to launch build flow"
        >
          <div className="hero-visual-glow" />
          <div className="hero-path-card">
            <div className="hero-path-card-top">
              <span>Idea to launch</span>
              <div className="plus-one-badge" aria-hidden="true">
                +1
              </div>
            </div>

            <div className="hero-path-line" aria-label="Idea to launch path">
              {heroPath.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="hero-path-node">
                    <div className="hero-path-icon">
                      <Icon aria-hidden="true" />
                    </div>
                    <span>{item.label}</span>
                    {index < heroPath.length - 1 && <i aria-hidden="true" />}
                  </div>
                );
              })}
            </div>

            <motion.div
              className="hero-output-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55 }}
            >
              <small>Working output</small>
              <strong>Prototype, MVP, automation or platform.</strong>
            </motion.div>

            <div className="hero-guardrail-row">
              {heroGuardrails.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    className="hero-guardrail"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Icon aria-hidden="true" />
                    <span>{item.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
