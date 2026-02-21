import { NextRequest, NextResponse } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2Client, R2_BUCKET_NAME, PutObjectCommand } from "../../lib/r2";

const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contentType, folder = "listings", id } = body as {
      contentType: string;
      folder?: string;
      id?: string;
    };

    if (!contentType) {
      return NextResponse.json({ error: "Missing contentType" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(contentType)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, and WebP are allowed." },
        { status: 400 }
      );
    }

    // Generate unique key
    const ext = contentType.split("/")[1] === "jpeg" ? "jpg" : contentType.split("/")[1];
    const fileId = id || Date.now().toString();
    const key = `${folder}/${fileId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    // Create presigned URL — client uploads directly to R2 (bypasses Vercel 4.5MB limit)
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    });

    const presignedUrl = await getSignedUrl(r2Client, command, { expiresIn: 300 });

    const publicUrl = `${R2_PUBLIC_URL}/${key}`;

    return NextResponse.json({ presignedUrl, publicUrl, key });
  } catch (error) {
    console.error("Presign error:", error);
    return NextResponse.json({ error: "Failed to generate upload URL" }, { status: 500 });
  }
}
