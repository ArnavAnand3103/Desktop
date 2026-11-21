const dns = require('dns');

const resolveSRV = (name) => {
    return new Promise((resolve, reject) => {
        dns.resolveSrv(name, (err, addresses) => {
            if (err) return reject(err);
            resolve(addresses);
        });
    });
};

const run = async () => {
    try {
        console.log('Resolving _mongodb._tcp.cluster0.h9tadfd.mongodb.net...');
        const srv = await resolveSRV('_mongodb._tcp.cluster0.h9tadfd.mongodb.net');
        console.log('FOUND SRV RECORDS:', JSON.stringify(srv, null, 2));
        
        console.log('Resolving TXT for cluster0.h9tadfd.mongodb.net...');
        dns.resolveTxt('cluster0.h9tadfd.mongodb.net', (err, txt) => {
            if (err) console.error('TXT lookup failed:', err);
            else console.log('TXT records:', JSON.stringify(txt, null, 2));
            process.exit(0);
        });
    } catch (err) {
        console.error('SRV lookup failed:', err);
        process.exit(1);
    }
};

run();
