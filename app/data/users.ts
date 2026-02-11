import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { UserProfile } from "./types";

const COLLECTION_NAME = "users";

// Get user profile by UID
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (!db) throw new Error("Firestore not initialized");
  const docRef = doc(db, COLLECTION_NAME, uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  }
  return null;
}

// Create or update user profile
export async function saveUserProfile(profile: UserProfile): Promise<void> {
  if (!db) throw new Error("Firestore not initialized");
  const docRef = doc(db, COLLECTION_NAME, profile.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // Update existing profile
    await updateDoc(docRef, {
      ...profile,
      updatedAt: new Date().toISOString(),
    });
  } else {
    // Create new profile
    await setDoc(docRef, {
      ...profile,
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
  if (!db) throw new Error("Firestore not initialized");
  const docRef = doc(db, COLLECTION_NAME, uid);
  await updateDoc(docRef, {
    ...fields,
    updatedAt: new Date().toISOString(),
  });
}
