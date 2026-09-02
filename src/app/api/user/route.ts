import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const { user } = await req.json();

    if (!user?._id) {
      return NextResponse.json(
        { success: false, message: 'Missing user ID' },
        { status: 400 }
      );
    }

    // Extract fields to avoid mutating the primary key _id
    const { _id, createdAt, ...updateData } = user;

    const [updatedUser] = await db
      .update(users)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(users._id, _id))
      .returning();

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: 'Updated user successfully',
      user: updatedUser,
    });

    // Sync updated user data into the bar_service cookie
    response.cookies.set(
      'bar_service_user',
      encodeURIComponent(JSON.stringify(updatedUser)),
      { expires: 7, path: '/' }
    );

    return response;
  } catch (err: any) {
    console.error('Error updating user', err);
    return NextResponse.json(
      { success: false, message: 'Error updating user', error: err.message },
      { status: 500 }
    );
  }
}