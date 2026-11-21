const mongoose = require('mongoose');
require('dotenv').config();

// Constructing a standard (non-SRV) URI based on confirmed port 27017 access
const uri = "mongodb://Sagar:1234@cluster0.h9tadfd.mongodb.net:27017/test?authSource=admin&retryWrites=true&w=majority&tls=true";

const test = async () => {
    try {
        console.log('Testing NON-SRV connection to:', uri);
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            family: 4
        });
        console.log('SUCCESS: Connected via standard URI!');
        process.exit(0);
    } catch (err) {
        console.error('FAILED Standard connection:', err.message);
        process.exit(1);
    }
};

test();
