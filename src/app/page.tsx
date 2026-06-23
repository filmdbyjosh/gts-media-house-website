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