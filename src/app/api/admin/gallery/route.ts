import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

// Minimal mock for gallery since file upload handling requires formidable/busboy or direct cloud URLs
const gallerySchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
  category: z.string().optional()
});

export async function GET() {
  try {
    const images = await db.galleryImage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(images);
  } catch (error) {
    console.error('Gallery GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // In a real app, this would handle multipart/form-data and upload to S3/Cloudinary
    const body = await req.json();
    const data = gallerySchema.parse(body);

    const image = await db.galleryImage.create({
      data
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error('Gallery POST error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to add gallery image' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    await db.galleryImage.delete({ where: { id } });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Gallery DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete gallery image' }, { status: 500 });
  }
}
