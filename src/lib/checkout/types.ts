/**
 * Shared checkout product model.
 * Copy a service config file and pass it to ServiceCheckoutFlow for another offering.
 */

export type CheckoutAddon = {
  id: string;
  label: string;
  description: string;
  /** Extra charge in USD (whole dollars for now). */
  price: number;
};

export type ExtraTimeConfig = {
  id: string;
  label: string;
  description: string;
  minutesPerSlot: number;
  maxSlots: number;
  /** Price per 20-minute slot in USD. */
  pricePerSlot: number;
};

export type ServiceCheckoutConfig = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  basePrice: number;
  baseDurationMinutes: number;
  currency: "USD";
  addons: readonly CheckoutAddon[];
  extraTime: ExtraTimeConfig;
  serviceAreaLabel: string;
};

export type CheckoutSelection = {
  addonIds: string[];
  extraTimeSlots: number;
};

export type CheckoutCustomer = {
  name: string;
  email: string;
  phone: string;
  location: string;
};

export type CheckoutSchedule = {
  /** YYYY-MM-DD */
  date: string;
  /** HH:mm (24h local) */
  time: string;
};

export type CheckoutLineItem = {
  id: string;
  label: string;
  detail?: string;
  amount: number;
};

export type CheckoutTotals = {
  base: number;
  addons: number;
  extraTime: number;
  total: number;
  durationMinutes: number;
  lineItems: CheckoutLineItem[];
};
