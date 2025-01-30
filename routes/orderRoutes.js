const express = require('express');
const Order = require('../models/orderModel.js');
const authMiddleware = require('../middleware/authMiddleware.js'); 
const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, phone, address, doorNo, areaName, landmark, gstNumber, locationType } = req.body;
    const order = new Order({ userId: req.userId, name, phone, address, doorNo, areaName, landmark, gstNumber, locationType });
    await order.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error });
  }
});


router.get('/my-orders', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
});

export default router;
