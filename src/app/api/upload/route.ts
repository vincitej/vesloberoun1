import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "articles";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Generuj unikátní název
    const timestamp = Date.now();
    const extension = file.name.includes(".")
      ? `.${file.name.split(".").pop()}`
      : "";
    const baseName = file.name
      .replace(extension, "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    const fileName = `${baseName || "upload"}-${timestamp}${extension}`;

    const blob = await put(`uploads/${folder}/${fileName}`, file, {
      access: "public",
      contentType: file.type || "application/octet-stream",
    });

    return NextResponse.json({ url: blob.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
