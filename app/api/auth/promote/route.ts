import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth, getAdminDb } from "../../../lib/firebase-admin";

// Server-only: admin emails never exposed to client
const ADMIN_EMAILS: string[] = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map(e => e.trim().toLowerCase())
  .filter(Boolean);

export async function POST(request: NextRequest) {
  try {
    // Get the Firebase ID token from Authorization header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing auth token" }, { status: 401 });
    }

    const idToken = authHeader.split("Bearer ")[1];

    // Verify the token with Firebase Admin
    const adminAuth = getAdminAuth();
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    if (!email) {
      return NextResponse.json({ error: "No email in token" }, { status: 400 });
    }

    // Check if email is in admin list
    const isAdminEmail = ADMIN_EMAILS.includes(email.toLowerCase());

    if (!isAdminEmail) {
      return NextResponse.json({ isAdmin: false });
    }

    // Promote to admin in Firestore (server-side, bypasses client rules)
    const adminDb = getAdminDb();
    const userRef = adminDb.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      await userRef.update({ role: "admin", updatedAt: new Date().toISOString() });
    } else {
      // Create user profile with admin role
      await userRef.set({
        uid,
        email,
        displayName: decodedToken.name || "",
        photoURL: decodedToken.picture || null,
        role: "admin",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ isAdmin: true });
  } catch (error) {
    console.error("Admin promote error:", error);
    return NextResponse.json({ error: "Auth failed" }, { status: 401 });
  }
}
