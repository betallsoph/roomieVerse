import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth, getAdminDb } from "../../../lib/firebase-admin";

const VALID_ROLES = ["user", "mod", "tester"];

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
    const { uid, role } = (await request.json()) as { uid: string; role: string };

    if (!uid || !role) {
      return NextResponse.json({ error: "Missing uid or role" }, { status: 400 });
    }

    if (!VALID_ROLES.includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Prevent changing own role
    if (uid === decodedToken.uid) {
      return NextResponse.json({ error: "Cannot change own role" }, { status: 400 });
    }

    // Update role using Admin SDK (bypasses Firestore rules)
    const userRef = adminDb.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await userRef.update({ role, updatedAt: new Date().toISOString() });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Set role error:", error);
    return NextResponse.json({ error: "Failed to set role" }, { status: 500 });
  }
}
