import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * GET handler to fetch all available appointment slots from the database.
 * Orders slots chronologically by date and start time.
 */
export async function GET() {
  try {
    // Step 1: Query database for slots with status strictly equal to "AVAILABLE"
    const slots = await prisma.appointmentSlot.findMany({
      where: {
        status: 'AVAILABLE',
      },
      orderBy: [
        { date: 'asc' },
        { startTime: 'asc' },
      ],
    });

    // Step 2: Return successful JSON response with slot data
    return NextResponse.json(slots, { status: 200 });
  } catch (error) {
    // Step 3: Handle potential database or execution errors gracefully
    console.error('Error fetching appointment slots:', error);
    return NextResponse.json(
      { error: 'خطایی در دریافت نوبت‌های فعال رخ داده است.' },
      { status: 500 }
    );
  }
}
