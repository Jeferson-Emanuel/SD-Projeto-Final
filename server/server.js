// const os = require('os');
const dgram = require('dgram');
const net = require('net');

const server = dgram.createSocket('udp4');

// var networkInterfaces = os.networkInterfaces();

server.on('error', (err) => {
    console.log(err);
    server.close();
});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    server.send('Received!', rinfo.port);
});

server.bind(9999, () => {
    server.setBroadcast(true);
});

net.createServer((sock) => {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);

    sock.on('data', (data) => {
        console.log(data);
    })
}).listen(9998, '127.0.0.1');