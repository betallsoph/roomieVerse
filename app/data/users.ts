import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { FIREBASE_ENABLED } from "../lib/config";
import { UserProfile } from "./types";

const COLLECTION_NAME = "users";

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

  const docRef = doc(db, COLLECTION_NAME, profile.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      ...profile,
      updatedAt: new Date().toISOString(),
    });
  } else {
    await setDoc(docRef, {
      ...profile,
      role: "user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
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

  const docRef = doc(db, COLLECTION_NAME, uid);
  await updateDoc(docRef, {
    ...fields,
    updatedAt: new Date().toISOString(),
  });
}

// Check if user is admin
export async function isUserAdmin(uid: string): Promise<boolean> {
  if (!FIREBASE_ENABLED || !db) return false;

  const profile = await getUserProfile(uid);
  return profile?.role === "admin";
}

// Set user as admin (use in Firebase console or a setup script)
export async function setUserAdmin(uid: string): Promise<void> {
  if (!FIREBASE_ENABLED || !db) return;

  const docRef = doc(db, COLLECTION_NAME, uid);
  await updateDoc(docRef, { role: "admin" });
}
