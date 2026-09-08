import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, phone, password } = await req.json();

    if (!phone || !password) {
      return NextResponse.json(
        { error: "شماره موبایل و رمز عبور الزامی هستند." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { phone },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "کاربری با این شماره موبایل قبلاً ثبت‌نام کرده است." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        phone,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "ثبت‌نام با موفقیت انجام شد.",
        user: {
          id: user.id,
          name: user.name,
          phone: user.phone,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "خطایی در برقراری ارتباط رخ داده است." },
      { status: 500 }
    );
  }
}
