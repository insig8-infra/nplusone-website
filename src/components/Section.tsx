import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type SectionProps = Omit<HTMLMotionProps<"section">, "children"> & {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  eyebrow,
  title,
  description,
  children,
  className = "",
  ...props
}: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`section-shell ${className}`}
      {...props}
    >
      {(eyebrow || title || description) && (
        <div className="section-heading">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {title && <h2>{title}</h2>}
          {description && <p className="section-description">{description}</p>}
        </div>
      )}
      {children}
    </motion.section>
  );
}
