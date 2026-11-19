"use client";

import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { easeOut, motionDurations } from "@/lib/motion";
import {
  clampExtraTimeSlots,
  computeCheckoutTotals,
  formatDuration,
  formatUsd,
} from "@/lib/checkout";
import type {
  CheckoutCustomer,
  CheckoutSchedule,
  ServiceCheckoutConfig,
} from "@/lib/checkout/types";
import styles from "./ServiceCheckoutFlow.module.css";

type Step = "configure" | "schedule" | "details" | "review" | "done";

const STEPS: Step[] = ["configure", "schedule", "details", "review"];

type ServiceCheckoutFlowProps = {
  config: ServiceCheckoutConfig;
  className?: string;
};

export default function ServiceCheckoutFlow({
  config,
  className = "",
}: ServiceCheckoutFlowProps) {
  const formId = useId();
  const reducedMotion = useReducedMotion();

  const [step, setStep] = useState<Step>("configure");
  const [addonIds, setAddonIds] = useState<string[]>([]);
  const [extraTimeSlots, setExtraTimeSlots] = useState(0);
  const [schedule, setSchedule] = useState<CheckoutSchedule>({
    date: "",
    time: "",
  });
  const [customer, setCustomer] = useState<CheckoutCustomer>({
    name: "",
    email: "",
    phone: "",
    location: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const totals = useMemo(
    () => computeCheckoutTotals(config, { addonIds, extraTimeSlots }),
    [config, addonIds, extraTimeSlots]
  );

  const stepIndex = step === "done" ? STEPS.length : STEPS.indexOf(step);
  const progressPct =
    step === "done"
      ? 100
      : Math.round(((stepIndex + 1) / (STEPS.length + 1)) * 100);

  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: motionDurations.ui * 0.7, ease: easeOut };

  const toggleAddon = (id: string) => {
    setAddonIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const setSlots = (next: number) => {
    setExtraTimeSlots(
      clampExtraTimeSlots(next, config.extraTime.maxSlots)
    );
  };

  const goBack = () => {
    setError("");
    if (step === "schedule") setStep("configure");
    else if (step === "details") setStep("schedule");
    else if (step === "review") setStep("details");
  };

  const reset = () => {
    setStep("configure");
    setAddonIds([]);
    setExtraTimeSlots(0);
    setSchedule({ date: "", time: "" });
    setCustomer({ name: "", email: "", phone: "", location: "" });
    setError("");
    setSubmitting(false);
  };

  const continueFromConfigure = () => {
    setError("");
    setStep("schedule");
  };

  const continueFromSchedule = () => {
    if (!schedule.date || !schedule.time) {
      setError("Choose a shoot date and start time to continue.");
      return;
    }
    setError("");
    setStep("details");
  };

  const continueFromDetails = () => {
    if (!customer.name.trim() || !customer.email.trim() || !customer.phone.trim()) {
      setError("Name, email, and phone are required.");
      return;
    }
    setError("");
    setStep("review");
  };

  /** Stub until Square Payments + Bookings are wired. */
  const continueToPayment = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError("");
    try {
      // Placeholder: later create Square booking hold + payment here.
      await new Promise((r) => setTimeout(r, 650));
      setStep("done");
    } catch {
      setError("Payment is not connected yet. Try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const showChrome = step !== "done";
  const extraMinutes = extraTimeSlots * config.extraTime.minutesPerSlot;

  return (
    <div className={`${styles.shell} ${className}`.trim()}>
      <div className={styles.main}>
        {showChrome ? (
          <>
            <div className={styles.progressRow}>
              <p className={styles.progressLabel}>
                Step {stepIndex + 1} of {STEPS.length}
              </p>
              {step !== "configure" ? (
                <button type="button" className={styles.backBtn} onClick={goBack}>
                  Back
                </button>
              ) : null}
            </div>
            <div className={styles.progressTrack} aria-hidden="true">
              <div
                className={styles.progressFill}
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </>
        ) : null}

        <AnimatePresence mode="wait">
          {step === "configure" && (
            <motion.div
              key="configure"
              className={styles.stack}
              initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
              transition={transition}
            >
              <div>
                <p className={styles.stepEyebrow}>Your package</p>
                <h2 className={styles.stepTitle}>{config.name}</h2>
                <p className={styles.stepHint}>{config.description}</p>
              </div>

              <div className={styles.baseCard}>
                <div>
                  <p className={styles.baseLabel}>Base shoot</p>
                  <p className={styles.baseMeta}>
                    {formatDuration(config.baseDurationMinutes)} included
                  </p>
                </div>
                <p className={styles.basePrice}>{formatUsd(config.basePrice)}</p>
              </div>

              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Optional add-ons</legend>
                <ul className={styles.addonList}>
                  {config.addons.map((addon) => {
                    const checked = addonIds.includes(addon.id);
                    return (
                      <li key={addon.id}>
                        <label
                          className={`${styles.addon} ${
                            checked ? styles.addonChecked : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleAddon(addon.id)}
                            className={styles.checkbox}
                          />
                          <span className={styles.addonCopy}>
                            <span className={styles.addonLabel}>{addon.label}</span>
                            <span className={styles.addonDesc}>
                              {addon.description}
                            </span>
                          </span>
                          <span className={styles.addonPrice}>
                            +{formatUsd(addon.price)}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </fieldset>

              <div className={styles.timeBlock}>
                <div className={styles.timeHeader}>
                  <div>
                    <p className={styles.legend}>{config.extraTime.label}</p>
                    <p className={styles.timeDesc}>
                      {config.extraTime.description}
                    </p>
                  </div>
                  <p className={styles.timeUnitPrice}>
                    {formatUsd(config.extraTime.pricePerSlot)} /{" "}
                    {config.extraTime.minutesPerSlot} min
                  </p>
                </div>

                <div className={styles.slotControls}>
                  <button
                    type="button"
                    className={styles.slotBtn}
                    onClick={() => setSlots(extraTimeSlots - 1)}
                    disabled={extraTimeSlots <= 0}
                    aria-label="Remove 20 minutes"
                  >
                    −
                  </button>
                  <div className={styles.slotValue} aria-live="polite">
                    <span className={styles.slotCount}>{extraTimeSlots}</span>
                    <span className={styles.slotMeta}>
                      {extraTimeSlots === 0
                        ? "No extra time"
                        : `+${extraMinutes} min`}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={styles.slotBtn}
                    onClick={() => setSlots(extraTimeSlots + 1)}
                    disabled={extraTimeSlots >= config.extraTime.maxSlots}
                    aria-label="Add 20 minutes"
                  >
                    +
                  </button>
                </div>

                <div className={styles.slotTrack} role="group" aria-label="Extra time slots">
                  {Array.from({ length: config.extraTime.maxSlots }, (_, i) => {
                    const n = i + 1;
                    const active = extraTimeSlots >= n;
                    return (
                      <button
                        key={n}
                        type="button"
                        className={`${styles.slotChip} ${
                          active ? styles.slotChipActive : ""
                        }`}
                        onClick={() => setSlots(n === extraTimeSlots ? 0 : n)}
                        aria-pressed={active}
                      >
                        +{n * config.extraTime.minutesPerSlot}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                className={styles.primaryBtn}
                onClick={continueFromConfigure}
              >
                Continue — {formatUsd(totals.total)}
              </button>
            </motion.div>
          )}

          {step === "schedule" && (
            <motion.div
              key="schedule"
              className={styles.stack}
              initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
              transition={transition}
            >
              <div>
                <p className={styles.stepEyebrow}>Schedule</p>
                <h2 className={styles.stepTitle}>Pick shoot date & time</h2>
                <p className={styles.stepHint}>
                  Local placeholder for now — Square availability sync comes later.
                  Total shoot length: {formatDuration(totals.durationMinutes)}.
                </p>
              </div>

              <div>
                <label htmlFor={`${formId}-date`} className={styles.label}>
                  Shoot date
                </label>
                <input
                  id={`${formId}-date`}
                  type="date"
                  required
                  value={schedule.date}
                  onChange={(e) =>
                    setSchedule((s) => ({ ...s, date: e.target.value }))
                  }
                  className={styles.field}
                />
              </div>

              <div>
                <label htmlFor={`${formId}-time`} className={styles.label}>
                  Start time
                </label>
                <input
                  id={`${formId}-time`}
                  type="time"
                  required
                  value={schedule.time}
                  onChange={(e) =>
                    setSchedule((s) => ({ ...s, time: e.target.value }))
                  }
                  className={styles.field}
                />
              </div>

              <p className={styles.softFoot}>
                Service area: {config.serviceAreaLabel}.
              </p>

              <button
                type="button"
                className={styles.primaryBtn}
                onClick={continueFromSchedule}
              >
                Continue
              </button>
              {error ? <p className={styles.error}>{error}</p> : null}
            </motion.div>
          )}

          {step === "details" && (
            <motion.div
              key="details"
              className={styles.stack}
              initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
              transition={transition}
            >
              <div>
                <p className={styles.stepEyebrow}>Contact</p>
                <h2 className={styles.stepTitle}>Your details</h2>
                <p className={styles.stepHint}>
                  We’ll use this for confirmation once payments are live.
                </p>
              </div>

              <input
                type="text"
                placeholder="Name"
                required
                value={customer.name}
                onChange={(e) =>
                  setCustomer((c) => ({ ...c, name: e.target.value }))
                }
                className={styles.field}
                autoComplete="name"
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={customer.email}
                onChange={(e) =>
                  setCustomer((c) => ({ ...c, email: e.target.value }))
                }
                className={styles.field}
                autoComplete="email"
              />
              <input
                type="tel"
                placeholder="Phone"
                required
                value={customer.phone}
                onChange={(e) =>
                  setCustomer((c) => ({ ...c, phone: e.target.value }))
                }
                className={styles.field}
                autoComplete="tel"
              />
              <input
                type="text"
                placeholder="Property / job site (optional)"
                value={customer.location}
                onChange={(e) =>
                  setCustomer((c) => ({ ...c, location: e.target.value }))
                }
                className={styles.field}
              />

              <button
                type="button"
                className={styles.primaryBtn}
                onClick={continueFromDetails}
              >
                Review order
              </button>
              {error ? <p className={styles.error}>{error}</p> : null}
            </motion.div>
          )}

          {step === "review" && (
            <motion.div
              key="review"
              className={styles.stack}
              initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
              transition={transition}
            >
              <div>
                <p className={styles.stepEyebrow}>Review</p>
                <h2 className={styles.stepTitle}>Confirm before payment</h2>
                <p className={styles.stepHint}>
                  Check the package and schedule. Payment is stubbed for this pass.
                </p>
              </div>

              <dl className={styles.reviewMeta}>
                <div>
                  <dt>When</dt>
                  <dd>
                    {schedule.date} · {schedule.time} ·{" "}
                    {formatDuration(totals.durationMinutes)}
                  </dd>
                </div>
                <div>
                  <dt>Contact</dt>
                  <dd>
                    {customer.name}
                    <br />
                    {customer.email} · {customer.phone}
                    {customer.location.trim() ? (
                      <>
                        <br />
                        {customer.location.trim()}
                      </>
                    ) : null}
                  </dd>
                </div>
              </dl>

              <ul className={styles.lineList}>
                {totals.lineItems.map((item) => (
                  <li key={item.id} className={styles.lineItem}>
                    <span>
                      <span className={styles.lineLabel}>{item.label}</span>
                      {item.detail ? (
                        <span className={styles.lineDetail}>{item.detail}</span>
                      ) : null}
                    </span>
                    <span className={styles.lineAmount}>
                      {formatUsd(item.amount)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className={styles.totalRow}>
                <span>Total due</span>
                <strong>{formatUsd(totals.total)}</strong>
              </div>

              <button
                type="button"
                className={styles.primaryBtn}
                onClick={continueToPayment}
                disabled={submitting}
              >
                {submitting ? "Preparing…" : "Continue to payment"}
              </button>
              <p className={styles.stubNote}>
                Square payment & booking hold not connected yet — this completes
                the UI flow only.
              </p>
              {error ? <p className={styles.error}>{error}</p> : null}
            </motion.div>
          )}

          {step === "done" && (
            <motion.div
              key="done"
              className={styles.stack}
              initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
            >
              <p className={styles.stepEyebrow}>Checkout stub complete</p>
              <h2 className={styles.stepTitle}>Order summary looks good</h2>
              <p className={styles.stepHint}>
                You would now be charged {formatUsd(totals.total)} and the{" "}
                {formatDuration(totals.durationMinutes)} shoot on {schedule.date}{" "}
                at {schedule.time} would be held. Square wiring comes next.
              </p>
              <button type="button" className={styles.primaryBtn} onClick={reset}>
                Start over
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step !== "done" ? (
        <aside className={styles.summary} aria-label="Order summary">
          <p className={styles.summaryEyebrow}>Order summary</p>
          <ul className={styles.lineList}>
            {totals.lineItems.map((item) => (
              <li key={item.id} className={styles.lineItem}>
                <span>
                  <span className={styles.lineLabel}>{item.label}</span>
                  {item.detail ? (
                    <span className={styles.lineDetail}>{item.detail}</span>
                  ) : null}
                </span>
                <span className={styles.lineAmount}>{formatUsd(item.amount)}</span>
              </li>
            ))}
          </ul>
          <div className={styles.summaryFooter}>
            <div className={styles.totalRow}>
              <span>Total</span>
              <strong>{formatUsd(totals.total)}</strong>
            </div>
            <p className={styles.summaryDuration}>
              Shoot length: {formatDuration(totals.durationMinutes)}
            </p>
          </div>
        </aside>
      ) : null}

      {step !== "done" ? (
        <div className={styles.mobileBar} aria-hidden={false}>
          <div>
            <p className={styles.mobileTotal}>{formatUsd(totals.total)}</p>
            <p className={styles.mobileMeta}>
              {formatDuration(totals.durationMinutes)}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
