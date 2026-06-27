"use client";

import { useState } from "react";
import { site } from "@/lib/site";

type ContactToggleProps = {
  label: string;
  children: React.ReactNode;
};

function ContactToggle({ label, children }: ContactToggleProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10 pb-6">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`nav-line-link text-base text-brandWhite ${open ? "after:scale-x-100" : ""}`}
        aria-expanded={open}
      >
        {label}
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.425 3.635 1.392 2.668 2.359 2.374 3.532 2.315 4.809 2.256 6.089 2.243 6.498 2.243 12c0 5.502.013 5.911.072 7.191.059 1.277.353 2.45 1.32 3.417.967.967 2.14 1.261 3.417 1.32 1.28.059 1.689.072 7.191.072s5.911-.013 7.191-.072c1.277-.059 2.45-.353 3.417-1.32.967-.967 1.261-2.14 1.32-3.417.059-1.28.072-1.689.072-7.191s-.013-5.911-.072-7.191c-.059-1.277-.353-2.45-1.32-3.417C21.398.425 20.225.131 18.948.072 17.668.013 17.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.062 2.062 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

export default function ContactInfo() {
  const [socialOpen, setSocialOpen] = useState(false);
  const phoneHref = `tel:${site.phone.replace(/\D/g, "")}`;

  return (
    <div className="space-y-6">
      <ContactToggle label="Email">
        <a
          href={`mailto:${site.email}`}
          className="nav-line-link text-base text-brandWhite"
        >
          {site.email}
        </a>
      </ContactToggle>

      <ContactToggle label="Phone">
        <a href={phoneHref} className="nav-line-link text-base text-brandWhite">
          {site.phone}
        </a>
      </ContactToggle>

      <div className="border-b border-white/10 pb-6">
        <button
          type="button"
          onClick={() => setSocialOpen((current) => !current)}
          className={`nav-line-link text-base text-brandWhite ${socialOpen ? "after:scale-x-100" : ""}`}
          aria-expanded={socialOpen}
        >
          Social media
        </button>
        {socialOpen && (
          <div className="mt-4 flex items-center gap-5">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brandWhite transition hover:text-brandBlue"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brandWhite transition hover:text-brandBlue"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brandWhite transition hover:text-brandBlue"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
