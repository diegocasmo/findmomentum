/**
 * Gets the user's timezone from the browser
 * @returns The user's timezone (e.g., "America/New_York")
 */
export function getUserTimezone(): string {
  if (typeof window === "undefined") {
    return "UTC"; // Default to UTC on the server
  }

  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (error) {
    console.error("Error getting timezone:", error);
    return "UTC";
  }
}
