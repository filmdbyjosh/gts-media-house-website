"use client";

import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <main className="relative h-screen overflow-hidden bg-black text-white">
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[30%] h-[320px] w-[320px] rounded-full bg-white/10 blur-[120px]" />
        <div className="absolute right-[-8%] top-[20%] h-[360px] w-[360px] rounded-full bg-[#00F0FF]/18 blur-[140px]" />
        <div className="absolute bottom-[-12%] left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#00C4CC]/12 blur-[140px]" />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        {/* HERO VIDEO */}
        <section className="relative h-[28vh] w-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>

<<<<<<< HEAD
            <h1 className="text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
  Brand Development
  <br />
  & Marketing Systems
  <br />
  Built to Scale
</h1>

=======
          <div className="absolute inset-0 bg-black/10" />

          {/* Fade into black */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-black" />
        </section>
>>>>>>> abf65ca (full site redesign + video hero + metadata update)

        {/* MAIN CONTENT */}
        <section className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          {/* SERVICES */}
          <div className="flex w-full max-w-6xl items-center justify-between gap-6 pb-12">
            <h2 className="text-sm font-light uppercase tracking-[0.35em] text-white/90 sm:text-base lg:text-xl">
              Brand Design
            </h2>
            <h2 className="text-sm font-light uppercase tracking-[0.35em] text-white/90 sm:text-base lg:text-xl">
              Video Creation
            </h2>
            <h2 className="text-sm font-light uppercase tracking-[0.35em] text-white/90 sm:text-base lg:text-xl">
              Digital Marketing
            </h2>
          </div>

          {/* LOGO */}
          <img
            src="/gts-main-logo.png"
            alt="GTS Media House"
            className="w-72 max-w-full pb-10 sm:w-80 lg:w-[30rem]"
          />

          {/* CONTACT */}
          <div className="flex flex-col items-center">
            <h3 className="pb-3 text-xl font-light uppercase tracking-[0.28em] text-white/85 sm:text-2xl">
              Get in Touch
            </h3>

            <div className="mb-5 h-px w-20 bg-gradient-to-r from-transparent via-[#00F0FF]/70 to-transparent" />

            <button
              onClick={() => {
                setIsOpen(true);
                setIsSubmitted(false);
              }}
              className="rounded-full border border-white/15 bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition duration-300 hover:scale-[1.02] hover:bg-[#00F0FF]"
            >
              Email Us
            </button>

            <div className="mt-5 flex items-center gap-3 text-sm tracking-[0.18em] text-white/75 sm:text-base">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M2.25 4.5A2.25 2.25 0 0 1 4.5 2.25h2.1c.966 0 1.8.691 1.98 1.64l.544 2.892a2.25 2.25 0 0 1-.648 2.023l-1.12 1.12a12.042 12.042 0 0 0 5.719 5.719l1.12-1.12a2.25 2.25 0 0 1 2.023-.648l2.892.544a2.025 2.025 0 0 1 1.64 1.98v2.1a2.25 2.25 0 0 1-2.25 2.25h-.75C9.29 21.75 2.25 14.71 2.25 6.75V6a1.5 1.5 0 0 1 0-1.5Z" />
              </svg>
              <span>520-667-3076</span>
            </div>
          </div>
        </section>
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-black p-6 shadow-2xl">
            {!isSubmitted ? (
              <>
                <h3 className="mb-4 text-xl font-semibold">Start a Project</h3>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const data = new FormData(form);

                    await fetch("/api/contact", {
                      method: "POST",
                      body: JSON.stringify({
                        name: data.get("name"),
                        email: data.get("email"),
                        brand: data.get("brand"),
                        website: data.get("website"),
                        details: data.get("details"),
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
                    placeholder="Email"
                    required
                    className="rounded bg-white/10 p-3 outline-none"
                  />
                  <input
                    name="brand"
                    placeholder="Brand"
                    className="rounded bg-white/10 p-3 outline-none"
                  />
                  <input
                    name="website"
                    placeholder="Website"
                    className="rounded bg-white/10 p-3 outline-none"
                  />
                  <textarea
                    name="details"
                    placeholder="Project details"
                    className="min-h-[120px] rounded bg-white/10 p-3 outline-none"
                  />

                  <button className="rounded bg-[#00F0FF] py-3 font-semibold text-black">
                    Submit
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <h3 className="mb-2 text-xl font-semibold">Got it</h3>
                <p className="text-white/70">We’ll be in touch soon.</p>
              </div>
            )}

            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 text-sm text-white/60"
            >
              Close
            </button>
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