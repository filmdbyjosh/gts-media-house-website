"use client";

import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referralSource, setReferralSource] = useState("");

  return (
    <main className="relative min-h-screen bg-black text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[30%] h-[320px] w-[320px] rounded-full bg-white/10 blur-[120px]" />
        <div className="absolute right-[-8%] top-[20%] h-[360px] w-[360px] rounded-full bg-brandBlue/18 blur-[140px]" />
        <div className="absolute bottom-[-12%] left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-brandBlue/12 blur-[140px]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <section className="relative h-[32vh] w-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-black" />
        </section>

        <section className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <div className="relative mb-8 w-screen py-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,182,255,0.35)_0%,rgba(56,182,255,0.12)_45%,transparent_75%)] blur-2xl" />
            <p
              className="relative w-full whitespace-nowrap px-4 text-center text-[clamp(0.55rem,2.35vw,1.875rem)] font-light uppercase tracking-[0.14em] text-white"
              style={{
                textShadow:
                  "0 0 24px rgba(56,182,255,0.55), 0 0 48px rgba(56,182,255,0.25)",
              }}
            >
              Marketing assets built to help e-commerce brands scale.
            </p>
          </div>

          <button
            onClick={() => {
              setIsOpen(true);
              setIsSubmitted(false);
              setReferralSource("");
            }}
            className="mb-10 rounded-full border border-white/15 bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition duration-300 hover:scale-[1.02] hover:bg-brandBlue"
          >
            Claim Your Free Marketing Audit
          </button>

          <img
            src="/gts-main-logo.png"
            alt="GTS Media House"
            className="w-72 max-w-full sm:w-80 lg:w-[30rem]"
          />

          <a
            href="https://share.google/mPXfcOUWZKjJcPpUy"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 flex max-w-md flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 transition duration-300 hover:border-brandBlue/40 hover:bg-white/[0.07]"
            style={{
              boxShadow: "0 0 32px rgba(56,182,255,0.12)",
            }}
          >
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  fill="#38B6FF"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                />
                <path
                  fill="#38B6FF"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#38B6FF"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#38B6FF"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <div className="flex items-center gap-1 text-[#FBBC04]" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium text-white">5.0</span>
            </div>

            <p className="text-sm tracking-[0.12em] text-white/70 uppercase">
              11 Google Reviews
            </p>

            <p className="text-sm leading-relaxed text-white/85 italic">
              &ldquo;They know ads! Our reach exploded and our business is booming!
              🚀&rdquo;
            </p>

            <span className="text-xs font-medium tracking-[0.14em] text-brandBlue uppercase transition group-hover:text-white">
              Read Our Google Reviews
            </span>
          </a>
        </section>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/20 bg-black p-6 shadow-[0_0_40px_rgba(255,255,255,0.25),0_0_80px_rgba(255,255,255,0.12)]">
            {!isSubmitted ? (
              <>
                <h3 className="mb-4 text-xl font-semibold">
                  Claim Your Free Marketing Audit
                </h3>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const data = new FormData(form);
                    const source = data.get("referralSource") as string;
                    const referralOther = data.get("referralOther") as string;

                    if (source === "other" && !referralOther?.trim()) {
                      return;
                    }

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
                  className="flex flex-col gap-4"
                >
                  <input
                    name="name"
                    placeholder="Name"
                    required
                    className="rounded bg-white/10 p-3 outline-none"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    className="rounded bg-white/10 p-3 outline-none"
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    required
                    className="rounded bg-white/10 p-3 outline-none"
                  />
                  <textarea
                    name="brandOffer"
                    placeholder="What does your brand offer?"
                    required
                    className="min-h-[100px] rounded bg-white/10 p-3 outline-none"
                  />
                  <input
                    name="website"
                    placeholder="Website"
                    required
                    className="rounded bg-white/10 p-3 outline-none"
                  />
                  <select
                    name="referralSource"
                    value={referralSource}
                    onChange={(e) => setReferralSource(e.target.value)}
                    required
                    className="rounded bg-white/10 p-3 outline-none"
                  >
                    <option value="" disabled>
                      How did you hear about us?
                    </option>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="google">Google</option>
                    <option value="other">Other</option>
                  </select>
                  {referralSource === "other" && (
                    <input
                      name="referralOther"
                      placeholder="Where did you hear about us?"
                      required
                      className="rounded bg-white/10 p-3 outline-none"
                    />
                  )}

                  <button className="rounded bg-brandBlue py-3 font-semibold text-black">
                    Submit
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <h3 className="mb-2 text-xl font-semibold">Got it!</h3>
                <p className="text-white/70">
                  Our team will reach out to you shortly.
                </p>
              </div>
            )}

            <button
              onClick={() => {
                setIsOpen(false);
                setReferralSource("");
              }}
              className="mt-6 text-sm text-white/60"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}