import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import { mockListings } from "./mockListings";
import { RoomListing } from "./types";

// Toggle between mock data and real Firestore data
export const USE_MOCK_DATA = false;

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

// Get listing by ID
export async function getListingById(id: number | string): Promise<RoomListing | null> {
  if (USE_MOCK_DATA) {
    return mockListings.find(listing => listing.id === id) || null;
  }

  // Check localStorage first (for dev/testing)
  const localRoommateListings = getLocalStorageListings("roommate");
  const localRoomshareListings = getLocalStorageListings("roomshare");
  const localListing = [...localRoommateListings, ...localRoomshareListings].find(l => l.id === id);
  if (localListing) {
    return localListing;
  }

  // Then check Firestore
  const docRef = doc(db, COLLECTION_NAME, String(id));
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

    const localData = JSON.parse(stored) as Array<{
      id: string;
      type?: string;
      title: string;
      introduction?: string;
      location: string;
      budget?: string;
      moveInTime?: string;
      createdAt: string;
      userId?: string;
    }>;

    // Convert localStorage format to RoomListing format
    return localData.map((item) => ({
      id: item.id,
      title: item.title,
      author: "Bạn", // Current user
      price: item.budget || "Thương lượng",
      location: item.location,
      moveInDate: item.moveInTime || "Linh hoạt",
      description: item.introduction || "",
      phone: "",
      postedDate: new Date(item.createdAt).toLocaleDateString("vi-VN"),
      category: category,
      roommateType: item.type === "have-room" ? "have-room" : "find-partner",
      propertyType: "apartment" as const,
      userId: item.userId,
      status: "active" as const,
    }));
  } catch {
    return [];
  }
}

// Get listings by user ID
export async function getListingsByUserId(userId: string): Promise<RoomListing[]> {
  if (USE_MOCK_DATA) {
    // Mock: return empty for now since mock data doesn't have userId
    return [];
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
