// Category types
export type RoommateType = "have-room" | "find-partner";
export type PropertyType = "house" | "apartment";

// Listing interface
export interface RoomListing {
  id: number;
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
}
