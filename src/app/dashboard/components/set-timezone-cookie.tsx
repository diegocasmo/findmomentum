"use client";

import { useEffect } from "react";

export function SetTimezoneCookie() {
  useEffect(() => {
    // Get user's timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Set the timezone in a cookie without expiration
    document.cookie = `user-timezone=${timezone}; path=/; SameSite=Lax`;
  }, []);

  return null;
}
