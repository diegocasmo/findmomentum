import { cookies } from "next/headers";

export async function getUserTimezone(): Promise<string> {
  if (typeof window === "undefined") {
    // Server-side: Get timezone from cookie
    const cookieStore = await cookies();
    const userTimezone = cookieStore.get("user-timezone")?.value;

    // Return the user's timezone from cookie or fallback to UTC
    return userTimezone || "UTC";
  }

  // Client-side: Get timezone from browser
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (error) {
    console.error("Error getting timezone:", error);
    return "UTC";
  }
}
