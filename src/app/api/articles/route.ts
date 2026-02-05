import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from "@/lib/queries";

// Revalidace každých 60 sekund
export const revalidate = 60;

// GET - seznam všech článků
export async function GET() {
  try {
    const articles = getAllArticles();
    return NextResponse.json(articles);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - vytvoř nový článek (vyžaduje přihlášení)
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    console.log("[API] Creating article with data:", body);

    const { title, slug, excerpt, content, date, author, image, category } =
      body;

    if (
      !title ||
      !slug ||
      !excerpt ||
      !content ||
      !date ||
      !author ||
      !category
    ) {
      console.log("[API] Missing fields:", {
        title,
        slug,
        excerpt,
        content,
        date,
        author,
        image,
        category,
      });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = createArticle({
      title,
      slug,
      excerpt,
      content,
      date,
      author,
      image: image || "/images/placeholder.webp",
      category,
    });

    console.log("[API] Article created with ID:", result.lastInsertRowid);
    return NextResponse.json({ id: result.lastInsertRowid, success: true });
  } catch (error: any) {
    if (error.message.includes("UNIQUE")) {
      return NextResponse.json(
        { error: "Článek s tímto slug již existuje" },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT - aktualizuj článek (vyžaduje přihlášení)
export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing article ID" },
        { status: 400 }
      );
    }

    updateArticle(id, updates);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - smaž článek (vyžaduje přihlášení)
export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing article ID" },
        { status: 400 }
      );
    }

    deleteArticle(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
