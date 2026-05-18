import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { heroFlowSteps, heroPhrases } from "../data/siteContent";

type HeroProps = {
  onOpenCalendly: () => void;
};

export function Hero({ onOpenCalendly }: HeroProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState(heroPhrases[0]);
  const prefersReducedMotion = useReducedMotion();
  const activeFlowIndex = phraseIndex % heroFlowSteps.length;

  useEffect(() => {
    if (prefersReducedMotion) {
      const timer = window.setInterval(() => {
        setPhraseIndex((current) => {
          const nextIndex = (current + 1) % heroPhrases.length;
          setTypedText(heroPhrases[nextIndex]);
          return nextIndex;
        });
      }, 2600);

      return () => window.clearInterval(timer);
    }

    const phrase = heroPhrases[phraseIndex];
    let characterIndex = 0;
    let timeoutId = 0;

    setTypedText("");

    const typeNextCharacter = () => {
      characterIndex += 1;
      setTypedText(phrase.slice(0, characterIndex));

      if (characterIndex < phrase.length) {
        timeoutId = window.setTimeout(typeNextCharacter, 34);
        return;
      }

      timeoutId = window.setTimeout(() => {
        setPhraseIndex((current) => (current + 1) % heroPhrases.length);
      }, 1350);
    };

    timeoutId = window.setTimeout(typeNextCharacter, 120);

    return () => window.clearTimeout(timeoutId);
  }, [phraseIndex, prefersReducedMotion]);

  return (
    <section id="top" className="hero-section">
      <div className="hero-layout mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-24 sm:px-6 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">Your technical +1 for the next step</p>
          <h1>Your idea deserves more than staying in your notes app.</h1>
          <p className="hero-copy">
            NplusOne is your technical +1 for turning ideas into prototypes, MVPs,
            AI products, automations and full-scale software platforms.
          </p>

          <div className="hero-rotator" aria-live="polite">
            <span className="text-stone-500">Build momentum:</span>
            <span className="typewriter-text">
              {typedText}
              <span className="typewriter-cursor" aria-hidden="true" />
            </span>
          </div>

          <div className="hero-cta-row flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button type="button" className="btn btn-primary btn-large" onClick={onOpenCalendly}>
              Let&apos;s discuss your idea
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <a href="#contact-form" className="btn btn-secondary btn-large">
              Tell us what you want to build
            </a>
          </div>

          <p className="hero-trust-line flex items-start gap-2 text-sm font-medium text-stone-600 sm:text-base">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-stone-800" aria-hidden="true" />
            No tech background needed. Bring the problem - we&apos;ll help shape and build the product.
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
          <div className="hero-build-card">
            <div className="hero-build-header">
              <div>
                <p>NplusOne build map</p>
                <h2>From protected idea to owned product.</h2>
              </div>
              <div className="plus-one-badge" aria-hidden="true">
                +1
              </div>
            </div>

            <div className="idea-capture-card">
              <div>
                <span>Founder signal</span>
                <strong>"I know the problem. I need the product built."</strong>
              </div>
              <Sparkles aria-hidden="true" />
            </div>

            <div className="build-flow-rail">
              {heroFlowSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  className={`build-flow-step ${activeFlowIndex === index ? "build-flow-step-active" : ""}`}
                  animate={{
                    opacity: activeFlowIndex === index ? 1 : 0.76,
                    y: activeFlowIndex === index ? -2 : 0,
                  }}
                  transition={{ duration: 0.28 }}
                >
                  <span className="build-flow-number">{index + 1}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <small>{step.description}</small>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="hero-assurance-grid">
              <span>
                <ShieldCheck aria-hidden="true" />
                Confidential by default
              </span>
              <span>
                <Workflow aria-hidden="true" />
                AI-first execution
              </span>
              <span>
                <FileCheck2 aria-hidden="true" />
                Files handed over
              </span>
              <span>
                <LockKeyhole aria-hidden="true" />
                Controlled access
              </span>
            </div>

            <div className="launch-output-card">
              <span>Launch output</span>
              <strong>Working version + source, docs and next roadmap.</strong>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
