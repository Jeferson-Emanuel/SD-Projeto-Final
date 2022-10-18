var PORT = 6024;
var MULTICAST_ADDR = '239.255.255.250';
var dgram = require('dgram');
var client = dgram.createSocket('udp4');

client.on('listening', () => {
    var address = client.address();
    console.log('UDP client listening on ' + address.address + ":" + address.port);
});

client.on('message', (message, rinfo) => {
    console.log('Message from ' + rinfo.address + ':' + rinfo.port + ' - ' + message);
});

client.bind(PORT, () => {
    client.addMembership(MULTICAST_ADDR);
});