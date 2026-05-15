import { FormEvent, type ReactNode, useMemo, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { buildTypeOptions, timelineOptions } from "../data/siteContent";

const fallbackScriptUrl = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = {
  name: string;
  email: string;
  phone: string;
  background: string;
  buildTypes: string[];
  timeline: string;
  message: string;
  website: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  name: "",
  email: "",
  phone: "",
  background: "",
  buildTypes: [],
  timeline: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const scriptUrl = useMemo(
    () => import.meta.env.VITE_GOOGLE_SCRIPT_URL || fallbackScriptUrl,
    [],
  );

  const isSubmitting = status === "loading";

  const validate = () => {
    const nextErrors: FieldErrors = {};

    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!form.background.trim()) {
      nextErrors.background = "Share a short line about your background.";
    }
    if (form.buildTypes.length === 0) {
      nextErrors.buildTypes = "Choose at least one option.";
    }
    if (!form.timeline) {
      nextErrors.timeline = "Please select a timeline.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const toggleBuildType = (option: string) => {
    setForm((current) => {
      const exists = current.buildTypes.includes(option);
      return {
        ...current,
        buildTypes: exists
          ? current.buildTypes.filter((item) => item !== option)
          : [...current.buildTypes, option],
      };
    });
    if (errors.buildTypes) {
      setErrors((current) => ({ ...current, buildTypes: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage("");

    if (isSubmitting) return;

    if (form.website.trim()) {
      setStatus("success");
      setStatusMessage("Thanks. Your enquiry has been received.");
      setForm(initialFormState);
      return;
    }

    if (!validate()) {
      setStatus("error");
      setStatusMessage("Please fix the highlighted fields and try again.");
      return;
    }

    setStatus("loading");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      background: form.background.trim(),
      buildTypes: form.buildTypes,
      timeline: form.timeline,
      message: form.message.trim(),
      source: "NplusOne landing page",
    };

    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Submission failed.");
      }

      const text = await response.text();
      const result = text ? JSON.parse(text) : { success: true };

      if (result.success === false) {
        throw new Error(result.error || "Submission failed.");
      }

      setStatus("success");
      setStatusMessage("Thanks. Your idea is on our radar - we will reply soon.");
      setForm(initialFormState);
      setErrors({});
    } catch {
      setStatus("error");
      setStatusMessage(
        scriptUrl.includes("YOUR_SCRIPT_ID")
          ? "The form is ready, but the Google Apps Script URL has not been configured yet."
          : "Something went wrong while sending the form. Please email hello@insig8.com.",
      );
    }
  };

  return (
    <form id="contact-form" className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => updateField("website", event.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField fieldId="name" label="Name" error={errors.name} required>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            required
          />
        </FormField>
        <FormField fieldId="email" label="Email" error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            required
          />
        </FormField>
      </div>

      <FormField fieldId="phone" label="Phone number" hint="Optional" error={errors.phone}>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={(event) => updateField("phone", event.target.value)}
        />
      </FormField>

      <FormField fieldId="background" label="Your background in short" error={errors.background} required>
        <textarea
          id="background"
          name="background"
          rows={3}
          value={form.background}
          onChange={(event) => updateField("background", event.target.value)}
          placeholder="Founder, SMB owner, product manager, domain expert..."
          required
        />
      </FormField>

      <fieldset className="field-group">
        <legend>
          What do you want to build? <span aria-hidden="true">*</span>
        </legend>
        <div className="checkbox-grid">
          {buildTypeOptions.map((option) => (
            <label key={option} className="checkbox-card">
              <input
                type="checkbox"
                name="buildTypes"
                value={option}
                checked={form.buildTypes.includes(option)}
                onChange={() => toggleBuildType(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {errors.buildTypes && <p className="field-error">{errors.buildTypes}</p>}
      </fieldset>

      <FormField fieldId="timeline" label="Timeline to get started" error={errors.timeline} required>
        <select
          id="timeline"
          name="timeline"
          value={form.timeline}
          onChange={(event) => updateField("timeline", event.target.value)}
          required
        >
          <option value="">Select a timeline</option>
          {timelineOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </FormField>

      <FormField fieldId="message" label="Message / extra context" hint="Optional" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Tell us what exists today, what is blocked, or what outcome you want."
        />
      </FormField>

      <p className="text-sm text-stone-500">
        We use basic validation and a hidden spam trap in this version. A Turnstile or reCAPTCHA check can be added here later if needed.
      </p>

      <button type="submit" className="btn btn-primary btn-large w-full justify-center" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            Send enquiry
            <Send size={18} aria-hidden="true" />
          </>
        )}
      </button>

      {statusMessage && (
        <p className={`form-status ${status === "success" ? "form-status-success" : "form-status-error"}`} role="status" aria-live="polite">
          {statusMessage}
        </p>
      )}
    </form>
  );
}

function FormField({
  fieldId,
  label,
  hint,
  error,
  required,
  children,
}: {
  fieldId: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="field">
      <label htmlFor={fieldId}>
        {label} {required && <span aria-hidden="true">*</span>}
        {hint && <span>{hint}</span>}
      </label>
      {children}
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}
