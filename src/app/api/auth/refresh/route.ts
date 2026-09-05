import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'fallback-refresh-key-change-in-production';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token provided' }, { status: 401 });
    }

    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as { id: string, role?: string };

      // In a real app, you should also verify the user still exists in the DB
      // and that the refresh token isn't blacklisted

      // Generate new access token
      const newAccessToken = jwt.sign(
        { id: decoded.id, role: decoded.role || 'GUEST' },
        JWT_SECRET,
        { expiresIn: '15m' }
      );

      // Set new cookie
      cookieStore.set('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 15 * 60,
      });

      return NextResponse.json({ success: true });
    } catch (jwtError) {
      // If refresh token is invalid/expired, we should log them out by clearing it
      cookieStore.delete('accessToken');
      cookieStore.delete('refreshToken');
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
    }
  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
