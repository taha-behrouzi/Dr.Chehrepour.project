import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'کد تخفیف نامعتبر است.' },
        { status: 404 }
      );
    }

    const discountCode = await prisma.discountCode.findUnique({
      where: { code },
    });

    if (!discountCode || !discountCode.isActive) {
      return NextResponse.json(
        { error: 'کد تخفیف نامعتبر است.' },
        { status: 404 }
      );
    }

    if (new Date(discountCode.expiresAt) < new Date()) {
      return NextResponse.json(
        { error: 'کد تخفیف منقضی شده است.' },
        { status: 400 }
      );
    }

    if (
      discountCode.maxUsage !== null &&
      discountCode.usageCount >= discountCode.maxUsage
    ) {
      return NextResponse.json(
        { error: 'ظرفیت استفاده از این کد تکمیل شده است.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, percent: discountCode.discountPercent },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'خطایی در تایید کد تخفیف رخ داد.' },
      { status: 500 }
    );
  }
}
