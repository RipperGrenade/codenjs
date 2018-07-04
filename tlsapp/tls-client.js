const tls = require('tls');
const fs = require('fs');

const port = 9443;
const hostname = 'localhost';

const options = {
    host: hostname,
    port: port,

    // Necessary only if using the client certificate authentication
    key: fs.readFileSync('clientcert/rsa2048-key.pem'),
    cert: fs.readFileSync('clientcert/rsa2048-cert.pem'),
    requestCert: true,


    // Necessary only if the server uses the self-signed certificate
    ca: [fs.readFileSync('servercert/rsa2048-cert.pem')]
};


const socket = tls.connect(options, () => {
    const authd = socket.authorized;
    if (authd === false) {
        console.log(`failed connect:${socket.authorizationError}`);
    }
    else {
        console.log('client connected authorized');
    }

});

socket.on('readable', () => {
    let chunk;
    while (null !== (chunk = socket.read())) {
        console.log(`Received ${chunk.length} bytes of data:**${chunk}**`);
    }
    socket.end();

});

socket.on('end', () => {
    console.log("End connection");
});
