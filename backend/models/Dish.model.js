import mongoose from 'mongoose';

const DishSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the dish
    price: { type: Number, required: true }, // Price of the dish
    description: { type: String }, // Optional description of the dish
    imageUrl: { type: String }, // URL of the dish image
    category: { type: String }, // Category of the dish (e.g., Lunch, Sweet, etc.)
});

const Dish = mongoose.model('Dish', DishSchema);

export default Dish;
