import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    pfp?: {
        data: Buffer;
        contentType: string;
    };
}

const userSchema = new Schema<IUser>(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        pfp: { data: Buffer, contentType: String },
    },
    { timestamps: true }
);

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export interface IDrink extends Document {
    name: string;
    ingredients: string[];
    creator: string;
    image?: {
        data: Buffer;
        contentType: string;
    };
}

const drinkSchema = new Schema<IDrink>(
    {
        name: { type: String, required: true },
        ingredients: [{ type: String }],
        creator: { type: String, required: true },
        image: { data: Buffer, contentType: String },
    },
    { timestamps: true }
);

export const Drink: Model<IDrink> = mongoose.models.Drink || mongoose.model<IDrink>('Drink', drinkSchema);