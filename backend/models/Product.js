const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  sellerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' 
  },
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  images: [{ 
    type: String // We save Cloudinary URLs here as raw strings
  }],
  category: {
    type: String,
    required: true,
  },
  stock: { 
    type: Number, 
    required: true, 
    min: 0, 
    default: 0 
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
