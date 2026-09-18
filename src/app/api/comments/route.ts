import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const targetId = searchParams.get("targetId");

    if (!targetId) {
      return NextResponse.json(
        { error: "شناسه هدف الزامی است." },
        { status: 400 }
      );
    }

    const comments = await prisma.comment.findMany({
      where: {
        targetId,
        status: "APPROVED",
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "خطا در دریافت دیدگاه‌ها." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content, rating, targetId, userId } = body;

    if (!content || !targetId) {
      return NextResponse.json(
        { error: "متن دیدگاه و شناسه هدف الزامی هستند." },
        { status: 400 }
      );
    }

    const newComment = await prisma.comment.create({
      data: {
        content,
        rating: rating ? Number(rating) : null,
        targetId,
        userId: userId || null,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      {
        message: "دیدگاه شما ثبت شد و پس از تایید نمایش داده می‌شود.",
        comment: newComment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "خطا در ثبت دیدگاه." },
      { status: 500 }
    );
  }
}
