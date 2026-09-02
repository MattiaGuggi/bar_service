import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { drinks } from '@/lib/schema';

export async function GET() {
  try {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

    // Fetch all 26 alphabet queries concurrently in parallel
    const externalFetchPromises = letters.map(async (letter) => {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
        );
        if (!response.ok) return [];
        const data = await response.json();
        return data.drinks || [];
      } catch {
        return [];
      }
    });

    // Execute CocktailDB API calls and database query simultaneously
    const [externalResults, customDrinks] = await Promise.all([
      Promise.all(externalFetchPromises),
      db.select().from(drinks),
    ]);

    // Flatten external results array
    const externalDrinks = externalResults.flat();

    return NextResponse.json({
      success: true,
      drinks: [...customDrinks, ...externalDrinks],
    });
  } catch (err: any) {
    console.error('Error fetching drinks', err);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch drinks', error: err.message },
      { status: 500 }
    );
  }
}