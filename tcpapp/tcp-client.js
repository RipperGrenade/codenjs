const net = require('net')

const host = 'localhost';
const port = 3000;

const options = {
    port: port,
    hostname: host,
};

sock = net.createConnection(options, () => {
    console.log('tcp connected');
    sock.write('sock mesage from client', 'utf8', () => {
    });
});
sock.on('data', (dat) => {
    console.log(`recv ${dat} from sock server`);
    sock.end();
    process.exit();
});

