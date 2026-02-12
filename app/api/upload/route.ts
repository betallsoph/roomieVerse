import { NextRequest, NextResponse } from "next/server";
import { r2Client, R2_BUCKET_NAME, PutObjectCommand } from "../../lib/r2";

const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "listings";
    const id = (formData.get("id") as string) || Date.now().toString();

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, and WebP are allowed." },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum 5MB." },
        { status: 400 }
      );
    }

    // Generate unique filename
    const ext = file.type.split("/")[1] === "jpeg" ? "jpg" : file.type.split("/")[1];
    const filename = `${folder}/${id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to R2
    await r2Client.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: filename,
        Body: buffer,
        ContentType: file.type,
      })
    );

    // Return public URL
    const url = `${R2_PUBLIC_URL}/${filename}`;

    return NextResponse.json({ url, key: filename });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
