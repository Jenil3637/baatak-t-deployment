import mongoose from 'mongoose';

const OrderHistorySchema = new mongoose.Schema({
    user: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    items: [{ name: String, quantity: Number, price: Number }],
    totalQuantity: Number,
    totalPrice: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const OrderHistory = mongoose.model('OrderHistory', OrderHistorySchema);
export default OrderHistory;
