import { useEffect } from "react";
import { ExternalLink, X } from "lucide-react";

type CalendlyModalProps = {
  isOpen: boolean;
  calendlyUrl: string;
  onClose: () => void;
};

export function CalendlyModal({ isOpen, calendlyUrl, onClose }: CalendlyModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const embedUrl = `${calendlyUrl}?hide_gdpr_banner=1&primary_color=171412`;

  return (
    <div
      className="calendly-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="calendly-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="calendly-modal-title"
      >
        <div className="calendly-modal-header">
          <div>
            <p>Discovery call</p>
            <h2 id="calendly-modal-title">Choose a time to discuss your idea.</h2>
          </div>
          <button type="button" className="icon-button" aria-label="Close Calendly" onClick={onClose}>
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="calendly-frame-shell">
          <iframe
            src={embedUrl}
            title="Schedule a discovery call with NplusOne"
            className="calendly-frame"
            loading="lazy"
          />
        </div>

        <div className="calendly-modal-footer">
          <span>No tech background needed. Bring the problem and we will shape the next step.</span>
          <a href={calendlyUrl} target="_blank" rel="noreferrer" className="footer-link">
            Open in Calendly
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}
