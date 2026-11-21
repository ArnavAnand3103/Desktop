const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
      title: String,
      price: Number,
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true, default: 'India' },
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  paymentMethod: {
    type: String,
    required: true,
    default: 'COD',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'COD'],
    required: true,
    default: 'pending',
  },
  orderStatus: {
    type: String,
    enum: ['placed', 'shipped', 'delivered'],
    required: true,
    default: 'placed',
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
