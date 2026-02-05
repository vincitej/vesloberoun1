import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

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
    const extension = path.extname(file.name);
    const baseName = path
      .basename(file.name, extension)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-");
    const fileName = `${baseName}-${timestamp}${extension}`;

    // Vytvoř složku pokud neexistuje
    const uploadDir = path.join(process.cwd(), "public", "images", folder);
    await mkdir(uploadDir, { recursive: true });

    // Ulož do public/images/{folder}
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    // Vrať relativní cestu
    const relativePath = `/images/${folder}/${fileName}`;

    return NextResponse.json({ url: relativePath });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
