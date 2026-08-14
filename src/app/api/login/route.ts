import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { findUser } from '@/src/lib/auth';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        
        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "Email e password obbligatorie" },
                { status: 400 }
            );
        }

        const user = await findUser(email);

        // 1. Verify user existence and compare password
        if (user && await bcrypt.compare(password, user.password)) {
            const safeUser = {
                _id: user._id,
                username: user.username,
                email: user.email,
            };

            // 2. Generate a random session token without JWT
            // (You can also store user._id.toString() here if you prefer checking by user ID directly)
            const sessionToken = crypto.randomUUID();

            // 3. Create the NextResponse object
            const response = NextResponse.json(
                { success: true, user: safeUser },
                { status: 200 }
            );

            // 4. Set the httpOnly cookie directly on the response
            response.cookies.set({
                name: 'token',
                value: sessionToken, 
                httpOnly: true, // Prevents client JS / XSS access
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
            });

            return response;
        }

        // 5. Explicit 401 return if credentials do not match
        return NextResponse.json(
            { success: false, message: 'Credenziali non valide' },
            { status: 401 }
        );

    } catch (err) {
        console.error('Error logging in', err);
        return NextResponse.json(
            { success: false, message: 'Failed to login' },
            { status: 500 }
        );
    }
}