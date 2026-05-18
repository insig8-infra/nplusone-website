import { ExternalLink } from "lucide-react";

type CalendlyInlineProps = {
  calendlyUrl: string;
};

export function CalendlyInline({ calendlyUrl }: CalendlyInlineProps) {
  const embedUrl = `${calendlyUrl}?hide_gdpr_banner=1&primary_color=171412`;

  return (
    <div className="booking-card">
      <div className="booking-card-header">
        <div>
          <p>Pick a slot</p>
          <h3>Choose a time that works for you.</h3>
        </div>
        <a href={calendlyUrl} target="_blank" rel="noreferrer" className="booking-fallback-link">
          Open Calendly
          <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>
      <div className="booking-frame-shell">
        <iframe
          src={embedUrl}
          title="Schedule a discovery call with NplusOne"
          className="booking-frame"
          loading="lazy"
        />
      </div>
    </div>
  );
}
