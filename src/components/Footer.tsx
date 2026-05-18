import { contactEmail, whatsappLabel, whatsappUrl } from "../data/siteContent";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 bg-white px-5 py-10 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div>
          <span className="brand-logo-link brand-logo-link-footer">
            <img src="/assets/nplusone-logo.svg" alt="NplusOne" className="brand-logo-image brand-logo-image-footer" />
          </span>
          <p className="mt-4 max-w-md text-base font-medium leading-7 text-stone-700">
            Your technical +1 for turning ideas into products.
          </p>
        </div>
        <div className="grid gap-3 text-sm font-medium text-stone-600 sm:grid-cols-2 md:text-right">
          <a href={`mailto:${contactEmail}`} className="footer-link">
            {contactEmail}
          </a>
          <a href="#book-call" className="footer-link">
            Calendly
          </a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="footer-link">
            {whatsappLabel}
          </a>
          <span>
            <a href="#" className="footer-link">Privacy</a> / <a href="#" className="footer-link">Terms</a>
          </span>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl text-sm text-stone-500">
        &copy; {year} NplusOne. All rights reserved.
      </div>
    </footer>
  );
}
