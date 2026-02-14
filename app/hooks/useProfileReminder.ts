'use client';

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export function useProfileReminder() {
  const { isAuthenticated, isProfileComplete, profileChecked, isAdmin } = useAuth();
  const [showReminder, setShowReminder] = useState(false);

  useEffect(() => {
    // Only check after auth and profile have been verified
    if (!profileChecked) return;

    // Never show for admin users or users with complete profiles
    if (!isAuthenticated || isProfileComplete || isAdmin) {
      setShowReminder(false);
      return;
    }

    // Check if user has dismissed the reminder recently (within 24 hours)
    const dismissedAt = localStorage.getItem('profileReminderDismissed');
    if (dismissedAt) {
      const dismissedTime = parseInt(dismissedAt, 10);
      const hoursSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60);
      if (hoursSinceDismissed < 24) {
        setShowReminder(false);
        return;
      }
    }

    // Show reminder for incomplete profiles
    setShowReminder(true);
  }, [isAuthenticated, isProfileComplete, profileChecked, isAdmin]);

  const dismissReminder = () => {
    setShowReminder(false);
    localStorage.setItem('profileReminderDismissed', Date.now().toString());
  };

  return {
    showReminder,
    dismissReminder
  };
}
