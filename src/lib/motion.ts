export const easeOut = [0.22, 1, 0.36, 1] as const;

export const motionDurations = {
  char: 0.45,
  charStagger: 0.04,
  fade: 1.15,
  line: 1,
  ui: 0.6,
} as const;

export function charDelay(index: number, baseDelay = 0) {
  return baseDelay + index * motionDurations.charStagger;
}

export function lineStrokeDelay(
  beforeLength: number,
  emphasisLength: number,
  lineIndex: number,
) {
  return (
    (beforeLength + emphasisLength) * motionDurations.charStagger * 1000 +
    lineIndex * 180 +
    200
  );
}
