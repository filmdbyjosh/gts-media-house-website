import type {
  CheckoutSelection,
  CheckoutTotals,
  ServiceCheckoutConfig,
} from "./types";

export function clampExtraTimeSlots(
  slots: number,
  maxSlots: number
): number {
  if (!Number.isFinite(slots)) return 0;
  return Math.max(0, Math.min(maxSlots, Math.round(slots)));
}

export function computeCheckoutTotals(
  config: ServiceCheckoutConfig,
  selection: CheckoutSelection
): CheckoutTotals {
  const slots = clampExtraTimeSlots(
    selection.extraTimeSlots,
    config.extraTime.maxSlots
  );

  const selectedAddons = config.addons.filter((addon) =>
    selection.addonIds.includes(addon.id)
  );

  const addonsTotal = selectedAddons.reduce(
    (sum, addon) => sum + addon.price,
    0
  );
  const extraTimeTotal = slots * config.extraTime.pricePerSlot;
  const durationMinutes =
    config.baseDurationMinutes + slots * config.extraTime.minutesPerSlot;

  const lineItems: CheckoutTotals["lineItems"] = [
    {
      id: "base",
      label: config.shortName,
      detail: `${config.baseDurationMinutes} min base shoot`,
      amount: config.basePrice,
    },
    ...selectedAddons.map((addon) => ({
      id: addon.id,
      label: addon.label,
      amount: addon.price,
    })),
  ];

  if (slots > 0) {
    const extraMinutes = slots * config.extraTime.minutesPerSlot;
    lineItems.push({
      id: config.extraTime.id,
      label: config.extraTime.label,
      detail: `+${extraMinutes} min (${slots} × ${config.extraTime.minutesPerSlot} min)`,
      amount: extraTimeTotal,
    });
  }

  return {
    base: config.basePrice,
    addons: addonsTotal,
    extraTime: extraTimeTotal,
    total: config.basePrice + addonsTotal + extraTimeTotal,
    durationMinutes,
    lineItems,
  };
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rem = minutes % 60;
  if (rem === 0) return hours === 1 ? "1 hr" : `${hours} hr`;
  return `${hours} hr ${rem} min`;
}
