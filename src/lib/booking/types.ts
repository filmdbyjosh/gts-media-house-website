export type EditLengthId = "short" | "long" | "both";

export type EditLengthOption = {
  id: EditLengthId;
  label: string;
  price: number;
  description: string;
};

export type VibeOption = {
  id: string;
  label: string;
  /** Shown on hover / focus of the first-step tile. */
  description?: string;
};

export type PersonalServiceId =
  | "video-editing"
  | "video-only"
  | "editing-only";

export type PersonalServiceOption = {
  id: PersonalServiceId;
  label: string;
  description: string;
};

export type AddonKind = "toggle" | "quantity";

export type AddonOption = {
  id: string;
  label: string;
  price: number;
  kind: AddonKind;
  /** Quantity add-ons only. */
  maxQty?: number;
  /** Shown after this add-on is selected. */
  note?: string;
};

export type BookingSelections = {
  editLength: EditLengthId | null;
  vibe: string | null;
  personalService: PersonalServiceId | null;
  notes: string;
  /** Missing or 0 = not selected. Toggle uses 0/1. */
  addonQty: Record<string, number>;
  name: string;
  email: string;
  phone: string;
  /** Required Google Drive, Dropbox, etc. footage link. */
  footageLink: string;
};

export type BookingLineItem = {
  id: string;
  label: string;
  detail?: string;
  amount: number;
};

export type RecapRow = {
  id: string;
  label: string;
  value: string;
  /** 0 = included / no upcharge. */
  amount: number;
};

export type BookingTotals = {
  base: number;
  extras: number;
  total: number;
  lineItems: BookingLineItem[];
};

export type BookingConfig = {
  currency: "USD";
  lengths: readonly EditLengthOption[];
  vibes: readonly VibeOption[];
  personalServices: readonly PersonalServiceOption[];
  addons: readonly AddonOption[];
};
