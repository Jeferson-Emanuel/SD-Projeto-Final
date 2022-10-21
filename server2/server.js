var os = require('os');
var dgram = require('dgram');

var networkInterfaces = os.networkInterfaces();
console.log(networkInterfaces);

var SRC_PORT = 6025;
var PORT = 6024;
var HOST_IP_ADDRESS = '26.82.124.220';
// var HOST_IP_ADDRESS = networkInterfaces.Ethernet[0].address;
var MULTICAST_ADDR = '239.255.255.250';
var server = dgram.createSocket("udp4");

server.bind(SRC_PORT, HOST_IP_ADDRESS, () => {         // Add the HOST_IP_ADDRESS for reliability
    setInterval(multicastNew, 4000);
});

function multicastNew() {
    var message = Buffer.from("Multicast message!");
    server.send(message, 0, message.length, PORT, MULTICAST_ADDR, () => {
        console.log("Sent '" + message + "'");
    });
};