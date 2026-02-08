import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  getAllGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from "@/lib/galleryQueries";

// Revalidace každých 60 sekund
export const revalidate = 60;

// GET - seznam všech obrázků (veřejné)
export async function GET() {
  try {
    const images = await getAllGalleryImages();
    return NextResponse.json(images);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - přidej nový obrázek (vyžaduje přihlášení)
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    console.log("[GALLERY API] Creating image with data:", body);

    const { title, url, thumbnail, year } = body;

    if (!title || !url || !thumbnail || !year) {
      console.log("[GALLERY API] Missing fields");
      return NextResponse.json(
        { error: "Missing required fields: title, url, thumbnail, year" },
        { status: 400 },
      );
    }

    const yearInt = parseInt(year);
    if (isNaN(yearInt)) {
      console.log("[GALLERY API] Invalid year:", year);
      return NextResponse.json(
        { error: "Year must be a valid number" },
        { status: 400 },
      );
    }

    const maxOrder = (await getAllGalleryImages()).reduce(
      (max, img) => Math.max(max, img.order),
      0,
    );

    const id = await createGalleryImage({
      title,
      url,
      thumbnail,
      year: yearInt,
      order: maxOrder + 1,
    });

    console.log("[GALLERY API] Image created with ID:", id);
    return NextResponse.json({ id, success: true });
  } catch (error: any) {
    console.error("[GALLERY API] Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT - uprav obrázek (vyžaduje přihlášení)
export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, title, url, thumbnail, year, order } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const yearInt = year ? parseInt(year) : undefined;
    if (year && isNaN(yearInt!)) {
      return NextResponse.json(
        { error: "Year must be a valid number" },
        { status: 400 },
      );
    }

    await updateGalleryImage(id, {
      title,
      url,
      thumbnail,
      year: yearInt,
      order,
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - smaž obrázek (vyžaduje přihlášení)
export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    await deleteGalleryImage(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
