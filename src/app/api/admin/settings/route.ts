import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const settingsSchema = z.record(z.string(), z.string());

export async function GET() {
  try {
    const settings = await db.hotelSetting.findMany();
    const formatted = settings.reduce((acc: Record<string, string>, s) => {
      acc[s.key] = s.value;
      return acc;
    }, {});
    
    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const data = settingsSchema.parse(body);

    await db.$transaction(
      Object.entries(data).map(([key, value]) => 
        db.hotelSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Settings PUT error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
