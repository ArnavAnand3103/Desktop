const mongoose = require('mongoose');
require('dotenv').config();

const wipeCarts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { family: 4 });
    console.log('Connected to DB...');
    const Cart = require('./models/Cart');
    const result = await Cart.deleteMany({});
    console.log(`Wiped ${result.deletedCount} carts.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

wipeCarts();
