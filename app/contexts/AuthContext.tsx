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
import { FIREBASE_ENABLED } from "../lib/config";
import { getUserProfile, saveUserProfile } from "../data/users";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isProfileComplete: boolean;
  profileChecked: boolean;
  isAdmin: boolean;
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
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // If Firebase is disabled, use mock authentication
    if (!FIREBASE_ENABLED || !auth) {
      console.log("Firebase is disabled - using mock authentication");
      const mockUser = {
        uid: "mock-user-123",
        email: "demo@example.com",
        displayName: "Demo User",
        photoURL: null,
      } as User;

      setUser(mockUser);
      setIsProfileComplete(true);
      setProfileChecked(true);
      setIsAdmin(false);
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setIsLoading(false);

      if (user) {
        try {
          let profile = await getUserProfile(user.uid);

          // Auto-create profile for new users
          if (!profile) {
            localStorage.removeItem('profileReminderDismissed');
            const newProfile = {
              uid: user.uid,
              email: user.email || "",
              displayName: user.displayName || "",
              photoURL: user.photoURL || undefined,
            };
            await saveUserProfile(newProfile);
            profile = newProfile;
          }

          // Check admin status via server API (emails stay server-side)
          let adminStatus = profile?.role === "admin";
          if (!adminStatus) {
            try {
              const idToken = await user.getIdToken();
              const res = await fetch("/api/auth/promote", {
                method: "POST",
                headers: { Authorization: `Bearer ${idToken}` },
              });
              if (res.ok) {
                const data = await res.json();
                adminStatus = data.isAdmin === true;
                if (adminStatus) {
                  // Refresh profile to get updated role
                  profile = await getUserProfile(user.uid);
                }
              }
            } catch (promoteErr) {
              console.error("Admin promote check failed:", promoteErr);
            }
          }

          const complete = !!(profile?.gender && profile?.birthYear && profile?.occupation);
          setIsProfileComplete(complete);
          setIsAdmin(adminStatus);
        } catch (error) {
          console.error("Error checking profile:", error);
          setIsProfileComplete(false);
          setIsAdmin(false);
        }
      } else {
        setIsProfileComplete(false);
        setIsAdmin(false);
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
    if (!FIREBASE_ENABLED || !auth) {
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
    if (!FIREBASE_ENABLED || !auth) {
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
      isAdmin,
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
