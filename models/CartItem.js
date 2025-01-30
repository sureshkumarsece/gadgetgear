const mongoose = require('mongoose');


const CartItemSchema = new mongoose.Schema({
    productId: { type: String, required: true }, 
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true }
});


const CartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [CartItemSchema], 
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;