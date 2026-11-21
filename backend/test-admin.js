const mongoose = require('mongoose');
require('dotenv').config();

// Attempting connection with explicit /admin database and authSource
const uri = "mongodb://Sagar:1234@cluster0.h9tadfd.mongodb.net:27017/admin?authSource=admin&ssl=true";

const test = async () => {
    try {
        console.log('Testing connection to /admin:', uri);
        await mongoose.connect(uri, {
            family: 4,
            serverSelectionTimeoutMS: 10000
        });
        console.log('SUCCESS: Connected to /admin!');
        process.exit(0);
    } catch (err) {
        console.error('FAILED:', err.message);
        process.exit(1);
    }
};

test();
