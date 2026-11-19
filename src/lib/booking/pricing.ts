import { videoBookingConfig } from "./config";
import type {
  AddonOption,
  BookingConfig,
  BookingLineItem,
  BookingSelections,
  BookingTotals,
  RecapRow,
} from "./types";

export function getAddonQty(
  selection: Pick<BookingSelections, "addonQty"> | undefined,
  id: string
): number {
  return Math.max(0, selection?.addonQty[id] ?? 0);
}

export function lengthFor(
  config: BookingConfig,
  id: BookingSelections["editLength"]
) {
  if (!id) return null;
  return config.lengths.find((option) => option.id === id) ?? null;
}

export function vibeFor(config: BookingConfig, id: string | null) {
  if (!id) return null;
  return config.vibes.find((option) => option.id === id) ?? null;
}

export function personalServiceFor(
  config: BookingConfig,
  id: BookingSelections["personalService"]
) {
  if (!id) return null;
  return config.personalServices.find((option) => option.id === id) ?? null;
}

export function computeBookingTotals(
  config: BookingConfig = videoBookingConfig,
  selection?: Pick<BookingSelections, "editLength" | "addonQty">
): BookingTotals {
  const length = lengthFor(config, selection?.editLength ?? null);
  const base = length?.price ?? 0;
  const lineItems: BookingLineItem[] = [];

  if (length) {
    lineItems.push({
      id: "base",
      label: length.label,
      detail: "Base edit",
      amount: base,
    });
  }

  let extras = 0;
  for (const addon of config.addons) {
    const qty = getAddonQty(selection, addon.id);
    if (qty <= 0) continue;
    const amount = addon.price * qty;
    extras += amount;
    lineItems.push({
      id: addon.id,
      label: addon.label,
      detail: addon.kind === "quantity" ? `×${qty}` : undefined,
      amount,
    });
  }

  return {
    base,
    extras,
    total: base + extras,
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

export function addonPriceLabel(addon: AddonOption): string {
  const price = formatUsd(addon.price);
  return addon.kind === "quantity" ? `${price} each` : price;
}

export function summarizeSelections(
  config: BookingConfig,
  s: BookingSelections
) {
  const length = lengthFor(config, s.editLength);
  const vibe = vibeFor(config, s.vibe);
  const personalService = personalServiceFor(config, s.personalService);
  const selectedAddons = config.addons
    .map((addon) => {
      const qty = getAddonQty(s, addon.id);
      if (qty <= 0) return null;
      return {
        ...addon,
        qty,
        amount: addon.price * qty,
      };
    })
    .filter((row): row is NonNullable<typeof row> => row !== null);

  return {
    lengthLabel: length?.label ?? "—",
    lengthPrice: length ? formatUsd(length.price) : "—",
    vibeLabel: vibe?.label ?? "—",
    personalServiceLabel: personalService?.label ?? "—",
    notes: s.notes.trim() || "—",
    addons: selectedAddons,
    contact: [s.name, s.email, s.phone].filter(Boolean).join(" · ") || "—",
    footageLink: s.footageLink.trim() || "—",
  };
}

export function buildEditRecap(
  config: BookingConfig,
  s: BookingSelections
): RecapRow[] {
  const totals = computeBookingTotals(config, s);
  const vibe = vibeFor(config, s.vibe);
  const rows: RecapRow[] = [];

  if (vibe) {
    rows.push({
      id: "vibe",
      label: "Looking for",
      value: vibe.label,
      amount: 0,
    });
  }

  const personalServiceRow = personalServiceFor(config, s.personalService);
  if (personalServiceRow) {
    rows.push({
      id: "personal-service",
      label: "Service",
      value: personalServiceRow.label,
      amount: 0,
    });
  }

  rows.push(
    ...totals.lineItems.map((item) => ({
      id: item.id,
      label: item.label,
      value: item.detail || (item.id === "base" ? "Base edit" : "Added"),
      amount: item.amount,
    }))
  );

  if (s.notes.trim()) {
    rows.push({
      id: "notes",
      label: "Notes",
      value: s.notes.trim(),
      amount: 0,
    });
  }

  if (s.footageLink.trim()) {
    rows.push({
      id: "footage",
      label: "Footage",
      value: s.footageLink.trim(),
      amount: 0,
    });
  }

  return rows;
}
