// Category types
export type RoommateType = "have-room" | "find-partner";
export type PropertyType = "house" | "apartment";

// Listing status
export type ListingStatus = "active" | "hidden" | "deleted";

// Listing interface
export interface RoomListing {
  id: number | string;
  title: string;
  author: string;
  price: string;
  location: string;
  moveInDate: string;
  description: string;
  phone: string;
  postedDate: string;
  category: "roommate" | "roomshare";
  roommateType?: RoommateType; // Only for roommate category
  propertyType?: PropertyType; // Only for roomshare category
  image?: string;
  userId?: string; // Firebase Auth user ID
  status?: ListingStatus; // Listing status
}

// Lifestyle preferences interface
export interface LifestylePreferences {
  schedule?: string[];
  cleanliness?: string[];
  habits?: string[];
  otherHabits?: string;
}

// User profile interface
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  gender?: string;
  birthYear?: string;
  occupation?: string;
  lifestyle?: LifestylePreferences;
  createdAt?: string;
  updatedAt?: string;
}
