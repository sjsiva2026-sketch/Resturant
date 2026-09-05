import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const facilities = await prisma.facility.findMany({
      where: { isActive: true }
    });
    return NextResponse.json(facilities);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch facilities' }, { status: 500 });
  }
}
