"use client";

import { useState } from "react";
import styles from "./GrowthPlanForm.module.css";

type Status = "idle" | "sending" | "sent" | "error";

export default function GrowthPlanForm() {
  const [status, setStatus] = useState<Status>("idle");

  if (status === "sent") {
    return (
      <div className={styles.card} role="status">
        <p className={styles.thanksTitle}>Message received</p>
        <p className={styles.thanksBody}>We&apos;ll be in touch.</p>
      </div>
    );
  }

  return (
    <form
      className={styles.card}
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);

        setStatus("sending");

        try {
          const res = await fetch("/api/growth-plan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: data.get("name"),
              business: data.get("business"),
              web: data.get("web"),
              email: data.get("email"),
              phone: data.get("phone"),
            }),
          });

          if (!res.ok) throw new Error("Request failed");
          setStatus("sent");
        } catch {
          setStatus("error");
        }
      }}
    >
      <label className={styles.field}>
        <span>Full Name</span>
        <input id="apply-name" name="name" type="text" autoComplete="name" required />
      </label>
      <label className={styles.field}>
        <span>Business Name</span>
        <input name="business" type="text" autoComplete="organization" required />
      </label>
      <label className={styles.field}>
        <span>Website or Instagram</span>
        <input name="web" type="text" autoComplete="url" required />
      </label>
      <label className={styles.field}>
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label className={styles.field}>
        <span>Phone Number</span>
        <input name="phone" type="tel" autoComplete="tel" required />
      </label>

      <button className={`${styles.submit} apply-btn`} type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Connect with us"}
      </button>
      {status === "error" ? (
        <p className={styles.error} role="alert">
          Something went wrong. Please try again.
        </p>
      ) : null}
    </form>
  );
}
