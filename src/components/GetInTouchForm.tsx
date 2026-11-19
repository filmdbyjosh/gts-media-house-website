"use client";

import { useId, useState } from "react";
import styles from "./GetInTouchForm.module.css";

type PreferredContact = "email" | "phone";

type GetInTouchFormProps = {
  onSent?: () => void;
};

export default function GetInTouchForm({ onSent }: GetInTouchFormProps) {
  const preferId = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [preferred, setPreferred] = useState<PreferredContact | "">("");
  const [preferError, setPreferError] = useState(false);

  if (status === "sent") {
    return (
      <p className={styles.thanks}>
        Message sent. We’ll get back to you with a free quote.
      </p>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={async (event) => {
        event.preventDefault();
        if (!preferred) {
          setPreferError(true);
          return;
        }
        setPreferError(false);

        const form = event.currentTarget;
        const data = new FormData(form);
        const preferredContact = preferred === "email" ? "Email" : "Phone";

        setStatus("sending");

        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: data.get("name"),
              email: data.get("email"),
              phone: data.get("phone"),
              preferredContact,
              message: data.get("message"),
            }),
          });

          if (!res.ok) throw new Error("Request failed");
          setStatus("sent");
          onSent?.();
        } catch {
          setStatus("error");
        }
      }}
    >
      <input
        className={styles.field}
        name="name"
        type="text"
        placeholder="Name"
        autoComplete="name"
        required
      />
      <input
        className={styles.field}
        name="email"
        type="email"
        placeholder="Email"
        autoComplete="email"
        required
      />
      <input
        className={styles.field}
        name="phone"
        type="tel"
        placeholder="Phone number"
        autoComplete="tel"
        required
      />

      <fieldset className={styles.prefer}>
        <legend className={styles.preferLabel}>Preferred contact method</legend>
        <div className={styles.preferOptions}>
          <label className={styles.check} htmlFor={`${preferId}-email`}>
            <input
              id={`${preferId}-email`}
              type="radio"
              name="preferredContact"
              value="email"
              checked={preferred === "email"}
              onChange={() => {
                setPreferred("email");
                setPreferError(false);
              }}
              required
            />
            <span>Email</span>
          </label>
          <label className={styles.check} htmlFor={`${preferId}-phone`}>
            <input
              id={`${preferId}-phone`}
              type="radio"
              name="preferredContact"
              value="phone"
              checked={preferred === "phone"}
              onChange={() => {
                setPreferred("phone");
                setPreferError(false);
              }}
            />
            <span>Phone</span>
          </label>
        </div>
        {preferError ? (
          <p className={styles.error}>Choose email or phone.</p>
        ) : null}
      </fieldset>

      <textarea
        className={styles.area}
        name="message"
        placeholder="Tell us about your project and what you’re looking for"
        rows={5}
        required
      />
      <button
        className={styles.submit}
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send"}
      </button>
      {status === "error" ? (
        <p className={styles.error}>Something went wrong. Try again.</p>
      ) : null}
    </form>
  );
}
