import { R2_PUBLIC_URL } from "./config";

/**
 * Upload images to R2 via API route.
 * Falls back to keeping base64 data URLs if R2 is not configured.
 *
 * @param images - Array of base64 data URLs or File objects
 * @param folder - "listings" or "avatars"
 * @param id - listing ID or user ID
 * @returns Array of image URLs (R2 URLs or original base64)
 */
export async function uploadImages(
  images: (string | File)[],
  folder: string = "listings",
  id: string = Date.now().toString()
): Promise<string[]> {
  // If R2 is not configured, return images as-is (base64 strings)
  if (!R2_PUBLIC_URL) {
    return images.filter((img): img is string => typeof img === "string");
  }

  const uploadedUrls: string[] = [];

  for (const image of images) {
    try {
      let file: File;

      if (typeof image === "string") {
        // Skip if already an R2 URL (re-submission case)
        if (image.startsWith("http")) {
          uploadedUrls.push(image);
          continue;
        }
        // Convert base64 data URL to File
        const response = await fetch(image);
        const blob = await response.blob();
        file = new File([blob], `image.${blob.type.split("/")[1] || "jpg"}`, { type: blob.type });
      } else {
        file = image;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      formData.append("id", id);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("Upload failed:", await res.text());
        // Fall back to base64 if upload fails
        if (typeof image === "string") uploadedUrls.push(image);
        continue;
      }

      const { url } = await res.json();
      uploadedUrls.push(url);
    } catch (error) {
      console.error("Image upload error:", error);
      // Fall back to original if upload fails
      if (typeof image === "string") uploadedUrls.push(image);
    }
  }

  return uploadedUrls;
}
