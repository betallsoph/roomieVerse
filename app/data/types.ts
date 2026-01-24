// Category types
export type RoommateType = "have-room" | "find-partner";
export type PropertyType = "house" | "apartment";

// Listing status
export type ListingStatus = "active" | "hidden" | "deleted";

// Roommate preferences interface
export interface RoommatePreferences {
  gender?: string[]; // ["male", "female", "any"]
  status?: string[]; // ["student", "worker", "other"]
  statusOther?: string;
  schedule?: string[]; // ["early", "late", "flexible"]
  cleanliness?: string[]; // ["very-clean", "normal", "relaxed"]
  habits?: string[]; // ["no-smoke", "no-alcohol", "flexible"]
  pets?: string[]; // ["no-pets", "cats-ok", "dogs-ok", "any-pets"]
  other?: string;
}

// Cost structure for have-room listings
export interface RoomCosts {
  rent?: string;
  deposit?: string;
  electricity?: string;
  water?: string;
  internet?: string;
  service?: string;
  parking?: string;
  management?: string;
  other?: string;
}

// Listing interface
export interface RoomListing {
  id: number | string;
  title: string;
  author: string;
  price: string;
  location: string;
  locationNegotiable?: boolean;
  moveInDate: string;
  timeNegotiable?: boolean;
  description: string;
  propertyTypes?: string[]; // ["house", "apartment"]
  phone: string;
  zalo?: string;
  facebook?: string;
  instagram?: string;
  postedDate: string;
  category: "roommate" | "roomshare";
  roommateType?: RoommateType;
  propertyType?: PropertyType;
  image?: string;
  userId?: string;
  status?: ListingStatus;

  // New fields from create form
  preferences?: RoommatePreferences;
  costs?: RoomCosts; // For have-room listings
}

// Lifestyle preferences interface (for user profile)
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
