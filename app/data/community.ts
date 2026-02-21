import {
  collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc,
  query, where, orderBy, limit as firestoreLimit, serverTimestamp, Timestamp, increment,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { FIREBASE_ENABLED, MODERATION_ENABLED } from "../lib/config";
import { CommunityPost, CommunityComment, CommunityCategory } from "./types";

const POSTS_COLLECTION = "community_posts";
const COMMENTS_COLLECTION = "community_comments";
const LIKES_COLLECTION = "community_likes"; // docs: {userId}_{postId} or {userId}_{commentId}

// ============================================================
// Helpers
// ============================================================

function timestampToString(ts: unknown): string {
  if (!ts) return new Date().toISOString();
  if (ts instanceof Timestamp) return ts.toDate().toISOString();
  if (typeof ts === "string") return ts;
  return new Date().toISOString();
}

function docToPost(docSnap: { id: string; data: () => Record<string, unknown> }): CommunityPost {
  const d = docSnap.data();
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
    createdAt: timestampToString(d.createdAt),
    updatedAt: timestampToString(d.updatedAt),
  };
}

function docToComment(docSnap: { id: string; data: () => Record<string, unknown> }): CommunityComment {
  const d = docSnap.data();
  return {
    id: docSnap.id,
    postId: (d.postId as string) || "",
    authorId: (d.authorId as string) || "",
    authorName: (d.authorName as string) || "",
    authorPhoto: d.authorPhoto as string | undefined,
    content: (d.content as string) || "",
    likes: (d.likes as number) || 0,
    status: (d.status as CommunityComment["status"]) || "active",
    createdAt: timestampToString(d.createdAt),
  };
}

// ============================================================
// Posts CRUD
// ============================================================

/** Get community posts (active only, newest first) */
export async function getCommunityPosts(
  category?: CommunityCategory,
  maxResults: number = 50
): Promise<CommunityPost[]> {
  if (!FIREBASE_ENABLED || !db) return [];

  const constraints = [
    where("status", "==", "active"),
    orderBy("createdAt", "desc"),
    firestoreLimit(maxResults),
  ];

  if (category) {
    constraints.unshift(where("category", "==", category));
  }

  const q = query(collection(db, POSTS_COLLECTION), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToPost(d as unknown as { id: string; data: () => Record<string, unknown> }));
}

/** Get a single community post by ID */
export async function getCommunityPostById(id: string): Promise<CommunityPost | null> {
  if (!FIREBASE_ENABLED || !db) return null;

  const docRef = doc(db, POSTS_COLLECTION, id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return docToPost(snap as unknown as { id: string; data: () => Record<string, unknown> });
}

/** Create a community post */
export async function createCommunityPost(data: {
  authorId: string;
  authorName: string;
  authorPhoto?: string;
  category: CommunityCategory;
  title: string;
  content: string;
  location?: string;
  rating?: number;
  price?: string;
  images?: string[];
}, skipModeration = false): Promise<string> {
  if (!FIREBASE_ENABLED || !db) return "mock-post-id";

  const postId = `cp-${Date.now()}`;
  const preview = data.content.slice(0, 150) + (data.content.length > 150 ? "..." : "");

  await setDoc(doc(db, POSTS_COLLECTION, postId), {
    ...data,
    preview,
    likes: 0,
    comments: 0,
    views: 0,
    hot: false,
    status: (MODERATION_ENABLED && !skipModeration) ? "pending" : "active",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return postId;
}

/** Soft-delete a community post */
export async function deleteCommunityPost(id: string): Promise<void> {
  if (!FIREBASE_ENABLED || !db) return;
  await updateDoc(doc(db, POSTS_COLLECTION, id), {
    status: "deleted",
    updatedAt: serverTimestamp(),
  });
}

/** Increment view count */
export async function incrementPostViewCount(postId: string): Promise<void> {
  if (!FIREBASE_ENABLED || !db) return;
  try {
    await updateDoc(doc(db, POSTS_COLLECTION, postId), {
      views: increment(1),
    });
  } catch (err) {
    console.warn("incrementPostViewCount failed:", err);
  }
}

// ============================================================
// Likes (toggle pattern using composite doc IDs)
// ============================================================

/** Toggle like on a post — returns new liked state */
export async function togglePostLike(postId: string, userId: string): Promise<boolean> {
  if (!FIREBASE_ENABLED || !db) return false;

  const likeId = `${userId}_post_${postId}`;
  const likeRef = doc(db, LIKES_COLLECTION, likeId);
  const snap = await getDoc(likeRef);

  if (snap.exists()) {
    await deleteDoc(likeRef);
    await updateDoc(doc(db, POSTS_COLLECTION, postId), { likes: increment(-1) });
    return false;
  } else {
    await setDoc(likeRef, { userId, targetId: postId, type: "post", createdAt: serverTimestamp() });
    await updateDoc(doc(db, POSTS_COLLECTION, postId), { likes: increment(1) });
    return true;
  }
}

/** Check if user liked a post */
export async function isPostLiked(postId: string, userId: string): Promise<boolean> {
  if (!FIREBASE_ENABLED || !db) return false;
  const likeRef = doc(db, LIKES_COLLECTION, `${userId}_post_${postId}`);
  const snap = await getDoc(likeRef);
  return snap.exists();
}

// ============================================================
// Comments CRUD
// ============================================================

/** Get comments for a post (oldest first) */
export async function getCommentsByPostId(postId: string): Promise<CommunityComment[]> {
  if (!FIREBASE_ENABLED || !db) return [];

  const q = query(
    collection(db, COMMENTS_COLLECTION),
    where("postId", "==", postId),
    where("status", "==", "active"),
    orderBy("createdAt", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToComment(d as unknown as { id: string; data: () => Record<string, unknown> }));
}

/** Create a comment */
export async function createComment(data: {
  postId: string;
  authorId: string;
  authorName: string;
  authorPhoto?: string;
  content: string;
}): Promise<string> {
  if (!FIREBASE_ENABLED || !db) return "mock-comment-id";

  const commentId = `cc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  await setDoc(doc(db, COMMENTS_COLLECTION, commentId), {
    ...data,
    likes: 0,
    status: "active",
    createdAt: serverTimestamp(),
  });

  // Increment comment count on post
  try {
    await updateDoc(doc(db, POSTS_COLLECTION, data.postId), {
      comments: increment(1),
    });
  } catch (err) {
    console.warn("Failed to increment comment count:", err);
  }

  return commentId;
}

/** Soft-delete a comment */
export async function deleteComment(commentId: string, postId: string): Promise<void> {
  if (!FIREBASE_ENABLED || !db) return;
  await updateDoc(doc(db, COMMENTS_COLLECTION, commentId), {
    status: "deleted",
  });
  // Decrement comment count
  try {
    await updateDoc(doc(db, POSTS_COLLECTION, postId), {
      comments: increment(-1),
    });
  } catch (err) {
    console.warn("Failed to decrement comment count:", err);
  }
}

/** Toggle like on a comment */
export async function toggleCommentLike(commentId: string, userId: string): Promise<boolean> {
  if (!FIREBASE_ENABLED || !db) return false;

  const likeId = `${userId}_comment_${commentId}`;
  const likeRef = doc(db, LIKES_COLLECTION, likeId);
  const snap = await getDoc(likeRef);

  if (snap.exists()) {
    await deleteDoc(likeRef);
    await updateDoc(doc(db, COMMENTS_COLLECTION, commentId), { likes: increment(-1) });
    return false;
  } else {
    await setDoc(likeRef, { userId, targetId: commentId, type: "comment", createdAt: serverTimestamp() });
    await updateDoc(doc(db, COMMENTS_COLLECTION, commentId), { likes: increment(1) });
    return true;
  }
}

// ============================================================
// Admin Moderation
// ============================================================

/** Get pending community posts (admin) */
export async function getPendingCommunityPosts(): Promise<CommunityPost[]> {
  if (!FIREBASE_ENABLED || !db) return [];

  const q = query(
    collection(db, POSTS_COLLECTION),
    where("status", "==", "pending"),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToPost(d as unknown as { id: string; data: () => Record<string, unknown> }));
}

/** Approve a community post (admin) */
export async function approveCommunityPost(postId: string, adminUid: string): Promise<void> {
  if (!FIREBASE_ENABLED || !db) return;
  await updateDoc(doc(db, POSTS_COLLECTION, postId), {
    status: "active",
    moderatedBy: adminUid,
    updatedAt: serverTimestamp(),
  });
}

/** Reject a community post (admin) */
export async function rejectCommunityPost(postId: string, adminUid: string, reason: string): Promise<void> {
  if (!FIREBASE_ENABLED || !db) return;
  await updateDoc(doc(db, POSTS_COLLECTION, postId), {
    status: "hidden",
    moderatedBy: adminUid,
    rejectionReason: reason,
    updatedAt: serverTimestamp(),
  });
}

/** Hard delete a community post (admin) */
export async function hardDeleteCommunityPost(postId: string): Promise<void> {
  if (!FIREBASE_ENABLED || !db) return;
  await deleteDoc(doc(db, POSTS_COLLECTION, postId));
}
