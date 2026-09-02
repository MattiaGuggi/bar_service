import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { db, findUser } from '@/lib/auth';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm/sql/expressions/conditions';

const APP_PREFIX = 'bar_service_';
const TOKEN_COOKIE_KEY = `${APP_PREFIX}token`;
const USER_COOKIE_KEY = `${APP_PREFIX}user`;

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password required' },
        { status: 400 }
      );
    }

    const user = await findUser(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const safeUser = {
        _id: user._id,
        username: user.username,
        email: user.email,
        pfp: user.pfp,
      };

      const sessionToken = crypto.randomUUID();

      const response = NextResponse.json(
        { success: true, user: safeUser },
        { status: 200 }
      );

      // 1. Create HTTP-Only Session Token Cookie
      response.cookies.set({
        name: TOKEN_COOKIE_KEY,
        value: sessionToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });

      // 2. Create User Cookie
      response.cookies.set({
        name: USER_COOKIE_KEY,
        value: encodeURIComponent(JSON.stringify(safeUser)),
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to login', error: err.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ success: false, message: 'Missing userId' }, { status: 400 });
  }

  const result = await db.select().from(users).where(eq(users._id, userId));
  const user = result[0];

  if (!user) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, user });
}