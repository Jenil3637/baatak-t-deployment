// models/MenuItem.js
import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String , required: false ,   default: '',},
  price: { type: Number, required: true },
  category: { 
    type: String, 
    enum: ['favorites', 'Drinks', 'Lunch', 'Combo', 'Sweet'], 
    required: true 
  },
  imageUrl: { type: String, required: true },
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;
