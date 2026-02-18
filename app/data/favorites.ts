import {
  collection, doc, getDoc, getDocs,
  query, where, orderBy, serverTimestamp, increment,
  runTransaction,
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
  return snap.docs
    .map((d) => d.data().listingId)
    .filter((id): id is string => typeof id === "string");
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

/** Toggle favorite — returns new favorited state (uses transaction to prevent race conditions) */
export async function toggleFavorite(userId: string, listingId: string): Promise<boolean> {
  if (!FIREBASE_ENABLED || !db) {
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
  const favRef = doc(db, COLLECTION_NAME, docId);
  const listingRef = doc(db, "listings", listingId);

  return runTransaction(db, async (transaction) => {
    const favSnap = await transaction.get(favRef);

    if (favSnap.exists()) {
      // Remove favorite
      transaction.delete(favRef);
      try {
        const listingSnap = await transaction.get(listingRef);
        if (listingSnap.exists()) {
          transaction.update(listingRef, { favoriteCount: increment(-1) });
        }
      } catch (err) {
        console.warn("Could not update favoriteCount on listing:", err);
      }
      return false;
    } else {
      // Add favorite
      transaction.set(favRef, {
        userId,
        listingId,
        createdAt: serverTimestamp(),
      });
      try {
        const listingSnap = await transaction.get(listingRef);
        if (listingSnap.exists()) {
          transaction.update(listingRef, { favoriteCount: increment(1) });
        }
      } catch (err) {
        console.warn("Could not update favoriteCount on listing:", err);
      }
      return true;
    }
  });
}
