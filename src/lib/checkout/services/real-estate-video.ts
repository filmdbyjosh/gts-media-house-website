import type { ServiceCheckoutConfig } from "../types";

/**
 * Real estate / property video — first checkout service.
 * Duplicate this file and tweak IDs/prices/labels for another service later.
 */
export const realEstateVideoCheckout: ServiceCheckoutConfig = {
  id: "real-estate-video",
  name: "Real Estate Video Shoot",
  shortName: "Property video shoot",
  description:
    "Tucson-area listing or remodel video. Start with the base shoot, then add extras and extra filming time.",
  basePrice: 50,
  baseDurationMinutes: 40,
  currency: "USD",
  serviceAreaLabel: "Tucson & surrounding areas",
  addons: [
    {
      id: "drone",
      label: "Drone / aerials",
      description: "Establishing aerials and property-from-above coverage.",
      price: 75,
    },
    {
      id: "social-cuts",
      label: "Social / short-form cuts",
      description: "Vertical and square edits ready for Reels, TikTok, and ads.",
      price: 40,
    },
    {
      id: "rush",
      label: "Rush delivery",
      description: "Prioritized edit turnaround when timing is tight.",
      price: 60,
    },
  ],
  extraTime: {
    id: "extra-filming",
    label: "Extra filming time",
    description:
      "Add 20 minutes per slot. Up to 5 slots (+20 to +100 min on top of the base shoot).",
    minutesPerSlot: 20,
    maxSlots: 5,
    pricePerSlot: 25,
  },
};
