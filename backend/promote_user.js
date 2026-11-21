
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

async function promote() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOneAndUpdate(
      { email: 'arnav@example.com' },
      { role: 'seller' },
      { new: true }
    );
    if (user) {
      console.log(`User ${user.email} promoted to ${user.role}`);
    } else {
      console.log('User not found');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

promote();
