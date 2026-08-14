export type userType = {
    _id?: string;
    username?: string;
    email?: string;
    password?: string;
}

export type drinkType = {
    idDrink?: string;
    strDrinkThumb?: string;
    name?: string;
    image?: string;
    ingredients?: (ingredientType & { image?: string })[];
    strDrink?: string;
}

export type ingredientType = {
    strIngredient1: string;
    image?: string;
}