"use client";

import { FormEvent, useState } from "react";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      brand: formData.get("brand"),
      website: formData.get("website"),
      details: formData.get("details"),
    };

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to send");

      form.reset();
      setIsSubmitted(true);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,240,255,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(0,240,255,0.06),transparent_30%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:120px_120px]" />

        <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-10">
          <div className="max-w-2xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.28em] text-[#00F0FF]">
              GTS Media House
            </p>

            <h1 className="text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
  Brand Development
  <br />
  & Marketing Systems
  <br />
  Built to Scale
</h1>


            <div className="mt-10">
              <button
                onClick={() => {
                  setIsOpen(true);
                  setIsSubmitted(false);
                }}
                className="rounded-xl bg-[#00F0FF] px-7 py-4 text-base font-semibold text-black transition hover:scale-[1.02] hover:opacity-90"
              >
                Get Started
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[32px] bg-[#00F0FF]/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.55)]">
              <img
                src="/ads-dashboard.png"
                alt="Ad performance dashboard"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-[28px] border border-white/10 bg-[#0a0a0a] p-6 text-white shadow-[0_20px_100px_rgba(0,0,0,0.65)] sm:p-8">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 rounded-full border border-white/10 px-3 py-1 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              Close
            </button>

            {!isSubmitted ? (
              <>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#00F0FF]">
                  Get Started
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight">
                  Tell us about your brand
                </h2>

                <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                      Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-[#00F0FF]"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-[#00F0FF]"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                      Brand
                    </label>
                    <input
                      name="brand"
                      type="text"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-[#00F0FF]"
                      placeholder="Brand name"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                      Website or Instagram
                    </label>
                    <input
                      name="website"
                      type="text"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-[#00F0FF]"
                      placeholder="@brand or website"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                      Tell us about your brand
                    </label>
                    <textarea
                      name="details"
                      rows={6}
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-[#00F0FF]"
                      placeholder="What you sell, where you're at now, and what you're trying to grow"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="mt-2 w-full rounded-xl bg-[#00F0FF] px-6 py-4 text-base font-semibold text-black transition hover:opacity-90 disabled:opacity-60"
                  >
                    {isSending ? "Submitting..." : "Submit"}
                  </button>
                </form>
              </>
            ) : (
              <div className="py-10">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#00F0FF]">
                  Received
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight">
                  Thanks, we got it.
                </h2>
                <p className="mt-4 max-w-lg text-white/70">
                  Your intake was submitted successfully. We’ll review your brand
                  and follow up soon.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
       <div className="mt-24 flex justify-center">
        <a
          href="https://instagram.com/gtsmediahouse"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-30 hover:opacity-100 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5C18.54 4 20 5.46 20 7.75v8.5C20 18.54 18.54 20 16.25 20h-8.5C5.46 20 4 18.54 4 16.25v-8.5C4 5.46 5.46 4 7.75 4zm4.25 2.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zm0 2a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm5.25-.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"/>
          </svg>
        </a>
      </div>

    </main>
  );
}