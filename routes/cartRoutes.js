const express = require('express');
const { getCartItems, addCartItem, updateCartItem, removeCartItem } = require('../controllers/cartController');

const router = express.Router();



router.get('/', getCartItems);
router.post('/', addCartItem);
router.put('/:id', updateCartItem);
router.delete('/:id', removeCartItem);

module.exports = router;