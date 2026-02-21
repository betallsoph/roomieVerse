import { R2_PUBLIC_URL } from "./config";

const MAX_DIMENSION = 1920; // Max width/height
const QUALITY = 0.8; // JPEG/WebP quality

/**
 * Compress an image on the client side using Canvas.
 * Reduces file size significantly before upload.
 */
async function compressImage(file: File): Promise<File> {
  // Skip compression for small files (< 500KB)
  if (file.size < 500 * 1024) return file;

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;

      // Scale down if exceeds max dimension
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob && blob.size < file.size) {
            resolve(new File([blob], file.name, { type: "image/webp" }));
          } else {
            resolve(file); // Keep original if compression didn't help
          }
        },
        "image/webp",
        QUALITY
      );
    };
    img.onerror = () => resolve(file);
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Convert a base64 data URL to a File object.
 */
function base64ToFile(dataUrl: string): File {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
  const bstr = atob(arr[1]);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);
  for (let i = 0; i < n; i++) u8arr[i] = bstr.charCodeAt(i);
  return new File([u8arr], `image.${mime.split("/")[1] || "jpg"}`, { type: mime });
}

/**
 * Upload images to R2 via presigned URLs.
 * Flow: Client → API (get signed URL, ~200ms) → Client uploads directly to R2
 *
 * This bypasses Vercel's 4.5MB body limit and 10s timeout.
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
        file = base64ToFile(image);
      } else {
        file = image;
      }

      // Compress before upload
      file = await compressImage(file);

      // Step 1: Get presigned URL from our API (tiny JSON request, no file data)
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentType: file.type,
          folder,
          id,
        }),
      });

      if (!res.ok) {
        console.error("Failed to get presigned URL:", await res.text());
        if (typeof image === "string") uploadedUrls.push(image);
        continue;
      }

      const { presignedUrl, publicUrl } = await res.json();

      // Step 2: Upload file directly to R2 (bypasses Vercel entirely)
      const uploadRes = await fetch(presignedUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadRes.ok) {
        console.error("R2 upload failed:", uploadRes.status);
        if (typeof image === "string") uploadedUrls.push(image);
        continue;
      }

      uploadedUrls.push(publicUrl);
    } catch (error) {
      console.error("Image upload error:", error);
      if (typeof image === "string") uploadedUrls.push(image);
    }
  }

  return uploadedUrls;
}
