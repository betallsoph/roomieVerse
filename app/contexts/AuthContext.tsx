"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { getUserProfile } from "../data/users";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isProfileComplete: boolean;
  profileChecked: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  checkProfileComplete: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [profileChecked, setProfileChecked] = useState(false);

  useEffect(() => {
    // If Firebase is disabled, use mock authentication
    if (!auth) {
      console.log("Firebase is disabled - using mock authentication");
      // Simulate a logged-in user for UI development
      const mockUser = {
        uid: "mock-user-123",
        email: "demo@example.com",
        displayName: "Demo User",
        photoURL: null,
      } as User;

      setUser(mockUser);
      setIsProfileComplete(true);
      setProfileChecked(true);
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setIsLoading(false);

      if (user) {
        // Check if profile is complete
        try {
          const profile = await getUserProfile(user.uid);

          // If no profile exists in database, this is a new/reset user
          // Clear the reminder dismissal so the modal shows again
          if (!profile) {
            localStorage.removeItem('profileReminderDismissed');
          }

          const complete = !!(profile?.gender && profile?.birthYear && profile?.occupation);
          setIsProfileComplete(complete);
        } catch (error) {
          console.error("Error checking profile:", error);
          setIsProfileComplete(false);
        }
      } else {
        setIsProfileComplete(false);
      }
      setProfileChecked(true);
    });

    return () => unsubscribe();
  }, []);

  const checkProfileComplete = async (): Promise<boolean> => {
    if (!user) return false;
    try {
      const profile = await getUserProfile(user.uid);
      const complete = !!(profile?.gender && profile?.birthYear && profile?.occupation);
      setIsProfileComplete(complete);
      return complete;
    } catch (error) {
      console.error("Error checking profile:", error);
      return false;
    }
  };

  const loginWithGoogle = async () => {
    if (!auth) {
      console.log("Firebase is disabled - mock login");
      return;
    }
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const logout = async () => {
    if (!auth) {
      console.log("Firebase is disabled - mock logout");
      return;
    }
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      isProfileComplete,
      profileChecked,
      loginWithGoogle,
      logout,
      checkProfileComplete
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
