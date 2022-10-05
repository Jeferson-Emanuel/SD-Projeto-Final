// const os = require('os');
const dgram = require('dgram');
const client = dgram.createSocket('udp4');

// var networkInterfaces = os.networkInterfaces();

client.on('listening', () => {
    const address = client.address();
    console.log(`Client listening ${address.address}:${address.port}`);
});

client.on('message', (msg, serverInfo) => {
    console.log(`Server answered: ${msg} from ${serverInfo.address}:${serverInfo.port}`);
});

// client.bind(0, networkInterfaces.Ethernet[0].address);

setInterval(() => {
    client.send('Hello', 9999);
}, 3000);
