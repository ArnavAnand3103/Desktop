const net = require('net');

const checkPort = (host, port) => {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.setTimeout(2000);
        socket.on('connect', () => {
            console.log(`Port ${port} at ${host} is OPEN`);
            socket.destroy();
            resolve(true);
        });
        socket.on('timeout', () => {
            console.log(`Port ${port} at ${host} TIMEOUT`);
            socket.destroy();
            resolve(false);
        });
        socket.on('error', (err) => {
            console.log(`Port ${port} at ${host} ERROR: ${err.message}`);
            resolve(false);
        });
        socket.connect(port, host);
    });
};

const run = async () => {
    await checkPort('10.228.235.182', 27017);
    await checkPort('cluster0.h9tadfd.mongodb.net', 27017);
    process.exit(0);
};

run();
