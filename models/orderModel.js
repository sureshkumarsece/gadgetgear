import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Associate orders with a user
  name: String,
  phone: String,
  address: String,
  doorNo: String,
  areaName: String,
  landmark: String,
  gstNumber: String,
  locationType: String,
  createdAt: { type: Date, default: Date.now } // Track order time
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
