import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json({
            success: true,
            ingredients: data.drinks,
        });
    } catch (err: any) {
        console.error('Error getting all ingredients', err.message);
        return NextResponse.json({ success: false, error: 'Failed to fetch ingredients' }, { status: 500 });
    }
}