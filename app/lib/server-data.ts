import { cache } from "react";
import { getAdminDb } from "./firebase-admin";
import { RoomListing, CommunityPost, CommunityCategory } from "../data/types";

// ============================================================
// Server-side data fetching using Firebase Admin SDK
// Used by server components for SSR metadata + initial props
// ============================================================

function formatDate(isoString: string): string {
  try {
    return new Date(isoString).toLocaleDateString("vi-VN");
  } catch {
    return isoString;
  }
}

function timestampToString(ts: FirebaseFirestore.Timestamp | string | null | undefined): string {
  if (!ts) return new Date().toISOString();
  if (typeof ts === "string") return ts;
  if (ts && typeof ts === "object" && "toDate" in ts) return ts.toDate().toISOString();
  return new Date().toISOString();
}

// ============================================================
// Listing
// ============================================================

function docToListing(docSnap: FirebaseFirestore.DocumentSnapshot): RoomListing {
  const d = docSnap.data() || {};
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
    postedDate: (d.postedDate as string) || formatDate(timestampToString(d.createdAt as FirebaseFirestore.Timestamp)),
    category: (d.category as RoomListing["category"]) || "roommate",
    roommateType: d.roommateType as RoomListing["roommateType"],
    propertyType: d.propertyType as RoomListing["propertyType"],
    image: d.image as string | undefined,
    images: d.images as string[] | undefined,
    amenities: d.amenities as string[] | undefined,
    amenitiesOther: d.amenitiesOther as string | undefined,
    userId: d.userId as string | undefined,
    status: (d.status as RoomListing["status"]) || "active",
    preferences: d.preferences as RoomListing["preferences"],
    costs: d.costs as RoomListing["costs"],
    roomSize: d.roomSize as string | undefined,
    currentOccupants: d.currentOccupants as string | undefined,
    totalRooms: d.totalRooms as string | undefined,
    othersIntro: d.othersIntro as string | undefined,
    minContractDuration: d.minContractDuration as string | undefined,
    isDraft: d.isDraft as boolean | undefined,
    createdAt: timestampToString(d.createdAt as FirebaseFirestore.Timestamp),
    updatedAt: timestampToString(d.updatedAt as FirebaseFirestore.Timestamp),
    moderatedBy: d.moderatedBy as string | undefined,
    moderatedAt: d.moderatedAt ? timestampToString(d.moderatedAt as FirebaseFirestore.Timestamp) : undefined,
    rejectionReason: d.rejectionReason as string | undefined,
    moderationNote: d.moderationNote as string | undefined,
    viewCount: (d.viewCount as number) || 0,
    favoriteCount: (d.favoriteCount as number) || 0,
  };
}

/** Get a single listing by ID (server-side, cached per request) */
export const getListingServer = cache(async (id: string): Promise<RoomListing | null> => {
  try {
    const db = getAdminDb();
    const docSnap = await db.collection("listings").doc(id).get();
    if (!docSnap.exists) return null;
    return docToListing(docSnap);
  } catch (error) {
    console.error("getListingServer error:", error);
    return null;
  }
});

/** Get all active listing IDs for sitemap */
export const getActiveListingIds = cache(async (): Promise<{ id: string; category: string; updatedAt: string }[]> => {
  try {
    const db = getAdminDb();
    const snap = await db.collection("listings")
      .where("status", "==", "active")
      .select("category", "updatedAt", "createdAt")
      .get();
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        category: (data.category as string) || "roommate",
        updatedAt: timestampToString(data.updatedAt || data.createdAt),
      };
    });
  } catch (error) {
    console.error("getActiveListingIds error:", error);
    return [];
  }
});

// ============================================================
// Community Post
// ============================================================

function docToPost(docSnap: FirebaseFirestore.DocumentSnapshot): CommunityPost {
  const d = docSnap.data() || {};
  return {
    id: docSnap.id,
    authorId: (d.authorId as string) || "",
    authorName: (d.authorName as string) || "",
    authorPhoto: d.authorPhoto as string | undefined,
    category: (d.category as CommunityCategory) || "tips",
    title: (d.title as string) || "",
    content: (d.content as string) || "",
    preview: (d.preview as string) || "",
    likes: (d.likes as number) || 0,
    comments: (d.comments as number) || 0,
    views: (d.views as number) || 0,
    hot: d.hot as boolean | undefined,
    location: d.location as string | undefined,
    rating: d.rating as number | undefined,
    price: d.price as string | undefined,
    images: d.images as string[] | undefined,
    status: (d.status as CommunityPost["status"]) || "active",
    moderatedBy: d.moderatedBy as string | undefined,
    rejectionReason: d.rejectionReason as string | undefined,
    createdAt: timestampToString(d.createdAt as FirebaseFirestore.Timestamp),
    updatedAt: timestampToString(d.updatedAt as FirebaseFirestore.Timestamp),
  };
}

/** Get a single community post by ID (server-side, cached per request) */
export const getPostServer = cache(async (id: string): Promise<CommunityPost | null> => {
  try {
    const db = getAdminDb();
    const docSnap = await db.collection("community_posts").doc(id).get();
    if (!docSnap.exists) return null;
    return docToPost(docSnap);
  } catch (error) {
    console.error("getPostServer error:", error);
    return null;
  }
});

/** Get all active post IDs for sitemap */
export const getActivePostIds = cache(async (): Promise<{ id: string; updatedAt: string }[]> => {
  try {
    const db = getAdminDb();
    const snap = await db.collection("community_posts")
      .where("status", "==", "active")
      .select("updatedAt", "createdAt")
      .get();
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        updatedAt: timestampToString(data.updatedAt || data.createdAt),
      };
    });
  } catch (error) {
    console.error("getActivePostIds error:", error);
    return [];
  }
});
