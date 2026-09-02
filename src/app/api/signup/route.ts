import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { createUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
    try {
        const { username, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await createUser({ username, email, password: hashedPassword });

        return NextResponse.json({
            success: true,
            message: 'Signed up successfully!',
        });
    } catch (err) {
        console.error('Error signing up', err);
        return NextResponse.json({ success: false, message: 'Failed to signup' }, { status: 500 });
    }
}