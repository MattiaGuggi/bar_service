import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import { Drink } from '../../../lib/models';

export async function GET() {
    try {
        const allDrinks = [];
        const letters = 'abcdefghijklmnopqrstuvwxyz';

        for (const letter of letters) {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);

            if (!response.ok) {
                console.warn(`Request failed for letter ${letter} with status ${response.status}`);
                continue;
            }

            const data = await response.json();
            if (data.drinks) {
                allDrinks.push(...data.drinks);
            }
        }

        return NextResponse.json({
            success: true,
            drinks: allDrinks,
        });
    } catch (err) {
        console.error('Error fetching all drinks', err);
        return NextResponse.json({ success: false, message: 'Failed to fetch drinks' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { name, ingredients, creator, image } = await req.json();

        const newDrink = new Drink({ name, ingredients, creator, image });
        await newDrink.save();

        return NextResponse.json({
            success: true,
            message: 'Drink created successfully!',
        });
    } catch (err) {
        console.error('Error creating drink', err);
        return NextResponse.json({ success: false, message: 'Error creating drink' }, { status: 500 });
    }
}