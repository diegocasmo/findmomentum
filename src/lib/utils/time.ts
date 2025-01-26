export const MS_PER_SECOND = 1000;
export const SECONDS_PER_MIN = 60;
export const MS_PER_MIN = SECONDS_PER_MIN * MS_PER_SECOND;
export const MIN_PER_HOUR = 60;
export const MS_PER_HOUR = MIN_PER_HOUR * MS_PER_MIN;

export function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / MS_PER_MIN);
  const seconds = Math.floor((ms % MS_PER_MIN) / MS_PER_SECOND);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}
