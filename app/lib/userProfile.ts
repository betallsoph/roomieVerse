import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { UserProfile } from "../data/types";
import { mockUsers } from "../data/mockUsers";

const USERS_COLLECTION = "users";

// Toggle to use mock data for testing
const USE_MOCK_DATA = true;

/**
 * Get user profile by user ID
 * @param userId - Firebase Auth user ID
 * @returns UserProfile or null if not found
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
    // Check mock data first (for development/testing)
    if (USE_MOCK_DATA) {
        const mockUser = mockUsers.find(u => u.uid === userId);
        if (mockUser) {
            return mockUser;
        }
    }

    try {
        if (!db) throw new Error("Firestore not initialized");
        const userDocRef = doc(db, USERS_COLLECTION, userId);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            return null;
        }

        const data = userDoc.data();
        return {
            uid: userDoc.id,
            email: data.email || "",
            displayName: data.displayName || "Người dùng",
            photoURL: data.photoURL,
            gender: data.gender,
            birthYear: data.birthYear,
            occupation: data.occupation,
            lifestyle: data.lifestyle,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
}
