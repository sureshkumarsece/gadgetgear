const mongoose = require('mongoose');

// CartItem Schema
const CartItemSchema = new mongoose.Schema({
    productId: { type: String, required: true }, // or ObjectId if referring to a Product model
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true }
});

// Cart Schema
const CartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [CartItemSchema], // Embed CartItem schema inside Cart
});

const Cart = mongoose.model('Cart', CartSchema);

console.log('🟢 Cart Model Loaded'); // Debugging
module.exports = Cart;