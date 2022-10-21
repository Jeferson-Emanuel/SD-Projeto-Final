// const os = require('os');
const dgram = require("dgram");
const net = require("net");

var PORT = 6024;
var MULTICAST_ADDR = "239.255.255.250";

const server = dgram.createSocket("udp4");

// var networkInterfaces = os.networkInterfaces();

server.on("error", (err) => {
  console.log(err);
  server.close();
});

server.on("listening", () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.on("message", (msg, rinfo) => {
  console.log(
    `server got: ${msg} from ${rinfo.address}:${rinfo.port}`
  );
  server.send("Received!", rinfo.port);
});

server.bind(PORT, () => {
  // server.setBroadcast(true);
  server.addMembership(MULTICAST_ADDR);
});

net
  .createServer((sock) => {
    console.log(
      "CONNECTED: " + sock.remoteAddress + ":" + sock.remotePort
    );

    sock.on("data", (data) => {
      console.log(data);
    });
  })
  .listen(9998, "127.0.0.1");
// .listen(9998, "26.80.196.74");
