"use client";

import { useEffect, useState } from "react";

type WebsiteModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function WebsiteModal({ open, onClose }: WebsiteModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleClose = () => {
    onClose();
    setTimeout(() => setIsSubmitted(false), 300);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-lg border border-white/10 bg-brandBg p-8 md:p-10"
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-6 top-6 text-2xl text-white/40 transition hover:text-white"
          aria-label="Close modal"
        >
          ×
        </button>

        {!isSubmitted ? (
          <>
            <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-brandBlue">
              Website inquiry
            </p>
            <h2 className="mb-2 pr-8 font-display text-3xl font-bold uppercase tracking-tight">
              Need a Website?
            </h2>
            <p className="mb-8 font-body text-sm leading-relaxed text-textMuted">
              Share your details and we&apos;ll reach out to talk about your
              project.
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const data = new FormData(form);

                await fetch("/api/website", {
                  method: "POST",
                  body: JSON.stringify({
                    name: data.get("name"),
                    email: data.get("email"),
                    phone: data.get("phone"),
                    message: data.get("message"),
                  }),
                });

                setIsSubmitted(true);
              }}
              className="flex flex-col gap-6"
            >
              {[
                { name: "name", placeholder: "Name", type: "text" },
                { name: "email", placeholder: "Email", type: "email" },
                { name: "phone", placeholder: "Phone Number", type: "tel" },
              ].map((field) => (
                <input
                  key={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  required
                  className="form-line-input"
                />
              ))}

              <textarea
                name="message"
                placeholder="Tell us about your project (optional)"
                className="form-line-input min-h-[80px] resize-none"
              />

              <button type="submit" className="btn-line mt-2 w-fit">
                <span>Submit</span>
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
            <h2 className="mb-3 font-display text-3xl font-bold uppercase tracking-tight">
              Got it!
            </h2>
            <p className="font-body text-sm text-textMuted">
              We&apos;ll be in touch soon about your website project.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
