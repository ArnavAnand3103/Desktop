const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;

const run = async () => {
    const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 15000,
        connectTimeoutMS: 15000,
        family: 4
    });

    try {
        console.log('Connecting via driver directly to:', uri);
        await client.connect();
        console.log('CONNECTED SUCCESSFULLY via driver!');
        const dbs = await client.db().admin().listDatabases();
        console.log('Databases:', dbs.databases.map(d => d.name));
        process.exit(0);
    } catch (err) {
        console.error('Driver connection failed:', err.message);
        if (err.message.includes('SRV')) {
            console.log('Confirmed: SRV DNS Resolution failed.');
        }
        process.exit(1);
    } finally {
        await client.close();
    }
};

run();
