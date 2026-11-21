const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
require('dotenv').config();

const sampleProducts = [
  {
    title: "Premium Wireless Noise-Cancelling Headphones",
    description: "Experience immersive sound with our premium noise-cancelling headphones. Features 30-hour battery life, comfortable fit, and crystal-clear audio quality.",
    price: 299.99,
    category: "Electronics",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"],
    stock: 50
  },
  {
    title: "Minimalist Leather Smartwatch",
    description: "A beautifully crafted smartwatch combining classic design with modern technology. Track fitness, receive notifications, and look stylish.",
    price: 159.00,
    category: "Accessories",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop"],
    stock: 30
  },
  {
    title: "Eco-Friendly Canvas Backpack",
    description: "Sustainable and stylish canvas backpack perfect for daily commutes and weekend adventures. Multiple compartments and water-resistant fabric.",
    price: 89.50,
    category: "Accessories",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop"],
    stock: 100
  },
  {
    title: "Professional DSLR Camera Kit",
    description: "Capture stunning photos with this professional-grade DSLR camera kit. Includes 18-55mm lens, camera bag, and spare battery.",
    price: 1299.00,
    category: "Electronics",
    images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop"],
    stock: 15
  },
  {
    title: "Ergonomic Office Chair",
    description: "Work in comfort with this premium ergonomic office chair. Adjustable lumbar support, breathable mesh back, and smooth-rolling casters.",
    price: 349.99,
    category: "Furniture",
    images: ["https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=800&auto=format&fit=crop"],
    stock: 25
  },
  {
    title: "Mechanical RGB Keyboard",
    description: "Premium mechanical keyboard with customizable RGB lighting, cherry MX switches, and aircraft-grade aluminum frame.",
    price: 119.99,
    category: "Electronics",
    images: ["https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop"],
    stock: 60
  },
  {
    title: "Ceramic Coffee Mug Set",
    description: "Set of 4 handcrafted ceramic coffee mugs. Microwave and dishwasher safe. Perfect for your morning coffee ritual.",
    price: 34.00,
    category: "Furniture",
    images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop"],
    stock: 200
  },
  {
    title: "Smart Home Speaker",
    description: "Fill your room with rich, full-bodied sound. Voice-controlled smart speaker with built-in assistant and multi-room audio support.",
    price: 199.50,
    category: "Electronics",
    images: ["https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=800&auto=format&fit=crop"],
    stock: 40
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      family: 4,
      serverSelectionTimeoutMS: 20000,
    });
    console.log('Connected to MongoDB...');

    // Find the first user to act as the seller
    let seller = await User.findOne({});
    
    if (!seller) {
      console.log('No user found! Please register a user first at http://localhost:3000/signup');
      process.exit(1);
    }

    console.log(`Using "${seller.name}" (${seller.email}) as the seller...`);

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products...');

    // Add sellerId to each product
    const productsWithSeller = sampleProducts.map(p => ({
      ...p,
      sellerId: seller._id
    }));

    await Product.insertMany(productsWithSeller);
    console.log(`✅ Successfully added ${sampleProducts.length} products to the database!`);
    console.log('You can now see them at http://localhost:3000');

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
