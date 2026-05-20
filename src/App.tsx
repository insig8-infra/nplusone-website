import {
  AppWindow,
  Blocks,
  Bot,
  Building2,
  CalendarDays,
  Check,
  ClipboardList,
  FileCheck2,
  FolderGit2,
  HardDrive,
  LayoutTemplate,
  Lightbulb,
  LockKeyhole,
  Mail,
  MailSearch,
  MapPinned,
  MessagesSquare,
  MonitorSmartphone,
  MousePointerClick,
  PlugZap,
  Rocket,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { MotionConfig, motion } from "framer-motion";
import { CalendlyInline } from "./components/CalendlyInline";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Section } from "./components/Section";
import {
  audiences,
  calendlyUrl,
  contactEmail,
  faqs,
  processSteps,
  proofPlaceholders,
  services,
  trustPrinciples,
  useCases,
  whatsappLabel,
  whatsappUrl,
  whatWeDo,
} from "./data/siteContent";

const iconMap: Record<string, LucideIcon> = {
  appWindow: AppWindow,
  blocks: Blocks,
  bot: Bot,
  building2: Building2,
  clipboardList: ClipboardList,
  fileCheck2: FileCheck2,
  folderGit2: FolderGit2,
  hardDrive: HardDrive,
  layoutTemplate: LayoutTemplate,
  lightbulb: Lightbulb,
  lockKeyhole: LockKeyhole,
  mailSearch: MailSearch,
  mapPinned: MapPinned,
  messagesSquare: MessagesSquare,
  monitorSmartphone: MonitorSmartphone,
  mousePointerClick: MousePointerClick,
  plugZap: PlugZap,
  rocket: Rocket,
  serverCog: ServerCog,
  shieldCheck: ShieldCheck,
  workflow: Workflow,
};

function getIcon(name: string) {
  return iconMap[name] || Sparkles;
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#f7f7f6] text-stone-950 antialiased">
        <Header />
        <main>
          <Hero />

          <Section
            id="what-we-do"
            title="We turn ideas into working software."
          >
            <div className="grid gap-4 md:grid-cols-3">
              {whatWeDo.map((item) => {
                const Icon = getIcon(item.icon);
                return (
                  <motion.article key={item.title} className="feature-card" whileHover={{ y: -5 }}>
                    <CardIcon icon={Icon} />
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </Section>

          <Section
            id="services"
            title="From first thought to first launch."
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const Icon = getIcon(service.icon);
                return (
                  <motion.article key={service.title} className="service-card" whileHover={{ y: -4 }}>
                    <CardIcon icon={Icon} />
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </Section>

          <Section
            id="who-this-is-for"
            title="Built for people who know the problem, not necessarily the code."
            className="section-band"
          >
            <div className="grid gap-3 md:grid-cols-2">
              {audiences.map((item) => (
                <div key={item} className="audience-row">
                  <Check className="h-5 w-5 text-stone-800" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section
            id="use-cases"
            title="Product directions we understand."
          >
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {useCases.map((item) => {
                const Icon = getIcon(item.icon);
                return (
                  <motion.article key={item.title} className="use-case-card" whileHover={{ y: -4 }}>
                    <CardIcon icon={Icon} compact />
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </Section>

          <Section
            id="how-it-works"
            title="How we move from idea to execution."
            className="section-band"
          >
            <div className="grid gap-4 md:grid-cols-4">
              {processSteps.map((step, index) => (
                <article key={step.title} className="step-card">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </Section>

          <Section
            id="privacy"
            title="Your idea stays yours."
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {trustPrinciples.map((principle) => {
                const Icon = getIcon(principle.icon);
                return (
                  <motion.article key={principle.title} className="trust-card" whileHover={{ y: -4 }}>
                    <CardIcon icon={Icon} compact />
                    <h3>{principle.title}</h3>
                    <p>{principle.description}</p>
                  </motion.article>
                );
              })}
            </div>
            <div className="trust-note">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              <p>
                We do not use your idea in public case studies, demos, social posts or sales material
                unless you explicitly approve it.
              </p>
            </div>
          </Section>

          <Section
            id="proof"
            title="Building in public, one useful product at a time."
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {proofPlaceholders.map((item) => (
                <div key={item} className="proof-card">
                  <Sparkles className="h-5 w-5 text-stone-800" aria-hidden="true" />
                  <h3>{item}</h3>
                  <p>Coming soon</p>
                </div>
              ))}
            </div>
          </Section>

          <Section
            id="book-call"
            title="Schedule a discovery call."
            className="booking-section"
          >
            <CalendlyInline calendlyUrl={calendlyUrl} />
          </Section>

          <Section
            id="contact"
            title="Have an idea? Let's talk."
            className="contact-section"
          >
            <div className="contact-grid">
              <aside className="contact-panel">
                <div className="contact-panel-intro">
                  <h3 className="text-2xl font-bold tracking-tight text-stone-950">
                    Book a discovery call or send a short enquiry.
                  </h3>
                  <p className="mt-3 leading-7 text-stone-600">
                    You do not need a perfect brief. A rough idea is enough.
                  </p>
                </div>

                <div className="contact-route-grid">
                  <a href="#book-call" className="contact-route">
                    <CalendarDays className="h-5 w-5" aria-hidden="true" />
                    <span>
                      <strong>Book a discovery call</strong>
                      <small>Use the embedded scheduler above</small>
                    </span>
                  </a>
                  <a href={`mailto:${contactEmail}`} className="contact-route">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                    <span>
                      <strong>{contactEmail}</strong>
                      <small>Email us directly</small>
                    </span>
                  </a>
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className="contact-route">
                    <MessagesSquare className="h-5 w-5" aria-hidden="true" />
                    <span>
                      <strong>{whatsappLabel}</strong>
                      <small>Message us on WhatsApp</small>
                    </span>
                  </a>
                </div>
              </aside>
              <ContactForm />
            </div>
          </Section>

          <Section
            id="faq"
            title="Questions founders usually ask."
          >
            <div className="grid gap-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="faq-item">
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </Section>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

function CardIcon({ icon: Icon, compact = false }: { icon: LucideIcon; compact?: boolean }) {
  return (
    <div className={compact ? "card-icon card-icon-compact" : "card-icon"}>
      <Icon aria-hidden="true" />
    </div>
  );
}

export default App;
