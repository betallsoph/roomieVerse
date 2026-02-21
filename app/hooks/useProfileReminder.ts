'use client';

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export function useProfileReminder() {
  const { isAuthenticated, isProfileComplete, profileChecked, isMod } = useAuth();
  const [showReminder, setShowReminder] = useState(false);

  useEffect(() => {
    // Only check after auth and profile have been verified
    if (!profileChecked) return;

    // Never show for admin users or users with complete profiles
    if (!isAuthenticated || isProfileComplete || isMod) {
      setShowReminder(false);
      return;
    }

    // Prepare to show reminder, but delay slightly to prevent flashing
    // if state updates are racing
    const timer = setTimeout(() => {
      // Check if user has dismissed the reminder recently (within 0.5 hours)
      const dismissedAt = localStorage.getItem('profileReminderDismissed');
      if (dismissedAt) {
        const dismissedTime = parseInt(dismissedAt, 10);
        const hoursSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60);
        if (hoursSinceDismissed < 0.5) {
          setShowReminder(false);
          return;
        }
      }

      // Show reminder for incomplete profiles
      setShowReminder(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, isProfileComplete, profileChecked, isMod]);

  const dismissReminder = () => {
    setShowReminder(false);
    localStorage.setItem('profileReminderDismissed', Date.now().toString());
  };

  return {
    showReminder,
    dismissReminder
  };
}
