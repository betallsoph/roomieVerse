import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import { mockListings } from "./mockListings";
import { RoomListing } from "./types";

// Toggle between mock data and real Firestore data
export const USE_MOCK_DATA = true;

const COLLECTION_NAME = "listings";

// Convert Firestore document to RoomListing
function docToListing(docSnap: { id: string; data: () => Record<string, unknown> }): RoomListing {
  const data = docSnap.data();
  return {
    id: docSnap.id || (data.id as string | number),
    title: data.title as string,
    author: data.author as string,
    price: data.price as string,
    location: data.location as string,
    moveInDate: data.moveInDate as string,
    description: data.description as string,
    phone: data.phone as string,
    zalo: data.zalo as string | undefined,
    facebook: data.facebook as string | undefined,
    instagram: data.instagram as string | undefined,
    postedDate: data.postedDate as string,
    category: data.category as "roommate" | "roomshare",
    roommateType: data.roommateType as RoomListing["roommateType"],
    propertyType: data.propertyType as RoomListing["propertyType"],
    image: data.image as string | undefined,
    userId: data.userId as string | undefined,
    status: data.status as RoomListing["status"],
  };
}

// Get all listings
export async function getListings(): Promise<RoomListing[]> {
  if (USE_MOCK_DATA) {
    return mockListings;
  }

  const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
  return querySnapshot.docs.map(docToListing);
}

// Helper: Get category from ID prefix
function getCategoryFromId(id: string): "roommate" | "roomshare" | null {
  if (id.startsWith("rm-")) return "roommate";
  if (id.startsWith("rs-")) return "roomshare";
  return null;
}

// Get listing by ID
export async function getListingById(id: number | string): Promise<RoomListing | null> {
  const idStr = String(id);

  // Always check localStorage first (for newly created listings)
  const prefixCategory = getCategoryFromId(idStr);
  if (prefixCategory) {
    const localListings = getLocalStorageListings(prefixCategory);
    const found = localListings.find(l => l.id === idStr);
    if (found) return found;
  } else {
    // No prefix, check both localStorage stores
    const localRoommateListings = getLocalStorageListings("roommate");
    const localRoomshareListings = getLocalStorageListings("roomshare");
    const localListing = [...localRoommateListings, ...localRoomshareListings].find(l => l.id === idStr);
    if (localListing) {
      return localListing;
    }
  }

  // Then check mock data if enabled
  if (USE_MOCK_DATA) {
    return mockListings.find(listing => String(listing.id) === idStr) || null;
  }

  // Finally check Firestore
  const docRef = doc(db, COLLECTION_NAME, idStr);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docToListing(docSnap);
  }
  return null;
}

// Get listings by category
export async function getListingsByCategory(category: "roommate" | "roomshare"): Promise<RoomListing[]> {
  if (USE_MOCK_DATA) {
    return mockListings.filter(listing => listing.category === category);
  }

  // Get from Firestore
  const q = query(collection(db, COLLECTION_NAME), where("category", "==", category));
  const querySnapshot = await getDocs(q);
  const firestoreListings = querySnapshot.docs.map(docToListing);

  // Also get from localStorage (for dev/testing)
  const localListings = getLocalStorageListings(category);

  // Merge: local listings first (newest), then Firestore
  return [...localListings, ...firestoreListings];
}

// Helper: Get listings from localStorage (for dev/testing before Firestore integration)
function getLocalStorageListings(category: "roommate" | "roomshare"): RoomListing[] {
  if (typeof window === "undefined") return [];

  try {
    const storageKey = category === "roommate" ? "roommate_listings" : "roomshare_listings";
    const stored = localStorage.getItem(storageKey);
    if (!stored) return [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const localData = JSON.parse(stored) as any[];

    // Convert localStorage format to RoomListing format
    return localData.map((item) => ({
      id: item.id,
      title: item.title,
      author: "Bạn", // Current user
      price: item.costs?.rent || item.budget || "Thương lượng",
      location: item.location,
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
      roommateType: item.type === "have-room" ? "have-room" : "find-partner",
      propertyType: "apartment" as const,
      userId: item.userId,
      status: "active" as const,
      // New fields
      images: item.images,
      amenities: item.amenities,
      amenitiesOther: item.amenitiesOther,
      costs: item.costs,
      preferences: item.preferences,
      // Room details
      roomSize: item.roomSize,
      currentOccupants: item.currentOccupants,
      minContractDuration: item.minContractDuration,
      isDraft: item.isDraft,
    }));
  } catch {
    return [];
  }
}

// Get listings by user ID
export async function getListingsByUserId(userId: string): Promise<RoomListing[]> {
  if (USE_MOCK_DATA) {
    // Filter mock listings by userId
    return mockListings.filter(listing => listing.userId === userId);
  }

  // Get from Firestore
  const q = query(collection(db, COLLECTION_NAME), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const firestoreListings = querySnapshot.docs.map(docToListing);

  // Also get from localStorage (for dev/testing)
  const localRoommateListings = getLocalStorageListings("roommate").filter(l => l.userId === userId);
  const localRoomshareListings = getLocalStorageListings("roomshare").filter(l => l.userId === userId);

  // Merge all sources
  return [...localRoommateListings, ...localRoomshareListings, ...firestoreListings];
}
