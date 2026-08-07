"use client";

import { useEffect, useId, useRef, useState } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function LockdownOverlay() {
  const formId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const dialog = dialogRef.current;
    const overlayRoot = dialog?.closest("[data-lockdown-root]") as
      | HTMLElement
      | null;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const inertTargets: HTMLElement[] = [];

    Array.from(document.body.children).forEach((child) => {
      if (!(child instanceof HTMLElement)) return;
      if (child === overlayRoot) return;
      if (child.hasAttribute("inert")) return;
      child.setAttribute("inert", "");
      child.setAttribute("aria-hidden", "true");
      inertTargets.push(child);
    });

    const focusFirst = () => {
      if (!dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>(FOCUSABLE);
      (focusable[0] ?? dialog).focus();
    };

    // Defer so the dialog is in the DOM and ready for focus.
    const frame = requestAnimationFrame(focusFirst);

    const onKeyDown = (e: KeyboardEvent) => {
      // Intentional lockdown: Escape does not dismiss.
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (e.key !== "Tab" || !dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

      if (focusable.length === 0) {
        e.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey) {
        if (active === first || !dialog.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last || !dialog.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown, true);
      inertTargets.forEach((el) => {
        el.removeAttribute("inert");
        el.removeAttribute("aria-hidden");
      });
      previouslyFocused?.focus?.();
    };
  }, [isSubmitted]);

  return (
    <div
      data-lockdown-root
      className="fixed inset-0 z-[9990] flex items-center justify-center px-5"
    >
      {/* Blocks interaction with the live site underneath */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-xl"
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${formId}-title`}
        aria-describedby={`${formId}-desc`}
        tabIndex={-1}
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto border border-white/10 bg-brandBg p-8 outline-none md:p-10"
      >
        {!isSubmitted ? (
          <>
            <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-brandBlue">
              GTS Media House
            </p>
            <h2
              id={`${formId}-title`}
              className="mb-2 font-display text-3xl font-bold uppercase tracking-tight"
            >
              Get in Touch
            </h2>
            <p
              id={`${formId}-desc`}
              className="mb-8 font-body text-sm leading-relaxed text-textMuted"
            >
              The site is temporarily limited. Leave your details and we&apos;ll
              reach out.
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setError("");
                setIsSubmitting(true);

                const form = e.target as HTMLFormElement;
                const data = new FormData(form);

                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: data.get("name"),
                      email: data.get("email"),
                      phone: data.get("phone"),
                      message: data.get("message"),
                    }),
                  });

                  if (!res.ok) {
                    throw new Error("Request failed");
                  }

                  setIsSubmitted(true);
                } catch {
                  setError("Something went wrong. Please try again.");
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="flex flex-col gap-6"
            >
              {[
                { name: "name", placeholder: "Name", type: "text", required: true },
                {
                  name: "email",
                  placeholder: "Email",
                  type: "email",
                  required: true,
                },
                {
                  name: "phone",
                  placeholder: "Phone Number (optional)",
                  type: "tel",
                  required: false,
                },
              ].map((field) => (
                <input
                  key={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  autoComplete={
                    field.name === "name"
                      ? "name"
                      : field.name === "email"
                        ? "email"
                        : "tel"
                  }
                  className="form-line-input"
                />
              ))}

              <textarea
                name="message"
                placeholder="How can we help?"
                required
                rows={4}
                className="form-line-input min-h-[80px] resize-none"
              />

              {error ? (
                <p className="font-body text-sm text-red-400" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-line mt-2 w-fit disabled:opacity-50"
              >
                <span>{isSubmitting ? "Sending…" : "Send message"}</span>
                <span className="btn-line-arrow" aria-hidden="true">
                  <span className="btn-line-arrow-inner">→</span>
                </span>
              </button>
            </form>
          </>
        ) : (
          <div className="py-8">
            <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-brandBlue">
              Received
            </p>
            <h2
              id={`${formId}-title`}
              className="mb-3 font-display text-3xl font-bold uppercase tracking-tight"
            >
              Got it!
            </h2>
            <p
              id={`${formId}-desc`}
              className="font-body text-sm text-textMuted"
            >
              Our team will reach out to you shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
