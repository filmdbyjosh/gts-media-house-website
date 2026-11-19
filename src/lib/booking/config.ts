import type { BookingConfig } from "./types";

/**
 * GTS Media House video editing — remote only.
 * Short vs long → vibe + upgrades + notes → info → checkout.
 */
export const videoBookingConfig: BookingConfig = {
  currency: "USD",
  lengths: [
    {
      id: "short",
      label: "Vertical",
      price: 20,
      description: "9:16 — Reels, TikTok, Shorts.",
    },
    {
      id: "long",
      label: "Horizontal",
      price: 250,
      description: "16:9 — YouTube, films, longer cuts.",
    },
    {
      id: "both",
      label: "Both",
      price: 270,
      description: "Vertical and horizontal cuts.",
    },
  ],
  vibes: [
    {
      id: "personal",
      label: "Personal",
      description:
        "For individuals looking for content for personal use",
    },
    {
      id: "commercial",
      label: "Commercial",
      description:
        "Businesses looking for content created for social media, advertising, websites, product launches, campaigns, events, and other marketing channels.",
    },
  ],
  personalServices: [
    {
      id: "video-editing",
      label: "Video + Editing",
      description: "Filming plus professionally edited content.",
    },
    {
      id: "video-only",
      label: "Video Only",
      description: "Professional filming with your footage delivered.",
    },
    {
      id: "editing-only",
      label: "Editing Only",
      description: "Send your footage and have it professionally edited.",
    },
  ],
  addons: [
    {
      id: "extra-cuts",
      label: "Additional short form cuts",
      price: 20,
      kind: "quantity",
      maxQty: 10,
    },
    { id: "thumbnail", label: "Custom Thumbnail", price: 25, kind: "toggle" },
    {
      id: "revision",
      label: "Revisions",
      price: 20,
      kind: "quantity",
      maxQty: 10,
    },
    {
      id: "licensed-music",
      label: "Licensed Music",
      price: 20,
      kind: "toggle",
      note: "Selected from our catalog.",
    },
    {
      id: "next-day",
      label: "Expedited next day delivery",
      price: 40,
      kind: "toggle",
    },
  ],
};
