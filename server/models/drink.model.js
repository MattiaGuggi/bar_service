import mongoose from 'mongoose'

const drinkSchema = mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [{ type: String }],
  creator: { type: String, required: true },
  image: { data: Buffer, contentType: String }
}, { timestamps: true });

export const Drink = mongoose.model('Drink', drinkSchema);