const dns = require('dns');
const { Resolver } = dns.promises;
const resolver = new Resolver();

// Force using Google DNS
resolver.setServers(['8.8.8.8', '8.8.4.4']);

const run = async () => {
    try {
        console.log('Resolving _mongodb._tcp.cluster0.h9tadfd.mongodb.net via 8.8.8.8...');
        const srv = await resolver.resolveSrv('_mongodb._tcp.cluster0.h9tadfd.mongodb.net');
        console.log('FOUND SRV RECORDS:', JSON.stringify(srv, null, 2));
        
        console.log('Resolving TXT for cluster0.h9tadfd.mongodb.net via 8.8.8.8...');
        const txt = await resolver.resolveTxt('cluster0.h9tadfd.mongodb.net');
        console.log('TXT records:', JSON.stringify(txt, null, 2));
        
        // Construct standard URI
        const shards = srv.map(s => `${s.name}:${s.port}`).join(',');
        console.log('\n--- RECOMMENDED STAND-ALONE URI ---');
        console.log(`mongodb://Sagar:1234@${shards}/?ssl=true&replicaSet=atlas-h9tadfd-shard-0&authSource=admin&retryWrites=true&w=majority`);
        
    } catch (err) {
        console.error('Lookup failed even with Google DNS:', err.message);
    }
};

run();
