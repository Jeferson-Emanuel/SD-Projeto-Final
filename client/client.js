// const os = require('os');
const dgram = require('dgram');
const net = require('net');

const dgramClient = dgram.createSocket('udp4');
const netClient = new net.Socket();

// var networkInterfaces = os.networkInterfaces();
let HOST;
var PORT = 6024;
var MULTICAST_ADDR = '239.255.255.250';

dgramClient.bind(6025, '26.82.124.220', () => {
    setInterval(multicastNew, 4000);
})

dgramClient.on('listening', () => {
    const address = dgramClient.address();
    console.log(`Client listening ${address.address}:${address.port}`);
});

function multicastNew() {
    var message = Buffer.from("Multicast message!");
    dgramClient.send(message, 0, message.length, PORT, MULTICAST_ADDR, () => {
        console.log("Sent '" + message + "'");
    });
};

dgramClient.on('message', async (msg, serverInfo) => {
    console.log(`Server answered: ${msg} from ${serverInfo.address}:${serverInfo.port}`);

    HOST = serverInfo.address;
    PORT = 9998;

    netClient.connect(PORT, HOST, () => {
        console.log(`Connected to ${HOST}:${PORT}`);
        netClient.write('Socket TCP Connected.');
    });
});



// dgramClient.bind(0, networkInterfaces.Ethernet[0].address);

/* setInterval(() => {
    dgramClient.send('Hello', 9999);
}, 3000); */

/* netClient.connect(PORT, HOST, () => {
    console.log(`Connected to ${HOST}:${PORT}`);
    netClient.write('Socket TCP Connected.')
}); */
console.log(HOST, PORT);
