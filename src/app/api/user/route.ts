import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import { User } from '../../../lib/models';

export async function POST(req: NextRequest) {
    try {
        const { user } = await req.json();

        await User.findByIdAndUpdate(user._id, { $set: user }, { new: true });

        return NextResponse.json({
            success: true,
            message: 'Updated user successfully',
        });
    } catch (err) {
        console.error('Error updating user', err);
        return NextResponse.json({ success: false, message: 'Error updating user' }, { status: 500 });
    }
}