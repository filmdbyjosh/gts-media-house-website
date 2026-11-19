"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import GetInTouchForm from "@/components/GetInTouchForm";
import { CONNECT_OPEN_EVENT } from "@/lib/connect-open";
import { easeOut, motionDurations } from "@/lib/motion";
import styles from "./ConnectModal.module.css";

export default function ConnectModal() {
  const titleId = useId();
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    const openModal = () => {
      setFormKey((key) => key + 1);
      setOpen(true);
    };

    const fromHash = () => {
      if (window.location.hash === "#connect") openModal();
    };

    fromHash();
    window.addEventListener(CONNECT_OPEN_EVENT, openModal);
    window.addEventListener("hashchange", fromHash);
    return () => {
      window.removeEventListener(CONNECT_OPEN_EVENT, openModal);
      window.removeEventListener("hashchange", fromHash);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    if (window.location.hash === "#connect") {
      history.replaceState(null, "", window.location.pathname);
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className={styles.root}
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
            className={styles.backdrop}
            aria-label="Close"
            onClick={close}
          />
          <motion.div
            className={styles.panel}
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: 10 }}
            transition={{ duration: motionDurations.ui, ease: easeOut }}
          >
            <div className={styles.head}>
              <h2 id={titleId} className={styles.title}>
                Let’s connect
              </h2>
              <button
                type="button"
                className={styles.close}
                onClick={close}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <p className={styles.lead}>
              Tell us about your project and what you’re looking for. We’ll get
              back to you with a free quote.
            </p>
            <GetInTouchForm key={formKey} />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
