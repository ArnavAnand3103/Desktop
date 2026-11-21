const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI).then(async () => {
    let admin = await User.findOne({ email: 'admin@store.com' });
    if (!admin) {
        admin = await User.create({
            name: 'System Admin',
            email: 'admin@store.com',
            password: 'password123',
            role: 'admin'
        });
        console.log('SUCCESS: Admin created! Email: admin@store.com | Password: password123');
    } else {
        admin.role = 'admin';
        admin.password = 'password123';
        await admin.save();
        console.log('SUCCESS: Admin updated! Email: admin@store.com | Password: password123');
    }
    process.exit(0);
}).catch(err => {
    console.error('FAILED TO CONNECT TO DB:', err);
    process.exit(1);
});
