"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import GrowthPlanForm from "@/components/GrowthPlanForm";
import { CONNECT_OPEN_EVENT } from "@/lib/connect-open";
import { easeOut, motionDurations } from "@/lib/motion";

function connectHash() {
  if (window.location.hash === "#apply") {
    const base = `${window.location.pathname}${window.location.search}`;
    history.replaceState(null, "", `${base}#connect`);
  }
  return window.location.hash === "#connect";
}

export default function ApplicationModal() {
  const titleId = useId();
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const openRef = useRef(false);

  useEffect(() => {
    const openModal = () => {
      if (!openRef.current) setFormKey((key) => key + 1);
      openRef.current = true;
      setOpen(true);
    };

    const fromHash = () => {
      if (connectHash()) openModal();
    };

    const onPop = () => {
      if (connectHash()) {
        openRef.current = true;
        setOpen(true);
        return;
      }
      openRef.current = false;
      setOpen(false);
    };

    fromHash();
    window.addEventListener(CONNECT_OPEN_EVENT, openModal);
    window.addEventListener("hashchange", fromHash);
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener(CONNECT_OPEN_EVENT, openModal);
      window.removeEventListener("hashchange", fromHash);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      openRef.current = false;
      setOpen(false);
      if (connectHash()) {
        const base = `${window.location.pathname}${window.location.search}`;
        history.replaceState(null, "", base);
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => {
      document.getElementById("apply-name")?.focus();
    }, 40);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open, formKey]);

  const close = () => {
    openRef.current = false;
    setOpen(false);
    if (connectHash()) {
      const base = `${window.location.pathname}${window.location.search}`;
      history.replaceState(null, "", base);
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: motionDurations.ui * 0.7, ease: easeOut }}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-pointer border-0 bg-black/75 backdrop-blur-sm"
            aria-label="Close"
            onClick={close}
          />
          <motion.div
            className="relative z-10 max-h-[min(90svh,760px)] w-full max-w-[440px] overflow-y-auto rounded-2xl border border-white/10 bg-[#1c1917] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-7"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: 10 }}
            transition={{ duration: motionDurations.ui, ease: easeOut }}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2
                  id={titleId}
                  className="text-2xl font-bold tracking-tight text-white"
                >
                  Let&apos;s scale your content.
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-stone-300">
                  Connect with GTS Media House.
                </p>
              </div>
              <button
                type="button"
                className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-stone-400 transition-colors duration-200 hover:text-white"
                onClick={close}
                aria-label="Close"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <GrowthPlanForm key={formKey} />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
