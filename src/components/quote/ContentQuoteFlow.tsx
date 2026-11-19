"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { easeOut, motionDurations } from "@/lib/motion";
import { QUOTE_OPEN_EVENT } from "@/lib/quote-open";
import { site } from "@/lib/site";
import styles from "./ContentQuoteFlow.module.css";

type Step = "start" | "details" | "done";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

function isValidEmail(value: string) {
  return EMAIL_RE.test(value.trim());
}

function phoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

function isValidPhone(value: string) {
  const digits = phoneDigits(value);
  if (digits.length === 10) return true;
  if (digits.length === 11 && digits.startsWith("1")) return true;
  return false;
}

function formatPhone(value: string) {
  let digits = phoneDigits(value).slice(0, 11);
  if (digits.length === 11 && digits.startsWith("1")) {
    digits = digits.slice(1);
  } else {
    digits = digits.slice(0, 10);
  }
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function isValidUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return false;
  try {
    const url = new URL(
      trimmed.includes("://") ? trimmed : `https://${trimmed}`
    );
    return Boolean(url.hostname.includes("."));
  } catch {
    return false;
  }
}

type ContentQuoteFlowProps = {
  className?: string;
  /** Shown under the Ready button. */
  note?: string;
  align?: "center" | "start";
};

export default function ContentQuoteFlow({
  className = "",
  note,
  align = "center",
}: ContentQuoteFlowProps) {
  const formId = useId();
  const reducedMotion = useReducedMotion();
  const quote = site.quote;

  const [step, setStep] = useState<Step>("start");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mediaLink, setMediaLink] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setStep("start");
    setContactName("");
    setEmail("");
    setPhone("");
    setMediaLink("");
    setTouched(false);
    setSubmitting(false);
    setError("");
  };

  const panelMotion = {
    initial: reducedMotion ? false : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: reducedMotion ? undefined : { opacity: 0, y: -8 },
    transition: { duration: motionDurations.ui, ease: easeOut },
  };

  const formValid =
    contactName.trim().length >= 2 &&
    isValidEmail(email) &&
    isValidPhone(phone) &&
    isValidUrl(mediaLink);

  useEffect(() => {
    const open = () => {
      setError("");
      setTouched(false);
      setStep((current) =>
        current === "start" || current === "done" ? "details" : current
      );
    };

    const fromHash = () => {
      if (window.location.hash === "#quote") open();
    };

    fromHash();
    window.addEventListener(QUOTE_OPEN_EVENT, open);
    window.addEventListener("hashchange", fromHash);
    return () => {
      window.removeEventListener(QUOTE_OPEN_EVENT, open);
      window.removeEventListener("hashchange", fromHash);
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!formValid || submitting) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email,
          phone,
          mediaLink,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong");
      }

      setStep("done");
      setTouched(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`${styles.shell} ${align === "start" ? styles.shellStart : ""} ${className}`.trim()}
    >
      <AnimatePresence mode="wait">
        {step === "start" && (
          <motion.div
            key="start"
            className={`${styles.start} ${align === "start" ? styles.startLeft : ""}`}
            {...panelMotion}
          >
            <button
              type="button"
              className={styles.startBtn}
              onClick={() => setStep("details")}
            >
              {site.hero.cta}
            </button>
            {note ? <p className={styles.startNote}>{note}</p> : null}
          </motion.div>
        )}

        {step === "details" && (
          <motion.form
            key="details"
            className={styles.stack}
            onSubmit={submit}
            {...panelMotion}
          >
            <div className={styles.progressRow}>
              <button
                type="button"
                className={styles.backBtn}
                onClick={() => {
                  setTouched(false);
                  setError("");
                  setStep("start");
                }}
              >
                Back
              </button>
            </div>

            <div className={styles.fields}>
              <label className={styles.field} htmlFor={`${formId}-name`}>
                <span className={styles.label}>Name</span>
                <input
                  id={`${formId}-name`}
                  className={`${styles.input} ${
                    touched && contactName.trim().length < 2
                      ? styles.inputInvalid
                      : ""
                  }`}
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  autoComplete="name"
                  placeholder="Your name"
                />
              </label>

              <label className={styles.field} htmlFor={`${formId}-phone`}>
                <span className={styles.label}>Phone number</span>
                <input
                  id={`${formId}-phone`}
                  type="tel"
                  className={`${styles.input} ${
                    touched && !isValidPhone(phone) ? styles.inputInvalid : ""
                  }`}
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  autoComplete="tel"
                  placeholder="(555) 555-5555"
                />
              </label>

              <label className={styles.field} htmlFor={`${formId}-email`}>
                <span className={styles.label}>Email</span>
                <input
                  id={`${formId}-email`}
                  type="email"
                  className={`${styles.input} ${
                    touched && !isValidEmail(email) ? styles.inputInvalid : ""
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="you@email.com"
                />
              </label>

              <label className={styles.field} htmlFor={`${formId}-media`}>
                <span className={styles.label}>Footage link</span>
                <input
                  id={`${formId}-media`}
                  className={`${styles.input} ${
                    touched && !isValidUrl(mediaLink) ? styles.inputInvalid : ""
                  }`}
                  value={mediaLink}
                  onChange={(e) => setMediaLink(e.target.value)}
                  inputMode="url"
                  autoComplete="url"
                  placeholder="Paste your upload link"
                />
              </label>
            </div>

            <div className={styles.hostBlock}>
              <p className={styles.hostHint}>{quote.mediaHint}</p>
              <ul className={styles.hosts} aria-label="Recommended upload options">
                {quote.mediaHosts.map((host) => (
                  <li key={host.label}>
                    <a
                      className={styles.hostChip}
                      href={host.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {host.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {error ? <p className={styles.error}>{error}</p> : null}

            <div className={styles.actions}>
              <p className={styles.submitHint}>{quote.submitHint}</p>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={submitting || (touched && !formValid)}
              >
                {submitting ? "Submitting…" : "Submit"}
              </button>
            </div>
          </motion.form>
        )}

        {step === "done" && (
          <motion.div key="done" className={styles.done} {...panelMotion}>
            <h3 className={styles.doneTitle}>{quote.confirmationTitle}</h3>
            <p className={styles.doneBody}>{quote.confirmationBody}</p>
            <button type="button" className={styles.resetBtn} onClick={reset}>
              Submit another request
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
