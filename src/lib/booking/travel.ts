/** Studio origin: Marana / NW Tucson ZIP 85742. */
export const TRAVEL_ORIGIN = {
  label: "Marana, AZ 85742",
  zip: "85742",
  lat: 32.39682388,
  lng: -111.06656647,
} as const;

/**
 * Driving miles from 85742.
 * 151–250 / 251–400 split the overlapping ranges from the brief.
 */
export const TRAVEL_TIERS = [
  { maxMiles: 30, fee: 0, label: "0–30 miles · included" },
  { maxMiles: 75, fee: 75, label: "31–75 miles" },
  { maxMiles: 150, fee: 250, label: "76–150 miles" },
  { maxMiles: 250, fee: 450, label: "151–250 miles" },
  { maxMiles: 400, fee: 740, label: "251–400 miles" },
] as const;

export type TravelQuote = {
  miles: number;
  fee: number;
  outOfZone: boolean;
  tierLabel: string;
};

export function quoteTravelFromMiles(miles: number): TravelQuote {
  const rounded = Math.max(0, Math.round(miles));

  for (const tier of TRAVEL_TIERS) {
    if (rounded <= tier.maxMiles) {
      return {
        miles: rounded,
        fee: tier.fee,
        outOfZone: false,
        tierLabel: tier.label,
      };
    }
  }

  return {
    miles: rounded,
    fee: 0,
    outOfZone: true,
    tierLabel: "Over 400 miles · out of zone",
  };
}

export function formatMiles(miles: number): string {
  return `${miles} mi`;
}
