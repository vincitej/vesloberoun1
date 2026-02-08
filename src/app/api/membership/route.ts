import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  createMembershipLink,
  deleteMembershipLink,
  getMembershipSections,
  updateMembershipLink,
  updateMembershipSection,
} from "@/lib/membershipQueries";

export const revalidate = 60;

export async function GET() {
  try {
    const sections = await getMembershipSections();
    return NextResponse.json(sections);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { sectionKey, label, url, isDownload, order } = body;

    if (!sectionKey || !label || !url) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const id = await createMembershipLink({
      section_key: sectionKey,
      label,
      url,
      is_download: !!isDownload,
      order: order ?? 0,
    });

    return NextResponse.json({ id, success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type } = body;

    if (type === "section") {
      const { id, title, description, order } = body;
      if (!id) {
        return NextResponse.json(
          { error: "Missing section id" },
          { status: 400 },
        );
      }
      await updateMembershipSection(id, { title, description, order });
      return NextResponse.json({ success: true });
    }

    if (type === "link") {
      const { id, label, url, isDownload, order } = body;
      if (!id) {
        return NextResponse.json({ error: "Missing link id" }, { status: 400 });
      }
      await updateMembershipLink(id, {
        label,
        url,
        is_download: isDownload,
        order,
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing link id" }, { status: 400 });
    }

    await deleteMembershipLink(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
