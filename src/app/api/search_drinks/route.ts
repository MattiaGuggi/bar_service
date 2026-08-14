import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const drink = searchParams.get('drink');

    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink?.toLowerCase()?.replace(' ', '_')}`);
        const data = await response.json();

        return NextResponse.json({
            success: true,
            drink: data,
        });
    } catch (err) {
        console.error('Error searching drink', err);
        return NextResponse.json({ success: false, message: 'Failed to search drink' }, { status: 500 });
    }
}