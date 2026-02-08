import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from "@/lib/queries";

export const revalidate = 0;

// GET - seznam všech článků
export async function GET() {
  try {
    const articles = await getAllArticles();
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
        { status: 400 },
      );
    }

    const id = await createArticle({
      title,
      slug,
      excerpt,
      content,
      date,
      author,
      image: image || "/images/placeholder.webp",
      category,
    });

    revalidatePath("/aktuality");
    revalidatePath(`/aktuality/${slug}`);
    revalidatePath("/");

    console.log("[API] Article created with ID:", id);
    return NextResponse.json({ id, success: true });
  } catch (error: any) {
    if (error.message.includes("UNIQUE")) {
      return NextResponse.json(
        { error: "Článek s tímto slug již existuje" },
        { status: 400 },
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
        { status: 400 },
      );
    }

    await updateArticle(id, updates);
    const updatedSlug = updates.slug as string | undefined;
    if (updatedSlug) {
      revalidatePath(`/aktuality/${updatedSlug}`);
    } else {
      const existing = await getArticleById(id);
      if (existing?.slug) revalidatePath(`/aktuality/${existing.slug}`);
    }
    revalidatePath("/aktuality");
    revalidatePath("/");
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
        { status: 400 },
      );
    }

    const articleId = parseInt(id);
    const existing = await getArticleById(articleId);
    await deleteArticle(articleId);
    revalidatePath("/aktuality");
    if (existing?.slug) revalidatePath(`/aktuality/${existing.slug}`);
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
