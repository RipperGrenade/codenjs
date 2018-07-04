const net = require('net')

const hostname = 'localhost';
const port = 3000;

tcpoptions = {
    host: hostname,
    port: port,
};
const tcpserver = net.createServer(tcpoptions)
tcpserver.on('connection', (sock) => {
    console.log('tcp connectd');
    sock.write('tcp message', 'utf8', () => {
    });
});

tcpserver.listen(tcpoptions, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
