import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth, getAdminDb } from "../../../lib/firebase-admin";

async function deleteCollection(
  db: FirebaseFirestore.Firestore,
  collectionName: string,
  field: string,
  uid: string
) {
  const snapshot = await db
    .collection(collectionName)
    .where(field, "==", uid)
    .get();

  if (snapshot.empty) return 0;

  // Firestore batch max 500 ops
  const batches: FirebaseFirestore.WriteBatch[] = [];
  let batch = db.batch();
  let count = 0;

  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
    count++;
    if (count % 500 === 0) {
      batches.push(batch);
      batch = db.batch();
    }
  });

  batches.push(batch);
  await Promise.all(batches.map((b) => b.commit()));
  return count;
}

export async function POST(request: NextRequest) {
  try {
    // Verify requester is authenticated
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing auth token" }, { status: 401 });
    }

    const idToken = authHeader.split("Bearer ")[1];
    const adminAuth = getAdminAuth();
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    // Check requester is admin
    const adminDb = getAdminDb();
    const requesterDoc = await adminDb.collection("users").doc(decodedToken.uid).get();
    if (!requesterDoc.exists || requesterDoc.data()?.role !== "admin") {
      return NextResponse.json({ error: "Admin only" }, { status: 403 });
    }

    // Parse request
    const { uid } = (await request.json()) as { uid: string };

    if (!uid) {
      return NextResponse.json({ error: "Missing uid" }, { status: 400 });
    }

    // Prevent deleting self
    if (uid === decodedToken.uid) {
      return NextResponse.json({ error: "Cannot delete yourself" }, { status: 400 });
    }

    // Check target user exists and is not admin
    const userDoc = await adminDb.collection("users").doc(uid).get();
    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (userDoc.data()?.role === "admin") {
      return NextResponse.json({ error: "Cannot delete admin users" }, { status: 400 });
    }

    // Delete all related data
    const deleted: Record<string, number> = {};

    deleted.listings = await deleteCollection(adminDb, "listings", "userId", uid);
    deleted.community_posts = await deleteCollection(adminDb, "community_posts", "authorId", uid);
    deleted.community_comments = await deleteCollection(adminDb, "community_comments", "authorId", uid);
    deleted.community_likes = await deleteCollection(adminDb, "community_likes", "userId", uid);
    deleted.favorites = await deleteCollection(adminDb, "favorites", "userId", uid);
    deleted.reports = await deleteCollection(adminDb, "reports", "reporterId", uid);

    // Delete user profile document
    await adminDb.collection("users").doc(uid).delete();

    // Delete Firebase Auth user
    try {
      await adminAuth.deleteUser(uid);
    } catch (authError: unknown) {
      // User might not exist in Auth (e.g. manually created Firestore doc)
      const err = authError as { code?: string };
      if (err.code !== "auth/user-not-found") {
        console.error("Error deleting auth user:", authError);
      }
    }

    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
