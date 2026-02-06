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
  moveInTime?: string[]; // ["early-month", "end-month", "any", "asap"]
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
  location: string; // Combined address for display (backward compatible)
  city?: string; // City/Province
  district?: string; // District
  specificAddress?: string; // Specific address
  addressOther?: string; // Other address info
  buildingName?: string; // Building/Block/Apartment name
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
  introduction?: string; // Self introduction
  images?: string[]; // Image URLs or base64
  amenities?: string[]; // ["ac", "wifi", "washing", ...]
  amenitiesOther?: string; // Custom amenities
  preferences?: RoommatePreferences;
  costs?: RoomCosts; // For have-room listings
  // Room details (for have-room)
  roomSize?: string; // m²
  currentOccupants?: string; // Number of people currently living
  minContractDuration?: string; // Minimum contract duration
  // Draft status
  isDraft?: boolean;
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
