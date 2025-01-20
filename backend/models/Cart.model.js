// import mongoose from 'mongoose';

// // Define the cart schema
// const cartSchema = new mongoose.Schema({
//     user: { type: String, required: true },  // User's name (non-unique)
//     items: [{
//         name: { type: String, required: true },
//         quantity: { type: Number, required: true },
//         price: { type: Number, required: true }
//     }],
//     totalQuantity: { type: Number, required: true },
//     totalPrice: { type: Number, required: true }
// }, {
//     timestamps: true,
// });

// // Remove the unique constraint on the 'name' field
// cartSchema.index({ user: 1 });  // Index the user field (optional for querying)

// const Cart = mongoose.model('Cart', cartSchema);

// export default Cart;


import mongoose from 'mongoose';

// Define the cart schema
const cartSchema = new mongoose.Schema({
    user: { type: String, required: true },  // User's name (non-unique)
    phoneNumber: { 
        type: String, 
        required: true, 
        match: /^[0-9]{10}$/, // Basic validation for a 10-digit phone number (can adjust to your needs)
        message: 'Invalid phone number format'
    },
    items: [{
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    totalQuantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
}, {
    timestamps: true,
});

// Remove the unique constraint on the 'name' field
cartSchema.index({ user: 1 });  // Index the user field (optional for querying)

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
