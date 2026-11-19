"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { easeOut, motionDurations } from "@/lib/motion";
import {
  addonPriceLabel,
  computeBookingTotals,
  formatUsd,
  getAddonQty,
  summarizeSelections,
  videoBookingConfig,
  type AddonOption,
  type BookingConfig,
  type BookingSelections,
  type EditLengthId,
  type PersonalServiceId,
} from "@/lib/booking";
import {
  addonIcon,
  BothIcon,
  LongFormIcon,
  ShortFormIcon,
  vibeIcon,  personalServiceIcon,
} from "@/components/booking/BookingIcons";
import styles from "./VideoBookingFlow.module.css";

type Step =
  | "vibe"
  | "personalService"
  | "personalNext"
  | "length"
  | "extras"
  | "info"
  | "summary"
  | "done";

const COMMERCIAL_STEPS: Step[] = ["vibe", "length", "extras", "info", "summary"];
const PERSONAL_STEPS: Step[] = ["vibe", "personalService", "personalNext"];

function stepsFor(vibe: string | null): Step[] {
  return vibe === "personal" ? PERSONAL_STEPS : COMMERCIAL_STEPS;
}

const ADVANCE_MS = 220;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

function isValidEmail(value: string) {
  return EMAIL_RE.test(value.trim());
}

function phoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

function isValidPhone(value: string) {
  const digits = phoneDigits(value);
  if (digits.length === 10) return true;
  if (digits.length === 11 && digits.startsWith("1")) return true;
  return false;
}

type FieldStatus = "idle" | "invalid" | "valid";

function emailStatus(value: string, touched: boolean): FieldStatus {
  const trimmed = value.trim();
  if (!trimmed) return touched ? "invalid" : "idle";
  if (isValidEmail(trimmed)) return "valid";
  if (touched || trimmed.includes("@") || trimmed.length >= 8) return "invalid";
  return "idle";
}

function phoneStatus(value: string, touched: boolean): FieldStatus {
  const trimmed = value.trim();
  const digits = phoneDigits(trimmed);
  if (!trimmed) return touched ? "invalid" : "idle";
  if (isValidPhone(trimmed)) return "valid";
  if (touched || digits.length >= 10) return "invalid";
  return "idle";
}

const emptySelections = (): BookingSelections => ({
  editLength: null,
  vibe: null,
  personalService: null,
  notes: "",
  addonQty: {},
  name: "",
  email: "",
  phone: "",
  footageLink: "",
});

type VideoBookingFlowProps = {
  config?: BookingConfig;
  className?: string;
};

export default function VideoBookingFlow({
  config = videoBookingConfig,
  className = "",
}: VideoBookingFlowProps) {
  const formId = useId();
  const reducedMotion = useReducedMotion();
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hoveredVibe, setHoveredVibe] = useState<string | null>(null);
  const [hoveredPersonalService, setHoveredPersonalService] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("vibe");
  const [s, setS] = useState<BookingSelections>(emptySelections);
  const [error, setError] = useState("");
  const [advancing, setAdvancing] = useState(false);
  const [reviewedSelections, setReviewedSelections] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [footagePublic, setFootagePublic] = useState(false);
  const [infoAttempted, setInfoAttempted] = useState(false);

  const totals = computeBookingTotals(config, s);
  const summary = summarizeSelections(config, s);
  const emailField = emailStatus(s.email, emailTouched);
  const phoneField = phoneStatus(s.phone, phoneTouched);
  const activeSteps = stepsFor(s.vibe);
  const stepIndex = step === "done" ? activeSteps.length : activeSteps.indexOf(step);
  const progressPct =
    step === "done"
      ? 100
      : Math.round(((Math.max(stepIndex, 0) + 1) / (activeSteps.length + 1)) * 100);

  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: motionDurations.ui * 0.7, ease: easeOut };

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  const go = (next: Step) => {
    setError("");
    setAdvancing(false);
    setStep(next);
  };

  const goBack = () => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
    setAdvancing(false);
    setError("");
    const path = stepsFor(s.vibe);
    const i = path.indexOf(step);
    if (i > 0) {
      const prev = path[i - 1];
      if (prev === "vibe") {
        setS((curr) => ({ ...curr, personalService: null }));
      }
      setStep(prev);
    }
  };

  const reset = () => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
    setS(emptySelections());
    setStep("vibe");
    setHoveredVibe(null);
    setHoveredPersonalService(null);
    setError("");
    setAdvancing(false);
    setReviewedSelections(false);
    setAgreedTerms(false);
    setEmailTouched(false);
    setPhoneTouched(false);
    setFootagePublic(false);
    setInfoAttempted(false);
  };

  const pickVibe = (id: string) => {
    if (advancing) return;
    setError("");
    setS((prev) => ({
      ...prev,
      vibe: id,
      personalService: id === "personal" ? prev.personalService : null,
    }));
    setAdvancing(true);
    const delay = reducedMotion ? 0 : ADVANCE_MS;
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => {
      advanceTimer.current = null;
      go(id === "personal" ? "personalService" : "length");
    }, delay);
  };

  const pickPersonalService = (id: PersonalServiceId) => {
    if (advancing) return;
    setError("");
    setS((prev) => ({ ...prev, personalService: id }));
    setAdvancing(true);
    const delay = reducedMotion ? 0 : ADVANCE_MS;
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => {
      advanceTimer.current = null;
      go("personalNext");
    }, delay);
  };

  const pickLength = (id: EditLengthId) => {
    if (advancing) return;
    setError("");
    setS((prev) => ({ ...prev, editLength: id }));
    setAdvancing(true);

    const delay = reducedMotion ? 0 : ADVANCE_MS;
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => {
      advanceTimer.current = null;
      go("extras");
    }, delay);
  };

  const tryAdvanceFromExtras = () => {
    go("info");
  };

  const toggleAddon = (addon: AddonOption) => {
    if (addon.kind === "quantity") {
      setS((prev) => {
        const current = getAddonQty(prev, addon.id);
        return {
          ...prev,
          addonQty: {
            ...prev.addonQty,
            [addon.id]: current > 0 ? 0 : 1,
          },
        };
      });
      return;
    }

    setS((prev) => ({
      ...prev,
      addonQty: {
        ...prev.addonQty,
        [addon.id]: getAddonQty(prev, addon.id) > 0 ? 0 : 1,
      },
    }));
  };

  const bumpAddon = (addon: AddonOption, delta: number) => {
    const max = addon.maxQty ?? 10;
    setS((prev) => {
      const next = Math.min(max, Math.max(0, getAddonQty(prev, addon.id) + delta));
      return {
        ...prev,
        addonQty: { ...prev.addonQty, [addon.id]: next },
      };
    });
  };

  const infoMisses = [
    !s.name.trim() ? "Full name" : null,
    !isValidEmail(s.email) ? "Email" : null,
    !isValidPhone(s.phone) ? "Phone number" : null,
    !s.footageLink.trim() ? "Footage link" : null,
    !footagePublic ? "Public share confirmation" : null,
  ].filter((item): item is string => item !== null);

  const tryAdvanceFromInfo = () => {
    setEmailTouched(true);
    setPhoneTouched(true);
    setInfoAttempted(true);

    if (infoMisses.length > 0) {
      setError("");
      return;
    }
    go("summary");
  };

  const confirmAndBook = () => {
    if (!reviewedSelections || !agreedTerms) {
      setError("Please confirm both checkboxes before submitting.");
      return;
    }
    go("done");
  };

  const showChrome = step !== "done" && step !== "vibe";

  return (
    <div className={`${styles.shell} ${className}`.trim()}>
      <div className={styles.main}>
        {showChrome ? (
          <>
            <div className={styles.progressRow}>
              <div className={styles.progressLeft}>
                <button
                  type="button"
                  className={styles.backBtn}
                  onClick={goBack}
                >
                  ← Back
                </button>
              </div>
              <p className={styles.progressLabel}>
                {Math.min(stepIndex + 1, activeSteps.length)} / {activeSteps.length}
              </p>
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
          {step === "vibe" && (
            <motion.div
              key="vibe"
              className={styles.stack}
              initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
              transition={transition}
            >
              <div className={styles.categoryGrid}>
                {config.vibes.map((option) => {
                  const active = s.vibe === option.id;
                  const Icon = vibeIcon(option.id);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={`${styles.tile} ${styles.categoryTile} ${
                        active ? styles.tileActive : ""
                      }`}
                      aria-label={
                        option.description
                          ? `${option.label}. ${option.description}`
                          : option.label
                      }
                      aria-pressed={active}
                      aria-describedby={
                        hoveredVibe === option.id
                          ? `${formId}-vibe-desc`
                          : undefined
                      }
                      disabled={advancing}
                      onMouseEnter={() => setHoveredVibe(option.id)}
                      onMouseLeave={() =>
                        setHoveredVibe((prev) =>
                          prev === option.id ? null : prev
                        )
                      }
                      onFocus={() => setHoveredVibe(option.id)}
                      onBlur={() =>
                        setHoveredVibe((prev) =>
                          prev === option.id ? null : prev
                        )
                      }
                      onClick={() => pickVibe(option.id)}
                    >
                      <Icon className={styles.tileIcon} />
                      <span className={styles.tileName}>{option.label}</span>
                    </button>
                  );
                })}
              </div>
              <p
                id={`${formId}-vibe-desc`}
                className={`${styles.categoryDesc} ${
                  hoveredVibe ? styles.categoryDescVisible : ""
                }`}
                aria-live="polite"
              >
                {hoveredVibe
                  ? config.vibes.find((option) => option.id === hoveredVibe)
                      ?.description ?? ""
                  : "\u00a0"}
              </p>
            </motion.div>
          )}


          {step === "personalService" && (
            <motion.div
              key="personalService"
              className={styles.stack}
              initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
              transition={transition}
            >
              <div className={styles.serviceGrid}>
                {config.personalServices.map((option) => {
                  const active = s.personalService === option.id;
                  const Icon = personalServiceIcon(option.id);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={`${styles.tile} ${styles.serviceTile} ${
                        active ? styles.tileActive : ""
                      }`}
                      aria-label={
                        option.description
                          ? `${option.label}. ${option.description}`
                          : option.label
                      }
                      aria-pressed={active}
                      aria-describedby={
                        hoveredPersonalService === option.id
                          ? `${formId}-service-desc`
                          : undefined
                      }
                      disabled={advancing}
                      onMouseEnter={() => setHoveredPersonalService(option.id)}
                      onMouseLeave={() =>
                        setHoveredPersonalService((prev) =>
                          prev === option.id ? null : prev
                        )
                      }
                      onFocus={() => setHoveredPersonalService(option.id)}
                      onBlur={() =>
                        setHoveredPersonalService((prev) =>
                          prev === option.id ? null : prev
                        )
                      }
                      onClick={() => pickPersonalService(option.id)}
                    >
                      <Icon className={styles.tileIcon} />
                      <span className={styles.tileName}>{option.label}</span>
                    </button>
                  );
                })}
              </div>
              <p
                id={`${formId}-service-desc`}
                className={`${styles.serviceDesc} ${
                  hoveredPersonalService ? styles.serviceDescVisible : ""
                }`}
                aria-live="polite"
              >
                {hoveredPersonalService
                  ? config.personalServices.find(
                      (option) => option.id === hoveredPersonalService
                    )?.description ?? ""
                  : "\u00a0"}
              </p>
            </motion.div>
          )}

          {step === "personalNext" && (
            <motion.div
              key="personalNext"
              className={styles.stack}
              initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
              transition={transition}
            >
              <header className={styles.header}>
                <h2 className={styles.title}>
                  {config.personalServices.find((o) => o.id === s.personalService)?.label ??
                    "Personal"}
                </h2>
                <p className={styles.hint}>
                  Next details for this option coming up.
                </p>
              </header>
            </motion.div>
          )}

          {step === "length" && (
            <motion.div
              key="length"
              className={styles.stack}
              initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
              transition={transition}
            >
              <header className={styles.header}>
                <h2 className={styles.title}>Choose your format</h2>
              </header>
              <div className={styles.formatGrid}>
                {config.lengths.map((option) => {
                  const active = s.editLength === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={`${styles.tile} ${styles.formatTile} ${
                        option.id === "both" ? styles.formatBoth : ""
                      } ${active ? styles.tileActive : ""}`}
                      aria-pressed={active}
                      disabled={advancing}
                      onClick={() => pickLength(option.id)}
                    >
                      <span className={styles.choiceIcon} aria-hidden="true">
                        {option.id === "short" ? (
                          <ShortFormIcon className={styles.shortIcon} />
                        ) : option.id === "long" ? (
                          <LongFormIcon className={styles.longIcon} />
                        ) : (
                          <BothIcon className={styles.longIcon} />
                        )}
                      </span>
                      <span className={styles.tileLabel}>{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === "extras" && (
            <motion.div
              key="extras"
              className={styles.stack}
              initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
              transition={transition}
            >
              <header className={styles.header}>
                <h2 className={styles.title}>Want any upgrades?</h2>
                <p className={styles.hint}>Optional. Skip this if you just need the cut.</p>
              </header>

              <div className={styles.section}>
                <ul className={styles.addonGrid}>
                  {config.addons.map((addon) => {
                    const qty = getAddonQty(s, addon.id);
                    const active = qty > 0;
                    const Icon = addonIcon(addon.id);
                    return (
                      <li key={addon.id}>
                        <div
                          className={`${styles.choiceCard} ${styles.choiceCardSm} ${
                            active ? styles.choiceCardActive : ""
                          }`}
                        >
                          <button
                            type="button"
                            className={styles.addonHit}
                            aria-pressed={active}
                            onClick={() => toggleAddon(addon)}
                          >
                            <span className={styles.choiceIcon} aria-hidden="true">
                              <Icon className={styles.vibeIcon} />
                            </span>
                            <span className={styles.choiceTitle}>{addon.label}</span>
                            <span className={styles.choiceDesc}>
                              +{addonPriceLabel(addon)}
                            </span>
                          </button>

                          {addon.kind === "quantity" && active ? (
                            <div className={styles.qtyControl}>
                              <button
                                type="button"
                                className={styles.qtyBtn}
                                aria-label={`Fewer ${addon.label}`}
                                disabled={qty <= 0}
                                onClick={() => bumpAddon(addon, -1)}
                              >
                                −
                              </button>
                              <span className={styles.qtyValue}>{qty}</span>
                              <button
                                type="button"
                                className={styles.qtyBtn}
                                aria-label={`More ${addon.label}`}
                                disabled={qty >= (addon.maxQty ?? 10)}
                                onClick={() => bumpAddon(addon, 1)}
                              >
                                +
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </li>
                    );
                  })}
                </ul>
                {config.addons
                  .filter((addon) => addon.note && getAddonQty(s, addon.id) > 0)
                  .map((addon) => (
                    <p key={`${addon.id}-note`} className={styles.addonNote}>
                      {addon.note}
                    </p>
                  ))}
              </div>

              <div>
                <label htmlFor={`${formId}-notes`} className={styles.label}>
                  Additional details you want to share?
                </label>
                <textarea
                  id={`${formId}-notes`}
                  className={styles.textarea}
                  rows={3}
                  placeholder="References, must-haves, brand notes — optional."
                  value={s.notes}
                  onChange={(e) =>
                    setS((prev) => ({ ...prev, notes: e.target.value }))
                  }
                />
              </div>

              <button
                type="button"
                className={styles.primaryBtn}
                onClick={tryAdvanceFromExtras}
              >
                Continue
              </button>
              {error ? <p className={styles.error}>{error}</p> : null}
            </motion.div>
          )}

          {step === "info" && (
            <motion.div
              key="info"
              className={styles.stack}
              initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
              transition={transition}
            >
              <header className={styles.header}>
                <h2 className={styles.title}>A few details about you</h2>
              </header>

              <input
                type="text"
                className={`${styles.field} ${
                  infoAttempted && !s.name.trim() ? styles.fieldMissed : ""
                }`}
                placeholder="Full name"
                autoComplete="name"
                autoFocus
                value={s.name}
                onChange={(e) => {
                  setError("");
                  setS((prev) => ({ ...prev, name: e.target.value }));
                }}
              />
              {infoAttempted && !s.name.trim() ? (
                <p className={styles.fieldMissedNote}>Add your full name.</p>
              ) : null}
              <div>
                <input
                  type="email"
                  className={`${styles.field} ${
                    emailField === "valid"
                      ? styles.fieldValid
                      : emailField === "invalid" || (infoAttempted && !isValidEmail(s.email))
                        ? styles.fieldMissed
                        : ""
                  }`}
                  placeholder="Email address"
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={emailField === "invalid"}
                  value={s.email}
                  onChange={(e) => {
                    setError("");
                    setS((prev) => ({ ...prev, email: e.target.value }));
                  }}
                  onBlur={() => setEmailTouched(true)}
                />
                {emailField === "valid" ? (
                  <p className={styles.fieldOk}>Valid email</p>
                ) : infoAttempted && !isValidEmail(s.email) ? (
                  <p className={styles.fieldMissedNote}>Enter a valid email.</p>
                ) : emailField === "invalid" ? (
                  <p className={styles.fieldBad}>Enter a valid email</p>
                ) : null}
              </div>
              <div>
                <input
                  type="tel"
                  className={`${styles.field} ${
                    phoneField === "valid"
                      ? styles.fieldValid
                      : phoneField === "invalid" || (infoAttempted && !isValidPhone(s.phone))
                        ? styles.fieldMissed
                        : ""
                  }`}
                  placeholder="Phone number"
                  autoComplete="tel"
                  inputMode="tel"
                  aria-invalid={phoneField === "invalid"}
                  value={s.phone}
                  onChange={(e) => {
                    setError("");
                    setS((prev) => ({ ...prev, phone: e.target.value }));
                  }}
                  onBlur={() => setPhoneTouched(true)}
                />
                {phoneField === "valid" ? (
                  <p className={styles.fieldOk}>Valid phone number</p>
                ) : infoAttempted && !isValidPhone(s.phone) ? (
                  <p className={styles.fieldMissedNote}>Enter a valid phone number.</p>
                ) : phoneField === "invalid" ? (
                  <p className={styles.fieldBad}>Enter a valid phone number</p>
                ) : null}
              </div>

              <div className={styles.footageBlock}>
                <label htmlFor={`${formId}-footage`} className={styles.label}>
                  Footage link
                </label>
                <input
                  id={`${formId}-footage`}
                  type="url"
                  className={`${styles.field} ${
                    infoAttempted && !s.footageLink.trim() ? styles.fieldMissed : ""
                  }`}
                  required
                  placeholder="Google Drive, Dropbox, etc."
                  autoComplete="url"
                  value={s.footageLink}
                  onChange={(e) => {
                    setError("");
                    setS((prev) => ({ ...prev, footageLink: e.target.value }));
                  }}
                />
                {infoAttempted && !s.footageLink.trim() ? (
                  <p className={styles.fieldMissedNote}>Add your footage link.</p>
                ) : null}
                <label
                  className={`${styles.checkRow} ${
                    infoAttempted && !footagePublic ? styles.checkMissed : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    className={styles.checkBoxAlert}
                    required
                    checked={footagePublic}
                    onChange={(e) => {
                      setError("");
                      setFootagePublic(e.target.checked);
                    }}
                  />
                  <span>
                    Your link must be publicly shared so we can access your
                    footage. If it isn’t, editing will be delayed.
                  </span>
                </label>
                {infoAttempted && !footagePublic ? (
                  <p className={styles.fieldMissedNote}>
                    Confirm the link is public.
                  </p>
                ) : null}
              </div>

              <button
                type="button"
                className={styles.primaryBtn}
                onClick={tryAdvanceFromInfo}
              >
                Continue
              </button>
              {error ? <p className={styles.error}>{error}</p> : null}
            </motion.div>
          )}

          {step === "summary" && (
            <motion.div
              key="summary"
              className={styles.stack}
              initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
              transition={transition}
            >
              <header className={styles.header}>
                <h2 className={styles.title}>Review your request</h2>
                <p className={styles.hint}>Confirm everything looks right, then submit.</p>
              </header>

              <div className={styles.breakdown}>
                <div className={styles.breakdownMeta}>
                  <p>
                    <span>Edit</span>
                    {summary.lengthLabel}
                  </p>
                  <p>
                    <span>Looking for</span>
                    {summary.vibeLabel}
                  </p>
                  {summary.personalServiceLabel && summary.personalServiceLabel !== "—" ? (
                    <p>
                      <span>Service</span>
                      {summary.personalServiceLabel}
                    </p>
                  ) : null}
                  <p>
                    <span>Contact</span>
                    {summary.contact}
                  </p>
                  {s.notes.trim() ? (
                    <p>
                      <span>Notes</span>
                      {s.notes.trim()}
                    </p>
                  ) : null}
                  <p>
                    <span>Footage</span>
                    {s.footageLink.trim()}
                  </p>
                </div>

                <ul className={styles.breakdownLines}>
                  {totals.lineItems.map((item) => (
                    <li key={item.id}>
                      <span>
                        {item.label}
                        {item.detail ? <em>{item.detail}</em> : null}
                      </span>
                      <strong>
                        {item.amount > 0 ? formatUsd(item.amount) : ""}
                      </strong>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.totalBlock}>
                <span>Total</span>
                <strong>{formatUsd(totals.total)}</strong>
              </div>

              <div className={styles.termsBlock}>
                <p className={styles.termsTitle}>Terms and conditions</p>
                <label className={styles.checkRow}>
                  <input
                    type="checkbox"
                    checked={reviewedSelections}
                    onChange={(e) => {
                      setError("");
                      setReviewedSelections(e.target.checked);
                    }}
                  />
                  <span>
                    I have reviewed my project selections and confirm they are
                    correct.
                  </span>
                </label>
                <label className={styles.checkRow}>
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => {
                      setError("");
                      setAgreedTerms(e.target.checked);
                    }}
                  />
                  <span>
                    I have read and agree to the video editing terms &amp;
                    conditions.
                  </span>
                </label>
              </div>

              <button
                type="button"
                className={styles.primaryBtn}
                onClick={confirmAndBook}
              >
                Submit request
              </button>
              <p className={styles.stubNote}>
                We’ll follow up to confirm details and next steps.
              </p>
              {error ? <p className={styles.error}>{error}</p> : null}
            </motion.div>
          )}

          {step === "done" && (
            <motion.div
              key="done"
              className={styles.stack}
              initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
            >
              <header className={styles.header}>
                <h2 className={styles.title}>Request received</h2>
                <p className={styles.hint}>
                  Thanks — we got your request and will be in touch soon.
                </p>
              </header>
              <button type="button" className={styles.primaryBtn} onClick={reset}>
                Start over
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
