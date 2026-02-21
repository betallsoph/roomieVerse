import { doc, getDoc, setDoc, updateDoc, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../lib/firebase";
import { FIREBASE_ENABLED } from "../lib/config";
import { UserProfile } from "./types";

const COLLECTION_NAME = "users";

// Firestore rejects undefined values — convert them to null
function sanitize<T extends Record<string, unknown>>(obj: T): T {
  const result = { ...obj };
  for (const key in result) {
    if (result[key] === undefined) {
      (result as Record<string, unknown>)[key] = null;
    }
  }
  return result;
}

// Mock user profiles for dev (when Firebase is off)
const mockProfiles: Record<string, UserProfile> = {};

function getLocalProfile(uid: string): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(`user_profile_${uid}`);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveLocalProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(`user_profile_${profile.uid}`, JSON.stringify(profile));
}

// Get user profile by UID
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (!FIREBASE_ENABLED || !db) {
    return getLocalProfile(uid) || mockProfiles[uid] || null;
  }

  const docRef = doc(db, COLLECTION_NAME, uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  }
  return null;
}

// Create or update user profile
export async function saveUserProfile(profile: UserProfile): Promise<void> {
  if (!FIREBASE_ENABLED || !db) {
    saveLocalProfile({ ...profile, updatedAt: new Date().toISOString() });
    return;
  }

  try {
    const docRef = doc(db, COLLECTION_NAME, profile.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const existingData = docSnap.data();
      await updateDoc(docRef, sanitize({
        ...profile,
        role: existingData.role || "user",
        updatedAt: new Date().toISOString(),
      }));
    } else {
      await setDoc(docRef, sanitize({
        ...profile,
        role: "user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
    }
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw error;
  }
}

// Update specific fields of user profile
export async function updateUserProfileFields(
  uid: string,
  fields: Partial<UserProfile>
): Promise<void> {
  if (!FIREBASE_ENABLED || !db) {
    const existing = getLocalProfile(uid);
    if (existing) {
      saveLocalProfile({ ...existing, ...fields, updatedAt: new Date().toISOString() });
    }
    return;
  }

  try {
    const docRef = doc(db, COLLECTION_NAME, uid);
    await updateDoc(docRef, sanitize({
      ...fields,
      updatedAt: new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Error updating user profile fields:", error);
    throw error;
  }
}

// Get recent users (for admin dashboard)
export async function getRecentUsers(max = 10): Promise<UserProfile[]> {
  if (!FIREBASE_ENABLED || !db) return [];

  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "desc"),
      limit(max),
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as UserProfile);
  } catch (error) {
    console.error("Error fetching recent users:", error);
    return [];
  }
}

// Get total user count
export async function getUserCount(): Promise<number> {
  if (!FIREBASE_ENABLED || !db) return 0;

  try {
    const snap = await getDocs(collection(db, COLLECTION_NAME));
    return snap.size;
  } catch (error) {
    console.error("Error counting users:", error);
    return 0;
  }
}

// Check if user is admin
export async function isUserAdmin(uid: string): Promise<boolean> {
  if (!FIREBASE_ENABLED || !db) return false;

  const profile = await getUserProfile(uid);
  return profile?.role === "admin";
}

// Set user role (via server API to bypass Firestore rules)
export async function setUserRole(uid: string, role: string): Promise<void> {
  if (!FIREBASE_ENABLED) return;

  const { getAuth } = await import("firebase/auth");
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const idToken = await user.getIdToken();
  const res = await fetch("/api/admin/set-role", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({ uid, role }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to set role");
  }
}

// Get all users (for admin management)
export async function getAllUsers(): Promise<UserProfile[]> {
  if (!FIREBASE_ENABLED || !db) return [];

  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as UserProfile);
  } catch (error) {
    console.error("Error fetching all users:", error);
    return [];
  }
}
