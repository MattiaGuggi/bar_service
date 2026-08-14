import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();

        return NextResponse.json({
            success: true,
            message: 'Drink retrieved successfully',
            drink: data.drinks,
        });
    } catch (err) {
        console.error('Error getting drink details', err);
        return NextResponse.json({ success: false, message: 'Error retrieving drink' }, { status: 500 });
    }
}