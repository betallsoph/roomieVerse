import {
  collection, doc, getDoc, getDocs, setDoc, deleteDoc,
  query, where, orderBy, serverTimestamp, Timestamp, increment,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { FIREBASE_ENABLED } from "../lib/config";

const COLLECTION_NAME = "favorites";

// ============================================================
// Helpers
// ============================================================

function compositeId(userId: string, listingId: string): string {
  return `${userId}_${listingId}`;
}

// ============================================================
// Favorites CRUD
// ============================================================

/** Get all favorite listing IDs for a user */
export async function getUserFavorites(userId: string): Promise<string[]> {
  if (!FIREBASE_ENABLED || !db) {
    // Fallback to localStorage
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  }

  const q = query(
    collection(db, COLLECTION_NAME),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data().listingId as string);
}

/** Check if a listing is favorited by a user */
export async function isFavorited(userId: string, listingId: string): Promise<boolean> {
  if (!FIREBASE_ENABLED || !db) {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("favorites");
    if (!saved) return false;
    const ids = JSON.parse(saved) as (string | number)[];
    return ids.includes(listingId);
  }

  const docRef = doc(db, COLLECTION_NAME, compositeId(userId, listingId));
  const snap = await getDoc(docRef);
  return snap.exists();
}

/** Toggle favorite — returns new favorited state */
export async function toggleFavorite(userId: string, listingId: string): Promise<boolean> {
  if (!FIREBASE_ENABLED || !db) {
    // Fallback to localStorage
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("favorites");
    let ids: (string | number)[] = saved ? JSON.parse(saved) : [];
    const exists = ids.includes(listingId);
    if (exists) {
      ids = ids.filter((id) => id !== listingId);
    } else {
      ids.push(listingId);
    }
    localStorage.setItem("favorites", JSON.stringify(ids));
    return !exists;
  }

  const docId = compositeId(userId, listingId);
  const docRef = doc(db, COLLECTION_NAME, docId);
  const snap = await getDoc(docRef);

  if (snap.exists()) {
    // Remove favorite
    await deleteDoc(docRef);
    // Decrement favoriteCount on listing
    try {
      const listingRef = doc(db, "listings", listingId);
      await updateDoc(listingRef, { favoriteCount: increment(-1) });
    } catch { /* listing may not exist */ }
    return false;
  } else {
    // Add favorite
    await setDoc(docRef, {
      userId,
      listingId,
      createdAt: serverTimestamp(),
    });
    // Increment favoriteCount on listing
    try {
      const listingRef = doc(db, "listings", listingId);
      await updateDoc(listingRef, { favoriteCount: increment(1) });
    } catch { /* listing may not exist */ }
    return true;
  }
}
