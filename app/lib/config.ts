// App configuration - reads from environment variables

// Moderation: when true, new listings go to "pending" status and need admin approval
// When false, listings go directly to "active" status
export const MODERATION_ENABLED = process.env.NEXT_PUBLIC_MODERATION_ENABLED === "true";

// R2 public URL for serving images
export const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "";

// Firebase enabled flag - set to false to use mock data during UI development
export const FIREBASE_ENABLED = process.env.NEXT_PUBLIC_FIREBASE_ENABLED !== "false";
