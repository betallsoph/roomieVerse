import {
  collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc,
  query, where, orderBy, limit, serverTimestamp, Timestamp, increment,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { FIREBASE_ENABLED, MODERATION_ENABLED } from "../lib/config";
import { mockListings } from "./mockListings";
import { RoomListing, ListingStatus } from "./types";

const COLLECTION_NAME = "listings";

// ============================================================
// Helpers
// ============================================================

function timestampToString(ts: unknown): string {
  if (!ts) return new Date().toISOString();
  if (ts instanceof Timestamp) return ts.toDate().toISOString();
  if (typeof ts === "string") return ts;
  return new Date().toISOString();
}

// Convert Firestore document → RoomListing
function docToListing(docSnap: { id: string; data: () => Record<string, unknown> }): RoomListing {
  const d = docSnap.data();
  const contact = (d.contact as Record<string, string>) || {};

  return {
    id: docSnap.id,
    title: (d.title as string) || "",
    author: (d.authorName as string) || (d.author as string) || "",
    price: (d.price as string) || (d.costs as Record<string, string>)?.rent || "",
    location: (d.location as string) || "",
    city: d.city as string | undefined,
    district: d.district as string | undefined,
    specificAddress: d.specificAddress as string | undefined,
    buildingName: d.buildingName as string | undefined,
    addressOther: d.addressOther as string | undefined,
    locationNegotiable: d.locationNegotiable as boolean | undefined,
    moveInDate: (d.moveInDate as string) || "",
    timeNegotiable: d.timeNegotiable as boolean | undefined,
    description: (d.description as string) || "",
    introduction: d.introduction as string | undefined,
    propertyTypes: d.propertyTypes as string[] | undefined,
    phone: contact.phone || (d.phone as string) || "",
    zalo: contact.zalo || (d.zalo as string) || undefined,
    facebook: contact.facebook || (d.facebook as string) || undefined,
    instagram: contact.instagram || (d.instagram as string) || undefined,
    postedDate: d.postedDate as string || formatDate(timestampToString(d.createdAt)),
    category: (d.category as "roommate" | "roomshare" | "short-term" | "sublease") || "roommate",
    roommateType: d.roommateType as RoomListing["roommateType"],
    propertyType: d.propertyType as RoomListing["propertyType"],
    image: d.image as string | undefined,
    images: d.images as string[] | undefined,
    amenities: d.amenities as string[] | undefined,
    amenitiesOther: d.amenitiesOther as string | undefined,
    userId: d.userId as string | undefined,
    status: (d.status as ListingStatus) || "active",
    preferences: d.preferences as RoomListing["preferences"],
    costs: d.costs as RoomListing["costs"],
    roomSize: d.roomSize as string | undefined,
    currentOccupants: d.currentOccupants as string | undefined,
    totalRooms: d.totalRooms as string | undefined,
    othersIntro: d.othersIntro as string | undefined,
    minContractDuration: d.minContractDuration as string | undefined,
    isDraft: d.isDraft as boolean | undefined,
    createdAt: timestampToString(d.createdAt),
    updatedAt: timestampToString(d.updatedAt),
    moderatedBy: d.moderatedBy as string | undefined,
    moderatedAt: d.moderatedAt ? timestampToString(d.moderatedAt) : undefined,
    rejectionReason: d.rejectionReason as string | undefined,
    moderationNote: d.moderationNote as string | undefined,
    viewCount: (d.viewCount as number) || 0,
    favoriteCount: (d.favoriteCount as number) || 0,
  };
}

function formatDate(isoString: string): string {
  try {
    return new Date(isoString).toLocaleDateString("vi-VN");
  } catch {
    return isoString;
  }
}

// Helper: Get category from ID prefix
function getCategoryFromId(id: string): "roommate" | "roomshare" | "short-term" | "sublease" | null {
  if (id.startsWith("rm-")) return "roommate";
  if (id.startsWith("rs-")) return "roomshare";
  if (id.startsWith("st-")) return "short-term";
  if (id.startsWith("sl-")) return "sublease";
  return null;
}

// Helper: Get listings from localStorage (fallback for dev/testing)
function getLocalStorageListings(category: "roommate" | "roomshare"): RoomListing[] {
  if (typeof window === "undefined") return [];
  try {
    const storageKey = category === "roommate" ? "roommate_listings" : "roomshare_listings";
    const stored = localStorage.getItem(storageKey);
    if (!stored) return [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const localData = JSON.parse(stored) as any[];
    return localData.map((item) => ({
      id: item.id,
      title: item.title,
      author: "Bạn",
      price: item.costs?.rent || item.budget || "Thương lượng",
      location: item.location || "",
      locationNegotiable: item.locationNegotiable,
      moveInDate: item.moveInTime || "Linh hoạt",
      timeNegotiable: item.timeNegotiable,
      description: item.introduction || "",
      introduction: item.introduction,
      propertyTypes: item.propertyTypes,
      phone: item.contact?.phone || "",
      zalo: item.contact?.zalo,
      facebook: item.contact?.facebook,
      instagram: item.contact?.instagram,
      postedDate: new Date(item.createdAt).toLocaleDateString("vi-VN"),
      category: category,
      roommateType: item.type === "have-room" ? "have-room" as const : "find-partner" as const,
      propertyType: "apartment" as const,
      userId: item.userId,
      status: "active" as const,
      images: item.images,
      amenities: item.amenities,
      amenitiesOther: item.amenitiesOther,
      costs: item.costs,
      preferences: item.preferences,
      city: item.city,
      district: item.district,
      specificAddress: item.specificAddress,
      buildingName: item.buildingName,
      addressOther: item.addressOther,
      roomSize: item.roomSize,
      currentOccupants: item.currentOccupants,
      minContractDuration: item.minContractDuration,
      isDraft: item.isDraft,
    }));
  } catch {
    return [];
  }
}

// ============================================================
// READ operations
// ============================================================

// Get all active listings
export async function getListings(): Promise<RoomListing[]> {
  if (!FIREBASE_ENABLED || !db) {
    return [...getLocalStorageListings("roommate"), ...getLocalStorageListings("roomshare"), ...mockListings];
  }

  const q = query(
    collection(db, COLLECTION_NAME),
    where("status", "==", "active"),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(docToListing);
}

// Get listing by ID
export async function getListingById(id: number | string): Promise<RoomListing | null> {
  const idStr = String(id);

  // Check localStorage first (for recently created listings before sync)
  // short-term doesn't use localStorage fallback
  const prefixCategory = getCategoryFromId(idStr);
  if (prefixCategory && prefixCategory !== "short-term" && prefixCategory !== "sublease") {
    const found = getLocalStorageListings(prefixCategory).find(l => l.id === idStr);
    if (found) return found;
  } else if (!prefixCategory) {
    const localAll = [...getLocalStorageListings("roommate"), ...getLocalStorageListings("roomshare")];
    const found = localAll.find(l => l.id === idStr);
    if (found) return found;
  }

  if (!FIREBASE_ENABLED || !db) {
    return mockListings.find(listing => String(listing.id) === idStr) || null;
  }

  const docRef = doc(db, COLLECTION_NAME, idStr);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docToListing(docSnap);
  }
  return null;
}

// Get listings by category (only active)
export async function getListingsByCategory(category: "roommate" | "roomshare" | "short-term" | "sublease"): Promise<RoomListing[]> {
  if (!FIREBASE_ENABLED || !db) {
    if (category === "short-term" || category === "sublease") return []; // no localStorage fallback
    const local = getLocalStorageListings(category);
    const mock = mockListings.filter(listing => listing.category === category);
    return [...local, ...mock];
  }

  const q = query(
    collection(db, COLLECTION_NAME),
    where("category", "==", category),
    where("status", "==", "active"),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(docToListing);
}

// Get listings by user ID (all statuses - for user's own dashboard)
export async function getListingsByUserId(userId: string, onlyActive = false): Promise<RoomListing[]> {
  if (!FIREBASE_ENABLED || !db) {
    const localRoommate = getLocalStorageListings("roommate").filter(l => l.userId === userId);
    const localRoomshare = getLocalStorageListings("roomshare").filter(l => l.userId === userId);
    const mock = mockListings.filter(listing => listing.userId === userId);
    const all = [...localRoommate, ...localRoomshare, ...mock];
    return onlyActive ? all.filter(l => !l.status || l.status === "active") : all;
  }

  const constraints: any[] = [
    where("userId", "==", userId),
  ];
  if (onlyActive) {
    constraints.push(where("status", "==", "active"));
  }
  constraints.push(orderBy("createdAt", "desc"));

  const q = query(collection(db, COLLECTION_NAME), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(docToListing);
}

// Get pending listings (for admin moderation)
export async function getPendingListings(): Promise<RoomListing[]> {
  if (!FIREBASE_ENABLED || !db) return [];

  const q = query(
    collection(db, COLLECTION_NAME),
    where("status", "==", "pending"),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(docToListing);
}

// ============================================================
// WRITE operations
// ============================================================

// Create a new listing
export async function createListing(data: Partial<RoomListing> & { userId: string }): Promise<string> {
  // Determine ID prefix
  const prefix = data.category === "sublease" ? "sl" : data.category === "short-term" ? "st" : data.category === "roomshare" ? "rs" : "rm";
  const id = `${prefix}-${Date.now()}`;

  // Determine initial status
  const status: ListingStatus = MODERATION_ENABLED ? "pending" : "active";

  if (!FIREBASE_ENABLED || !db) {
    // Fallback: save to localStorage
    const category = data.category || "roommate";
    const storageKey = category === "roommate" ? "roommate_listings" : "roomshare_listings";
    const existing = JSON.parse(localStorage.getItem(storageKey) || "[]");
    existing.push({ ...data, id, status, createdAt: new Date().toISOString() });
    localStorage.setItem(storageKey, JSON.stringify(existing.slice(-10)));
    return id;
  }

  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await setDoc(docRef, {
      ...data,
      id,
      status,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      viewCount: 0,
      favoriteCount: 0,
    });
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error;
  }

  return id;
}

// Update a listing
export async function updateListing(id: string, data: Partial<RoomListing>): Promise<void> {
  if (!FIREBASE_ENABLED || !db) {
    console.warn("Firebase disabled - cannot update listing");
    return;
  }

  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating listing:", error);
    throw error;
  }
}

// Delete a listing (soft delete)
export async function deleteListing(id: string): Promise<void> {
  if (!FIREBASE_ENABLED || !db) {
    console.warn("Firebase disabled - cannot delete listing");
    return;
  }

  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      status: "deleted",
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error deleting listing:", error);
    throw error;
  }
}

// Hard delete (admin only)
export async function hardDeleteListing(id: string): Promise<void> {
  if (!FIREBASE_ENABLED || !db) return;
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}

// ============================================================
// MODERATION operations
// ============================================================

// Approve a listing
export async function approveListing(listingId: string, adminUid: string): Promise<void> {
  if (!FIREBASE_ENABLED || !db) return;

  const docRef = doc(db, COLLECTION_NAME, listingId);
  await updateDoc(docRef, {
    status: "active",
    moderatedBy: adminUid,
    moderatedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

// Reject a listing
export async function rejectListing(
  listingId: string,
  adminUid: string,
  reason: string,
  note?: string
): Promise<void> {
  if (!FIREBASE_ENABLED || !db) return;

  const docRef = doc(db, COLLECTION_NAME, listingId);
  await updateDoc(docRef, {
    status: "rejected",
    moderatedBy: adminUid,
    moderatedAt: serverTimestamp(),
    rejectionReason: reason,
    moderationNote: note || null,
    updatedAt: serverTimestamp(),
  });
}

// Resubmit a rejected listing (user edits and resubmits)
export async function resubmitListing(listingId: string, data: Partial<RoomListing>): Promise<void> {
  if (!FIREBASE_ENABLED || !db) return;

  const docRef = doc(db, COLLECTION_NAME, listingId);
  await updateDoc(docRef, {
    ...data,
    status: MODERATION_ENABLED ? "pending" : "active",
    rejectionReason: null,
    moderationNote: null,
    moderatedBy: null,
    moderatedAt: null,
    updatedAt: serverTimestamp(),
  });
}

// ============================================================
// STATS operations
// ============================================================

export async function incrementViewCount(listingId: string): Promise<void> {
  if (!FIREBASE_ENABLED || !db) return;

  try {
    const docRef = doc(db, COLLECTION_NAME, listingId);
    await updateDoc(docRef, { viewCount: increment(1) });
  } catch (error) {
    console.error("Error incrementing view count:", error);
  }
}
