import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const updateContentSchema = z.object({
  section: z.string().min(1),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  content: z.string().optional(),
  image: z.string().optional(),
  metadata: z.string().optional(),
});

export async function GET() {
  try {
    const sections = await db.websiteSection.findMany({
      orderBy: { section: 'asc' },
    });
    return NextResponse.json(sections);
  } catch (error) {
    console.error('Content GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const data = updateContentSchema.parse(body);

    const section = await db.websiteSection.upsert({
      where: { section: data.section },
      update: {
        title: data.title,
        subtitle: data.subtitle,
        content: data.content,
        image: data.image,
        metadata: data.metadata,
      },
      create: {
        section: data.section,
        title: data.title,
        subtitle: data.subtitle,
        content: data.content,
        image: data.image,
        metadata: data.metadata,
      },
    });

    return NextResponse.json(section);
  } catch (error: any) {
    console.error('Content PUT error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}
