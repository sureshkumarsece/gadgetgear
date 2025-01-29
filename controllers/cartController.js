const CartItem = require('../models/CartItem');

// Get all cart items
const getCartItems = async (req, res) => {
    try {
        console.log('🟢 Fetching all cart items...'); // Debugging
        const cartItems = await CartItem.find();
        console.log('✅ Cart Items Fetched:', cartItems); // Debugging
        res.json(cartItems);
    } catch (err) {
        console.error('❌ Error Fetching Cart Items:', err.message); // Debugging
        res.status(500).json({ message: err.message });
    }
};

// Add item to cart
const addCartItem = async (req, res) => {
    try {
        console.log('🟢 Received Data:', req.body); // Debugging
        const { productId, name, price, quantity, image } = req.body;

        if (!productId || !name || !price || !quantity || !image) {
            console.log('❌ Missing Fields:', req.body); // Debugging
            return res.status(400).json({ message: 'All fields are required' });
        }

        let cartItem = await CartItem.findOne({ productId });
        console.log('🟢 Existing Cart Item:', cartItem); // Debugging

        if (cartItem) {
            console.log('🟢 Updating existing cart item quantity...'); // Debugging
            cartItem.quantity += quantity;
        } else {
            console.log('🟢 Creating new cart item...'); // Debugging
            cartItem = new CartItem({ productId, name, price, quantity, image });
        }

        await cartItem.save();
        console.log('✅ Data Saved:', cartItem); // Debugging
        res.status(201).json(cartItem);
    } catch (err) {
        console.error('❌ Error Saving Data:', err); // Debugging
        res.status(500).json({ message: err.message });
    }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
    try {
        console.log('🟢 Updating cart item with ID:', req.params.id); // Debugging
        const { quantity } = req.body;
        console.log('🟢 New Quantity:', quantity); // Debugging

        const cartItem = await CartItem.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
        console.log('✅ Cart Item Updated:', cartItem); // Debugging
        res.json(cartItem);
    } catch (err) {
        console.error('❌ Error Updating Cart Item:', err.message); // Debugging
        res.status(500).json({ message: err.message });
    }
};

// Remove item from cart
const removeCartItem = async (req, res) => {
    try {
        console.log('🟢 Removing cart item with ID:', req.params.id); // Debugging
        await CartItem.findByIdAndDelete(req.params.id);
        console.log('✅ Cart Item Removed'); // Debugging
        res.json({ message: 'Item removed' });
    } catch (err) {
        console.error('❌ Error Removing Cart Item:', err.message); // Debugging
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getCartItems,
    addCartItem,
    updateCartItem,
    removeCartItem
};