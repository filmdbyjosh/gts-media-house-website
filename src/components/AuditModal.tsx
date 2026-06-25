"use client";

import { useEffect, useState } from "react";

type AuditModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function AuditModal({ open, onClose }: AuditModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referralSource, setReferralSource] = useState("");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleClose = () => {
    onClose();
    setReferralSource("");
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
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto border border-white/10 bg-brandBg p-8 md:p-10"
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
              Free consultation
            </p>
            <h2 className="mb-2 pr-8 font-display text-3xl font-bold uppercase tracking-tight">
              Claim Your Free Marketing Audit
            </h2>
            <p className="mb-8 font-body text-sm leading-relaxed text-textMuted">
              We&apos;ll review your ads, funnel, and tracking — then show you
              exactly where to invest next.
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const data = new FormData(form);
                const source = data.get("referralSource") as string;
                const referralOther = data.get("referralOther") as string;

                if (source === "other" && !referralOther?.trim()) return;

                await fetch("/api/intake", {
                  method: "POST",
                  body: JSON.stringify({
                    name: data.get("name"),
                    email: data.get("email"),
                    phone: data.get("phone"),
                    brandOffer: data.get("brandOffer"),
                    website: data.get("website"),
                    referralSource: source,
                    referralOther: source === "other" ? referralOther : "",
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
                { name: "website", placeholder: "Website", type: "text" },
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
                name="brandOffer"
                placeholder="What does your brand offer?"
                required
                className="form-line-input min-h-[80px] resize-none"
              />

              <select
                name="referralSource"
                value={referralSource}
                onChange={(e) => setReferralSource(e.target.value)}
                required
                className="form-line-input"
              >
                <option value="" disabled className="bg-brandBg">
                  How did you hear about us?
                </option>
                <option value="facebook" className="bg-brandBg">
                  Facebook
                </option>
                <option value="instagram" className="bg-brandBg">
                  Instagram
                </option>
                <option value="google" className="bg-brandBg">
                  Google
                </option>
                <option value="other" className="bg-brandBg">
                  Other
                </option>
              </select>

              {referralSource === "other" && (
                <input
                  name="referralOther"
                  placeholder="Where did you hear about us?"
                  required
                  className="form-line-input"
                />
              )}

              <button
                type="submit"
                className="btn-line mt-2 w-fit"
              >
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
              Our team will reach out to you shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
