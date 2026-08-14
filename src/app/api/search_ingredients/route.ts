import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const ingredient = searchParams.get('ingredient');

    if (!ingredient) {
        return NextResponse.json({ success: false, message: 'Ingredient query parameter required' }, { status: 400 });
    }

    try {
        const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${ingredient.toLowerCase().replace(' ', '_')}`
        );
        const data = await response.json();

        return NextResponse.json({
            success: true,
            ingredient: data,
        });
    } catch (err) {
        console.error('Error searching ingredient', err);
        return NextResponse.json({ success: false, message: 'Error searching ingredient' }, { status: 500 });
    }
}